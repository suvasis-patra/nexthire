import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  return isPasswordCorrect;
}

export function getTimeSincePosted(date: string | Date): string {
  const postDate = typeof date === "string" ? parseISO(date) : date;
  const now = new Date();
  const diffInMilliseconds = now.getTime() - postDate.getTime();
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  const diffInHours = diffInMinutes / 60;

  if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} minutes ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (diffInHours < 168) {
    return `${Math.floor(diffInHours / 24)} days ago`;
  } else if (diffInHours < 720) {
    return `${Math.floor(diffInHours / 168)} weeks ago`;
  } else {
    return formatDistanceToNow(postDate, { addSuffix: true });
  }
}
