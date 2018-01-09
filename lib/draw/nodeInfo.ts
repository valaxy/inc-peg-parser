let index = 0

export default class NodeInfo {
    private _parentID: number
    private _id: number
    private _x: number
    private _y: number
    private _name: string

    get id() { return this._id }

    get parentID() { return this._parentID }

    get x() { return this._x }

    get y() { return this._y }

    get name() { return this._name }

    set x(v) { this._x = v }

    constructor(id: number, parentID: number, x: number, y: number, name: string) {
        this._id = id
        this._parentID = parentID
        this._x = x
        this._y = y
        this._name = name
    }
}
