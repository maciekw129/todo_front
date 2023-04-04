export interface InitialState {
    status: 'initial',
}

export interface PendingState {
    status: 'pending',
}

export interface SuccessState {
    status: 'success',
    successMessage?: string
}

export interface RejectedState {
    status: 'rejected',
    rejectedMessage?: string
}

export type LoaderState = InitialState | PendingState | SuccessState | RejectedState;

export type Status = 'initial' | 'pending' | 'success' | 'rejected';