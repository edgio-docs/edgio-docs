import ButtonLink from './ButtonLink';
import ButtonLinksGroup from './ButtonLinksGroup';

import {IconDeploy} from 'components/Icon';

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
        <ButtonLink
          variant="stroke"
          type="deploy"
          withIcon={true}
          href={`https://app.layer0.co/deploy?button&deploy&repo=${encodeURIComponent(
            repoUrl
          )}`}></ButtonLink>
      )}
    </ButtonLinksGroup>
  );
}
