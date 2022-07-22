import {PRODUCT_NAME} from '../../../constants';

import ButtonLink from './ButtonLink';
import ButtonLinksGroup from './ButtonLinksGroup';

export default function ExampleButtons({
  title,
  siteUrl,
  repoUrl,
  deployFromRepo = false,
}: {
  title: string;
  siteUrl: string;
  repoUrl: string;
  deployFromRepo: boolean;
}) {
  return (
    <ButtonLinksGroup>
      {siteUrl && (
        <ButtonLink
          variant="fill"
          type="default"
          withIcon={false}
          href={siteUrl}>
          Try the {title} Example Site
        </ButtonLink>
      )}
      {repoUrl && (
        <ButtonLink variant="stroke" type="code" withIcon={true} href={repoUrl}>
          View the Code
        </ButtonLink>
      )}
      {deployFromRepo && repoUrl && (
        <a
          href={`https://app.layer0.co/deploy?button&deploy&repo=${encodeURIComponent(
            repoUrl
          )}`}>
          <img style={{ marginBottom: "0px", height: "38px" }} src="/button.svg" />
        </a>
      )}
    </ButtonLinksGroup>
  );
}
