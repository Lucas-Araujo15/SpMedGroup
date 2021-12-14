using MongoDB.Driver;
using spmedgroup.webAPI.Domains;
using spmedgroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Repositories
{
    public class LocalizacaoRepository : ILocalizacaoRepository
    {
        private readonly IMongoCollection<Localizacao> _localizacoes;

        public LocalizacaoRepository()
        {
            var client = new MongoClient("mongodb://127.0.0.1:27017");
            var database = client.GetDatabase("spmedgroup");
            _localizacoes = database.GetCollection<Localizacao>("localidades");
        }

        public void Cadastrar(Localizacao novaLocalizacao)
        {
            _localizacoes.InsertOne(novaLocalizacao);
        }

        public List<Localizacao> ListarTodas()
        {
            return _localizacoes.Find(localizacao => true).ToList();
        }
    }
}
