import { FormControl } from "@angular/forms"

export interface TodoAPI {
    id: string,
    todoName: string,
    todoDescription: string,
    createdDate: Date
}

export interface TodoForm {
    todoName: FormControl<string>,
    todoDescription: FormControl<string>
}

export interface TodoPayload {
    todoName: string,
    todoDescription: string
}