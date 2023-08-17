//#protecting routes/pages when user is not logged in
export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard"] };
