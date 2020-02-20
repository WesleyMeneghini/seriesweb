const TOKEN_KEY = '@Series:token';

export const signIn = (usuario) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(usuario));
}
export const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isSignedIn = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return JSON.parse(token);
}

export const getToken = () => {
    const usuario = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return usuario.token;
}
