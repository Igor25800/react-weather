import { useState, useRef } from "react";
import { debounce } from "lodash";
import { getWeatherByCity } from "../services/weather";
import { getLocalStore, setLocalStore } from "../services/localStorage";
import { WeatherCardPropsInterface } from "../interfaces/weatherCardProps.interface";

export const useDebouncedWeatherFetch = (debounceDelay: number = 2000) => {
    const [weather, setWeather] = useState<WeatherCardPropsInterface | undefined>();
    const [error, setError] = useState<string>('');

    const debouncedFetchWeather = useRef(
        debounce((city: string) => {
            const cachedData = getLocalStore();
            const cachedCity = cachedData.find((entry: any) => entry.city.toLowerCase() === city.toLowerCase());

            const currentTime = Date.now();

            if (cachedCity && currentTime - cachedCity.timestamp < 5 * 60 * 1000) {
                setWeather(cachedCity.data);
                setError('');
            } else {
                getWeatherByCity(city).then(res => {
                    if (res?.error) {
                        setError(res?.error);
                        setWeather(undefined);
                    } else {
                        setWeather(res);
                        const newCache = cachedData.filter((entry: any) => entry.city.toLowerCase() !== city.toLowerCase());
                        newCache.push({ city, data: res, timestamp: currentTime });
                        setLocalStore(newCache);
                    }
                });
            }
        }, debounceDelay)
    ).current;

    return { weather, error, debouncedFetchWeather };
};
