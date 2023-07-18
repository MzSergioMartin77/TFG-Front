export class Serie {
    constructor(
        public _id: String,
        public id_model: Number,
        public titulo: String,
        public titulo_original: String,
        public sinopsis: String,
        public nota_media: Number,
        public generos: [String],
        public imagen: String,
        public temporadas: Number,
        public capitulos: Number,
        public inicio: Date,
        public final: Date,
        public trailer_es: String,
        public trailer_en: String,
        public actores: [{
            nombre: String,
            personaje: String
        }],
        public creadores: [String],
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
            editado: Boolean,
            usuario: String,
        }]
    ){}
}