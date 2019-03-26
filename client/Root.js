import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import { PersistGate } from 'redux-persist/integration/react';
import Routes from './Routes';

const propTypes = {
  store: PropTypes.shape({}),
  persistor: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

const defaultProps = {
  store: null,
  persistor: {},
  history: null,
};

const Root = ({ store, persistor, history }) => (
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <Router history={history}>
        <div>
            Routes
        </div>    
      </Router>
    </PersistGate>
  </Provider>
);

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
