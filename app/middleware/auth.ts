// middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
    const { loggedIn } = useUserSession()

    // If the user is not logged in, redirect them to the login page
    if (!loggedIn.value) {
        return navigateTo('/')
    }
})
