import ParseProgress from './parseProgress'
import Optional from '../form/optional'
import ParsingNode from '../parsing/parsingNode'
import TreeOperation from '../parsing/treeOperation'
import AssertError from '../assertError'
import BreakOperation from '../parsing/breakOperation'
import ConnectOperation from '../parsing/connectOperation'
import DescendOperation from '../parsing/descendOperation'
import SealOperation from '../parsing/sealOperation'

export default class OptionalProgress extends ParseProgress {
    // 当前是否正在尝试匹配子规则
    // true: 正在尝试匹配
    // false: 尝试匹配过但是失败了
    private _trying = true

    // 匹配子规则的次数, 正在匹配也计算在内
    private _matchCount: number = 0

    constructor(private _optional: Optional) {
        super()
    }

    nextChoice() {
        if (this._trying) {
            this._trying = false
            this._matchCount = 0
            return true
        } else {
            return false
        }
    }

    nextStep() {
        if (this._trying) {
            this._matchCount += 1
            return
        }

        this._matchCount += 1
        if (this._matchCount > 1) {
            throw new AssertError(`impossible _matchCount > 1 when _trying === false`)
        }
    }

    hasNextStep() {
        if (this._trying) {
            return this._matchCount == 0
        } else if (this._matchCount == 0) {
            return true // 作为一个特例, 第一步是匹配空字符串用的
        } else {
            return false // 可选状态只有一步
        }
    }

    consume(vagrant: ParsingNode) {
        if (this._trying) {
            if (this._matchCount !== 1) { throw new AssertError('_matchCount should equal 1') }

            // 首次尝试匹配子规则的阶段
            if (vagrant.isTerminal) {
                return new DescendOperation(new ParsingNode(this._optional.subForm))
            } else {
                if (this._optional.subForm == vagrant.form) {
                    return new ConnectOperation()
                } else {
                    return new BreakOperation()
                }
            }
        }

        // 匹配空字符串
        return new SealOperation()
    }
}
