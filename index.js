import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import the Provider component
import store from './redux/store'; // Import the Redux store
import App from './App'; // Import your main App component

ReactDOM.render(
    <Provider store={store}> {/* Wrap your app with the Provider */}
        <App />
    </Provider>,
    document.getElementById('root')
);
