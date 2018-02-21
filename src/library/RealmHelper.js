import axios from 'axios';

class RealmHelper {
    constructor (requestToken = false) {
        this.http = axios.create({
            baseURL: 'http://138.68.71.39:4000'
        });
        this.config = {
            headers: {
                'Accept': 'application/json'
            }
        };
        if (requestToken) {
            this.config.headers.Authorization = requestToken;
        }
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
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
                }).catch(function (error) {
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
                }).catch(function (error) {
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
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
}
export default RealmHelper;
