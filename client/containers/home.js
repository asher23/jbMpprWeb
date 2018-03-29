import React, { Component } from 'react';
import { Map, Sidebar, SearchBox, JobsList } from '../components'
import { connect } from 'react-redux';
import state, { fetchJobs, searchFor, saveJob} from '../store'

class SimpleMapPage extends Component {
    
    static defaultProps = {
        center: {lat: 40.642878, lng:  -73.973435},
        zoom: 11
    };

    state = {
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDfelta: 0.09
        }
    }

    onBoundsChange = ({center: {lng, lat}, bounds: {ne, nw, se, sw}} ) => {
        var latitudeDelta = Math.abs(ne.lat-se.lat)
        var longitudeDelta = Math.abs(nw.lng-ne.lng)
        var region = {
            longitude: lng,
            latitude: lat,
            longitudeDelta,
            latitudeDelta
        }
        this.setState({region})
        this.props.fetchJobs(
            region,
            'javascript'
        )
    }
    
    saveJob = (job) => {
        this.props.saveJob(job)
    }

    render() {
        const { jobs, center, zoom, fetchJobs, saveJob }  = this.props
        return (
            <div className='container-fluid' style={{maxWidth: '100%', width: '100%', height: '100%', maxHeight: '100%'}}>
                <div className='row'>
                    <div className='col-md-7'>
                        <Map onChange={this.onBoundsChange} jobs={jobs} center={enter} zoom={zoom}/>
                    </div>
                    <div className=' col-md-5 sidebar'>
                        <SearchBox region={this.state.region} fetchJobs={fetchJobs} callback={() => console.log('something')}/>
                        <JobsList saveJob={saveJob} jobs={jobs}/>
                    </div>
                </div>
            </div>
        );     
    }
}


const mapState = (state) => {
    return {
        jobs: state.jobs
    }
  }

export default connect(mapState, {fetchJobs, saveJob})(SimpleMapPage)