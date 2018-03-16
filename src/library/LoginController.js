import axios from 'axios';
import AuthStore from './AuthStore';
import RealmHelper from './RealmHelper';

class LoginController {
    constructor (requestToken = false) {
        this.axios = axios.create({
            baseURL: 'http://138.68.71.39:2200'
        });
        this.config = {
            headers: {
                'Accept': 'application/json'
            }
        };
        this.realmHelper = new RealmHelper();
        this.authStore = new AuthStore();
    };
   requestGrant(mail, password) {
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
    requestToken(grant, accountId) {
        let that = this;
        this.axios.post('/access/grant', {
            grant: grant
        }, this.config)
            .then(function (response) {
                if (response.data) {
                    let accessToken = response.data.accessToken;
                    let refreshToken = response.data.refreshToken;
                    let expire = response.data.expire;
                    if (accessToken && refreshToken && expire) {
                        that.authStore.saveAuth(accountId, accessToken, refreshToken, expire);
                        window.location.reload();
                    } else {
                        console.error('MISSING TOKEN DATA');
                    }
                } else {
                    console.error('NO TOKEN DATA');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    refreshToken() {
        let refreshToken = this.authStore.refreshToken();
        if (refreshToken) {
            let that = this;
            this.axios.post('/access/refresh', {
                refreshToken: refreshToken
            }, this.config)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });  
        } else {
            console.error('NO REFRESH TOKEN');
        }
    }
}
export default LoginController