import Optional from '../form/optional'
import ParseProgress from './parseProgress'

export default class OptionalProgress extends ParseProgress {
    private _choice = -1
    private _step   = -1

    nextChoice() {
        this._choice += 1
        return this._choice < 2
    }

    nextStep() {
        this._step += 1
        return this._step < 1
    }

    hasNextStep() {
        return this._step < 0
    }

    constructor(private _form: Optional) {
        super()
    }
}
