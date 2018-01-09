import * as f from '../../form/index'

// 数字表达式的PEG
export default function() {
    return f.oneOrMore(
        f.rangeOf('0', '9')
    )
}
