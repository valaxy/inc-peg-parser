import * as f from '../lib/form/index'
import chai = require('chai')
import Session from '../lib/parsing/session'
import verbatimParsing from '../lib/parsing/verbatimParsing'
import ParsingNode from '../lib/parsing/parsingNode'
import createPEG from '../lib/debug/peg/numberExpression'

// 创建游离节点链表
const createVagrantLinked = function(str) {
    let nodes = str.split('').map(ch => new ParsingNode(ch))
    for (let i=1; i<nodes.length; i++) {
        nodes[i-1].nextVagrant = nodes[i]
    }
    return [nodes[0], nodes[nodes.length-1]]
}

describe('xx', function() {
    it('yy', function() {
        let [vagrantStart, vagrantEnd] = createVagrantLinked('123')
        let peg = createPEG()
        let root = new ParsingNode(peg)
        let session = new Session(verbatimParsing)
        session.insertAfter(root, vagrantStart, vagrantEnd)
    })
})
