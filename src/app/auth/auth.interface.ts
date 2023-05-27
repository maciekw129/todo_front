import { FormControl } from "@angular/forms";
import { LoaderState } from "../shared/loader/loader.interface";

export interface LoginPayload {
    email: string,
    password: string
}

export interface RegisterPayload {
    email: string,
    password: string,
    firstname: string,
    lastname: string
}

export interface AuthorizationAPI {
    token: string
}

export interface AuthState {
    userDetails: UserDetails | null,
    authLoader: LoaderState
}

export interface UserDetails {
    firstname: string,
    lastname: string,
    userId: string
}

export interface LoginForm {
    email: FormControl<string>,
    password: FormControl<string>
}

export interface RegisterForm {
    email: FormControl<string>,
    password: FormControl<string>,
    firstname: FormControl<string>,
    lastname: FormControl<string>
}