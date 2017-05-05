import ParseProgress from './parseProgress'
import Sequence from '../form/sequence'

class SequenceProgress extends ParseProgress {
    private _choice = -1
    private _step = -1

    get currentSubForm() {
        return  this._sequence.subForms[this._step]
    }

    constructor(private _sequence: Sequence) {
        super()
    }

    nextChoice() {
        this._choice += 1
        return this._choice < 1
    }

    nextStep() {
        this._step += 1
        return this._step < this._sequence.subForms.length
    }

    hasNextStep() {
        return this._step + 1 < this._sequence.subForms.length
    }
}

export default SequenceProgress
