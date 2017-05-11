import Form from './form'
import OptionalProgress from '../parseProgress/optional'

export default class Optional extends Form {
    get id() { return 4 }

    get subForm() { return this._subForm }

    constructor(private _subForm: Form) {
        super()
    }

    createProgress() {
        return new OptionalProgress(this)
    }
}
