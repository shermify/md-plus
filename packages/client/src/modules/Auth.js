class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token, id, role) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
  /**
   * Check if a user is authenticated and in a role
   * @param {array} roles
   * @returns {boolean}
   */
  static isUserInRole(roles) {
    return roles.includes(localStorage.getItem('role'));
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Get users role.
   *
   * @returns {string}
   */

  static getRole() {
    return localStorage.getItem('role');
  }

  /**
   * Get users id.
   *
   * @returns {string}
   */

  static getId() {
    return localStorage.getItem('id');
  }


}

export default Auth;
