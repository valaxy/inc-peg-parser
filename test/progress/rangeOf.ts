import * as f from '../../lib/form/index'
import { assert } from 'chai'

describe('RangeOfProgress', function() {
    it('case', function() {
         let rule = f.rangeOf('a', 'b')
         let p = rule.createProgress()

         assert.isOk(p.hasNextStep())
         p.nextStep()
         assert.isNotOk(p.hasNextStep())

         assert.isNotOk(p.nextChoice())
    })
})
