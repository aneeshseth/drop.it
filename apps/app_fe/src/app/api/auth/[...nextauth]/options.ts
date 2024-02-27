import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
export const options: AuthOptions = {
  secret: "p8OvEvf4pKyYlcs84/vePmV8LLfKqwfke3G+yAEcQ1s=",
  providers: [
    GitHubProvider({
      name: "GitHub",
      clientId: "3fb1b22ecbb5216daa65",
      clientSecret: "be1dbe68006dbabda8b25ad3c70446cf43406bcb",
    }),
  ],
};
