
export class Usuario {
    constructor(
        public _id: String,
        public nombre: String,
        public email: String,
        public pass: String,
        public descripcion: String,
        public nick: String,
        public imagen: String,
        //public token: String,
        public seguidores: [{
            nick: String,
            usuario: String
        }],
        seguidos: [{
            nick: String,
            usuario: String
        }],
        peliculas: [{
            pelicula: String,
            titulo: String,
            imagen: String,
            nota: Number
        }],
        series: [{
            serie: String,
            titulo: String,
            imagen: String,
            nota: Number
        }]
    ) { }
}