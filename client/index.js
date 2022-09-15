import React from 'react';
import {createRoot} from "react-dom";
import App from './components/App';

const container = document.getElementById('root');

// Create a root.
const root = createRoot(container);

// Initial render
root.render(<App/>);