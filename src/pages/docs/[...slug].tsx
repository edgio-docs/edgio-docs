import {useRouter} from 'next/router';
import {useState, useRef, MutableRefObject} from 'react';

import useVersioning, {VERSION_REGEX} from '../../components/versioning';

import {Page} from 'components/Layout/Page';

interface DocsIFrame extends MutableRefObject<any> {
  current: null | HTMLIFrameElement;
}

let frameWin: any;
let prevHash: string;

export default function ApiDocsPage() {
  const [frameHeight, setFrameHeight] = useState('100%');
  const frameRef = useRef(null) as DocsIFrame;
  const router = useRouter();
  const {currentVersion} = useVersioning();

  function onFrameLoad() {
    frameWin = frameRef.current?.contentWindow;

    if (frameWin) {
      setFrameHeight(frameWin.document.body.scrollHeight + 'px');
      router.push({
        hash: frameWin.location.pathname,
      });
    }
  }

  // build the frameSrc based on the route params (if available)
  if (!router.isReady || !router.query.slug?.length) {
    return;
  }

  let {slug} = router.query;
  if (Array.isArray(slug)) {
    slug = slug.join('/');
  }

  // Initial src to load if no hash is available. Hash is pushed
  // to the router once the frame has loaded so it can be used
  // as a reference for what to load if coming in with that as
  // part of the URL
  let frameSrc = `/api-docs/${currentVersion}/${slug.replace(
    VERSION_REGEX,
    ''
  )}/index.html`;

  // TODO if coming in with a hash, the frame should load that,
  // but not if the version was changed from the dropdown
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.slice(1);

    if (hash.length && hash !== frameSrc) {
      frameSrc = hash;
    }
  }

  return (
    <Page>
      <iframe
        src={frameSrc}
        onLoad={onFrameLoad}
        ref={frameRef}
        width="100%"
        height={frameHeight}
        scrolling="no"
        frameBorder={0}
        style={{
          width: '100%',
          height: frameHeight,
          overflow: 'visible',
        }}
      />
    </Page>
  );
}
