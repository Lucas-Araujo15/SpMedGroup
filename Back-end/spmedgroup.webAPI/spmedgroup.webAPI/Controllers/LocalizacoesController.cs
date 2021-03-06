using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using spmedgroup.webAPI.Domains;
using spmedgroup.webAPI.Interfaces;
using spmedgroup.webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Controllers
{
    [Produces("application/json")]
    [Authorize(Roles = "1")]
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

        [HttpPost]
        public IActionResult Cadastrar(Localizacao novaLocalizacao)
        {
            try
            {
                localizacaoRepository.Cadastrar(novaLocalizacao);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }
    }
}
