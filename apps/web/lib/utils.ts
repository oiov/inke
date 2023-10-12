import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ms from "ms";
import { ContentItem } from "./types/note";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeAgo = (timestamp: number, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function isEmail(str: string) {
  const reg = /^([a-zA-Z\d._%+-]+)@([a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;
  return reg.test(str);
}

export function getAvatarById(id: string) {
  return `https://avatars.dicebear.com/api/micah/${id}.svg`;
}

export function formatDate(dateString: string) {
  if (!dateString) {
    return `0秒前`;
  }
  const sourceDate = new Date(dateString).getTime();
  const currentDate = new Date().getTime();

  const timeDiff = currentDate - sourceDate;
  const secondsDiff = Math.floor(timeDiff / 1000); // 计算秒数差

  if (secondsDiff < 60) {
    return `${secondsDiff}秒前`;
  } else if (secondsDiff < 3600) {
    // 不足1小时
    const minutesDiff = Math.floor(secondsDiff / 60);
    return `${minutesDiff}分钟前`;
  } else if (secondsDiff < 86400) {
    // 不足1天
    const hoursDiff = Math.floor(secondsDiff / 3600);
    return `${hoursDiff}小时前`;
  } else {
    const daysDiff = Math.floor(secondsDiff / 86400);
    return `${daysDiff}天前`;
  }
}

export function fomatTmpDate(dateNum: number) {
  const date = new Date(dateNum);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export function generateName(id: string) {
  return `u-${id.slice(-6)}`;
}

export function exportAsJson(data: any, filename: string) {
  const dataStr = JSON.stringify(data);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", filename + ".json");
  linkElement.style.display = "none";
  document.body.appendChild(linkElement);

  linkElement.click();
  document.body.removeChild(linkElement);
}

export function exportAsTxtFile(data: string, fileName: string) {
  const dataStr = JSON.stringify(data);
  const dataUri =
    "data:text/plain;charset=utf-8," + encodeURIComponent(dataStr);

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", fileName + ".txt");
  linkElement.style.display = "none";
  document.body.appendChild(linkElement);

  linkElement.click();
  document.body.removeChild(linkElement);
}

export function getRandomElement(arr: string[]) {
  let currentIndex = arr.length;
  let temporaryValue;
  let randomIndex;

  // 当还有未洗牌的元素时
  while (currentIndex !== 0) {
    // 从剩余的元素中随机选择一个元素
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // 将当前元素与随机选择的元素进行交换
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  // 返回洗牌后的数组的第一个元素
  return arr[0];
}

export function greeting() {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();

  if (currentHour < 12) {
    return "上午好";
  } else if (currentHour < 18) {
    return "下午好";
  } else {
    return "晚上好";
  }
}
