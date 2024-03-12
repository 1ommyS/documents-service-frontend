'use client'

import { Weather, fetchWeatherByCity } from '@/api/fetchWeather'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

// @ts-ignore
const WeatherPage = () => {
	/* function customUseState(initialData: any) {

         let data = initialData

         const funct = (arg: any) =>{
             data = arg
         }
         return [data, funct]
     }*/

	const [city, setCity] = useState('')
	const [weather, setWeather] = useState<Weather | undefined>(undefined)

	const findWeatherInTheCity = async () => {
		const data = await fetchWeatherByCity(city)

		//@ts-ignore
		setWeather(data)
	}

	// полей ввода с выбором города, а потом карточка с описанием погоды для данного города
	return (
		<div className={'mt-[25rem]'}>
			<div>
				<Input
					placeholder={'Введи город'}
					onChange={e => {
						setCity(e.target.value)
						// patronymic = e.target.value;
					}}
				/>
			</div>
			<div className={weather == undefined ? 'hidden' : 'block'}>
				<Card>
					<CardHeader>
						<CardTitle>Город: {weather?.name}</CardTitle>
						<CardDescription>Описание {weather?.description}</CardDescription>
					</CardHeader>
					<CardContent>
						<p> Температура: {weather?.temp}</p>
						<p>Ощущается как {weather?.feels_like}</p>
						<p>Максимальная температура {weather?.temp_max}</p>
						<p>Минимальная температура {weather?.temp_min}</p>
						<p>Дальность видимости: {weather?.visibility} м</p>
					</CardContent>
					<CardFooter>
						<p>Card Footer</p>
					</CardFooter>
				</Card>
			</div>
			<Button className={'mt-2'} onClick={findWeatherInTheCity}>
				Поиск
			</Button>
		</div>
	)
}

export default WeatherPage
