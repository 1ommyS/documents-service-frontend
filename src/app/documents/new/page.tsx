'use client'

import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {getCategoriesFromServer} from "@/api/category/category";
import {Category} from "@/api/category/category.types";
import {Option} from "lucide-react";

const CreateNewDocumentPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const formSchema = z.object({
        name: z
            .string()
            .min(3, {
                message: 'Название документа не может быть меньше 3 символов',
            })
            .max(100, {
                message: 'Название документа не может быть больше 100 символов',
            }),
        description: z
            .string()
            .min(3, {
                message: 'Описание не может быть меньше 3 символов',
            })
            .max(100, {
                message: 'Описание не может быть больше 100 символов',
            }),
        categoryId: z
            .string()
            .min(0, {
                message: 'Номер категории не может быть меньше 0',
            })
    })
    useEffect(() => {
        getCategoriesFromServer().then(categories => {
            setCategories(categories)
        })
    }, []);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            categoryId: '0'
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
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
                            <FormLabel>Название документа</FormLabel>
                            <FormControl>
                                <Input placeholder='Название документа...' {...field} />
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
                            <FormLabel>Описание</FormLabel>
                            <FormControl>
                                <Textarea placeholder={"Описание..."} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {/* Поле селекта для категории, отображается только после загрузки категорий */}
                {categories.length > 0 && (
                    <>
                        Выберите категорию
                        <FormField
                            control={form.control}
                            name='categoryId'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Категория</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="categoryId"
                                            control={form.control}
                                            render={({ field: { onChange, value } }) => (
                                                <Select onValueChange={onChange} value={value.toString()}>
                                                    <SelectTrigger className="w-[380px]">
                                                        <SelectValue placeholder="Выберите категорию"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {categories.map((category) => (
                                                                <SelectItem
                                                                    key={category.id}
                                                                    value={category.id.toString()}
                                                                >
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </>
                )}
                <Button type='submit'>Создать документ</Button>

            </form>
        </Form>
    )
}
export default CreateNewDocumentPage