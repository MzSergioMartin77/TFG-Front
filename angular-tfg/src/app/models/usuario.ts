
export class Usuario {
    constructor(
        public _id: String,
        public id_model: Number,
        public nombre: String,
        public email: String,
        public pass: String,
        public descripcion: String,
        public nick: String,
        public imagen: String,
        public rol: String,
        public seguidores: [{
            nick: String,
            usuario: String
        }],
        public seguidos: [{
            nick: String,
            usuario: String
        }],
        public peliculas: [{
            pelicula: String,
            titulo: String,
            imagen: String,
            nota: Number,
            id_model: Number
        }],
        public series: [{
            serie: String,
            titulo: String,
            imagen: String,
            nota: Number,
            id_model: Number
        }]
    ) { }
}