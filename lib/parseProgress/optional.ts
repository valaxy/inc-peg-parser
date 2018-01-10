import ParseProgress from './parseProgress'
import Optional from '../form/optional'
import ParsingNode from '../parsing/parsingNode'
import TreeOperation from '../parsing/treeOperation'

export default class OptionalProgress extends ParseProgress {
    // 当前是否正在尝试匹配子规则
    // true: 正在尝试匹配
    // false: 尝试匹配过但是失败了
    private _trying = true
    private _step: number = -1

    constructor(private _optional: Optional) {
        super()
    }

    nextChoice() {
        if (this._trying) {
            this._trying = false
            return true
        } else {
            return false
        }
    }

    nextStep() {
        this._step += 1
    }

    hasNextStep() {
        if (this._trying) {
            return this._step < 1
        } else {
            return false
        }
    }

    consume(vagrant: ParsingNode) {
        if (this._trying) {
            if (this._step == 0) { // 尝试匹配子规则的阶段
                if (vagrant.isTerminal) {
                    return TreeOperation.descend(new ParsingNode(this._optional.subForm))
                } else {
                    if (this._optional.subForm == vagrant.form) {
                        return TreeOperation.connect()
                    } else {
                        return TreeOperation.break()
                    }
                }
            } else if (this._step == 1) {
                return TreeOperation.seal() // 匹配子规则1次成功
            } else {
                throw new Error(`error step = ${this._step}`)
            }
        }

        // 匹配空字符串
        return TreeOperation.seal()
    }
}
