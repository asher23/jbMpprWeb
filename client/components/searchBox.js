import React, { Component} from 'react';

export default class SearchBox extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        const {fetchJobs, region, callback}  = this.props
        fetchJobs(region, e.target.value, callback)
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Search for Jobs</label>
                    <input name='keyword'  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Search Keywords"/>
                </div>
                <button type='submit'>
                    Submit
                </button>
            </form>
        )
    }
}