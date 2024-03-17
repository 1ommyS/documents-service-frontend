'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {routes} from "@/utils/routes";
import {registrateUser} from "@/api/AuthAndRegistration";

export default function Registration() {
    const formSchema = z.object({
        email: z
            .string()
            .email()
            .min(3, {
                message: 'Длина почты не может быть меньше 3 символов',
            })
            .max(100, {
                message: 'Длина почты не может быть больше 100 символов',
            }),
        name: z
            .string()
            .min(3, {
                message: 'Длина имени не может быть меньше 3 символов',
            })
            .max(100, {
                message: 'Длина имени не может быть больше 100 символов',
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
            name: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let userId = await registrateUser(values)
            .catch(error => {
                alert(error.response.data.message)
            });

        console.log(userId)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Почта</FormLabel>
                            <FormControl>
                                <Input placeholder='Email...' {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='name'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                                <Input placeholder='Name...' {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input placeholder='Password...' type='password' {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Зарегистрироваться</Button>
                <span>Уже есть аккаунт? </span> <Link className={'underline underline-offset-1 hover:text-2xl'}
                                                      href={routes.authorisation}>Авторизуйтесь</Link>

            </form>
        </Form>
    )
}