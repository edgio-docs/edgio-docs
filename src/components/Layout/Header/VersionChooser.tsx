import {FormControl, MenuItem, Select} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Router, {useRouter} from 'next/router';

import {getVersionedConfig, getVersionedConfigs} from 'utils/config';
import useConditioning from 'utils/hooks/useConditioning';

const useStyles = makeStyles((theme) => ({
  control: {
    '& > div': {
      borderRadius: 3,
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(-1.5),
    },
    flexShrink: 0,
  },
  selectMenu: {
    textOverflow: 'clip',
  },
  icon: {
    color: theme.palette.grey[200],
  },
  selectRoot: {
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    border: 0,
    padding: theme.spacing(1, 2),
    fontSize: '1.00em',
    color: theme.palette.grey[200],
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  },
}));

export default function VersionChooser() {
  const classes = useStyles();
  const {route} = useRouter();
  const {version} = useConditioning();
  const {selectedVersion} = version;
  const config = getVersionedConfig(selectedVersion);
  const versions = Object.keys(getVersionedConfigs()).map((v) => [
    v,
    `${config.PRODUCT_NAME} ${v}`,
  ]);

  const onChange = (event: any) => {
    let version = event.target?.value;

    Router.push(route, `/guides/${version}`);
  };

  // don't render unless we are on the api docs route
  // if (/*!route.startsWith('/docs/') ||*/ !versions.length) {
  //   return <></>;
  // }

  return (
    <FormControl variant="filled" className={classes.control} size="small">
      <Select
        value={`v${selectedVersion}`}
        onChange={onChange}
        disableUnderline
        autoWidth
        classes={{
          root: classes.selectRoot,
          icon: classes.icon,
          selectMenu: classes.selectMenu,
        }}>
        {versions.map(([value, key]) => (
          <MenuItem value={value} key={value}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
