import ParseProgress from './parseProgress'
import AnyOf from '../form/anyOf'
import ParsingNode from '../parsing/parsingNode'
import TreeOperation from '../parsing/treeOperation'

class AnyOfProgress extends ParseProgress {
    private _trying: boolean = false // 只有唯一的状态

    constructor(private _anyOf: AnyOf) {
        super()
    }

    private _accept(ch: string) {
        return this._anyOf.chars.indexOf(ch) >= 0
    }

    nextChoice() {
        return false // 只有当前一种选择
    }

    nextStep() {
        this._trying = true
    }

    hasNextStep() {
        return !this._trying
    }

    consume(vagrant: ParsingNode) {
        if (vagrant.isTerminal) {
            if (this._accept(vagrant.character)) {
                return TreeOperation.connect()
            } else {
                return TreeOperation.back()
            }
        }

        throw new Error('vagrant should be a terminal node')
    }
}

export default AnyOfProgress
