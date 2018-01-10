import * as f from '../../lib/form/index'
import ParsingNode from '../../lib/parsing/parsingNode'
import { assert } from 'chai'


describe('ChunkProgress', function() {
    it('empty', function() {
        assert.throws(() => {
            let rule = f.chunk('')
        })
    })

    it('one character', function() {
        let rule = f.chunk('a')
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('two characters', function() {
        let rule = f.chunk('ab')
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })


    it('consume', function() {
        let rule = f.chunk('xy')
        let p = rule.createProgress()

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('x')).type, 'connect')
        assert.equal(p.consume(new ParsingNode('y')).type, 'back')

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('y')).type, 'connect')
        assert.equal(p.consume(new ParsingNode('x')).type, 'back')

        assert.equal(p.consume(new ParsingNode(rule)).type, 'break')
    })
})
