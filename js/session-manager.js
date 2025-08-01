class SessionManager {
  static getToken() {
    return localStorage.getItem('authToken');
  }

  static setToken(token) {
    localStorage.setItem('authToken', token);
  }

  static clear() {
    localStorage.removeItem('authToken');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }
}