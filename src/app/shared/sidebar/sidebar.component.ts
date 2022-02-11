import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  nombreUser: string = '';

  constructor( private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter( ({user}) => user != null )
      )
      .subscribe( ({user}) => this.nombreUser = user!.nombre  );
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout() {

    // SweetAlert
    Swal.fire({
      title: 'Cerrando sesión',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.authService.logout().then( () => {
      Swal.close();
      this.router.navigate(['/login']);
    });
  }

}
