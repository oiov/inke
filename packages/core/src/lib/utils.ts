import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
}

export function isImageLink(link: string): boolean {
  if (!isValidUrl(link)) return false;
  const imageExtensions = [".jpg", ".jpeg", ".png", "webp", ".gif", ".bmp"];
  const fileExtension = link.substring(link.lastIndexOf(".")).toLowerCase();

  return imageExtensions.includes(fileExtension);
}
