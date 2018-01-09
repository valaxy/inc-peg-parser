import ZeroOrMore from '../form/zeroOrMore'
import ParseProgress from './parseProgress'

export default class ZeroOrMoreProgress extends ParseProgress {
    private _choice = -1
    private _step   = -1

    get form() {
        return this._form
    }

    nextChoice() {
        this._choice += 1
        return true
    }

    nextStep() {
        this._step += 1
        return this._step < 1
    }

    hasNextStep() {
        return this._step < 0
    }

    constructor(private _form: ZeroOrMore) {
        super()
    }
}
