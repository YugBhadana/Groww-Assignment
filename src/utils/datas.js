import { TIME_KEY } from "./const";

export function storeToLocalStorage({ key, value, hasExpiryTime = false }) {
  if (hasExpiryTime) {
    storeTimeToLocalStorage(key);
  }

  localStorage.setItem(key, JSON.stringify(value));
}

export function storeTimeToLocalStorage(key) {
  const currentTime = new Date().getTime();
  localStorage.setItem(key + TIME_KEY, currentTime);
}

export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function getTimeFromLocalStorage(key) {
  return Number(localStorage.getItem(key)) || 0;
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key + TIME_KEY);
  localStorage.removeItem(key);
}
