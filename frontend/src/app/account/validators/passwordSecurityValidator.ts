import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordSecurityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const errors: ValidationErrors = {};

    if (value.length < 8) {
      errors['passwordTooShort'] = true;
    }
    if (!/[A-Z]/.test(value)) {
      errors['passwordNoUpperCase'] = true;
    }
    if (!/[a-z]/.test(value)) {
      errors['passwordNoLowerCase'] = true;
    }
    if (!/[0-9]/.test(value)) {
      errors['passwordNoNumber'] = true;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors['passwordNoSpecialChar'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}
