import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef)
  constructor() {
    afterNextRender(() => {
      const savedForm= JSON.parse(localStorage.getItem('saved-login-form')!)
      //console.log(savedForm);
      const savedEmail= savedForm.email
      setTimeout(()=>{
        this.form().controls['emailInput'].setValue(savedEmail)
      },1)
      const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.emailInput }))
      })

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    })
  }
  onSubmit(form: NgForm) {
    if (form.form.invalid) {
      return;
    }
    const enteredEmail = form.form.value.emailInput;
    const enteredPassword = form.form.value.passwordInput;


    form.form.reset()

  }
}
