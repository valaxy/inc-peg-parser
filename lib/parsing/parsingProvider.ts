import ParsingNode from './parsingNode'

/** 维护未处理节点的链表 */
export default class ParsingProvider {
    private _node: ParsingNode

    constructor(node: ParsingNode) {
        this._node = node
    }

    private _break(node: ParsingNode) {
        let children = node.removeChildren()
        children[children.length - 1].nextVagrantNode = node.nextVagrantNode
        for (let i = 0; i<children.length - 1; i++) {
            children[i].nextVagrantNode = children[i + 1]
        }
        this._node.nextVagrantNode = children[0]
    }

    isEmpty() {
        return this._node.nextVagrantNode === null
    }

    pop(): ParsingNode {
        let top = this._node.nextVagrantNode
        this._node.nextVagrantNode = top.nextVagrantNode
        return top
    }

    peek(): ParsingNode {
        return this._node.nextVagrantNode
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
            let children = x.breakChildren()
            // TODO
        }
    }

    /** 返回最左祖宗节点, 或者并没有最左祖宗则返回自身 */
    static leftMostAncestor(n: ParsingNode) {
        while (true) {
            let parent = n.parent
            if (!parent) { return n } // 已经是根节点了
            if (!n.isLastChild) { return n }
            n = parent
        }
    }
}
