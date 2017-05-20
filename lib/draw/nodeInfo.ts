let index = 0

export default class NodeInfo {
    private _parentID: Number
    private _id: Number
    private _x: Number
    private _y: Number

    get id() { return this._id }

    get parentID() { return this._parentID }

    get x() { return this._x }

    get y() { return this._y }

    constructor(id: Number, parentID: Number, x: Number, y: Number) {
        this._id = id
        this._parentID = parentID
        this._x = x
        this._y = y
    }
}
