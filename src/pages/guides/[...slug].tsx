import * as GuidePage from 'lib/GuidePage';
const guidePath = 'guides/applications';

export default GuidePage.default;
export const getStaticPaths = GuidePage.getStaticPaths(guidePath, true);
export const getStaticProps = GuidePage.getStaticProps(guidePath, true);
