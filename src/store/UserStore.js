import { makeAutoObservable } from "mobx";

class UserStore {
    _user = {};
    _isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this._user = user;
    }

    setIsAuth(isAuth) {
        this._isAuth = isAuth;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get isAdmin() {
        return this._user.role === 'ADMIN';
    }
}

// Экспортируем сам класс, не инстанцированный
export default UserStore;
