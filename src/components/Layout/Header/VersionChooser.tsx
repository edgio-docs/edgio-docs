import Link from 'next/link';
import {useState} from 'react';
//@ts-ignore
import {Button} from 'styled-button-component';
import styled from 'styled-components';
//@ts-ignore
import {Dropdown, DropdownItem, DropdownMenu} from 'styled-dropdown-component';

import {getVersionedConfigs} from 'utils/config';
import useConditioning from 'utils/hooks/useConditioning';

const StyledDropdown = styled(Dropdown)`
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  margin-left: 15px;

  button {
    padding: 4px;
    font-size: 14px;
    background-color: var(--bg-secondary) !important;
    color: var(--text-primary) !important;
  }
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--colors-blue0) !important;
`;

const StyledDropdownItem = styled(DropdownItem)`
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  ${({selected}) =>
    selected
      ? `
    font-weight: bold;
    color: var(--colors-blue0);
  `
      : `
        font-weight: normal;
        `};

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function VersionChooser() {
  const {version} = useConditioning();
  const [hidden, setHidden] = useState(true);
  const {selectedVersion, latestVersion} = version;

  const prefixedLatestVersion = `v${latestVersion}`;
  const prefixedSelectedVersion = `v${selectedVersion}`;

  const versions = Object.keys(getVersionedConfigs())
    .map((v) => ({
      version: v,
      href: v === prefixedLatestVersion ? `/` : `/guides/${v}`,
      label: `Applications ${v}`,
    }))
    .reverse();

  const {label: selectedLabel} = versions.find(
    ({version}) => version === prefixedSelectedVersion
  ) || {label: `Applications ${prefixedLatestVersion}`};

  return (
    <StyledDropdown>
      <Button dropdownToggle onClick={() => setHidden(!hidden)}>
        {selectedLabel}
      </Button>
      <StyledDropdownMenu hidden={hidden} toggle={() => setHidden(!hidden)}>
        {versions.map(({version, href, label}) => {
          return (
            <StyledDropdownItem
              key={version}
              selected={version === prefixedSelectedVersion}>
              <Link href={href}>{label}</Link>
            </StyledDropdownItem>
          );
        })}
      </StyledDropdownMenu>
    </StyledDropdown>
  );
}
