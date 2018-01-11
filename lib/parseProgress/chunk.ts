import ParseProgress from './parseProgress'
import Chunk from '../form/chunk'
import ParsingNode from '../parsing/parsingNode'
import BreakOperation from '../parsing/breakOperation'
import ConnectOperation from '../parsing/connectOperation'
import BackOperation from '../parsing/backOperation'

class ChunkProgress extends ParseProgress {
    private _choice = -1
    private _step: number

    get currentCharacter() {
        return this._chunk.text[this._step]
    }

    constructor(private _chunk: Chunk) {
        super()
        this.nextChoice()
    }

    nextChoice() {
        this._choice += 1
        this._step = -1
        return this._choice < 1
    }

    nextStep() {
        this._step += 1
    }

    hasNextStep() {
        return this._step + 1 < this._chunk.text.length
    }

    consume(vagrant: ParsingNode) {
        if (vagrant.isTerminal) {
            if (this.currentCharacter == vagrant.character) {
                return new ConnectOperation()
            }

            return new BackOperation()
        }

        return new BreakOperation()
    }
}

export default ChunkProgress
