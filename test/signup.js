import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const setup = document.querySelector("#auth-setup");
const form = document.querySelector("#signup-form");
const message = document.querySelector("#auth-message");

const showMessage = (text, isError = false) => {
  message.textContent = text;
  message.classList.toggle("error", isError);
};

if (!supabaseUrl || !publishableKey) {
  setup.hidden = false;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showMessage("인증 서버 연결이 필요합니다. Supabase 연결 정보를 설정해 주세요.", true);
  });
} else {
  const supabase = createClient(supabaseUrl, publishableKey);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = new FormData(form);
    if (values.get("password") !== values.get("passwordConfirm")) return showMessage("비밀번호가 서로 일치하지 않습니다.", true);
    showMessage("계정을 만들고 있습니다...");
    const { data, error } = await supabase.auth.signUp({
      email: values.get("email"),
      password: values.get("password"),
      options: {
        emailRedirectTo: new URL("auth.html", window.location.href).href,
        data: { age: Number(values.get("age")), gender: values.get("gender"), region: values.get("region").trim() },
      },
    });
    if (error) return showMessage(error.message, true);
    form.reset();
    showMessage(data.session ? "회원가입이 완료되었습니다. 로그인 페이지로 이동할 수 있습니다." : "확인 이메일을 보냈습니다. 이메일의 링크를 눌러 가입을 완료해 주세요.");
  });
}
