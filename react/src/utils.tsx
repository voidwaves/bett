
import { format, parse } from 'ts-date'
import { ChangeEvent, Dispatch } from 'react'

const pattern = 'YYYY-MM-DD'

export const dateToString = (date: Date): string => format(date, pattern) as string

export const stringToDate = (dateString: string): Date => parse(dateString, pattern) as Date

export const isEqual = (first: Date, second: Date): boolean => {
    return first.getTime() === second.getTime()
}

export const isEarlier = (first: Date, second: Date): boolean => {
    return first.getTime() < second.getTime()
}

export const isLater = (first: Date, second: Date): boolean => {
    return first.getTime() > second.getTime()
}

export const isInRange = (target: Date, start: Date, end: Date) => {
    const [targetTime, startTime, endTime] = [target, start, end]
    .map(date => date.getTime())
    return targetTime >= startTime && targetTime <= endTime
}

export const dateRange = (start: Date, end: Date): Date[] => {
    const newStart = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1)
    return isEqual(start, end) ? [end] : [start, ...dateRange(newStart, end)]
}

export const fromEvent = function (setter: Dispatch<string>) {
    return (event: ChangeEvent<HTMLInputElement>) => setter(event.target.value)
}
