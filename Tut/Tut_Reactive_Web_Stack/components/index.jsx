import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../stores/todos.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app.jsx';

// Setup our socket events to dispatch
import TodoSocketListeners from '../socket-listeners/todos.js';
TodoSocketListeners(store);

// Needed for Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Render our react app!
ReactDOM.render(
	<Provider store={store} >
		<MuiThemeProvider >
			<App/>
		</MuiThemeProvider >
	</Provider>
, document.getElementById('main'));
