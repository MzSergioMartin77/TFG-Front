export class Serie {
    constructor(
        public _id: String,
        public titulo: String,
        public sinopsis: String,
        public nota_media: Number,
        public generos: [String],
        public imagen: String,
        public temporadas: Number,
        public capitulos: Number,
        public inicio: Number,
        public final: Number,
        public actores: [{
            nombre: String,
            personaje: String
        }],
        public creadores: [String],
        public criticas: [{
            nota: Number,
            titulo: String,
            texto: String,
            fecha: Date,
            usuario: String
        }],
        public comentarios: [{
            texto: String,
            fecha: Date,
            usuario: String,
            respuesta:[String]
        }]
    ){}
}