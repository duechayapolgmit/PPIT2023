import React from "react";

export class InfoCard extends React.Component{
    render(){
        return (
            <div className="container text-left">
                <h1 className="text-xl font-bold">{this.props.marker}</h1>
                <p>Capacity: 0 / 200</p>
            </div>
        )
    }
}