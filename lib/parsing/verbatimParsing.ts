import { ChunkProgress, SequenceProgress, ChoiceProgress, RuleProgress } from '../parseProgress/index'

/**
 * 提供逐字节的核心解析算法，通过计算可能返回以下解析指令：
 * - consume：创建子节点、绑定该子节点、移进
 * - descend：创建子节点、保持
 * - back：回溯到上一个可选节点
 *
 * 术语解释：
 * - 移进：解析下一个字符
 * - 保持：仍然解析当前字符
 * - 绑定：将字符绑定到节点
 */
export default {
    chunk(chunk: ChunkProgress, ch: string) {
        if (chunk.currentCharacter == ch) {
            return {
                type: 'consume'
            }
        }

        return {
            type: 'back'
        }
    },

    sequence(sequence: SequenceProgress, ch: string) {
        return {
            type: 'descend',
            value: sequence.currentSubForm // a form
        }
    },

    choice(choice: ChoiceProgress, ch: string) {
        return {
            type: 'descend',
            value: choice.currentSubForm
        }
    },

    rule(rule: RuleProgress, ch: string) {
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
