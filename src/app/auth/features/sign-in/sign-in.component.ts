import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { isRequired, hasEmailError } from '../../utils/validators';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-in.component.html',
  styles: ``,
})



export default class SignInComponent {
  //private _formBuilder = inject(NonNullableFormBuilder);
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError(){
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control<string | null>('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control<string | null>('', Validators.required),
  });

  async submit() {
    //console.log(this.form.getRawValue());
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;
      await this._authService.signIn({ email, password });
      toast.success('Bienvenido de nuevo');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error al crear el usuario');
      console.error(error);
    }
  }

  async submitWithGoogle(){
    try {
      await this._authService.signInWithGoogle();
      toast.success('Usuario creado correctamente');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error al crear el usuario');
      console.error(error);
    }
  }
}