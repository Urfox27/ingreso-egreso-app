import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  createUser() {

    if( this.registerForm.invalid ) { return; }

    this.store.dispatch(ui.isLoading());

    // SweetAlert
    // Swal.fire({
    //   title: 'Espere por favor!',
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const { nombre, email, password } = this.registerForm.value;
    this.authService.createUser( nombre, email, password )
      .then( credenciales => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch( error => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      });
  }

}
