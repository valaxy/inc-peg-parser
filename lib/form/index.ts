import Form from './form'
import AnyOf from './anyOf'
import Choice from './choice'
import Chunk from './chunk'
import RangeOf from './rangeOf'
import Sequence from './sequence'
import SubForm from './subForm'

const anyOf = (x) => new AnyOf(x)
const choice = (x) => new Choice(x)
const chunk = (x) => new Chunk(x)
const rangeOf = (x, y) => new RangeOf(x, y)
const sequence = (x) => new Sequence(x)
const subForm = (x) => new SubForm(x)
