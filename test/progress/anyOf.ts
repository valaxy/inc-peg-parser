import * as f from '../../lib/form/index'
import ParsingNode from '../../lib/parsing/parsingNode'
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

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('three characters', function() {
        let rule = f.anyOf('abc')
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('consume', function() {
        let rule = f.anyOf('abc')
        let p = rule.createProgress()
        let r = f.chunk('xyz')

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('b')).type, 'connect')
        assert.equal(p.consume(new ParsingNode('x')).type, 'back')
        assert.throws(() => p.consume(new ParsingNode(r)))
    })
})
