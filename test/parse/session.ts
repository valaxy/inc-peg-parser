import 'mocha'
import { assert } from 'chai'
import Session from '../../lib/parsing/session'
import ParsingNode from '../../lib/parsing/parsingNode'

describe('session', function() {
    it('_consume', function() {
        let s = new Session()
        let connective = new ParsingNode("abc")
        assert.isOk(true)
    })
})
