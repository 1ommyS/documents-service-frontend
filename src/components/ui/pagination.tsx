import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import { ButtonProps } from '@/components/ui/button'
import { concatTailwindClasses } from '@/lib/utils'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
	<nav
		role='navigation'
		aria-label='pagination'
		className={concatTailwindClasses(
			'mx-auto flex w-full justify-center',
			className
		)}
		{...props}
	/>
)

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={concatTailwindClasses(
			'flex flex-row items-center gap-1',
			className
		)}
		{...props}
	/>
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
	<li ref={ref} className={concatTailwindClasses('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
	isActive?: boolean
} & Pick<ButtonProps, 'size'> &
	React.ComponentProps<'a'>

function PaginationLink({
	className,
	isActive,
	size = 'icon',
	...props
}: PaginationLinkProps) {
	return (
		<PaginationItem>
			<span
				aria-current={isActive ? 'page' : undefined}
				className={concatTailwindClasses(
					`inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 px-4 ${
						isActive
							? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
							: 'hover:bg-accent hover:text-accent-foreground'
					}`,
					className
				)}
				{...props}
			/>
		</PaginationItem>
	)
}
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label='Go to previous page'
		size='default'
		className={concatTailwindClasses('gap-1 pl-2.5', className)}
		{...props}
	>
		<ChevronLeft className='h-8 w-8' />
	</PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label='Go to next page'
		size='default'
		className={concatTailwindClasses('gap-1 pr-2.5', className)}
		{...props}
	>
		<ChevronRight className='h-8 w-8' />
	</PaginationLink>
)

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<'span'>) => (
	<span
		aria-hidden
		className={concatTailwindClasses(
			'flex h-9 w-9 items-center justify-center',
			className
		)}
		{...props}
	>
		<MoreHorizontal className='h-4 w-4' />
		<span className='sr-only'>More pages</span>
	</span>
)

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
}
