import {redirect} from 'next/navigation'
import React from "react";
import Link from "next/link";
import {routes} from "@/utils/routes";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ListItem from "@/components/ui/ListItem";
/*// @ts-ignore
export const cars = [
	{
		id: 1,
		title: "puk"
	},
	{
		id: 2,
		title: "top"
	}
]*/
export default function Home() {
    /*	let baseUrl = ''
        if (true) baseUrl = '/authorisation'
        redirect(baseUrl)*/

    const components: { title: string; href: string; description: string }[] = [
        {
            title: "Главная",
            href: "/",
            description:
                "Популярные документы",
        },
        {
            title: "Документы",
            href: "/docs",
            description:
                "Все возможные документы и взаимодействие с ними",
        },
        {
            title: "Категории",
            href: "/categories",
            description:
                "...",
        },
        {
            title: "Заявки",
            href: "/applications",
            description: "...",
        },

    ]

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Основная информация</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            <h1>Привет мир</h1>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Пункты меню</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {
                                components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    )
                                )
                            }
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

