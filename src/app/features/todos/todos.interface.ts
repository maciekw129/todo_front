import { FormControl } from "@angular/forms"
import { LoaderState } from "src/app/shared/loader/loader.interface"

export interface TodosState {
    todos: Map<string, TodoAPI>,
    getAllTodosLoader: LoaderState,
    addTodoLoader: LoaderState
}

export interface TodoState {
    deleteTodoLoader: LoaderState,
    completeTodoLoader: LoaderState
}

export interface TodosAPIResponse {
    content: TodoAPI[],
    totalPages: number,
    last: boolean
}

export interface TodoAPI {
    id: string,
    todoName: string,
    todoDescription: string,
    completed: boolean,
    createdDate: Date
}

export interface TodoForm {
    todoName: FormControl<string>,
    todoDescription: FormControl<string>
}

export interface TodoPayload {
    todoName: string,
    todoDescription: string,
}

export interface TodoPatchPayload extends TodoPayload {
    completed: boolean
}