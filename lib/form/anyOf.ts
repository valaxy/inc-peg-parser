import Form from './form'
import AnyOfProgress from '../parseProgress/anyOf'

class AnyOf extends Form {
    get chars() { return this._chars }

    constructor(private _chars: string) {
        super()
    }

    createProgress() {
        return new AnyOfProgress(this)
    }
}

export default AnyOf
