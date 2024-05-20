import { default as base } from '../base.config';

const PRODUCT_UPLYNK = 'Uplynk';
const PRODUCT_VOD = 'VOD';
const PRODUCT_STREAMING = 'Streaming'
const URL_UPLYNK_PORTAL = 'id.vdms.io';
const URL_SIGNUP = 'http://www.uplynk.com/signup.html';
const URL_CMS = 'https://cms.uplynk.com/';
const URL_CDN = 'https://my.edgecast.com/';


const config = {
  ...base,
  PRODUCT_UPLYNK,
  PRODUCT_VOD,
  PRODUCT_STREAMING
  URL_UPLYNK_PORTAL,
  URL_SIGNUP,
  URL_CMS,
  URL_CDN,

};

export default config;
