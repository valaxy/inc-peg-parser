import Form from './form'
import ChunkProgress from '../parseProgress/chunk'

export default class Chunk extends Form {
    get id() { return 2 }

    get text() { return this._text }

    constructor(private _text: string) {
        super()
        if (this._text.length == 0) { throw new Error('should not be empty string') }
    }

    createProgress() {
        return new ChunkProgress(this)
    }
}
