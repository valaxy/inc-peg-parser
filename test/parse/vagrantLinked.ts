import VagrantLinked from '../../lib/parsing/vagrantLinked'
import ParsingNode from '../../lib/parsing/parsingNode'
import { assert } from 'chai'


const createVagrantLinked = function() {
    let n1 = new ParsingNode('')
    let n2 = new ParsingNode('')
    n1.nextVagrantNode = n2
    return [n1, n2]
}

describe('VagrantLinked', function() {
    describe('connect', function() {
        it('length == 0', function() {
            let [n1, n2] = createVagrantLinked()
            let head = VagrantLinked.connect([], n1)
            assert.equal(head, n1)
            assert.equal(head.nextVagrantNode, n2)
        })

        it('length == 1', function() {
            let [n1, n2] = createVagrantLinked()
            let p1 = new ParsingNode('')
            let head = VagrantLinked.connect([p1], n1)
            assert.equal(head, p1)
            assert.equal(head.nextVagrantNode, n1)
        })

        it('length == 2', function() {
            let [n1, n2] = createVagrantLinked()
            let p1 = new ParsingNode('')
            let p2 = new ParsingNode('')
            let head = VagrantLinked.connect([p1, p2], n1)
            assert.equal(head, p1)
            assert.equal(p1.nextVagrantNode, p2)
            assert.equal(p2.nextVagrantNode, n1)
        })
    })
})
