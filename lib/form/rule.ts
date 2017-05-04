import Form from './form'
import RuleProgress from '../parseProgress/rule'

class Rule extends Form {
    get subForm() { return this._subForm }

    set subForm(value) { this._subForm = value }

    get name() { return this._name }

    constructor(private _name: string, private _subForm: Form = null) {
        super()
    }

    createProgress() {
        return new RuleProgress(this)
    }
}

export default Rule
