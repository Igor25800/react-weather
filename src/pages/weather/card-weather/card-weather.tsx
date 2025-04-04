import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
} from "@mui/material";
import {WeatherCardPropsInterface} from "../../../interfaces/weatherCardProps.interface";

export const WeatherCard: React.FC<WeatherCardPropsInterface> = (
    {
        city,
        temperature,
        description,
        iconUrl,
        updatedAt,
    }) => {
    return (
        <Card sx={{maxWidth: 300, mt: 4, boxShadow: 3}}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {city}
                </Typography>
                <Box display="flex" alignItems="left" justifyContent="space-between">
                    <Typography variant="h4">{temperature}°C</Typography>
                    <Avatar
                        src={iconUrl}
                        alt={description}
                        sx={{width: 56, height: 56}}
                    />
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="caption" display="block" mt={2}>
                    Оновлено: {updatedAt}
                </Typography>
            </CardContent>
        </Card>
    );
};
