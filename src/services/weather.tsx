import axios from "axios";


const API_KEY = process.env.REACT_APP_API_KEY;

export const getWeatherByCity = (city: string): Promise<any> => {
    return axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
                lang: "ua",
            },
        })
        .then((response) => {
            const data = response.data;
            return {
                city: data.name,
                temperature: Math.round(data.main.temp),
                description: data.weather[0].description,
                iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                updatedAt: new Date().toLocaleString("uk-UA"),
            };
        })
        .catch((error) => {
            console.error("Помилка отримання погоди:", error);
            return { error: "Місто не знайдено. Перевірте правильність написання." };
        });
};
