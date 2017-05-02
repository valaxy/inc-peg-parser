import AnyOf from '../lib/form/anyOf'
const assert = require('chai').assert

class MockParsingNode {
    get isTerminal() { return this._isTerminal }
    get form() { return this._form }
    constructor(private _isTerminal, private _form) {}
}

describe('AnyOf', function() {
    it('case0', function() {
        let a = new AnyOf('abc')
        let pro = a.createProgress()
        assert.isOk(pro.nextChoice())

        assert.isOk(pro.hasNextStep())
        assert.isOk(pro.nextStep())

        assert.isOk(!pro.hasNextStep())
        assert.isOk(!pro.nextStep())

        assert.isOk(!pro.nextChoice())
        assert.isOk(!pro.hasNextStep())
        assert.isOk(!pro.nextStep())
    })

    it('consume', function() {
        let a = new AnyOf('xyz')
        let pro = a.createProgress()
        assert.isOk(pro.consume(new MockParsingNode(true, 'x') as any))
        assert.isOk(pro.consume(new MockParsingNode(true, 'y') as any))
        assert.isOk(pro.consume(new MockParsingNode(true, 'z') as any))
        assert.isOk(pro.consume(new MockParsingNode(true, 'xy') as any))

        assert.isOk(!pro.consume(new MockParsingNode(true, 'a') as any))
        assert.isOk(!pro.consume(new MockParsingNode(false, 'x') as any))
    })
})
