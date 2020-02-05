import React from 'react';

class BoldHeader extends React.Component {
  render() {
    return(
      <div className="header bold">{this.props.content}</div>
    )
  }
}

export default BoldHeader;
