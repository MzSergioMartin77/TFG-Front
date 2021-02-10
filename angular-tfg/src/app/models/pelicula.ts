
export class Pelicula {
    constructor(
        public _id: String,
        public titulo: String,
        public sinopsis: String,
        public nota_media: Number,
        public generos: [String],
        public imagen: String,
        public trailer: String,
        public duracion: Number,
        public fecha_estreno: Date,
        public actores: [{
            nombre: String,
            personaje: String
        }],
        public directores: [String],
        public criticas: [{
            nota: Number,
            titulo: String,
            nick: String,
            texto: String,
            fecha: Date,
            usuario: String
        }],
        public comentarios: [{
            nick: String,
            texto: String,
            fecha: Date,
            usuario: String,
            respuesta:[String]
        }]
    ){}
}