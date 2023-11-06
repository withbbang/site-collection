import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'App';
import store from 'middlewares/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';

const rootNode: HTMLElement | null = document.getElementById('root');

ReactDOM.createRoot(rootNode!).render(
  <Provider store={store}>
    <PersistGate persistor={persistStore(store)}>
      <Loader />
      <ConfirmPopup />
      <ErrorPopup />
      <App />
    </PersistGate>
  </Provider>,
);
