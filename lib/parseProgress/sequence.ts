import ParseProgress from './parseProgress'
import ParsingNode from '../parsingNode'
import Sequence from '../form/sequence'

class SequenceProgress extends ParseProgress {
    private _choice = -1
    private _step = -1
    private _subForms: Form[]

    constructor(sequence: Sequence) {
        super()
        this._subForms = sequence.subForms
    }

    nextChoice() {
        this._choice += 1
        return this._choice < 1
    }

    nextStep() {
        this._step += 1
        return this._step < this._subForms.length
    }

    hasNextStep() {
        return this._step + 1 < this._subForms.length
    }

    consume(symbol: ParsingNode) {
        let form = this._subForms[this._step]
        if (symbol.isTerminal) { return new ParsingNode(form, form.isNamed) } // 可能
        if ((symbol.form as Form).isSameType(form)) { return symbol }
        return null
    }
}

export default SequenceProgress
