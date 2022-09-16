import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import {createRoot} from "react-dom/client";
import App from './components/App';

const container = document.getElementById('root');

// Create a root.
const root = createRoot(container);

// Initial render
root.render(<Router><App/></Router>);