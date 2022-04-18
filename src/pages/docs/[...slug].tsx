import {GetServerSideProps, GetServerSidePropsContext} from 'next';
import {useState, useRef, MutableRefObject} from 'react';
import styled from 'styled-components';

import {DOCS_PAGES_DOMAIN} from '../../../constants';
import {markdownToHtml} from '../../../plugins/markdownToHtml';

import {Page} from 'components/Layout/Page';

interface DocsIFrame extends MutableRefObject<any> {
  current: null | HTMLIFrameElement;
}

function ApiPage({content}: {content: string}) {
  const [frameHeight, setFrameHeight] = useState('100%');
  const frameRef = useRef(null) as DocsIFrame;

  function onFrameLoad() {
    setFrameHeight(
      frameRef.current?.contentWindow?.document.body.scrollHeight + 'px'
    );
  }

  const frameProps = {
    src: `/api-docs/current/api/core/index.html`,
    style: {
      width: '100%',
      height: frameHeight,
      overflow: 'visible',
    },
    onLoad: onFrameLoad,
    ref: frameRef,
    width: '100%',
    height: frameHeight,
    scrolling: 'no',
    frameBorder: '0',
  };

  return (
    <Page>
      <iframe {...frameProps} />
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  console.log(params);
  return {props: {url: ''}};
};

export default ApiPage;
