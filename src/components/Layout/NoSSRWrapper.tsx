import React from 'react';

import dynamic from 'next/dynamic';

class NoSSRWrapper extends React.Component<any, any> {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
