
export namespace ApiResponse {
    export type ReportEntry = {
        id: number
        user: User
        content: string
        date: Date
        workingHours: number
        department: string
    }
    
    export type User = {
        id: number
        fistName: string
        lastName: string
        beginOfApprenticeship: Date
        label: string
        username: string
        password: string
    }
}

export namespace ApiRequest {
    export namespace ReportEntry {
        export type Put = {

        }
        export type Post = {

        }
        export type Params = {
            params: {
                start: string
                end: string
            }
        }
    }
    export namespace User {
        export type Put = {

        }
        export type Post = {
            
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