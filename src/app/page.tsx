import {redirect} from 'next/navigation'
import React from "react";
import Link from "next/link";
import {routes} from "@/utils/routes";

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

    return <>
        <div>
            <h1>Привет! </h1>
        </div>
        <div>
            <Link
                className={"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors text-wrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-25 bg-primary text-primary-foreground hover:bg-primary/60 h-10 px-4 py-2"}
                href={
                    routes.authorisation
                }>
                Авторизоваться
            </Link>
        </div>
    </>
}
