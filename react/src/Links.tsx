
// zentrale Stelle um auf die URLs im Browser und für API Requests zuzugreifen
const apiLink = 'http://localhost:8081'
export const links = {
    api: {
        reportEntries: `${apiLink}/reportentry`,
        reportEntryDelete: (id: number) => `${apiLink}/reportentry/${id}`,
        profile: `${apiLink}/user`,
        profileDelete: (id: number) => `${apiLink}/user/${id}`,
        register: `${apiLink}/register`,
        login: `${apiLink}/authenticate`
    },
    browser: {
        reportEntries: '/reportentries',
        profile: '/profile',
        home: '/home',
        landing: '/landing', 
        register: '/register',
        login: '/login'
    }
}