import ParseProgress from './parseProgress'
import ZeroOrMore from '../form/zeroOrMore'
import ParsingNode from '../parsing/parsingNode'
import DescendOperation from '../parsing/descendOperation'
import BreakOperation from '../parsing/breakOperation'
import ConnectOperation from '../parsing/connectOperation'

export default class ZeroOrMoreProgress extends ParseProgress {
    // true: 尝试状态
    // false: 固定匹配状态
    private _trying = true

    // 固定匹配状态的应该匹配次数在尝试状态完成计算
    private _maxMatchCount = -1

    // 固定匹配状态的匹配次数, 包括正在匹配的情况
    private _matchCount = 0

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
            this._matchCount += 1
        }
    }

    hasNextStep() {
        if (this._trying) {
            return true
        } else {
            return this._matchCount < this._maxMatchCount
        }
    }

    consume(vagrant: ParsingNode) {
        if (vagrant.isTerminal) {
            // 这里不对匹配与否做具体判断，交由下层去判断
            return new DescendOperation(new ParsingNode(this._zeroOrMore.subForm))
        }

        if (this._zeroOrMore.subForm == vagrant.form) {
            return new ConnectOperation()
        }

        return new BreakOperation()
    }
}
