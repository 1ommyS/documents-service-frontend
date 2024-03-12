import axios from 'axios'

const OPEN_WEATHER_API_TOKEN = '58cff0dc4fdf535e33bea4d8dcb1fce4'
export type Weather = {
	name: string
	description: string
	temp: string
	feels_like: string
	temp_max: string
	temp_min: string
	visibility: string
}
// @ts-ignore
export const fetchWeatherByCity = async (city: string): Promise<Weather> => {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_TOKEN}&units=metric&lang=ru`

	/* const dataFromServer = fetch(apiUrl)
		.then(data => {
			console.log(data)
			return data.json()
		})
		.then(data => {
			console.log(data)
			return data
		}) */

	const dataFromServer = await axios
		.get(apiUrl)
		.then(response => {
			console.log(response)
			return response.data
		})
		.catch(error => {
			console.log(error?.response?.status)
		})

	console.log(dataFromServer)

	return {
		name: dataFromServer.name,
		description: dataFromServer.weather[0].description,
		temp: dataFromServer.main.temp,
		feels_like: dataFromServer.main.feels_like,
		temp_max: dataFromServer.main.temp_max,
		temp_min: dataFromServer.main.temp_min,
		visibility: dataFromServer.visibility,
	}
}
