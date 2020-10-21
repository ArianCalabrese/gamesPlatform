import React from 'react';
import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css";
import './Button.css';



const Button = props => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      // className={`btn ${props.estilo} btn-${props.size || 'default'}`}   
      className={`btn ${(props.estilo && 'btn-'+props.estilo) || (props.outline && 'btn-outline-'+props.outline) || ('btn-primary')} btn-${props.size || 'default'} ${props.block && 'btn-block'}`}
      // className={`btn btn-${props.estilo || 'primary'} 'btn-outline-'${props.outline || 'primary'} 'btn-'${props.size || 'default'}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
