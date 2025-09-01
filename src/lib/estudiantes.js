// Gestión de estudiantes
import { readFileSync, writeFileSync } from 'fs';

const DATA_FILE = './data/alumnos.json';

class Estudiantes {
  constructor() {
    this.estudiantes = [];
  }
  
  cargarEstudiantesDesdeJson() {
    try {
        const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
        this.estudiantes = data.alumnos || [];
    } catch (e) {
        console.error("Error al leer el archivo de datos:", e);
    }
  }

  guardarEstudiantes() {
    try {
      writeFileSync(DATA_FILE, JSON.stringify({ alumnos: this.estudiantes }, null, 2));
      this.cargarEstudiantesDesdeJson();
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }

  agregarEstudiante(nombre, apellido, curso) {
    const nuevoEstudiante = { nombre, apellido, curso };
    this.estudiantes.push(nuevoEstudiante);
    this.guardarEstudiantes();
    return nuevoEstudiante;
  }

  buscarEstudiantePorNombre(nombre) {
    const nombreLower = nombre.toLowerCase();
    return this.estudiantes.filter(
      (est) => est.nombre.toLowerCase() === nombreLower
    );
  }

  buscarEstudiantePorApellido(apellido) {
    const apellidoLower = apellido.toLowerCase();
    return this.estudiantes.filter(
      (est) => est.apellido.toLowerCase() === apellidoLower
    );
  }

  listarEstudiantes() {
    return this.estudiantes;
  }
}

export { Estudiantes }
