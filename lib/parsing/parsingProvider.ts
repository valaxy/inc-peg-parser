import ParsingNode from '../parsingNode'

/** 维护未处理节点的链表 */
export default class ParsingProvider {
    private _node: ParsingNode

    constructor(node: ParsingNode) {
        this._node = node
    }

    private _break(node: ParsingNode) {
        let children = node.removeChildren()
        children[children.length - 1]._nextUnboundNode = node._nextUnboundNode
        for (let i = 0; i<children.length - 1; i++) {
            children[i]._nextUnboundNode = children[i + 1]
        }
        this._node._nextUnboundNode = children[0]
    }

    isEmpty() {
        return this._node._nextUnboundNode === null
    }

    pop(): ParsingNode {
        let top = this._node._nextUnboundNode
        this._node._nextUnboundNode = top._nextUnboundNode
        return top
    }

    peek(): ParsingNode {
        return this._node._nextUnboundNode
    }

    breakdownTopTree() {
        let top = this.pop()
        this._break(top) // now, top can be gc
    }

    breakdownMainTree() {
        this._break(this._node)
    }

    breakupTopTree(x: ParsingNode) {
        // x一定在leftmost path中
        while (true) {
            x = x.parent
            let children = x.removeChildren()
            // TODO
        }
    }

}
