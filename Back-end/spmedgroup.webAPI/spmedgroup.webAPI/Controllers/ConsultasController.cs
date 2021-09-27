using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using spmedgroup.webAPI.Interfaces;
using spmedgroup.webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository consultaRepository { get; set; }

        public ConsultasController()
        {
            consultaRepository = new ConsultaRepository();
        }

        [Authorize]
        [HttpGet("minhas")]
        public IActionResult ListarMinhas()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(o => o.Type == JwtRegisteredClaimNames.Jti).Value);
                return Ok(consultaRepository.ListarMinhas(idUsuario));
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "O usuário precisa estar logado para ver suas consultas.",
                    error
                });
            }
        }
    }
}
