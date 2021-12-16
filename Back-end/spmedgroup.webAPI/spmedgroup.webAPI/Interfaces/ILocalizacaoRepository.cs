using spmedgroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface responsável pelo LocalizacaoRepository
    /// </summary>
    interface ILocalizacaoRepository
    {
        /// <summary>
        /// Lista todas as localizações
        /// </summary>
        /// <returns>Uma lista de localizações</returns>
        List<Localizacao> ListarTodas();

        /// <summary>
        /// Cadastra novas localizacoes
        /// </summary>
        /// <param name="listaLocalizacoes"></param>
        void Cadastrar(Localizacao novaLocalizacao);
    }
}
