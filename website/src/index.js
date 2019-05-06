import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "C:/Users/Floris/Projects/GitHub_Website/flipthedog.github.io/website/node_modules/bootstrap/dist/css/bootstrap.css";
import Counter from './components/counter';

ReactDOM.render(<Counter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
