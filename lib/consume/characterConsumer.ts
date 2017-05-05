import { ChunkProgress, SequenceProgress, ChoiceProgress, RuleProgress } from '../parseProgress/index'

// 操作:
// - consume, 添加传入子节点并且移进
// - descend, 添加value并且不移进
// - back, 回溯到上一个可选节点
// - break, 分解传入的节点, 移除根


/** 一个字节一个字节的解析 */
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
}
