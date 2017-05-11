import Form from './form/form'
import ParseProgress from './parseProgress/parseProgress'

export default class ParsingNode {
    // for share use
    _nextUnboundNode: ParsingNode = null

    // for private use
    private _parent: ParsingNode
    private _children: ParsingNode[]
    private _form: Form|string
    private _progress: ParseProgress
    private _isNaming: boolean // 是否是命名节点

    get parent() { return this._parent }

    get children() { return this._children }

    get form() { return this._form }

    get progress() { return this._progress }

    get isNamed() { return this._isNaming }

    get isTerminal() { return this.hasNoChild() }

    get nextUnboundNode() { return this._nextUnboundNode }

    set nextUnboundNode(node) { this._nextUnboundNode = node }

    // constructor('a')
    // constructor(new Form)
    // constructor(new Form, true)
    constructor(form: Form|string, isNaming: boolean = false) {
        this._parent = null
        this._children = []
        this._form = form
        if (typeof form == 'string') {
            this._progress = null
            this._isNaming = false
        } else {
            this._progress = form.createProgress()
            this._isNaming = isNaming
        }
    }

    hasParent() {
        return !!this.parent
    }

    findIndex(): number {
        let children = this.parent.children
        for (let i=0; i<children.length; i++) {
            if (children[i] == this) { return i }
        }
    }

    hasChild() {
        return this.children.length > 0
    }

    hasNoChild() {
        return !this.hasChild()
    }

    isFirstChild() {
        return this.parent.children[0] == this
    }

    firstChild(): ParsingNode {
        return this.children[0]
    }

    lastChild(): ParsingNode {
        return this.children[this.children.length - 1]
    }


    seperateDescendants() {
        this._children.forEach(child => child._parent = null)
        this._children = []
    }

    seperateAtRoot(): ParsingNode[] {
        return null
    }

    /** 分离叶节点并返回 */
    seperateLeafs(): ParsingNode[] {
        return null
    }

    seperateRightRelativeNodes(): ParsingNode[] {
        return null
    }

    remove(): ParsingNode {
        return null
    }

    leftmost(): ParsingNode {
        return null
    }

    rightmost(): ParsingNode {
        return null
    }

    breakRightRelative() {
        let subTrees = []
        let node: ParsingNode = this
        let previousNode: ParsingNode = this
        while (true) {
            let parent = node.parent
            if (parent) { return subTrees }

            let index = parent.children.indexOf(node)
            for (let i=index+1; i<parent.children.length; i++) {
                let nextTreeRoot = parent.children[i].remove()
                subTrees.push(nextTreeRoot)
                previousNode.nextUnboundNode = nextTreeRoot // TODO 这里如果有算法可以把unboundNode绑定到非终结节点上, 也许可以提高速度
                previousNode = nextTreeRoot.rightmost()
            }
            node = parent
        }
    }


    add(otherNode) {
        otherNode._parent = this
        this._children.push(otherNode)
    }


    getNextUnboundNode() {

    }

    removeChildren(): ParsingNode[] {
        return null
    }
}
