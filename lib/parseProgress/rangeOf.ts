import RangeOf from '../form/rangeOf'
import ParseProgress from './parseProgress'

export default class RangeOfProgress extends ParseProgress {
    private _choice = -1
    private _step: number

    constructor(private _form: RangeOf) {
        super()
        this.nextChoice()
    }

    nextChoice() {
        this._choice += 1
        this._step = -1
        return this._choice < 1
    }

    nextStep() {
        this._step += 1
    }

    hasNextStep() {
        return this._step < 0
    }


    accept(ch: string) {
        ch = ch[0]
        return this._form.charStart <= ch && ch <= this._form.charEnd
    }
}
