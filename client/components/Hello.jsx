import React from 'react';

import PropsTypes from 'prop-types';

const Hello = props => {
  const { name } = props;

  if (name) {
    return <h1>Hello, {props.name}!</h1>;
  }
  return <span>Hey, stranger</span>;
};

Hello.propTypes = {
  name: PropsTypes.string.isRequired
};

export default Hello;
