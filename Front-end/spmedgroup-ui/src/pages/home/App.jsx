import logo from '../../assets/img/logo_spmedgroup_v1 1.png'
import '../../assets/styles/home.css'

function App() {
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
            <a href="">login</a>
          </nav>
        </div>
      </header>
      <main>
        <section className="banner">
          <div><h1>Onde sua saúde é prioridade!</h1>
            <p>Entre e tenha acesso às suas consultas de maneira rápida e prática.</p>
            <button>Entrar</button>
          </div>
        </section>
        <section className="acoes">
          <div className="grid container-acoes">
            <h2>o que deseja fazer?</h2>
            <div className="blocos">
              <a href="">
                <div className="box-acoes">
                  <div className="box">
                    <img src="../assets/img/science.svg" alt=""></img>
                  </div>
                  <span>Exames</span>
                </div>
              </a>
              <a href="">
                <div className="box-acoes">
                  <div className="box1">
                    <img src="../assets/img/search.svg" alt=""></img>
                  </div>
                  <span>Encontre um médico</span>
                </div>
              </a>
              <a href="">
                <div className="box-acoes">
                  <div className="box2">
                    <img src="../assets/img/search.svg" alt=""></img>
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
            <i class="fas fa-chevron-left"></i>
            <div>
              <h2>depoimentos</h2>
              <div class="box-depoimento">
                <div class="alinhamento">
                  <img src="../assets/img/john-doe.jpg" alt="Foto de perfil de usuário"></img>
                  <p>John Doe</p>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                  been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
            <i class="fas fa-chevron-right"></i>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
