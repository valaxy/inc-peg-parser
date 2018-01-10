import Optional from '../form/optional'
import ParseProgress from './parseProgress'

export default class OptionalProgress extends ParseProgress {
    // 当前是否正在尝试匹配子规则
    // true: 正在尝试匹配
    // false: 尝试匹配过但是失败了
    private _tryMatching = true

    nextChoice() {
        if (this._tryMatching) {
            this._tryMatching = false
            return true
        } else {
            return false
        }
    }

    nextStep() {
        // do nothing
    }

    hasNextStep() {
        return false // 永远只有当前这一步有效
    }

    constructor(private _form: Optional) {
        super()
    }
}
