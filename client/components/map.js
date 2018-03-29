import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const MY_KEY = 'AIzaSyDgOS46uIyks1AnO2F3ZzgW1S9Y5V3X_6Y'
const AnyReactComponent = ({ text }) => {
    return (
        <div>
            <h3><i class="fas fa-map-marker"></i></h3>
            {text}
        </div>
    )
}

export default class SimpleMap extends Component {
    
    renderMarkers() {
        return this.props.jobs.map((job, i) => {
            return (
                <AnyReactComponent
                    lat={job.latitude}
                    lng={job.longitude}
                    text={job.jobtitle}
                />
            )
        })
    }
    render() {
        const { center, zoom } = this.props
        const mapStyle = {height: 'calc(100vh - 30px)'}
        
        return (
                <GoogleMapReact
                    style={mapStyle}
                    bootstrapURLKeys={{ key: [MY_KEY] }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    onChange={this.props.onChange}
                >
                    {this.renderMarkers()}
                </GoogleMapReact>
            );  
    }
}