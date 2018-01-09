import 'mocha'
import chai = require('chai')
import Session from '../lib/parsing/session'
import verbatimParsing from '../lib/parsing/verbatimParsing'
import ParsingNode from '../lib/parsing/parsingNode'
import {  } from '../lib/parseProgress/chunk'

const assert = chai.assert

describe('session', function() {
    it('_consume', function() {
        let s = new Session(verbatimParsing)
        let connective = new ParsingNode("abc")
        assert.isOk(true)
    })
})
