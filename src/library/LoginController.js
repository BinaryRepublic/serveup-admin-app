import axios from 'axios';
import AuthStore from './AuthStore';

class LoginController {
    constructor (requestToken = false, realmHelper) {
        this.axios = axios.create({
            baseURL: 'http://138.68.71.39:' + process.env.AUTH_API_PORT
        });
        this.config = {
            headers: {
                'Accept': 'application/json'
            }
        };
        this.realmHelper = realmHelper;
        this.authStore = new AuthStore();
    };
    requestGrant (mail, password) {
        let that = this;
        this.realmHelper.post('login', {mail: mail, password: password})
            .catch(function (error) {
                console.error(error);
            })
            .then(data => {
                if (data && data.grant && data.accountId) {
                    that.requestToken(data.grant, data.accountId);
                }
            });
    };
    requestToken (grant, accountId) {
        let that = this;
        this.axios.post('/access/grant', {
            grant: grant
        }, this.config)
            .then(function (response) {
                that.handleTokenResponse(response, accountId);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    refreshToken () {
        let refreshToken = this.authStore.refreshToken();
        if (refreshToken) {
            let that = this;
            this.axios.post('/access/refresh', {
                refreshToken: refreshToken
            }, this.config)
                .then(function (response) {
                    if (response) {
                        let accountId = that.authStore.accountId;
                        that.handleTokenResponse(response, accountId);
                    } else {
                        console.error('NO RESPONSE');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.error('NO REFRESH TOKEN');
        }
    }
    handleTokenResponse (response, accountId) {
        if (response.data) {
            let accessToken = response.data.accessToken;
            let refreshToken = response.data.refreshToken;
            let expire = response.data.expire;
            if (accessToken && refreshToken && expire) {
                this.authStore.saveAuth(accountId, accessToken, refreshToken, expire);
                console.log('UPDATED AUTH DATA');
                window.location.reload();
            } else {
                console.error('MISSING TOKEN DATA');
            }
        } else {
            console.error('NO TOKEN DATA');
        }
    }
}
export default LoginController;
