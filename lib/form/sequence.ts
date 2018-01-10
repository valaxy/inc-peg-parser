import Form from './form'
import SequenceProgress from '../parseProgress/sequence'

export default class Sequence extends Form {
    private _subForms

    get id() { return 7 }

    get subForms() { return this._subForms }

    constructor(...subForms: Form[]) {
        super()
        if (subForms.length == 0) { throw new Error('subForms should not empty') }
        this._subForms = subForms
    }

    createProgress() {
        return new SequenceProgress(this)
    }
}
