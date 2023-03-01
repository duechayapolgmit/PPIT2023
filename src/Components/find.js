import React from "react"

export default class FindButton extends React.Component {
    getNearestSpace(){
        console.log('yo')
    }
    render(){
        return (
        <div className="container overlay find-button bg-teal-500" onClick={this.getNearestSpace}>
            Find
        </div>)
    }
}