
const apiLink = 'http://localhost:8081'
export const links = {
    api: {
        reportEntries: `${apiLink}/reportentry`,
        profile: `${apiLink}/profile`,
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