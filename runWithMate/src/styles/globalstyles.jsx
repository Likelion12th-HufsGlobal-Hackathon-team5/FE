import { css } from '@emotion/react';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /* body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
  } */

  a{
        text-decoration: none;
        color: inherit;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;
        overflow: hidden;
    }
    body{
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #FFFF;
        margin-bottom: 100px;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`;

export default globalStyles;