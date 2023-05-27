import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"
import { email } from "../../regex-patterns";

export const emailValidator = () => {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;

        if(!value) return null;

        return !email.test(value) ? { emailPattern: true } : null;
    }
}

export const passwordValidator = () => {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;

        if(!value) return null;

        const isProperLength = value.length < 8;

        return isProperLength ? { passwordPattern: true } : null;
    }
}

export const confirmPasswordValidator = () => {
    return (control: AbstractControl): ValidationErrors | null => {
        const group = control as FormGroup;

        const password = group.controls["password"];
        const confirmPassword = group.controls["confirmPassword"];

        if(!control.value) return null;
        
        const isConfirmMatch = password.value === confirmPassword.value;

        if(!isConfirmMatch) confirmPassword.setErrors({confirmPassword: true});

        return null;
    }
}