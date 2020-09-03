import ReportEntries from "./view/ReportEntries"

type Modify<T, R> = Omit<T, keyof R> & R

export namespace App {
    export type ReportEntry = Modify<ApiResponse.ReportEntry, {
        reportDate: Date
    }>
}

export namespace ApiResponse {
    export type ReportEntry = {
        id: number
        user: User
        content: string
        reportDate: string
        workingHours: number
        department: string
    }
    
    export type User = {
        id: number
        fistName: string
        lastName: string
        beginOfApprenticeship: string
        label: string
        username: string
        password: string
    }
}

export namespace ApiRequest {
    export namespace ReportEntry {
        export type Put = Post & {
            id: number
        }
        export type Post = {
            content: string
            reportDate: string
            workingHours: number
            department: string
        }
        export type Params = {
            params: {
                start: string
                end: string
            }
        }
    }
    export namespace User {
        export type Put = Post & {
            id: number
        }
        export type Post = {
            fistName: string
            lastName: string
            beginOfApprenticeship: string
            label: string
            username: string
            password: string
        }
    }
    export type Login = {
        username: string
        password: string
    }
    export type Register = {
        username: string
        password: string
        firstName: string
        lastName: string
        label: string
        beginOfApprenticeship: string
    }
}