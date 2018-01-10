import * as f from '../../lib/form/index'
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
})
