import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';

import App from './App';


const container = document.getElementById('root') as Element;
const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <StyleSheetManager disableVendorPrefixes>
            <App />
        </StyleSheetManager>
    </React.StrictMode>
);