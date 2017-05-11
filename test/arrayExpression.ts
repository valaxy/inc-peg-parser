import { oneOrMore, rangeOf, chunk, optional, rule, zeroOrMore, sequence } from '../lib/form/index'


const RULES = {
    number: oneOrMore(
        rangeOf('0', '9')
    ),
    expression: sequence(
        chunk('['),
        optional(sequence(
            rule('number'),
            zeroOrMore(sequence(
                chunk(','),
                rule('number')
            ))
        )),
        chunk(']')
    )
}
