/**
 * @file Demonstrates named styles resolution.
 * @see https://github.com/gajus/babel-plugin-react-css-modules#named-stylename-resolution
 */

import React from 'react';
import table from './table.css';

export default () => {
  return <div className={table.table}>
    <div className={table.row}>
      <div className={table.cell}>A1</div>
      <div className={table.cell}>B1</div>
      <div className={table.cell}>C1</div>
    </div>
  </div>;
};
