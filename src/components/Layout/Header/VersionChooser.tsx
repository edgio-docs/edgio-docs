import Router, {useRouter} from 'next/router';
import {useState} from 'react';
//@ts-ignore
import {Button} from 'styled-button-component';
import styled from 'styled-components';
//@ts-ignore
import {Dropdown, DropdownItem, DropdownMenu} from 'styled-dropdown-component';

import {getVersionedConfig, getVersionedConfigs} from 'utils/config';
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
`;

export default function VersionChooser() {
  const {route} = useRouter();
  const {version} = useConditioning();
  const [hidden, setHidden] = useState(true);
  const {selectedVersion, latestVersion} = version;
  const config = getVersionedConfig(selectedVersion);
  const versions = Object.keys(getVersionedConfigs()).map((v) => [
    v,
    `Applications ${v}`,
  ]);

  const prefixedLatestVersion = `v${latestVersion}`;
  const prefixedSelectedVersion = `v${selectedVersion}`;

  const onChange = (version: string) => {
    if (version === prefixedLatestVersion) {
      Router.push(`/`);
    } else {
      Router.push(`/guides/${version}`);
    }
  };

  const [selectedValue, selectedLabel] =
    versions.find((v) => v[0] === prefixedSelectedVersion) || [];

  return (
    <StyledDropdown>
      <Button dropdownToggle onClick={() => setHidden(!hidden)}>
        {selectedLabel}
      </Button>
      <StyledDropdownMenu hidden={hidden} toggle={() => setHidden(!hidden)}>
        {versions.map(([value, label]) => (
          <StyledDropdownItem
            key={value}
            value={value}
            onClick={() => onChange(value)}>
            {label}
          </StyledDropdownItem>
        ))}
      </StyledDropdownMenu>
    </StyledDropdown>
  );
}
