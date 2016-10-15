import React from 'react';

export default function Layout(props) {
  return (
    <div className="Layout">
      {/* Header goes here */}
      {props.children}
      {/* Footer goes here */}
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.node.isRequired,
};
