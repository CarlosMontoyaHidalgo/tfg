import { FormGroup } from "@angular/forms";

//Revisamos si el campo ha sido rellenado o no
export const isRequired = (field: 'email' | 'password', form: FormGroup) => {
  const control = form.get(field);
  return control && control.touched && control.hasError('required');
}

//Revisamos si el campo de email tiene un error
export const hasEmailError = (form: FormGroup) => {
  const control = form.get('email');
  return control && control.touched && control.hasError('email');
}

//TODO: Implementar la función hasPasswordError y tener limitaciones como podria ser que tenga al menos 5 caracteres y que tenga una mayuscula
