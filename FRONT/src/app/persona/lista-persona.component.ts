import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../service/persona.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {

  personas: Persona[] = [];
  roles: string[];
  isAdmin = false;

  constructor(
    private personaService: PersonaService,
    private toastr: ToastrService
    
    ) { }

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personaService.lista().subscribe(
      data => {
        this.personas = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.personaService.delete(id).subscribe(
      data => {
        this.toastr.success('Persona Eliminada','OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarPersonas();
      },
      err => {
        this.toastr.error(err.error.mensaje,'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  } 

}
