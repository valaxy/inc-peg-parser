import { ParsingDirective } from './parsing'
import ParsingNode from './parsingNode'
import * as p from '../parseProgress/index'

/**
 * 提供逐字节的核心解析算法，通过计算可能返回以下解析指令：
 */
const PARSING: ParsingDirective = {
    sequence(sequence: p.SequenceProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        return {
            type: 'descend',
            value: new ParsingNode(sequence.currentSubForm)
        }
    },

    choice(choice: p.ChoiceProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        return {
            type: 'descend',
            value: new ParsingNode(choice.currentSubForm)
        }
    },

    rule(rule: p.RuleProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        return {
            type: 'descend',
            value: new ParsingNode(rule.subForm)
        }
    },

    oneOrMore(oneOrMore: p.OneOrMoreProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        // 这里不对匹配与否做具体判断，交由下层去判断
        return {
            type: 'descend',
            value: new ParsingNode(oneOrMore.form.subForm) // 循环子Form
        }
    },

    zeroOrMore(zeroOrMore: p.ZeorOrMoreProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        // 这里不对匹配与否做具体判断，交由下层去判断
        return {
            type: 'descend',
            value: new ParsingNode(zeroOrMore.form)
        }
    },

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

    rangeOf(rangeOf: p.RangeOfProgress, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        if (rangeOf.accept(vagrant.character)) {
            return {
                type: 'consume'
            }
        }

        return {
            type: 'back'
        }
    }
}

export default PARSING
