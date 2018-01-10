import ParseProgress from './parseProgress'
import OneOrMore from '../form/oneOrMore'
import ParsingNode from '../parsing/parsingNode'
import TreeOperation from '../parsing/treeOperation'
import AssertError from '../assertError'

export default class OneOrMoreProgress extends ParseProgress {
    private _trying = true // 是否是尝试状态
    private _maxMatchCount: number = -1
    private _successMatchCount: number

    constructor(private _oneOrMore: OneOrMore) {
        super()
    }

    nextChoice() {
        if (this._trying) {
            if (this._maxMatchCount >= 1) { // 至少解析过2次, 最后1次失败才会进到这里, 因此解析成功至少1次
                this._trying = false
                this._successMatchCount = 0
                return true
            } else { // 1次都没解析成功
                return false
            }
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
            console.log(this._successMatchCount, this._maxMatchCount)
            return this._successMatchCount < this._maxMatchCount
        }
    }

    consume(vagrant: ParsingNode) {
        if (this._trying) {
            if (vagrant.isTerminal) {
                // 是否匹配交由下层去判断
                // - 如果匹配将会通过nextStep继续匹配子规则
                // - 如果不匹配将会通过nextChoice进入到固定匹配阶段, 或者因不符合最小匹配次数而失败
                return TreeOperation.descend(new ParsingNode(this._oneOrMore.subForm))
            } else if (this._oneOrMore.subForm == vagrant.form) {
                return TreeOperation.connect()
            } else {
                return TreeOperation.break()
            }
        } else {
            if (this._maxMatchCount == 0) { throw new AssertError('maxMatchCount cannot be 0') }
            if (vagrant.isTerminal) { throw new AssertError(`vagrant cannot be terminal node`) }
            if (this._oneOrMore.subForm != vagrant.form) { throw new AssertError('vagrant.form cannot match not subForm') }
            return TreeOperation.connect()
        }
    }
}
