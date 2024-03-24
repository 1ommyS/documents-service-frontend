'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registrateUser, UserQuery} from "@/api/user/AuthAndRegistration";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {routes} from "@/utils/routes";
import {createCategory} from "@/api/category/category";
import {useRouter} from "next/navigation";

const CreateNewCategoryPage = () => {
    const formSchema = z.object({

        name: z
            .string()
            .min(3, {
                message: 'Длина названия не может быть меньше 3 символов',
            })
            .max(100, {
                message: 'Длина названия не может быть больше 100 символов',
            }),

    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    })

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createCategory(values.name).then(() => {
            router.push("/categories")
        })
    }

    return (
        <div className='border-2 rounded-sm border-gray-400 p-4 shadow-xl'>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

                <FormField
                    control={form.control}
                    name='name'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Название категории</FormLabel>
                            <FormControl>
                                <Input placeholder='Название категории...' {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type='submit'>Создать</Button>

            </form>
        </Form>
        </div>
    )
}

export default CreateNewCategoryPage