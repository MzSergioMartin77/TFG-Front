
export class Pelicula {
    constructor(
        public _id: String,
        public id_model: Number,
        public titulo: String,
        public titulo_original: String,
        public sinopsis: String,
        public nota_media: Number,
        public generos: [String],
        public imagen: String,
        public trailer_es: String,
        public trailer_en: String,
        public duracion: Number,
        public fecha_estreno: Date,
        public actores: [{
            nombre: String,
            personaje: String
        }],
        public directores: [String],
        public plataformas: [{
            nombre: String,
            icono: String
        }],
        public criticas: [{
            nota: Number,
            titulo: String,
            nick: String,
            texto: String,
            fecha: Date,
            usuario_model: Number,
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