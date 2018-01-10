import Form from './form'
import ChoiceProgress from '../parseProgress/choice'

export default class Choice extends Form {
    private _subForms: Form[]

    get id() { return 1 }

    get subForms() { return this._subForms }

    constructor(...subForms: Form[]) {
        super()
        if (subForms.length == 0) { throw new Error('subForms should not empty') }
        this._subForms = subForms
    }

    createProgress() {
        return new ChoiceProgress(this)
    }
}
