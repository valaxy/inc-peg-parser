import Form from './form'
import SequenceProgress from '../parseProgress/sequence'

class Sequence extends Form {
    private _subForms

    get subForms() { return this._subForms }

    constructor(...subForms: Form[]) {
        super()
        this._subForms = subForms
    }

    createProgress() {
        return new SequenceProgress(this)
    }
}


export default Sequence
