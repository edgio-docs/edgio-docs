import { Button } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import fetch from 'isomorphic-fetch'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ApiHome from '../../components/ApiHome'
import Member from '../../components/modules/Member'
import ModuleSkeleton from '../../components/modules/ModuleSkeleton'
import Nav from '../../components/nav'
import PageWrapper from '../../components/PageWrapper'
import getBaseUrl from '../../components/utils/getBaseUrl'
import useVersioning from '../../components/versioning'

export default function Module({ defaultNavData, defaultModuleData }) {
  const {
    query: { module },
  } = useRouter()
  const [navData, setNavData] = useState(defaultNavData)
  const [moduleData, setModuleData] = useState(defaultModuleData)
  const [loading, setLoading] = useState(true)
  const { currentVersion, isLatestVersion } = useVersioning()

  const selectedModule = module.slice(isLatestVersion() ? 0 : 1).join('/')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const modRes = await fetch(`/api/modules/${currentVersion}`)
      const { menu, exports } = await modRes.json()

      setNavData(menu)
      setModuleData(exports)
      setLoading(false)
    }

    fetchData()
  }, [currentVersion])

  let content
  if (selectedModule === 'index') {
    content = <ApiHome />
  } else if (moduleData[selectedModule]) {
    content = <Member module={moduleData[selectedModule]} />
  } else if (loading) {
    content = <ModuleSkeleton />
  } else {
    content = <div>Not found</div>
  }

  return (
    <PageWrapper
      nav={
        <Nav
          navData={navData}
          currentRoute={selectedModule}
          tree={navData[0].items && navData[0].items.length}
          aboveAdornments={[
            <Button key="back" onClick={() => Router.push('/')} startIcon={<BackIcon />}>
              Back to Guides
            </Button>,
          ]}
        />
      }
    >
      <Head>
        <title>Moovweb XDN API {moduleData.name ? `- ${module.name}` : ''}</title>
      </Head>
      {content}
    </PageWrapper>
  )
}

Module.getInitialProps = async ({ req, version }) => {
  const baseUrl = getBaseUrl(req)

  const modules = await fetch(`${baseUrl}/api/modules/${version}`).then(res => res.json())

  return {
    defaultNavData: modules.menu,
    defaultModuleData: modules.exports,
  }
}
