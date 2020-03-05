import { Button } from '@material-ui/core'
import Link from 'next/link'

export default function ApiLink() {
  return (
    <Link href="/apiReference/[...module]" as="/apiReference/index">
      <Button key="back" variant="contained" color="primary" style={{ width: '100%' }}>
        API Reference
      </Button>
    </Link>
  )
}
