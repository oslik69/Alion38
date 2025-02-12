import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import CartStore from './CartStore';

// Создаем контекст для всего приложения
export const Context = createContext(null);

// Создаем экземпляры хранилищ
const userStore = new UserStore();
const deviceStore = new DeviceStore();
const cartStore = new CartStore();

// Подключаем все хранилища и передаем их в контекст
ReactDOM.render(
  <Context.Provider value={{ user: userStore, device: deviceStore, cartStore }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
