using spmedgroup.webAPI.Domains;
using spmedgroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        public void Aprovacao(int idConsulta, string status)
        {
            throw new NotImplementedException();
        }

        public void Atualizar(int idConsulta, Consultum novaConsulta)
        {
            throw new NotImplementedException();
        }

        public Consultum BuscarPorId(int idConsulta)
        {
            throw new NotImplementedException();
        }

        public void Cadastrar(Consultum consulta)
        {
            throw new NotImplementedException();
        }

        public void Deletar(int idConsulta)
        {
            throw new NotImplementedException();
        }

        public List<Consultum> ListarMinhas(int id)
        {
            throw new NotImplementedException();
        }

        public List<Consultum> ListarTodos()
        {
            throw new NotImplementedException();
        }
    }
}
