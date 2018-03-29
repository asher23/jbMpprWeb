import React, { Component} from 'react';

export default class JobsList extends Component {

    state = {
        clicked: ''
    }

    saveJob = (e) => {
        e.preventDefault()
        console.log('e.value', e.target.value)
        this.props.saveJob(e.target.value)
    }

    renderJobsList() {
        const { jobs, saveJob } = this.props
        console.log(' r u running again?')
        return jobs.map((job, i) => {
            console.log('job id', job.id, this.state.clicked)
            return (
                <div onClick={() => this.setState({clicked: job.id})} key={job.id} style={{border: '2px solid black', marginBottom: '8px', backgroundColor: 'red'}}>
                    <h4>{job.jobtitle}</h4>
                    <h4>{job.company}</h4>
                    <h4>{job.formattedRelativeTime}</h4>
                    <div className={this.state.clicked === job.id ? '' : 'hidden'}>
                        <p>
                            {job.description}
                        </p>
                        <button value={job.id} className='btn' onClick={this.saveJob}>Save This Job</button>
                    </div>
                </div>
            )
        }, this) 
    }

    
    render() {
        const { jobs } = this.props
        if (!jobs[0]) {return null}
        return (
            <div style={{color: 'white'}}>
                {this.renderJobsList()}
            </div>
        )
    }
}