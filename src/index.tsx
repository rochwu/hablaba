import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {store} from './state';

import {Loader} from './Loader';

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Loader />
  </Provider>,
  rootElement,
);
