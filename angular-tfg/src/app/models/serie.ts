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
        public inicio: Date,
        public final: Date,
        public actores: [{
            nombre: String,
            personaje: String
        }],
        public creadores: [String],
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