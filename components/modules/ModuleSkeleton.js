import { Container } from '@material-ui/core'
import React from 'react'
import { Skeleton } from '@material-ui/lab'

export default function ModuleSkeleton() {
  return (
    <Container>
      <Skeleton style={{ marginTop: 30 }} variant="rect" width={400} height={70} />
      <Skeleton style={{ marginTop: 10 }} variant="text" width={700} height={40} />
      <Skeleton variant="text" width={700} height={40} />
      <Skeleton variant="text" width={700} height={40} />
      <Skeleton variant="text" width={700} height={40} />
      <Skeleton style={{ marginTop: 30 }} variant="rect" width={600} height={200} />
    </Container>
  )
}
