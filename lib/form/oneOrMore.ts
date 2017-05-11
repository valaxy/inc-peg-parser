import Form from './form'
import OneOrMoreProgress from '../parseProgress/oneOrMore'

export default class OneOrMore extends Form {
    get id() { return 3 }

    get subForm() { return this._subForm }

    constructor(private _subForm: Form) {
        super()
    }

    createProgress() {
        return new OneOrMoreProgress(this)
    }
}
