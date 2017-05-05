import { ChunkProgress, SequenceProgress, ChoiceProgress, RuleProgress } from '../parseProgress/index'

// 操作:
// - descend, 添加子节点, 如果value是string则consume
// - back, 回溯到上一个可选节点

/** 一个字节一个字节的解析 */
export default {
    chunk(chunk: ChunkProgress, ch: string) {
        if (chunk.currentCharacter == ch) {
            return {
                type: 'descend',
                value: ch // a string
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
}
