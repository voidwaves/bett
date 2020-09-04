
import { format, parse, addDate } from 'ts-date'
import { ChangeEvent, Dispatch } from 'react'

const pattern = 'YYYY-MM-DD'

export const dateToString = (date: Date): string => format(date, pattern) as string

export const stringToDate = (dateString: string): Date => parse(dateString, pattern) as Date

const resetTime = (date: Date): Date => {
    date.setHours(0, 0, 0, 0)
    return date
}

export const isEqual = (first: Date, second: Date): boolean => {
    const [resetFirst, resetSecond] = [resetTime(first), resetTime(second)]
    return resetFirst.getTime() === resetSecond.getTime()
}

export const isEarlier = (first: Date, second: Date): boolean => {
    const [resetFirst, resetSecond] = [resetTime(first), resetTime(second)]
    return resetFirst.getTime() < resetSecond.getTime()
}

export const isLater = (first: Date, second: Date): boolean => {
    const [resetFirst, resetSecond] = [resetTime(first), resetTime(second)]
    return resetFirst.getTime() > resetSecond.getTime()
}

export const isInRange = (target: Date, start: Date, end: Date) => {
    const [targetTime, startTime, endTime] = [target, start, end]
    .map(date => date.getTime())
    return targetTime >= startTime && targetTime <= endTime
}

export const dateRange = (start: Date, end: Date): Date[] => {
    if(isLater(start, end)) {
        throw new Error('dateRange: start can not be later than end!')
    }
    const newStart = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1)
    return isEqual(start, end) ? [end] : [start, ...dateRange(newStart, end)]
}

export const weekDateRange = (date: Date): [Date, Date] => {
    const weekstart = date.getDate() - date.getDay() + 1
    const monday = new Date(date.setDate(weekstart))
    const friday = addDate(monday, 4)
    console.log(dateToString(monday))
    console.log(dateToString(friday))
    return [monday, friday]
}

export const isWeekDay = (date: Date): boolean => {
    return ![0, 6].includes(date.getDay())
}

export const fromEvent = function (setter: Dispatch<string>) {
    return (event: ChangeEvent<HTMLInputElement>) => setter(event.target.value)
}
