import { default as base } from '../base.config';

const DELIVERY = 'Delivery';
const CACHING_DELIVERY = 'Caching and Delivery';
const MEDIAVAULT = 'MediaVault';
const CONTROL = 'Control';
const EDGEPRISM = 'EDGEPRISM';

const config = {
  ...base,
  DELIVERY,
  CACHING_DELIVERY,
  MEDIAVAULT,
  CONTROL,
  EDGEPRISM,
};

export default config;
