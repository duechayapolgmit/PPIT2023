import React from "react";
import { MarkerItem } from "./markerItem";

export class Markers extends React.Component{
    render(){
        return this.props.markers.map(
            (marker)=>{
                return <MarkerItem marker={marker} Reload={this.componentDidMount}></MarkerItem>
            }
        );
    }
}
export default Markers;