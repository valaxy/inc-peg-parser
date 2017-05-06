import ParsingNode from './parsingNode'
import ParsingStack from './parsingStack'

export default class Session {
    private _progressNode: ParsingNode // 标识状态
    private _startNode: ParsingNode
    private _endNode: ParsingNode

    constructor(private _consumer) {

    }

    private _refreshProgress() {
        this._progressNode = this._findUndoneNode(this._progressNode)
    }

    private _findUndoneNode(node: ParsingNode) {
        while (true) {
            if (node == null) { return null }
            if (node.progress.hasNextStep()) { return node }
            node = node.parent
        }
    }


    private _consume(progress: ParsingNode, undecided: ParsingNode) {
        if (typeof undecided.form != 'string') { throw new Error('impossible undecided.form != "string"') }
        progress.add(undecided)
        return undecided.nextUnboundNode
    }

    private _descend(progress: ParsingNode) {
        progress.add(new ParsingNode(value))
    }

    private _break(node: ParsingNode) {
        if (node.nextUnboundNode != null) { throw new Error('impossible node.nextUnboundNode != null') }
        if (node.children.length == 0) { throw new Error('impossible node.children.length == 0') }
        let children = node.seperateAtRoot() // now, node can gc
        for (let i = 0; i<children.length - 1; i++) {
            children[i].nextUnboundNode = children[i + 1]
        }
        this._progressNode.nextUnboundNode = children[0]
    }

    // 一旦当前form匹配失败就需要选择下一个choice
    // 若下一个choice也失败, 则需要parent选择下一个choice, 如此直到根节点
    private _back() {
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

    private _maintainAt(node: ParsingNode) {
        this._progressNode = node
        let parsingNode

        while (true) {
            // refresh progress
            this._progressNode = this._findUndoneNode(this._progressNode)

            // 解析完毕(利用结尾哨兵保证此时一定是解析完毕状态)
            // assertTrue(this._parsingStack.isEmpty())
            if (!this._progressNode) {
                return
            }

            // 尝试移植
            let a = this._progressNode
            let unboundNode = this._parsingStack.peek()

            a.progress.nextStep()
            let { type, value } = a.form.consume(b.form)

            switch (type) {
                case 'consume':
                    this._consume(a, b)
                case 'descend':
                    this._descend(a, b)
                case 'back':
                    this._back()
                case 'break':
                    this._break(b)
                default:
                    throw new Error('no update')
            }
            if (this._graft(this._progressNode, unboundNode)) { continue }
        }
    }

    /**
     * insert a range of symbols after `target`
     * start: first symbol
     * end: last symbol
     */
    insertAfter(target: ParsingNode, start: ParsingNode, end: ParsingNode) {
        if (target.nextUnboundNode) {
            end.nextUnboundNode = target.nextUnboundNode
            target.nextUnboundNode = start
        } else {
            target.breakRightRelative()
        }

        this._maintainAt(target)
    }
}


// // 移植失败
// if (unboundNode.hasNoChildren()) { // 终结符
//     this._nextChoice() // 可能导致progressNode为null
// } else { // 非终结符
//     let fallbackNodes = unboundNode.seperateLeafs()
//     this._parsingStack.push(...fallbackNodes.reverse())
// }
