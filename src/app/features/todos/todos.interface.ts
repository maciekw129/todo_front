import { FormControl } from "@angular/forms"
import { LoaderState } from "src/app/shared/loader/loader.interface"

export interface TodosState {
    todos: TodoAPI[],
    getAllTodosLoader: LoaderState,
    addTodoLoader: LoaderState,
}

export interface TodoState {
    deleteTodoLoader: LoaderState
}

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