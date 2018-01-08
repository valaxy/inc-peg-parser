import React = require('react')
import ReactDom = require('react-dom')
import sigma = require('sigma')
import ParsingNode from '../parsingNode'
import leftAlignNarrowDraw from '../draw/leftAlignNarrowDraw'
import centerAlignNarrowDraw from '../draw/centerAlignNarrowDraw'
import Sidebar from './sidebar/index'
import './index.scss'

const createNode = function(symbol = '@', children = []) {
    let node: any = new ParsingNode(symbol, false)
    node._children = children
    children.forEach(child => child._parent = node)
    return node
}

class Main extends React.Component {
    private _container

    componentDidMount() {
        let container = new sigma(this._container)
        let root = createNode('a', [
            createNode('b'),
            createNode('c', [
                createNode('d'),
                createNode('e'),
                createNode('f')
            ]),
            createNode('g'),
            createNode('f', [
                createNode('h'),
                createNode('i')
            ])
        ])

        let infos = centerAlignNarrowDraw(root)
        infos.forEach((info) => {
            container.graph.addNode({
                id: `n${info.id}`,
                label: info.parentID,
                x: info.x,
                y: info.y,
                size: 1,
                color: '#f00'
            })
        })

        infos.forEach((info, index) => {
            if (info.parentID !== null) {
                container.graph.addEdge({
                    id: `e${index}`,
                    source: `n${info.parentID}`,
                    target: `n${info.id}`
                })
           }
        })

        container.refresh();
    }

    render() {
        return (
            <div className="main">
                <Sidebar />
                <div className="canvas" ref={_ => this._container = _}>
                </div>
            </div>
        )
    }
}


ReactDom.render(<Main />, document.querySelector('.everything'))
