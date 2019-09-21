import React from 'react';

class Header extends React.Component {
  render() {
    return(
      <div class="header">{this.props.content}</div>
    )
  }
}

export default Header;
