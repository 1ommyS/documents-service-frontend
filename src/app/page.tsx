import { redirect } from 'next/navigation'

export default function Home() {
	let baseUrl = ''
	if (true) baseUrl = '/authorisation'
	redirect(baseUrl)

	return <></>
}
