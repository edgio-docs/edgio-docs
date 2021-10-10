import useVersioning from '@/components/versioning'
import { Button } from '@material-ui/core'

export default function ApiLink() {
  const { currentVersion } = useVersioning()

  return (
    <Button
      key="back"
      href={`/reference/${currentVersion}/api/core/index.html`}
      variant="contained"
      color="primary"
      style={{ width: '100%' }}
    >
      API Reference
    </Button>
  )
}
