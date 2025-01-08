import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Instagram from "next-auth/providers/instagram";
import Twitter from "next-auth/providers/twitter";
import Linkedin from "next-auth/providers/linkedin";

import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null;
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      };
    },
  }),
  Google,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
];

export default providers;
