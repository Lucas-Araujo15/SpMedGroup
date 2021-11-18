export const usuarioAutenticado = () => localStorage.getItem('login-usuario-spmedgp') !== null;

export const parseJwt = () => {

    let base64 = localStorage.getItem('login-usuario-spmedgp').split('.')[1];

    return JSON.parse(window.atob(base64));
}