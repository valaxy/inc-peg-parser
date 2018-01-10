import * as f from '../../lib/form/index'
import ParsingNode from '../../lib/parsing/parsingNode'
import { assert } from 'chai'

describe('RangeOfProgress', function() {
    let rule = f.rangeOf('a', 'd')

    it('case', function() {
         let p = rule.createProgress()

         assert.isOk(p.hasNextStep())
         p.nextStep()
         assert.isNotOk(p.hasNextStep())

         assert.isNotOk(p.nextChoice())
    })

    it('consume', function() {
        let p = rule.createProgress()

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('a')).type, 'connect')
        assert.equal(p.consume(new ParsingNode('d')).type, 'connect')
        assert.equal(p.consume(new ParsingNode('x')).type, 'back')
        assert.equal(p.consume(new ParsingNode(rule)).type, 'break')

        assert.isNotOk(p.hasNextStep())
        assert.isNotOk(p.nextChoice())
    })
})
