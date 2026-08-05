import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const setup = document.querySelector("#auth-setup");
const guest = document.querySelector("#auth-guest");
const member = document.querySelector("#auth-member");
const message = document.querySelector("#auth-message");

const showMessage = (text, isError = false) => {
  message.textContent = text;
  message.classList.toggle("error", isError);
};

if (!supabaseUrl || !publishableKey) {
  setup.hidden = false;
  document.querySelectorAll(".auth-form").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    showMessage("인증 서버 연결이 필요합니다. Supabase 연결 정보를 설정해 주세요.", true);
  }));
} else {
  const supabase = createClient(supabaseUrl, publishableKey);

  const renderSession = (session) => {
    guest.hidden = Boolean(session);
    member.hidden = !session;
    if (session) document.querySelector("#account-email").textContent = session.user.email;
  };

  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => renderSession(session));
  window.addEventListener("pagehide", () => authListener.subscription.unsubscribe(), { once: true });

  document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    showMessage("로그인 중입니다...");
    const values = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({ email: values.get("email"), password: values.get("password") });
    showMessage(error ? "이메일 또는 비밀번호를 확인해 주세요." : "로그인되었습니다.", Boolean(error));
  });

  document.querySelector("#logout-button").addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();
    showMessage(error ? "로그아웃하지 못했습니다. 다시 시도해 주세요." : "로그아웃되었습니다.", Boolean(error));
  });
}
