import OneOrMore from '../form/oneOrMore'
import ParseProgress from './parseProgress'

export default class OneOrMoreProgress extends ParseProgress {
    private _trying = true // 是否是尝试状态
    private _maxMatchCount: number
    private _parseCount = 0

    get form() {
        return this._form
    }

    nextChoice() {
        if (this._trying) {
            if (this._parseCount > 1) { // 说明至少解析过2次, 最后1次失败才会进到这里
                this._trying = false
                this._maxMatchCount = this._parseCount - 1 // 最大匹配成功次数
                this._parseCount = 0
                return true
            } else { // 1次都没解析成功
                return false
            }
        } else {
            return false
        }
    }

    nextStep() {
        this._parseCount += 1
        return true
    }

    hasNextStep() {
        if (this._trying) {
            return true
        } else {
            return this._parseCount < this._maxMatchCount
        }
    }

    constructor(private _form: OneOrMore) {
        super()
    }
}
