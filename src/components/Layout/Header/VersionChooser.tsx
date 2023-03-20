import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material';
import {styled} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Link from 'next/link';

import {getVersionedConfigs} from 'utils/config';
import useConditioning from 'utils/hooks/useConditioning';

const linkStyles = {
  color: 'var(--text-primary)',
  textDecoration: 'none',
  '&:visited': {
    color: 'var(--text-primary)',
  },
};

const VersionItem = styled(MenuItem)(() => ({
  '&.MuiMenuItem-root.Mui-selected': {
    backgroundColor: 'var(--select-item-selected-bg)',
  },
  '&.MuiMenuItem-root:hover': {
    backgroundColor: 'var(--select-item-hover-bg)',
  },
}));

const VersionSelect = styled(Select)(() => ({
  '&': {
    marginLeft: 20,
  },
  '& .MuiSelect-icon': {
    color: 'var(--text-primary)',
  },
  '& .MuiSelect-select': {
    color: 'var(--text-primary)',
    backgroundColor: 'var(--select-bg)',
    border: '1px solid var(--sidebar-link-primary)',
    fontSize: 14,
    padding: '5px 14px',
    '& a': linkStyles,
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--select-border-color)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--select-border-color)',
  },
}));

const menuProps = {
  sx: {
    '& a': linkStyles,
    '& .MuiMenuItem-root': {
      ...linkStyles,
      fontSize: 14,
    },
    '& .MuiMenu-paper': {
      backgroundColor: 'var(--select-bg)',
    },
  },
};

export default function VersionChooser() {
  const {version} = useConditioning();
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

  const onChange = (e: any) => {
    console.log(e);
  };

  return (
    <VersionSelect
      sx={{m: 1, minWidth: 150}}
      size="small"
      IconComponent={ExpandMoreIcon}
      MenuProps={menuProps}
      onChange={onChange}
      value={prefixedSelectedVersion}
      variant="outlined"
      renderValue={(value) => versions.find((v) => v.version === value)?.label}>
      {versions.map(({version, href, label}) => {
        return (
          <Link href={href} key={version}>
            <VersionItem
              selected={version === prefixedSelectedVersion}
              value={version}>
              {label}
            </VersionItem>
          </Link>
        );
      })}
    </VersionSelect>
  );
}
