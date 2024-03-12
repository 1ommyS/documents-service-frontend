import Link from 'next/link'

const test = () => {
	let testObj = [
		{
			id: 1,
			name: 'test',
			description: 'test',
		},
		{
			id: 2,
			name: 'test2',
			description: 'test2',
		},
		{
			id: 3,
			name: 'test3',
			description: 'test3',
		},
		{
			id: 4,
			name: 'test4',
			description: 'test4',
		},
		{
			id: 5,
			name: 'test5',
			description: 'test5',
		},
	]

	return (
		<>
			<table className='table border rounded '>
				<thead>
					<tr>
						<th className='border'>ID</th>
						<th className='border'>Name</th>
						<th className='border'>Descriptoin</th>
					</tr>
				</thead>
				<tbody>
					{testObj.map(item => {
						return (
							<>
								<tr>
									<td className='border'>
										<Link href={`/cars/${item.id}`}>{item.id}</Link>
									</td>
									<td className='border'>{item.name}</td>
									<td className='border'>{item.description}</td>
								</tr>
							</>
						)
					})}
				</tbody>
			</table>
		</>
	)
}

export default test
