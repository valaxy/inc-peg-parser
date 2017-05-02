import ParsingNode from './parsingNode'
import ParsingStack from './parsingStack'

export default class Session {
    private _parsingStack: ParsingStack // 标识状态
    private _progressNode: ParsingNode // 标识状态

    constructor() {

    }

    // 一旦当前form匹配失败就需要选择下一个choice
    // 若下一个choice也失败, 则需要parent选择下一个choice, 如此直到根节点
    private _nextChoice() {
        while (true) {
            if (this._progressNode == null) {
                return null
            }
            if (this._progressNode.progress.nextChoice()) {
                return
            }
            this._progressNode = this._progressNode.parent
        }
    }

    private _refreshProgressNode() {
        this._progressNode  = this._findUndoneNode(this._progressNode)
    }

    private _createParsingNode(count: number) {
        let text = this
        let node = { pos: this._pos }
        return node
    }

    private _findUndoneNode(node: ParsingNode) {
        while (true) {
            if (node == null) { return null }
            if (node.progress.hasNextStep()) { return node }
            node = node.parent
        }
    }

    // b作为子节点接入a
    private _graft(a: ParsingNode, b: ParsingNode) {
        a.progress.nextStep()
        if (a.progress.consume(b)) {
            a.add(b)
            return true
        }
        return false
    }

    parse() {
        while (true) {
            this._refreshProgressNode()

            // 解析完毕(利用结尾哨兵保证此时一定是解析完毕状态)
            // assertTrue(this._parsingStack.isEmpty())
            if (!this._progressNode) {
                return
            }

            // 尝试移植
            let unboundNode = this._parsingStack.pop()
            if (this._graft(this._progressNode, unboundNode)) { continue }

            // 移植失败
            if (unboundNode.hasNoChildren()) { // 终结符
                this._nextChoice() // 可能导致progressNode为null
            } else { // 非终结符
                let fallbackNodes = unboundNode.seperateLeafs()
                this._parsingStack.push(...fallbackNodes.reverse())
            }
        }
    }

    lookForward(n: number): string {
        throw new Error()
    }

    match(): void {
        this._parsingNode.add(this._createParsingNode(count))
    }

    mismatch(): void {

    }

    back(): boolean {
        this._parsingNode.removeChildren()
        this._pos = this._parsingNode.pos
        return false
    }
}
