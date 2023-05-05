import * as GuidePage from 'lib/GuidePage';
const guidePath = 'guides/open_edge';

export default GuidePage.default;
export const getStaticPaths = GuidePage.getStaticPaths(guidePath);
export const getStaticProps = GuidePage.getStaticProps(guidePath);
