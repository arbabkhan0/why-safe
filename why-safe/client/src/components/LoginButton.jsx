import { signInWithGoogle } from "../FireBase.js";

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Logged in user:", result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition"
    >
      Sign in with Google
    </button>
  );
}
