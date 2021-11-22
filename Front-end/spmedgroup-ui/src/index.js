import { parseJwt } from './services/auth';
import { usuarioAutenticado } from './services/auth';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home/App.jsx'
import Medico from './pages/medico/medico.jsx'
import Login from './pages/login/login.jsx'
import Paciente from './pages/paciente/paciente.jsx'
import adm from './pages/administrador/adm.jsx'
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';;


const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const PermissaoPac = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const PermissaoMed = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '3' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);



const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} /> {/* Home */}
        <Route path="/login" component={Login} />
        <PermissaoPac path="/minhasconsultas" component={Paciente} />
        <PermissaoMed path="/agendamentos" component={Medico} />
        <PermissaoAdm path="/paineldecontrole" component={adm} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
