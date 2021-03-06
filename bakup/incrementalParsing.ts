import { ParsingDirective } from './parsing'
import ParsingNode from './parsingNode'
import * as p from '../parseProgress/index'
import verbatimParsing from './verbatimParsing'

const PARSING: ParsingDirective = {
    // sequence(connective: p.SequenceProgress, vagrant: ParsingNode) {
    //     if (vagrant.isTerminal) {
    //         return verbatimParsing.sequence(connective, vagrant)
    //     }
    //
    //     // 流浪节点可以直接合并
    //     if (connective.currentSubForm === vagrant.form) {
    //         return {
    //             type: 'decend',
    //             value: vagrant.form
    //         }
    //     }
    //
    //     // 无法合并
    //     return {
    //         type: 'break'
    //     }
    // },

    rule(connective: p.RuleProgress, vagrant: ParsingNode) {
        if (vagrant.isTerminal) {
            return verbatimParsing.rule(connective, vagrant)
        }

        // 流浪节点可以直接合并
        if (connective.subForm == vagrant.form) {
            return {
                type: 'decend',
                value: vagrant.form
            }
        }

        // 无法合并
        return {
            type: 'break'
        }
    }
}

export default PARSING
