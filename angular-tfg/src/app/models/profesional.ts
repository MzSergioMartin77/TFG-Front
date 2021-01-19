
export class Profesional {
    constructor(
        public _id: String,
        public nombre: String,
        public biografia: String,
        public imagen: String,
        public fecha_nacimiento: Date,
        public filmografia: [{
            titulo: String,
            rol: String,
            tipo: String,
            personaje: String,
        }]
    ) {}
}