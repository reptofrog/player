import { createGlobalStyle } from 'styled-components';

import Helios from '../public/fonts/Helios.woff';
import HeliosBold from '../public/fonts/Helios-Bold.woff';
import HeliosExt from '../public/fonts/Helios-Ext.woff';
import HeliosExtBold from '../public/fonts/Helios-Ext-Bold.woff';
import EuropeExtBold from '../public/fonts/Europe-Ext-Bold.woff';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "Helios";
        src: url('${Helios}') format('woff');
    }
    @font-face {
        font-family: "Helios-Bold";
        src: url('${HeliosBold}') format('woff');
    }
    @font-face {
        font-family: "Helios-Ext";
        src: url('${HeliosExt}') format('woff');
    }
    @font-face {
        font-family: "Helios-Ext-Bold";
        src: url('${HeliosExtBold}') format('woff');
    }
    @font-face {
        font-family: "Europ-Ext-Bold";
        src: url('${EuropeExtBold}') format('woff');
    }

    html {
        accent-color: red;
        box-sizing: border-box;
        font-family: 'Helios';
        font-size: 10px;
    }

    *, *:before, *:after {
        /* www.css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
        box-sizing: inherit;
    }

    body {
        align-items: center;
        background: #6A6A6A;
        display: flex;
        height: 100vh;
        justify-content: center;
        margin: 0;
    }
`;

export default GlobalStyle;