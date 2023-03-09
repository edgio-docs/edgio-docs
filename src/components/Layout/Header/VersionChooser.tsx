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
  margin-left: 15px;

  button {
    padding: 4px;
    font-size: 14px;
  }
`;

const StyledDropdownMenu = styled(DropdownMenu)``;

const StyledDropdownItem = styled(DropdownItem)`
  font-size: 14px;
  font-weight: ${({selected}) => (selected ? 'bold' : 'normal')};

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
          console.log(version, prefixedSelectedVersion);
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
