import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';

const VersionContext = React.createContext('latest');

const VersionProvider = ({children}: {children: any}) => {
  const {pathname} = useRouter();
  const [version, setVersion] = useState('latest');
  const match = pathname.match(/\/applications\/(v\d+|latest)\/(.+)/);

  useEffect(() => {
    if (match) {
      setVersion(match[1]);
    }
  }, [match]);

  return (
    <VersionContext.Provider value={version}>
      {children}
    </VersionContext.Provider>
  );
};

const VersionedPage = (props: any) => {
  const version = useContext(VersionContext);
  return (
    <div>
      <h1> {props.slug} </h1>
      <p>You are currently viewing version: {version}</p>
    </div>
  );
};

export {VersionProvider, VersionedPage, VersionContext};
