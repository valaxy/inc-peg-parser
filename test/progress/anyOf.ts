import * as f from '../../lib/form/index'
import { assert } from 'chai'

describe('AnyOfProgress', function() {
    it('empty', function() {
        assert.throws(() => {
            let rule = f.anyOf('')
        })
    })

    it('one character', function() {
        let rule = f.anyOf('a')
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('two characters', function() {
        let rule = f.anyOf('ab')
        let p = rule.createProgress()

        assert.isOk(p.nextChoice())
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('three characters', function() {
        let rule = f.anyOf('abc')
        let p = rule.createProgress()

        assert.isOk(p.nextChoice())
        assert.isOk(p.hasNextStep())
        p.nextStep()

        assert.isOk(p.nextChoice())
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

})


// class MockParsingNode {
//     get isTerminal() { return this._isTerminal }
//     get form() { return this._form }
//     constructor(private _isTerminal, private _form) {}
// }

// it('consume', function() {
//     let a = f.anyOf('xyz')
//     let pro = a.createProgress()
//     assert.isOk(pro.consume(new MockParsingNode(true, 'x') as any))
//     assert.isOk(pro.consume(new MockParsingNode(true, 'y') as any))
//     assert.isOk(pro.consume(new MockParsingNode(true, 'z') as any))
//     assert.isOk(pro.consume(new MockParsingNode(true, 'xy') as any))
//
//     assert.isOk(!pro.consume(new MockParsingNode(true, 'a') as any))
//     assert.isOk(!pro.consume(new MockParsingNode(false, 'x') as any))
// })
