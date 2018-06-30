import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store/configureStore";
import registerServiceWorker from "./registerServiceWorker";
import AppRouter from "./routers/AppRouter";

const store = configureStore().store;
const persistor = configureStore().persistor;

const jsx = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
//object-hash
ReactDOM.render(jsx, document.getElementById("root"));
registerServiceWorker();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import AppRouter, { history } from './routers/AppRouter';
// import configureStore from './store/configureStore';
// import { startSetExpenses } from './actions/expenses';
// import { login, logout } from './actions/auth';
// import 'normalize.css/normalize.css'
// import './styles/styles.scss';
// import 'react-dates/lib/css/_datepicker.css';
// import { firebase } from './firebase/firebase';
// import LoadingPage from './components/LoadingPage';

// const store = configureStore();

// const jsx = (
//     <Provider store={store}>
//         <AppRouter />
//     </Provider>
// );

// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     ReactDOM.render(jsx, document.getElementById('app'));
//     hasRendered = true;
//   }
// };
