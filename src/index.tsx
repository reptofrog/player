import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { StyleSheetManager } from 'styled-components';

import App from './app';


const container = document.getElementById('root') as Element;
const root = ReactDOM.createRoot(container);

root.render(
    <StrictMode>
        <StyleSheetManager disableVendorPrefixes>
            <App />
        </StyleSheetManager>
    </StrictMode>
);