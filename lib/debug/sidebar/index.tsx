import React = require('react')
import './index.scss'

export default class Sidebar extends React.Component {
    _handleClickNext() {

    }

    _handleClickPrev() {

    }

    render() {
        return (
            <div className="sidebar">
                <div className="buttonList">
                    <button onClick={this._handleClickPrev.bind(this)}>&lt;</button>
                    <button onClick={this._handleClickNext.bind(this)}>&gt;</button>
                </div>
            </div>
        )
    }
}
