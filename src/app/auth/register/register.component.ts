import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required],
    });
  }

  createUser() {

    if( this.registerForm.invalid ) { return; }

    const { nombre, email, password } = this.registerForm.value;
    this.authService.createUser( nombre, email, password )
      .then( credenciales => {
        console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch( error => console.error(error) );
  }

}
