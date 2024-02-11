import { jwtDecode } from 'jwt-decode';

class AuthService {
  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
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
    return !!token && !this.isTokenExpired(token);
  }

  login(idToken: any) {
    localStorage.setItme('id_token', idToken)
    window.location.assign('/')
  }

  logout() {
    localStorage.removeItem('id_token')
    window.location.reload()
  }

  isTokenExpired(token: string) {
    const decoded: any = jwtDecode(token);
    if (decoded.exp === undefined) return false;
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);
    return expirationDate.valueOf() < new Date().valueOf();
  }
}

export const authInstance = new AuthService();