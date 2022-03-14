import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { LoggingService } from './LoggingService.service';
import { Persona } from './persona.model';

@Injectable()
export class PersonasService {
  /*personas: Persona[] = [
    new Persona('Juan', 'Perez'),
    new Persona('Laura', 'Juarez'),
  ];*/

  personas: Persona[] = [];
  saludar = new EventEmitter<number>();

  constructor(
    private loggingService: LoggingService,
    private dataService: DataService
  ) {}

  /*agregarPersona(persona: Persona) {
    this.loggingService.enviaMensajeAConsola(
      'agregamos persona:' + persona.nombre
    );
    if (this.personas == null) {
      this.personas = [];
    }
    this.personas.push(persona);
  }*/

  encontrarPersona(index: number) {
    let persona: Persona = this.personas[index];
    return persona;
  }

  /*modificarPersona(index: number, persona: Persona) {
    let persona1 = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
  }

  eliminarPersona(index: number) {
    this.personas.splice(index, 1);
  }*/

  //peticiones a Firebase
  agregarPersona(persona: Persona) {
    this.loggingService.enviaMensajeAConsola(
      'agregamos persona:' + persona.nombre
    );
    if (this.personas == null) {
      this.personas = [];
    }
    this.personas.push(persona);
    //guardamos en la db de firebase
    this.dataService.guardarPersonas(this.personas);
  }

  modificarPersona(index: number, persona: Persona) {
    let persona1 = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
    //modificar een fireebase
    this.dataService.modificarPersona(index, persona);
  }

  eliminarPersona(index: number) {
    this.personas.splice(index, 1);
    //eliminar registro de la db firebase
    this.dataService.eliminarPersona(index);
    this.modificarPersonas();
  }

  modificarPersonas() {
    if (this.personas != null) {
      this.dataService.guardarPersonas(this.personas);
    }
  }

  //obtener personas de db fireebase
  obtenerPersonas(): Observable<any> {
    return this.dataService.cargarPersonas();
  }
  
  //actualizar el arreeglo un vez se recupere d la db fireebase
  setPersonas(personas: Persona[]) {
    this.personas = personas;
  }
}
