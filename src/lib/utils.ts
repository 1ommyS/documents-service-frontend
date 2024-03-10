import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function concatTailwindClasses(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
