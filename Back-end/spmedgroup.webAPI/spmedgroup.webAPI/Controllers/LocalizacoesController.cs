using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using spmedgroup.webAPI.Interfaces;
using spmedgroup.webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]
    [ApiController]
    public class LocalizacoesController : ControllerBase
    {
        private  ILocalizacaoRepository localizacaoRepository { get; set; }

        public LocalizacoesController()
        {
            localizacaoRepository = new LocalizacaoRepository();
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            try
            {
                return Ok(localizacaoRepository.ListarTodas());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            
        }
    }
}
