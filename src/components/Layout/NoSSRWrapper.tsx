import dynamic from 'next/dynamic';
import React from 'react';

class NoSSRWrapper extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
