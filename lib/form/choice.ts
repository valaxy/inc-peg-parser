import Form from './form'
import ChoiceProgress from '../parseProgress/choice'

class Choice extends Form {
    private _subForms: Form[]

    get subForms() { return this._subForms }

    constructor(...subForms: Form[]) {
        super()
        this._subForms = subForms
    }

    createProgress() {
        return new ChoiceProgress(this)
    }
}

export default Choice
