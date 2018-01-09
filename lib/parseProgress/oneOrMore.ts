import OneOrMore from '../form/oneOrMore'
import ParseProgress from './parseProgress'

export default class OneOrMoreProgress extends ParseProgress {
    private _trying = false // 是否是尝试状态
    private _parseCount = 0
    private _maxMatchCount: number

    get form() {
        return this._form
    }

    nextChoice() {
        if (this._trying) {
            if (this._parseCount <= 1) { // 如果一次解析

            }
            this._trying = false
            this._maxMatchCount = this._parseCount
            return true
        } else {
            return false
        }
    }

    nextStep() {
        this._parseCount += 1
        if (this._trying) {
            return true
        } else {
            return this._parseCount <= this._maxMatchCount
        }
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
