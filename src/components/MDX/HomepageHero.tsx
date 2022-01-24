/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import { Logo } from 'components/Logo';
import styled from "styled-components"
import Link from "next/link";
import NavLink from 'components/Layout/Nav/NavLink';

const NextLink = Link;

const StyledMain = styled.main`
  display: grid;
  row-gap: 65px;

  grid-template-columns: repeat(6, 1fr);

  width: 1175px;
  padding: 0 48px;

.box {
  display: grid;
  row-gap: 16px;
  grid-column: 1/-1;

    &[data-gtc="2"] {
      grid-template-columns: 1fr 1fr;
    }

    &:nth-child(2) {
      grid-column: 1/4;
    }

    &:nth-child(3) {
      grid-column: 4/-1;
    }
  }

  .routes-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    gap: 12px;
padding-left: calc(32px + 8px);

    a {
      font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;

/* identical to box height */

color: #606060;


    }
  }
`

const SideNavItems = {
  "CDN": {
    "title": "CDN",
    "subtitle": "Accelerate and Accelerate and secure your app using the Layer0 global CDN and EdgeJS.",
    "icon": "fas fa-code",
    "routes": [
      {
        title: "Caching",
        path: "/cdn/caching",
      },
      {
        title: "EdgeJS Routing",
        path: "/cdn/edgejs-routing",
      },
      {
        title: "Security",
        path: "/cdn/edgejs-routing",
      },
      {
        title: "Common Routing Patterns",
        path: "/cdn/edgejs-routing",
      },
      {
        title: "Connectors",
        path: "/cdn/edgejs-routing",
      },
      {
        title: "Incremental Static (Re)generation",
        path: "/cdn/edgejs-routing",
      },
      {
        title: "Static Prerendering"
      },
      {
        title: "Core Web Vitals"
      },
      {
        title: "Performance",
      },
      {
        title: "Third Party CDNs"
      },
      {
        title: "Custom Domains & SSL"
      },
      {
        title: "Prefetching"
      },
      {
        title: "Traditional Sites"
      },
      {
        title: "Edge Network"
      },
      {
        title: "Purging"
      },
      {
        title: "Troubleshooting"
      }
    ]
  },
  "Developer Tools": {
    "title": "CDN",
    "subtitle": "Accelerate and Accelerate and secure your app using the Layer0 global CDN and EdgeJS.",
    "icon": "fas fa-code",
    "routes": [
      {
        title: "CLI",
      },
      {
        title: "Devtools"
      },
      {
        title: "Logs"
      }
    ]
  },
  "Accounts & Teams": {
    "title": "Accounts & Teams",
    "subtitle": "Accelerate and Accelerate and secure your app using the Layer0 global CDN and EdgeJS.",
    "icon": "fas fa-code",
    "routes": [
      {
        title: "Environments",
      },
      {
        title: "Teams"
      },
    ]
  },
  "Framework Guides": {
    "title": "Framework Guides",
    "subtitle": "Accelerate and Accelerate and secure your app using the Layer0 global CDN and EdgeJS.",
    "icon": "fas fa-code",
    "routes": [
      {
        title: "Next.js"
      },
      {
        title: "Serverless functions"
      },
      {
        title: "Ionic Vue"
      },
      {
        title: "React"
      },
      {
        title: "Remix"
      },
      {
        title: "Gridsome"
      },
      {
        title: "Vue Storefront"
      },
      {
        title: "Next.js Commerce"
      },
      {
        title: "Preact"
      },
      {
        title: "Gatsby"
      },
      {
        title: "Svelte"
      },
      {
        title: "Ember.js"
      },
      {
        title: "Vue.js"
      },
      {
        title: "SolidJS"
      },
      {
        title: "Astro"
      },
      {
        title: "Angular"
      },
      {
        title: "React Static"
      }
    ]
  },
  "Reference": {
    "title": "Reference",
    "subtitle": "Accelerate and Accelerate and secure your app using the Layer0 global CDN and EdgeJS.",
    "icon": "fas fa-code",
    "routes": [
      {
        title: "Bots",
      },
      {
        title: "Layer0 for Traditional Sites"
      },
      {
        title: "Status Codes"
      },
      {
        title: "Changelog"
      },
      {
        title: "layer0.config.js"
      },
      {
        title: "v4 Migration Guide"
      },
      {
        title: "Contributing"
      },
      {
        title: "Limits"
      },
      {
        title: "Cookies"
      },
      {
        title: "Request Headers"
      },
      {
        title: "Deploy to Layer0 Button"
      },
      {
        title: "Response Headers"
      },
      {
        title: "Install Node.js"
      },
      {
        title: "REST API"
      }
    ]
  },
}

const StyledHomepageHero = styled.div`
display: grid;
row-gap: 51px;

.page-header {
  height: 446px;
  background-image: linear-gradient(180.17deg, rgba(255, 255, 255, 0) 0.15%, rgba(121, 114, 252, 0.1) 99.84%, #FAFDFF 99.85%);

  .box {
    display: grid;
    grid-template-columns: 35% 1fr;
    max-width: 1175px;
    margin: 0 auto;
    height: 100%;
}

.copy-box {
  font-family: Inter;
  display: grid;
  row-gap: 17px;
display: flex;
flex-direction: column;
justify-content: center;
  }

  .title {
font-weight: 600;
font-size: 28px;
line-height: 38px;
color: #1A1A1A;
  }

  .subtitle {
    font-size: 18px;
line-height: 28px;
color: #707070;
  }

  .figure {
    display: flex;
justify-content: flex-end;

img {
  max-width: 100%;
}
  }
}

.page-body {
  display: grid;
row-gap: 64px;
max-width: 1175px;
margin: 0 auto;


.box {
  display: grid;
  row-gap: 20px;

    &[data-gtc="2"] {
      grid-template-columns: 1fr 1fr;
    }

    &[data-gtc="3"] {
      grid-template-columns: 1fr 1fr 1fr;
    }

    &[data-rc-gap="32"] {
      gap: 32px;
    }

    &[data-section="reference"] {
      > ul {
        align-content: flex-start;
      }
    }
  }
}
`

const StyledGetStartedCard = styled.div`
  background: #FFFFFF;
box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15);
border-radius: 2px;
padding: 30px;

.card-header__title {
  font-weight: 600;
font-size: 20px;
line-height: 27px;
color: #1A1A1A;
display: grid;
grid-template-columns: auto 1fr;
column-gap: 10px;

.icon {
  --size: 28px;
  width: var(--size);
  height: var(--size);
  background-color: #ff0000;
  border-radius: 50%;
}
}

.card-header__subtitle {
  margin: 10px 0 12px;
font-size: 18px;
line-height: 28px;
color: #707070;
}
`

const StyledSectionListItems = styled.ul`
  font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 22px;
color: #606060;
padding-left: calc(32px + 19px);
display: grid;
gap: 12px;

.list-item {
  a {
    position: relative;

    padding-left: 18px;
    &::before {
     content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  left: 0px;
  background: #E95495;
  border-radius: 1px;
  top: 50%;
  transform: translateY(-50%);
  }
  }

}


`

export function GetStartedCard({ title, subtitle, icon, linkText, path }) {
  return <StyledGetStartedCard className="card">
    <div className="card-header">
      <h3 className="card-header__title">
        <div className="icon"></div>
        {title}
      </h3>
      <p className="card-header__subtitle">
        {subtitle}
      </p>
      <NextLink href="/">
        <a>
          <span>{linkText}</span>
          <div className="icon"></div>
        </a>
      </NextLink>
    </div>
  </StyledGetStartedCard>
}

function HomepageHero() {
  return (
    <StyledHomepageHero/>
  );
}

export default HomepageHero;
