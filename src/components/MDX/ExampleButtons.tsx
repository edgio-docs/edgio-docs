import ButtonLink from './ButtonLink';
import ButtonLinksGroup from './ButtonLinksGroup';

import {IconDeploy} from 'components/Icon';
import useConditioning from 'utils/hooks/useConditioning';

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
  const {version} = useConditioning();
  return (
    <ButtonLinksGroup>
      {siteUrl && (
        <ButtonLink
          variant="fill"
          type="default"
          withIcon={false}
          href={siteUrl}>
          Try the {title} Site Example
        </ButtonLink>
      )}
      {repoUrl && (
        <ButtonLink variant="stroke" type="code" withIcon={true} href={repoUrl}>
          View the Code
        </ButtonLink>
      )}
      {deployFromRepo && repoUrl && Number(version.selectedVersion) < 7 && (
        <ButtonLink
          variant="stroke"
          type="deploy"
          withIcon={true}
          href={`https://app.layer0.co/deploy?button&deploy&repo=${encodeURIComponent(
            repoUrl
          )}`}
        />
      )}
    </ButtonLinksGroup>
  );
}
