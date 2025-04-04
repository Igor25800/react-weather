import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { WeatherCard } from "./cardWeather/cardWeather";
import { useDebouncedWeatherFetch } from "../../hooks/useDebouncedWeatherFetch";

export const Weather: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const { weather, error, debouncedFetchWeather } = useDebouncedWeatherFetch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };

    useEffect(() => {
        if (value) debouncedFetchWeather(value);
    }, [debouncedFetchWeather, value]);

    return (
        <div className='flex-colum'>
            <p>Зробив затримку в інпуті 2 сек запиту,
                щоб не відправляло багато запитів</p>
            <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                value={value}
                onChange={handleChange}
            />
            {weather ? (
                <WeatherCard
                    city={weather.city}
                    temperature={weather.temperature}
                    description={weather.description}
                    iconUrl={weather.iconUrl}
                    updatedAt={weather.updatedAt}
                />
            ) : (
                <p>{error}</p>
            )}
        </div>
    );
};
