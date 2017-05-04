import Form from './form'
import ChunkProgress from '../parseProgress/chunk'

class Chunk extends Form {
    get text() { return this._text }

    constructor(private _text: string) {
        super()
    }

    createProgress() {
        return new ChunkProgress(this)
    }
}

export default Chunk
