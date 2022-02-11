import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubs!: Subscription;

  constructor( private store: Store<AppStateWithIngreso>,
               private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos').subscribe( ({ items }) => this.ingresosEgresos = items );
  }

  ngOnDestroy() {
    this.ingresosEgresosSubs.unsubscribe();
  }

  borrar( uid: string, descripcion: string ) {
    this.ingresoEgresoService.borrarIngresoEgreso( uid )
      .then( () => Swal.fire('Borrado', descripcion, 'success'))
      .catch( error => Swal.fire('Error', error.message, 'error'));
  }

}
