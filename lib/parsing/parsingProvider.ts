import ParsingNode from '../parsingNode'

/** 维护未处理节点的链表 */
export default class ParsingProvider {
    private _node: ParsingNode

    constructor(node: ParsingNode) {
        this._node = node
    }

    private _break(node: ParsingNode) {
        let children = node.removeChildren()
        children[children.length - 1]._nextVagrantNode = node._nextVagrantNode
        for (let i = 0; i<children.length - 1; i++) {
            children[i]._nextVagrantNode = children[i + 1]
        }
        this._node._nextVagrantNode = children[0]
    }

    isEmpty() {
        return this._node._nextVagrantNode === null
    }

    pop(): ParsingNode {
        let top = this._node._nextVagrantNode
        this._node._nextVagrantNode = top._nextVagrantNode
        return top
    }

    peek(): ParsingNode {
        return this._node._nextVagrantNode
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
