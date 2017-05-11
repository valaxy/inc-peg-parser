import AnyOf from './anyOf'
import Choice from './choice'
import Chunk from './chunk'
import Form from './form'
import OneOrMore from './oneOrMore'
import Optional from './optional'
import RangeOf from './rangeOf'
import Rule from './Rule'
import Sequence from './sequence'
import ZeroOrMore from './zeroOrMore'

const anyOf = (x) => new AnyOf(x)
const choice = (x) => new Choice(x)
const chunk = (x) => new Chunk(x)
const oneOrMore = (x) => new OneOrMore(x)
const optional = (x) => new Optional(x)
const rangeOf = (x, y) => new RangeOf(x, y)
const rule = (x, y?) => new Rule(x, y)
const sequence = (...x) => new Sequence(...x)
const zeroOrMore = (x) => new ZeroOrMore(x)

export {
    AnyOf, Choice, Chunk, Form, OneOrMore, Optional, RangeOf, Rule, Sequence, ZeroOrMore,
    anyOf, choice, chunk,       oneOrMore, optional, rangeOf, rule, sequence, zeroOrMore
}
