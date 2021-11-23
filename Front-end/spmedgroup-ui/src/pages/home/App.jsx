import logo from '../../assets/img/logo_spmedgroup_v1 1.png'
import '../../assets/styles/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import medicoSVG from '../../assets/img/search.svg'
import exameSVG from '../../assets/img/science.svg'
import prontoSocorroSVG from '../../assets/img/healing.svg'
import imagemLab from '../../assets/img/imagem-laboratorio.jpg'
import mapa from '../../assets/img/imagem-mapa.png'
import elipse from '../../assets/img/elipse.png'
import '../../assets/styles/global.css'
import { Link } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from '../../services/auth'
import { Component } from 'react'

//Ícones 
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'

import johnDoe from '../../assets/img/john-doe.jpg'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  Logout = () => {
    localStorage.removeItem('login-usuario-spmedgp')
    this.props.history.push('/')
  }

  Entrar = () => {
    if (usuarioAutenticado() === true) {
      if (parseJwt().role === '1') {
        this.props.history.push('/paineldecontrole')

      } else if (parseJwt().role === '2') {
        this.props.history.push('/minhasconsultas')
      } else if (parseJwt().role === '3') {
        this.props.history.push('/agendamentos')
      }
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div>
        <head>
          <script src="https://kit.fontawesome.com/39a47b8673.js" crossorigin="anonymous"></script>
        </head>
        <header>
          <div className="box-header grid">
            <img src={logo} alt="Logo do SP Medical Group" />
            <nav>
              <a href="">sobre</a>
              <a href="">especialidades</a>
              <a href="">fale conosco</a>
              <a href="">convênios</a>
              <button onClick={this.Logout} style={usuarioAutenticado() === true ? { display: 'block' } : { display: 'none' }}>logout</button>
              <Link style={usuarioAutenticado() === true ? { display: 'none' } : { display: 'flex' }} to="/login">login</Link>
            </nav>
          </div>
        </header>
        <main>
          <section className="banner">
            <div><h1 className="h1-home">Onde sua saúde é prioridade!</h1>
              <p>Entre e tenha acesso às suas consultas de maneira rápida e prática.</p>
              <button onClick={this.Entrar}>Entrar</button>
            </div>
          </section>
          <section className="acoes">
            <div className="grid container-acoes">
              <h2>o que deseja fazer?</h2>
              <div className="blocos">
                <a href="">
                  <div className="box-acoes">
                    <div className="box">
                      <img src={exameSVG} alt=""></img>
                    </div>
                    <span>Exames</span>
                  </div>
                </a>
                <a href="">
                  <div className="box-acoes">
                    <div className="box1">
                      <img src={medicoSVG} alt=""></img>
                    </div>
                    <span>Encontre um médico</span>
                  </div>
                </a>
                <a href="">
                  <div className="box-acoes">
                    <div className="box2">
                      <img src={prontoSocorroSVG} alt=""></img>
                    </div>
                    <span>Pronto socorro</span>
                  </div>
                </a>
              </div>
              <div className="box-consulta">
                <a href="">Nova consulta</a>
              </div>
            </div>
          </section>
          <section class="sobre">
            <div class="texto-sobre grid">
              <div>
                <h2>por quê escolher o sp medical group?</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                  the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                  type
                  and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                  the
                  leap into electronic</p>
              </div>
            </div>
          </section>
          <section class="depoimentos">
            <div class="grid dpoConteudo">
              <FontAwesomeIcon className="fas" icon={faChevronLeft} />
              <div>
                <h2>depoimentos</h2>
                <div class="box-depoimento">
                  <div class="alinhamento">
                    <img src={johnDoe} alt="Foto de perfil de usuário"></img>
                    <p>John Doe</p>
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book.
                  </p>
                </div>
              </div>
              <FontAwesomeIcon className="fas" icon={faChevronRight} />
            </div>
          </section>
          <section class="duvidas">
            <div class="grid box-perguntas">
              <h2>dúvidas frequentes</h2>
              <div class="pergunta">
                <div>
                  <h3>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </h3>
                  <FontAwesomeIcon className="fas" icon={faChevronCircleUp} />
                </div>
                <div>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                    galley
                    of type and scrambled it to make a type specimen book. It has survived not only five
                    centuries,
                    but also the leap into electronic</p>
                </div>
              </div>
              <div class="pergunta">
                <div>
                  <h3>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </h3>
                  <FontAwesomeIcon className="fas" icon={faChevronCircleDown} />
                </div>
              </div>
              <div class="pergunta">
                <div>
                  <h3>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </h3>
                  <FontAwesomeIcon className="fas" icon={faChevronCircleDown} />
                </div>
              </div>
              <div class="pergunta">
                <div>
                  <h3>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </h3>
                  <FontAwesomeIcon className="fas" icon={faChevronCircleDown} />
                </div>
              </div>
            </div>
          </section>
          <section class="extra">
            <div class="grid">
              <img src={imagemLab} alt="Imagem laboratório"></img>
              <div>
                <h2>Acesse conteúdos voltados a saúde:</h2>
                <p className="p-extra">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                  the
                  industry's standard dummy text ever since the 1500s.
                </p>
                <button>Acessar</button>
              </div>
            </div>
          </section>
          <section class="localizacao">
            <div>
              <img src={elipse} class="elipse" alt=""></img>
              <h2>unidades</h2>
              <div class="box-localizacao grid">
                <img src={mapa} alt=""></img>
                <div class="forms-localizacao">
                  <div>
                    <h3>Digite seu CEP:</h3>
                    <form action="">
                      <input type="text" placeholder="CEP..." />
                      <button>Procurar</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div class="grid rodape">
              <span>sp medical group - 2021</span>
            </div>
          </footer>
        </main>
      </div>
    );
  }

}





