import Form from './form'
import AnyOfProgress from '../parseProgress/anyOf'

export default class AnyOf extends Form {
    get chars() { return this._chars }

    get id() { return 0 }

    constructor(private _chars: string) {
        super()
        if (this._chars.length == 0) { throw new Error('can not be empty string') }
    }

    createProgress() {
        return new AnyOfProgress(this)
    }
}
