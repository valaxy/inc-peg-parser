import ParsingNode from './parsingNode'

export default abstract class TreeOperation {
    abstract get type()

    abstract do(connective: ParsingNode, vagrant: ParsingNode)
}
