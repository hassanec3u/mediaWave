import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordSecurityValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  const errors: ValidationErrors = {};

  if (password.value !== passwordConfirm.value) {
    errors['passwordMismatch'] = true;
  }

  if (password.value.length < 8) {
    errors['passwordTooShort'] = true;
  }

  if (!/[A-Z]/.test(password.value)) {
    errors['passwordNoUpperCase'] = true;
  }

  if (!/[a-z]/.test(password.value)) {
    errors['passwordNoLowerCase'] = true;
  }

  if (!/[0-9]/.test(password.value)) {
    errors['passwordNoNumber'] = true;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
    errors['passwordNoSpecialChar'] = true;
  }

  return Object.keys(errors).length ? errors : null;
};
