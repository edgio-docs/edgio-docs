import { Button } from '@material-ui/core'
import Link from 'next/link'
import useVersioning from '../components/versioning'

export default function ApiLink() {
  const { currentVersion } = useVersioning()

  return (
    <Button
      key="back"
      href={`/reference/${currentVersion}/api/docs/core/index.html`}
      variant="contained"
      color="primary"
      style={{ width: '100%' }}
    >
      API Reference
    </Button>
  )
}
