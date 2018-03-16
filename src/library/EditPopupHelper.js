import RealmHelper from './RealmHelper';

class EditPopupHelper {
    constructor (basePath, arrayKey, createParams = {}) {
        this.realm = new RealmHelper();

        this.basePath = basePath + '/';
        this.arrayKey = arrayKey;
        this.createParams = createParams;

        this.createItem = this.createItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    createItem (state, formData) {
        const that = this;
        let requestData = formData;
        for (let key in this.createParams) {
            requestData[key] = this.createParams[key];
        }
        return new Promise((resolve, reject) => {
            that.realm.post(that.basePath, requestData).then(result => {
                let newState = state;
                newState[that.arrayKey].push(result);
                resolve(newState);
            }).catch(err => {
                reject(err);
            });
        });
    }
    updateItem (state, id, formData) {
        const that = this;
        return new Promise((resolve, reject) => {
            this.realm.put(that.basePath + id, formData).then(result => {
                let newState = state;
                newState[that.arrayKey].forEach((item, x) => {
                    if (item.id === id) {
                        newState[that.arrayKey][x] = result;
                    }
                });
                resolve(newState);
            }).catch(err => {
                reject(err);
            });
        });
    }
    deleteItem (state, id) {
        const that = this;
        return new Promise((resolve, reject) => {
            if (window.confirm('Sure?')) {
                this.realm.Delete(that.basePath + id).then(() => {
                    let newState = state;
                    let deleteIndex = 0;
                    newState[that.arrayKey].forEach((item, x) => {
                        if (item.id === id) {
                            deleteIndex = x;
                        }
                    });
                    newState[that.arrayKey].splice(deleteIndex, 1);
                    resolve(newState);
                }).catch(err => {
                    reject(err);
                });
            }
        });
    }
}
export default EditPopupHelper;
