import auth0 from 'auth0-js';

const config = {
  "AUTH0_DOMAIN": "occmee.auth0.com",
  "AUTH0_CLIENT_ID": "9OMukelkvMn00520OSd42KAMJRbhe40O",
}

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: config.AUTH0_DOMAIN,
      clientID: config.AUTH0_CLIENT_ID,
      redirectUri: 'http://localhost:3000/callback',
      audience: `https://${config.AUTH0_DOMAIN}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid email'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.authFlag = 'isLoggedIn';
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  logout() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: config.AUTH0_CLIENT_ID,
    });
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem(this.authFlag));
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: process.env.AUTH0_CLIENT_ID,
    });
  }

  silentAuth() {
    if (this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

}

const auth = new Auth();

export default auth;