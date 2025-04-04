import {localData} from "../interfaces/localData.interface";


export const getLocalStore = (): localData[] => {
   return JSON.parse(localStorage.getItem('weather_cache') || '[]');
}

export const setLocalStore = (newCache: localData[]): void => {
   localStorage.setItem('weather_cache', JSON.stringify(newCache));
}