import ParsingNode from './parsingNode'

export default class TreeOperation {
    static connect() {
        return new TreeOperation('connect')
    }

    static back() {
        return new TreeOperation('back')
    }

    static descend(subNode: ParsingNode) {
        return new TreeOperation('descend', subNode)
    }

    static break() {
        return new TreeOperation('break')
    }

    static seal() {
        return new TreeOperation('seal')
    }

    constructor(public type: string, public value?: any) { }
}
