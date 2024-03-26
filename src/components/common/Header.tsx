import ListItem from "@/components/ui/ListItem";
import React from "react";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {routes} from "@/utils/routes";
import {randomUUID} from "node:crypto";

function Header(props: {
    components: { title: string; href: string; description: string }[],
    //@ts-ignore
    callbackfn: (component) => React.JSX.Element
}) {
    return <React.Fragment key={randomUUID()}>
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
                                props.components.map(props.callbackfn
                                )
                            }
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href={routes.authorisation}>Авторизация/Регистрация</Link>
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href={routes.newDocument}>Создание документа</Link>
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu></React.Fragment>;
}

export default Header;