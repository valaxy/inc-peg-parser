import ParsingNode from './parsingNode'
import ParsingStack from './parsingStack'
import Form from './form/form'
import ParsingProvider from './parsing/parsingProvider'


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
        if (typeof undecided.form != 'string') { throw new Error('impossible typeof undecided.form != "string"') }
        progress.add(undecided)
        return {
            nextProgress: progress,
            nextUnbound: undecided.nextUnboundNode
        }
    }

    private _descend(progress: ParsingNode, undecided: ParsingNode, generate: ParsingNode) {
        progress.add(generate)
        return {
            nextProgress: generate,
            nextUnbound: undecided
        }
    }

    private _break(progress: ParsingNode, undecided: ParsingNode) {
        if (undecided.children.length == 0) { throw new Error('impossible undecided.children.length == 0') }
        let nextUnboundNode = undecided.nextUnboundNode
        let children = undecided.children
        undecided.seperateAtRoot() // now, undecided node can gc
        for (let i = 0; i<children.length - 1; i++) {
            children[i].nextUnboundNode = children[i + 1]
        }
        children[children.length - 1].nextUnboundNode = nextUnboundNode
        return {
            nextProgress: progress,
            nextUnbound: children[0]
        }
    }

    // 一旦当前form匹配失败就需要选择下一个choice
    // 若下一个choice也失败, 则需要parent选择下一个choice, 如此直到根节点
    private _back(progress: ParsingNode, undecided: ParsingNode) {
        if (typeof undecided.form != 'string') { throw new Error("impossible: typeof undecided.form != 'string'") }

        while (true) {
            if (progress == null) {
                return {
                    nextProgress: null,
                    nextUnbound: null
                }
            }

            if (progress.progress.nextChoice()) {
                if (progress.nextUnboundNode) { throw new Error("impossible: progress.nextUnboundNode exist") }
                let provider = new ParsingProvider(progress)
                provider.breakRootElement()

                return {
                    nextProgress: progress
                }
            }

            progress = progress.parent
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
            let unboundNode = this._progressNode.nextUnboundNode
            this._progressNode.progress.nextStep()
            let { type, value } = (this._progressNode.form as Form).consume(unboundNode.form)

            switch (type) {
                case 'consume':
                    this._consume(this._progressNode, unboundNode)
                case 'descend':
                    this._descend(this._progressNode, unboundNode, value)
                case 'back':
                    this._back(this._progressNode, unboundNode)
                case 'break':
                    this._break(this._progressNode, unboundNode)
                default:
                    throw new Error('no update')
            }
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
