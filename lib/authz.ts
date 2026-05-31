import { type User } from "firebase/auth";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@webdesignje.com";

export const isAdminUser = async (user: User): Promise<boolean> => {
  return user.email?.toLowerCase() === ADMIN_EMAIL;
};
