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
} else {
  const supabase = createClient(supabaseUrl, publishableKey);

  const renderSession = (session) => {
    guest.hidden = Boolean(session);
    member.hidden = !session;
    if (session) document.querySelector("#account-email").textContent = session.user.email;
  };

  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => renderSession(session));
  window.addEventListener("pagehide", () => authListener.subscription.unsubscribe(), { once: true });

  document.querySelectorAll("[data-auth-tab]").forEach((button) => button.addEventListener("click", () => {
    const isLogin = button.dataset.authTab === "login";
    document.querySelector("#login-form").hidden = !isLogin;
    document.querySelector("#signup-form").hidden = isLogin;
    document.querySelectorAll("[data-auth-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
    showMessage("");
  }));

  document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    showMessage("로그인 중입니다...");
    const values = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({ email: values.get("email"), password: values.get("password") });
    showMessage(error ? "이메일 또는 비밀번호를 확인해 주세요." : "로그인되었습니다.", Boolean(error));
  });

  document.querySelector("#signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    if (values.get("password") !== values.get("passwordConfirm")) return showMessage("비밀번호가 서로 일치하지 않습니다.", true);
    showMessage("계정을 만들고 있습니다...");
    const { data, error } = await supabase.auth.signUp({
      email: values.get("email"),
      password: values.get("password"),
      options: { emailRedirectTo: new URL("auth.html", window.location.href).href },
    });
    if (error) return showMessage(error.message, true);
    event.currentTarget.reset();
    showMessage(data.session ? "회원가입과 로그인이 완료되었습니다." : "확인 이메일을 보냈습니다. 이메일의 링크를 눌러 가입을 완료해 주세요.");
  });

  document.querySelector("#logout-button").addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();
    showMessage(error ? "로그아웃하지 못했습니다. 다시 시도해 주세요." : "로그아웃되었습니다.", Boolean(error));
  });
}
