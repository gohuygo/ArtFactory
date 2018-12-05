import React, { Fragment } from 'react';
import Header from './Header';

export default(props) => {
  return(
    <Fragment>
      <Header builderContract={props.builderContract}/>

      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>

      {props.children}
    </Fragment>
  )
};
