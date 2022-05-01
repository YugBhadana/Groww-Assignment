import axios from "axios";
import { BANK_DATA, CACHE_TIME, TIME_KEY } from "./const";
import {
  getTimeFromLocalStorage,
  storeToLocalStorage,
  getFromLocalStorage,
} from "./datas";

export async function getAllBanks(cityName) {
  try {
    const cityNameLocalStorageKey = BANK_DATA + cityName;
    const timeTakenSinceLastCall = getTimeFromLocalStorage(
      cityNameLocalStorageKey + TIME_KEY
    );

    if (timeTakenSinceLastCall + CACHE_TIME < new Date().getTime()) {
      const { data } = await axios.get(
        `https://vast-shore-74260.herokuapp.com/banks?city=${cityName}`
      );

      const localStorageParams = {
        key: cityNameLocalStorageKey,
        value: data,
        hasExpiryTime: true,
      };
      storeToLocalStorage(localStorageParams);

      return data;
    } else {
      return getFromLocalStorage(cityNameLocalStorageKey) ?? {};
    }
  } catch (error) {
    console.error(error);
  }
}
