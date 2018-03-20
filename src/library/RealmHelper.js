import axios from 'axios';
import AuthStore from './AuthStore';
import LoginController from './LoginController';

class RealmHelper {
    constructor (requestToken = false) {
        this.http = axios.create({
            baseURL: 'http://138.68.71.39:' + process.env.ADMIN_API_PORT
        });

        this.config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        this.authStore = new AuthStore();
        this.loginController = new LoginController();
        this.checkToken = this.checkToken.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.checkToken();
    }
    checkToken () {
        if (this.authStore.authAvailable()) {
            if (this.authStore.isExpired()) {
                this.loginController.refreshToken();
            } else {
                let token = this.authStore.accessToken();
                if (token) {
                    this.config.headers['Access-Token'] = token;
                } else {
                    console.error("NO TOKEN IN AUTH DATA");
                }
            }
        }
    }
    encode (str) {
        try {
            let obj = JSON.parse(str);
            return obj;
        } catch (err) {
            return str;
        }
    }

    get (path, params) {
        const that = this;
        return new Promise((resolve, reject) => {
            let getCfg = that.config;
            getCfg.params = params;
            that.http.get(path, getCfg)
                .then(function (response) {
                    let result = that.encode(response);
                    if (result.status === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    post (path, params = {}) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.http.post(path, params, that.config)
                .then(function (response) {
                    let result = that.encode(response);
                    if (result.status === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                }).catch(error => {
                    alert('Error: ' + error.response.data.error.msg);
                    reject(error);
                });
        });
    }

    put (path, params = {}) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.http.put(path, params, that.config)
                .then(function (response) {
                    let result = that.encode(response);
                    if (result.status === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                }).catch(error => {
                    alert('Error: ' + error.response.data.error.msg);
                    reject(error);
                });
        });
    }

    Delete (path) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.http.delete(path, that.config)
                .then(function (response) {
                    let result = that.encode(response);
                    if (result.status === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                }).catch(error => {
                    alert('Error: ' + error.response.data.error.msg);
                    reject(error);
                });
        });
    }
}
export default RealmHelper;
