import { jwtDecode } from 'jwt-decode';

class AuthService {
  getToken() {
    return localStorage.getItem('id_token');
  }

  setToken(token: any) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  login(idToken: any) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }

  isTokenExpired(token: any) {
    const decoded = jwtDecode(token);
    if (decoded.exp) {
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('id_token');
        return true;
      }
      return false;
    }
  }
}

export const authInstance = new AuthService();