import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  form=new FormGroup({
    email: new FormControl('',{
      validators:[Validators.email,Validators.required],
    }),
    password: new FormControl('',{
      validators:[Validators.required,Validators.minLength(6)],
    })
  });


  get emailIsInvalid(){
    return (
      this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
    )
  }

  get passwordIsInvalid(){
    return (
      this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
    )
  }
  onSubmit(){

  }
}
