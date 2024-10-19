import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      isOnboarded: boolean;
    } & DefaultSession["user"];
  }
}
