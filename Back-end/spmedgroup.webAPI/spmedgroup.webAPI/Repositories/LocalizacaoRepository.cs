using GoogleMaps.LocationServices;
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
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("spmedgroup");
            _localizacoes = database.GetCollection<Localizacao>("localidades");
        }

        public void Cadastrar(Localizacao localizacao)

        {
            //ConsultaRepository consultaRepository = new ConsultaRepository();
            //List<Consultum> listaConsultas = consultaRepository.ListarTodos();

            //foreach (Consultum item in listaConsultas)
            //{
            //    if (_localizacoes.Find(local => Convert.ToInt32(local.idConsulta) == item.IdConsulta).ToList().Count() <= 0)
            //    {

            //    }

            //    int idade = DateTime.Now.Year - Convert.ToDateTime(item.IdPacienteNavigation.DataNascPaciente).Year;
            //    if (DateTime.Now.DayOfYear < Convert.ToDateTime(item.IdPacienteNavigation.DataNascPaciente).DayOfYear)
            //    {
            //        idade = idade - 1;
            //    }

            //    var locationService = new GoogleLocationService();
            //    var point = locationService.GetLatLongFromAddress(item.IdPacienteNavigation.EndPaciente);

            //    Localizacao novaLocalizacao = new Localizacao()
            //    {
            //        IdadePaciente = Convert.ToString(idade),
            //        Descricao = item.ConsultaDesc,
            //        EspecialidadeMedico = item.IdMedicoNavigation.IdEspecialidadeNavigation.NomeEspecialidade,
            //        Latitude = Convert.ToString(point.Latitude),
            //        Longitude = Convert.ToString(point.Longitude)
            //    };



            //    localizacao novalocalizacao = new()
            //    {
            //        idadepaciente = "10",
            //        descricao = "testando",
            //        idconsulta = "5000",
            //        especialidademedico = "ortopedia",
            //        latitude = "-23.53642760296254",
            //        longitude = "-46.64621432441258"
            //    };

            _localizacoes.InsertOne(localizacao);
        }

        public List<Localizacao> ListarTodas()
        {
            return _localizacoes.Find(localizacao => true).ToList();
        }
    }
}
