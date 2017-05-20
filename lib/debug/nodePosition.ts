let index = 0

export default class NodePosition {
    private _root: number
    private _left: number
    private _right: number
    private _deep: number
    private _node
    private _index

    /** 根的位置 */
    get root() { return this._root }

    /** 子树的左边界 */
    get left() { return this._left }

    /** 子树的右边界 */
    get right() { return this._right }

    /** 根的深度 */
    get deep() { return this._deep }

    get index() { return this._index }

    get parentIndex() {
        if (this._node.parent) {
            return this._node.parent._position.index
        } else {
            return null
        }
    }

    constructor(root, left, right, deep, node?) {
        this._node = node
        this._root = root
        this._left = left
        this._right = right
        this._deep = deep
        this._index = index++
    }

    toArray() {
        return [this.root, this.left, this.right, this.deep]
    }

    static parentInMiddle(left: NodePosition, right: NodePosition, deep: number, node?) {
        return new NodePosition(Math.floor((left._left + right._right) / 2), left._left, right._right, deep, node)
    }

    static right(left: NodePosition, deep: number, node?) {
        return new NodePosition(left._right + 1, left._right + 1, left._right + 1, deep, node)
    }

    static random(deep: number, node) {
        return new NodePosition(0, 0, 0, deep, node)
    }
}
