import './App.css';
import logo from '../../../../spmedgroup-base/assets/img/logo_spmedgroup_v1 1.png'

function App() {
  return (
    <div className="App">
      <header>
        <div class="box-header grid">
          <img src={logo} alt="Logo do SP Medical Group"/>
            <nav>
              <a href="">sobre</a>
              <a href="">especialidades</a>
              <a href="">fale conosco</a>
              <a href="">convênios</a>
              <a href="">login</a>
            </nav>
        </div>
    </header>
    </div>
      );
}

export default App;
