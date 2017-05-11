export default class NodePosition {
    private _root: number
    private _left: number
    private _right: number
    private _deep: number

    /** 根的位置 */
    get root() { return this._root }

    /** 子树的左边界 */
    get left() { return this._left }

    /** 子树的右边界 */
    get right() { return this._right }

    /** 根的深度 */
    get deep() { return this._deep }


    constructor(root, left, right, deep) {
        this._root = root
        this._left = left
        this._right = right
        this._deep = deep
    }

    toArray() {
        return [this.root, this.left, this.right, this.deep]
    }

    static parentInMiddle(left: NodePosition, right: NodePosition, deep: number) {
        return new NodePosition(Math.floor((left._left + right._right) / 2), left._left, right._right, deep)
    }

    static right(left: NodePosition, deep: number) {
        return new NodePosition(left._left + 1, left._left + 1, left._left + 1, deep)
    }

    static random(deep: number) {
        return new NodePosition(0, 0, 0, deep)
    }
}
