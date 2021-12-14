using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace spmedgroup.webAPI.Domains
{
    public class Localizacao
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRequired]
        public string Latitude { get; set; }

        [BsonRequired]
        public string Longitude { get; set; }

        public string Descricao { get; set; }

        public string IdadePaciente { get; set; }

        public string EspecialidadeMedico { get; set; }

    }
}
