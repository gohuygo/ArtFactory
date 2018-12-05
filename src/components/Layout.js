import React, { Fragment } from 'react';
import Header from './Header';

export default(props) => {
  return(
    <Fragment>
      <Header builderContract={props.builderContract} accounts={props.accounts}/>

      {props.children}
    </Fragment>
  )
};
