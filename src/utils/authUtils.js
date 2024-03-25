import { redirect } from "react-router-dom"
import { auth } from "../services/firebase"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname

    if (!(auth.currentUser)) {
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }
}