import ClassType from './ClassType'
import ComponentType from './ComponentType'
import FunctionType from './FunctionType'
import SpecialType from './SpecialType'

export default function Member({ module, isMember, classes }) {
  const props = { module }
  let TypeComponent
  if (module.type === 'component') {
    TypeComponent = ComponentType
  } else if (module.type === 'class') {
    TypeComponent = ClassType
  } else {
    props.isMember = isMember
    props.classes = classes
    if (module.type === 'function') {
      TypeComponent = FunctionType
    } else {
      TypeComponent = SpecialType
    }
  }
  return <TypeComponent {...props} />
}
