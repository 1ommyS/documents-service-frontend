'use client'

import {Button} from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import Link from "next/link";
import {routes} from "@/utils/routes";
import {authUser, UserQuery} from "@/api/AuthAndRegistration";
import {useRouter} from "next/navigation";
import {useContext} from "react";
import {AuthContext} from "@/lib/AuthContext";


const AuthPage = () => {
    const {authedUserInfo, setAuthedUserInfo, setLoggedStatus, loggedStatus} = useContext(AuthContext);
    const router = useRouter()

    if (loggedStatus) router.push("/");


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
            email: '',
            password: ''
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const authedUserData: UserQuery = await authUser(values)
            .catch(error => alert(error.response.data.message)) as UserQuery;

        setAuthedUserInfo(authedUserData)
        setLoggedStatus(true);

        await router.push("/");
    }

    function clearFormData() {
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Email...' {...field} />
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
                <Button type='submit'>Авторизоваться</Button>
                {/*кнопка не тригерящая обрабатывание формы*/}
                <Button type={'button'} onClick={clearFormData}>Очистить форму</Button>
                <span>Еще нет аккаунта? </span> <Link className={'underline underline-offset-1 hover:text-2xl'}
                                                      href={routes.registration}>Зарегистрируйтесь</Link>
            </form>
        </Form>
    )
}

export default AuthPage
