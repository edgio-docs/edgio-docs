import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ReactIcon from './react.svg'
import VueIcon from './vue.svg'
import AngularIcon from './angular.svg'
import SpartacusIcon from './spartacus.svg'
import NextIcon from './next.svg'
import Stencil from './stencil.svg'
import NextCommerceIcon from './next-commerce.svg'
import NuxtIcon from './nuxt.svg'
import ReactStorefrontIcon from './react-storefront.svg'
import SapperIcon from './sapper.svg'
import GatsbyIcon from './gatsby.svg'
import VSFIcon from './vsf.svg'
import NXIcon from './nx.svg'
import FrontityIcon from './frontity.svg'
import HTMLIcon from './html.svg'
import Hugo from './hugo.svg'
import Fastboot from './fastboot.svg'
import Razzle from './razzle.svg'
import SvelteIcon from './svelte.svg'
import SwellIcon from './swell.svg'
import RazzlePng from './razzle.png'
import Dojo from './dojo.svg'
import MkDocsIcon from '@material-ui/icons/Book'
import ExpressIcon from './express.svg'
import AstroIcon from './astro.svg'
import JekyllIcon from './jekyll.svg'
import ServerlessIcon from './serverless-functions.svg'
import Docusaurus from './docusaurus.svg'
import Remix from './remix.svg'
import Hexo from './hexo.svg'
import Brunch from './brunch.svg'
import ShopifyHydrogen from './shopify-hydrogen.svg'
import ReactStatic from './react-static.svg'
import Layer0Icon from './layer0-logo.svg'
import Ember from './ember.svg'
import IonicReact from './ionic_react.svg'
import Gridsome from './gridsome.svg'
import Saber from './saber.svg'
import Preact from './preact.svg'
import Eleventy from './eleventy.svg'
import Zola from './zola.svg'
import SolidJS from './solid.svg'
import UmiJS from './umijs.svg'
import clsx from 'clsx'
import RedwoodJSIcon from './redwood.svg'

export const icons = {
  'next-commerce': NextCommerceIcon,
  'react-storefront': ReactStorefrontIcon,
  angular: AngularIcon,
  astro: AstroIcon,
  docusaurus: Docusaurus,
  ember: Ember,
  fastboot: Fastboot,
  frontity: FrontityIcon,
  gatsby: GatsbyIcon,
  hexo: Hexo,
  hugo: Hugo,
  html: HTMLIcon,
  jekyll: JekyllIcon,
  layer0: Layer0Icon,
  mkdocs: MkDocsIcon,
  next: ChevronRight,
  nextjs: NextIcon,
  nuxt: NuxtIcon,
  nx: NXIcon,
  prev: ChevronLeft,
  razzle: Razzle,
  razzleP: RazzlePng,
  react: ReactIcon,
  redwood: RedwoodJSIcon,
  remix: Remix,
  sapper: SapperIcon,
  stencil: Stencil,
  serverless_functions: ServerlessIcon,
  shopify_hydrogen: ShopifyHydrogen,
  spartacus: SpartacusIcon,
  svelte: SvelteIcon,
  swell: SwellIcon,
  mkdocs: MkDocsIcon,
  express: ExpressIcon,
  vsf: VSFIcon,
  vue: VueIcon,
  vuepress: VueIcon,
  react_static: ReactStatic,
  ionic_react: IonicReact,
  ionic_vue: IonicReact,
  gridsome: Gridsome,
  saber: Saber,
  preact: Preact,
  eleventy: Eleventy,
  brunch: Brunch,
  zola: Zola,
  dojo: Dojo,
  solid: SolidJS,
  umijs: UmiJS,
}

export const styles = theme => ({
  root: {
    height: 20,
    width: 20,
  },
  png: {
    marginRight: 4,
    height: 20,
    width: 20,
  },
})

const useStyles = makeStyles(styles, { name: 'RSFIcon' })

export default function Icon({ style, className, classes, type }) {
  classes = useStyles({ classes })
  const El = icons[type]

  if (!El) {
    return null
  } else if (typeof El === 'string') {
    return <img style={style} src={El} className={clsx([classes.root, className])} />
  } else {
    return <El style={style} className={clsx([classes.root, className])} />
  }
}
