import Form from '../form/form'
import ParseProgress from '../parseProgress/parseProgress'


/** 解析树的节点 */
export default class ParsingNode {
    // 指向下一个游离节点
    // 各个游离节点通过该属性组成一个链表结构
    private _nextVagrantNode: ParsingNode = null

    // 树结构指针
    private _parent: ParsingNode = null
    private _children: ParsingNode[] = []
    private _form: Form|string
    private _progress: ParseProgress

    get nextVagrantNode() { return this._nextVagrantNode }

    set nextVagrantNode(node) { this._nextVagrantNode = node }

    get parent() { return this._parent }

    get children() { return this._children }

    get isTerminal() { return typeof this._form == 'string' }

    get form(): Form {
        if (this.isTerminal) { throw new Error('should not be a terminal') }
        return this._form as Form
    }

    get character(): string {
        if (!this.isTerminal) { throw new Error('should be a terminal') }
        return this._form as string
    }

    get progress() { return this._progress }

    get hasParent() { return !!this.parent }

    get hasChild() { return this.children.length > 0 }


    // constructor('a')
    // constructor(new Form)
    constructor(form: Form|string) {
        this._form = form
        if (typeof form == 'string') {
            this._progress = null
        } else {
            this._progress = form.createProgress()
        }
    }


    //
    // TODO 下面的接口还需要使用吗???
    //

    findIndex(): number {
        let children = this.parent.children
        for (let i=0; i<children.length; i++) {
            if (children[i] == this) { return i }
        }
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
                previousNode.nextVagrantNode = nextTreeRoot // TODO 这里如果有算法可以把unboundNode绑定到非终结节点上, 也许可以提高速度
                previousNode = nextTreeRoot.rightmost()
            }
            node = parent
        }
    }


    add(otherNode) {
        otherNode._parent = this
        this._children.push(otherNode)
    }

    removeChildren(): ParsingNode[] {
        return null
    }
}
