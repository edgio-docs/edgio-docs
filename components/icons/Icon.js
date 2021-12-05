import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ReactIcon from './react.svg'
import VueIcon from './vue.svg'
import AngularIcon from './angular.svg'
import SpartacusIcon from './spartacus.svg'
import NextIcon from './next.svg'
import NextCommerceIcon from './next-commerce.svg'
import NuxtIcon from './nuxt.svg'
import ReactStorefrontIcon from './react-storefront.svg'
import SapperIcon from './sapper.svg'
import GatsbyIcon from './gatsby.svg'
import VSFIcon from './vsf.svg'
import NXIcon from './nx.svg'
import FrontityIcon from './frontity.svg'
import HTMLIcon from './html.svg'
import Fastboot from './fastboot.svg'
import Preact from './preact.svg'
import Razzle from './razzle.svg'
import SvelteIcon from './svelte.svg'
import SwellIcon from './swell.svg'
import RazzlePng from './razzle.png'
import MkDocsIcon from '@material-ui/icons/Book'
import AstroIcon from './astro.svg'
import JekyllIcon from './jekyll.svg'
import ServerlessIcon from './serverless-functions.svg'
import Docusaurus from './docusaurus.svg'
import Remix from './remix.svg'
import Hexo from './hexo.svg'
import ShopifyHydrogen from './shopify-hydrogen.svg'
import Layer0Icon from './layer0-logo.svg'

import clsx from 'clsx'

export const icons = {
  'next-commerce': NextCommerceIcon,
  'react-storefront': ReactStorefrontIcon,
  angular: AngularIcon,
  astro: AstroIcon,
  docusaurus: Docusaurus,
  fastboot: Fastboot,
  frontity: FrontityIcon,
  gatsby: GatsbyIcon,
  hexo: Hexo,
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
  preact: Preact,
  react: ReactIcon,
  remix: Remix,
  sapper: SapperIcon,
  serverless_functions: ServerlessIcon,
  shopify_hydrogen: ShopifyHydrogen,
  spartacus: SpartacusIcon,
  svelte: SvelteIcon,
  swell: SwellIcon,
  vsf: VSFIcon,
  vue: VueIcon,
  vuepress: VueIcon
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
