import ConnectOperation from '../../lib/parsing/connectOperation'
import ParsingNode from '../../lib/parsing/parsingNode'
import * as f from '../../lib/form/index'
import { assert } from 'chai'
import { createTree, checkTreeEqual, checkOperationResult } from './util'


describe('ConnectOperation', function() {
    let op = new ConnectOperation()
    let rule = f.chunk('abc')

    it('last 1 vagrant', function() {
        let connective = new ParsingNode(rule)
        let vagrant = new ParsingNode('a')
        checkOperationResult(op.do(connective, vagrant), connective, null)
        checkTreeEqual(connective, createTree([rule, [['a']]]))
    })

    it('last 2 vagrants', function() {
        let connective = new ParsingNode(rule)
        let vagrant = new ParsingNode('a')
        let vagrant2 = new ParsingNode('b')
        vagrant.nextVagrantNode = vagrant2

        checkOperationResult(op.do(connective, vagrant), connective, vagrant2)
        checkTreeEqual(connective, createTree([rule, [['a']]]))
        assert.equal(vagrant.nextVagrantNode, null)

        checkOperationResult(op.do(connective, vagrant2), connective, null)
        checkTreeEqual(connective, createTree([rule, [['a'], ['b']]]))
    })
})
