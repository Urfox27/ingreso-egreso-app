import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor( private fb: FormBuilder,
               private ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState>) { }

  ngOnInit(): void {

    // Loading
    this.uiSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );

    // Formulario de ingreso y egreso
    this.ingresoForm = this.fb.group({
      descripcion: ['',Validators.required ],
      monto: ['',Validators.required ],
    })
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  ingresoInsert() {

    if( this.ingresoForm.invalid ) { return; }

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso);
    this.ingresoForm.reset();
  }

}
