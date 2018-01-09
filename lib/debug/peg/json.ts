import * as f from '../../form/index'

export default function() {
    let value = f.choice(
        f.chunk('false'),
        f.chunk('null'),
        f.chunk('true')
    )

    let number = f.sequence(
        f.optional(f.chunk('-'))
    )
    return value
}
