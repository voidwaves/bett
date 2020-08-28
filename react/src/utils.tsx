
import { format, parse } from 'ts-date'
import { SetStateAction, ChangeEvent } from 'react'

const pattern = 'YYYY-MM-DD'

export const dateToString = (date: Date): string => format(date, pattern) as string

export const stringToDate = (dateString: string): Date => parse(dateString, pattern) as Date

export const fromEvent = function <Type>(setter: SetStateAction<any>) {
    return (event: ChangeEvent<HTMLInputElement>) => setter(event.target.value)
}