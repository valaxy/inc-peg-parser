import Form from './form/form'
import ParseProgress from './form/parseProgress'

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

    get isTerminal() { return this.hasNoChildren() }

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

    hasNoChildren() {
        return this._children.length == 0
    }

    seperateDescendants() {
        this._children.forEach(child => child._parent = null)
        this._children = []
    }

    seperateAtRoot(): ParsingNode[] {

    }

    /** 分离叶节点并返回 */
    seperateLeafs(): ParsingNode[] {

    }

    seperateRightRelativeNodes(): ParsingNode[] {

    }

    remove(): ParsingNode {

    }

    leftmost(): ParsingNode {

    }

    rightmost(): ParsingNode {

    }

    breakRightRelative() {
        let node = this
        let subTrees = []
        let previousNode = this
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

    }
}
