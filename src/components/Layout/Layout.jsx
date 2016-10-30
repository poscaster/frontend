import React from 'react';
import LeftMenu from '../LeftMenu/LeftMenu';
import './Layout.sass';

export default function Layout(props) {
  return (
    <div className="Layout">
      <LeftMenu />
      {/* Header goes here */}
      <div className="Layout__Main">
        {props.children}
      </div>
      {/* Footer goes here */}
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.node.isRequired,
};
