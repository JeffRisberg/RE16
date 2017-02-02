/**
 * @file Demonstrates using composed styles.
 * @see https://github.com/gajus/babel-plugin-react-css-modules#runtime-stylename-resolution
 */

import React from 'react';
import table from './table.css';

export default () => {
  return <div className={table.table}>
    <div className={table.row}>
      <div className={table.bold_cell}>A2</div>
      <div className={table.italic_cell}>B2</div>
      <div className={table.underline_cell}>C2</div>
    </div>
  </div>;
};
