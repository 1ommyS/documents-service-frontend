'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const AuthPage = () => {
	const formSchema = z.object({
		username: z
			.string()
			.min(3, {
				message: 'Длина логина не может быть меньше 3 символов',
			})
			.max(100, {
				message: 'Длина логина не может быть больше 100 символов',
			}),
		password: z
			.string()
			.min(3, {
				message: 'Длина пароля не может быть меньше 3 символов',
			})
			.max(100, {
				message: 'Длина пароля не может быть больше 100 символов',
			}),
	})
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	})

	console.log(form)
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Логин</FormLabel>
							<FormControl>
								<Input placeholder='Login...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input placeholder='Password...' type='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	)
}

export default AuthPage
