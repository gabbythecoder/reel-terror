// todo - create a sign-in page using your own components and clerk components

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <>
            <h1>Sign In!</h1>
            <SignIn />
        </>
    )
}