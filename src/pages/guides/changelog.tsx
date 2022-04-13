import {DOCS_PAGES_REPO_URL} from '../../../constants';
import LayoutDocs from 'components/Layout/LayoutDocs';

function ChangelogPage({data}: {data: string}) {
  return (
    <LayoutDocs title="Changelog" status="">
      <div>{data}</div>
    </LayoutDocs>
  );
}

export async function getServerSideProps() {
  const resp = await fetch(
    `${DOCS_PAGES_REPO_URL}/current/guides/changelog.md`
  ).then((resp) => (resp.ok ? resp.text() : 'Unable to retrieve changelog'));

  return {props: {data: resp}};
}

export default ChangelogPage;
