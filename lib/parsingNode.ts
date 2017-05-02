import Form from './form/form'
import ParseProgress from './form/parseProgress'

export default class ParsingNode {
    private _parent: ParsingNode
    private _children: ParsingNode[]
    private _form: Form|string
    private _progress: ParseProgress
    private _isNaming: boolean // 是否是命名节点

    get parent() { return this._parent }

    get children() { return this._children }

    get form() { return this._form }

    get progress() { return this._progress }

    get isNaming() { return this._isNaming }

    get isTerminal() { return this.hasNoChildren() }

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

    /** 分离叶节点并返回 */
    seperateLeafs(): ParsingNode[] {

    }

    add(otherNode) {
        otherNode._parent = this
        this._children.push(otherNode)
    }
}
