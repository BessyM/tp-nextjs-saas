import { IRegister } from "@/app/interfaces/user"

type ErrorItem = { error: boolean; message: string; code: string }

export const MRegister = (user: IRegister): ErrorItem[] => {
    const a: ErrorItem[] = []
    const { firstname, lastname, email, password, confirmPassword } = user;

    if (!firstname || firstname.length < 2) {
        a.push({ error: true, message: "Firstname is not correct", code: "E01" })
    }

    if (!lastname || lastname.length < 2) {
        a.push({ error: true, message: "Lastname is not correct", code: "E01" })
    }

    if (!email || email.length < 5 || !email.includes("@")) {
        a.push({ error: true, message: "Email is not correct", code: "E01" })
    }

    if (!password || password.length < 6) {
        a.push({ error: true, message: "Password is not correct", code: "E01" })
    }

    if (password !== confirmPassword) {
        a.push({ error: true, message: "Passwords do not match", code: "E01" })
    }

    return a
}