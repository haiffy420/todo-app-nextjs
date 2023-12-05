export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnTodoApp = nextUrl.pathname.startsWith('/todo');
            const isOnRegister = nextUrl.pathname.startsWith('/register');
            if (isOnTodoApp) {
                if (isLoggedIn) return true;
                if (isOnRegister) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/todo', nextUrl));
            }
            return true;
        },
    },
    providers: [],
    secret: process.env.NEXTAUTH_SCRET,
};