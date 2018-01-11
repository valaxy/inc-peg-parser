import BackOperation from '../../lib/parsing/backOperation'
import ParsingNode from '../../lib/parsing/parsingNode'
import * as f from '../../lib/form/index'
import { assert } from 'chai'
import { createTree, checkTreeEqual, checkOperationResult } from './util'


describe('BackOperation', function() {
    let rule = f.chunk('aa')

    it('case', function() {
        let op = new BackOperation()
        let connective = new ParsingNode(rule)
        let vagrant = new ParsingNode('x')
        connective.progress.nextChoice()
        connective.progress.nextStep()

        checkOperationResult(op.do(connective, vagrant), connective, vagrant)
        checkTreeEqual(connective, createTree([rule]))
    })
})
