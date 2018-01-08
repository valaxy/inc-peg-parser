import { ParsingDirective } from './parsing'
import ParsingNode from './parsingNode'
import * as p from '../parseProgress/index'

/**
 * 提供逐字节的核心解析算法，通过计算可能返回以下解析指令：
 *
 */
const PARSING: ParsingDirective = {
    chunk(chunk: p.ChunkProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        if (chunk.currentCharacter == vagrant.character) {
            return {
                type: 'consume'
            }
        }

        return {
            type: 'back'
        }
    },

    sequence(sequence: p.SequenceProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        return {
            type: 'descend',
            value: sequence.currentSubForm // a form
        }
    },

    choice(choice: p.ChoiceProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        return {
            type: 'descend',
            value: choice.currentSubForm
        }
    },

    rule(rule: p.RuleProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        return {
            type: 'descend',
            value: rule.subForm
        }
    }

    // zeorOrMore(zeroOrMore: ZeroOrMoreProgress, ch: string) {
    //     if (zeroOrMore.matchNothing) {
    //         return {
    //             type: 'back'
    //         }
    //     }
    //
    //     return {
    //         type: 'add',
    //         value: zeroOrMore.subForm
    //     }
    // }

    // rangeOf({text, pos, setPos}) {
    //     if (pos >= text.length) throw new Error('error')
    //     let ch = text[0]
    //     if (ch < this._charX || ch > this._charY) throw new Error('rangeOf error')
    //     setPos(pos + 1)
    // }
}

export default PARSING
