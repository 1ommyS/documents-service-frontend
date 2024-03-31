'use client'
import {toast} from "sonner"
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {getCategoriesFromServer} from "@/api/category/category";
import {Category} from "@/api/category/category.types";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogFooter, DialogTrigger,} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import Link from "next/link";
import {CreateDocument, createDocument} from "@/api/document/document";

const CreateNewDocumentPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isEnabledOverlay, setIsEnabledOverlay] = useState(false);
    const router = useRouter();

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
            if (categories.length == 0) {
                setIsEnabledOverlay(true);
            }
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
        await createDocument(values as unknown as CreateDocument)
            .then(() => {
                toast("Все успешно создано", {
                    description: "Документ с именем " + values.name + " создан",
                })
            })
            .catch(error => {
                toast("Произошла ошибка", {
                    description: error.response.data.message,
                })
            })
    }

    function clearFormData() {
        form.reset();
    }

    return (<>
            <Dialog open={isEnabledOverlay} modal={true}>

                <DialogContent className="sm:max-w-[425px]">
                    <h1>Категорий еще нет :(</h1>
                    <DialogFooter>
                        <Button> <Link href={"/categories/new"}>Создайте первую категорию</Link></Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
                                                render={({field: {onChange, value}}) => (
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
            </Form></>
    )
}
export default CreateNewDocumentPage