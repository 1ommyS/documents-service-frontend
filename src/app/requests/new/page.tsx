'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {routes} from "@/utils/routes";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const NewRequestPage = () => {

    const formSchema = z.object({
        name: z
            .string()
            .min(3, {
                message: 'Длина имени не может быть меньше 3 символов',
            })
            .max(100, {
                message: 'Длина имени не может быть больше 100 символов',
            }),
        description: z
            .string()
            .min(3, {
                message: 'Длина описания не может быть меньше 3 символов',
            })
            .max(100, {
                message: 'Длина описания не может быть больше 100 символов',
            }),
        document: z
            .string()

    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            document: ''
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

    }

    function clearFormData() {
        form.reset();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='name'
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
                    name='description'
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
                <Button type='submit'>Создать документ</Button>
                {/*кнопка не тригерящая обрабатывание формы*/}
                <Button type={'button'} onClick={clearFormData}>Очистить форму</Button>
                <span>Еще нет аккаунта? </span> <Link className={'underline underline-offset-1 hover:text-2xl'}
                                                      href={routes.registration}>Зарегистрируйтесь</Link>
            </form>
        </Form>
    )
}

export default NewRequestPage