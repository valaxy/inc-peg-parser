import Optional from '../form/optional'
import ParseProgress from './parseProgress'

export default class OptionalProgress extends ParseProgress {
    // 当前是否正在尝试匹配子规则
    // true: 正在尝试匹配
    // false: 尝试匹配过但是失败了
    private _tryMatching = true
    private _step: number = -1

    constructor(private _form: Optional) {
        super()
    }

    nextChoice() {
        if (this._tryMatching) {
            this._tryMatching = false
            return true
        } else {
            return false
        }
    }

    nextStep() {
        this._step += 1
    }

    hasNextStep() {
        if (this._tryMatching) {
            return this._step == -1 // 永远只有当前这一步有效
        } else {
            return false
        }
    }
}
