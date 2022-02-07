import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
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
