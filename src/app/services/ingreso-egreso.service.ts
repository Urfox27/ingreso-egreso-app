import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as ui from '../shared/ui.actions';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService,
               private store: Store<AppState> ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    this.store.dispatch(ui.isLoading());
    this.firestore.doc(`${this.authService.user.user_id}/ingreso-egresos`).collection('items')
        .add({ ...ingresoEgreso })
        .then( resp => {
          Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
          this.store.dispatch(ui.stopLoading());
        })
        .catch( error => {
          Swal.fire('Error al registrar el ' + ingresoEgreso.tipo, error.message, 'error');
          this.store.dispatch(ui.stopLoading());
        });
  }
}
