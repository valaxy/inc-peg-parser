import * as p from '../parseProgress/index'
import ParsingNode from './parsingNode'

interface ParsingDirectiveReturn {
    type: string
    value?: any
}

/** 解析的算法的指令 */
interface ParsingDirective {
    chunk(connective: p.ChunkProgress, vagrant: ParsingNode): ParsingDirectiveReturn

    sequence(connective: p.SequenceProgress, vagrant: ParsingNode): ParsingDirectiveReturn

    choice(connective: p.ChoiceProgress, vagrant: ParsingNode): ParsingDirectiveReturn

    rule(connective: p.RuleProgress, vagrant: ParsingNode): ParsingDirectiveReturn
}

export { ParsingDirective, ParsingDirectiveReturn }
