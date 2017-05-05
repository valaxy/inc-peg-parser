import ParseProgress from './parseProgress'
import Chunk from '../form/chunk'

class ChunkProgress extends ParseProgress {
    private _choice = -1
    private _step = -1

    get currentCharacter() {
        return this._chunk.text[this._step]
    }

    constructor(private _chunk: Chunk) {
        super()
    }

    nextChoice() {
        this._choice += 1
        return this._choice < 1
    }

    nextStep() {
        this._step += 1
        return this._step < this._chunk.text.length
    }

    hasNextStep() {
        return this._step + 1 < this._chunk.text.length
    }
}

export default ChunkProgress
