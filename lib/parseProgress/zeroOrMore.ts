import ParseProgress from './parseProgress'
import ZeroOrMore from '../form/zeroOrMore'
import ParsingNode from '../parsing/parsingNode'
import TreeOperation from '../parsing/treeOperation'

export default class ZeroOrMoreProgress extends ParseProgress {
    private _trying = true
    private _maxMatchCount = -1
    private _successMatchCount = 0

    constructor(private _zeroOrMore: ZeroOrMore) {
        super()
    }

    nextChoice() {
        if (this._trying) {
            this._trying = false // 从尝试状态->固定匹配状态
            return true
        } else {
            return false
        }
    }

    nextStep() {
        if (this._trying) {
            this._maxMatchCount += 1
        } else {
            this._successMatchCount += 1
        }
    }

    hasNextStep() {
        if (this._trying) {
            return true
        } else {
            return this._successMatchCount < this._maxMatchCount
        }
    }

    consume(vagrant: ParsingNode) {
        if (vagrant.isTerminal) {
            // 这里不对匹配与否做具体判断，交由下层去判断
            return TreeOperation.descend(new ParsingNode(this._zeroOrMore.subForm))
        }

        if (this._zeroOrMore.subForm == vagrant.form) {
            return TreeOperation.connect()
        }

        return TreeOperation.break()
    }
}
