import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs'
const FETCH_JOBS = 'FETCH_JOBS';

//4201738803816157
const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
}

const buildJobsUrl = (zip, keyword) => {
    const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip, q: keyword})
    return `${JOB_ROOT_URL}${query}`
}

const FAKE_DATA_JOBS = [
    {
        id: 1,
        latitude: 40.642878, 
        longitude:  -73.973435,
        jobtitle: 'Developer',
        company: 'mmoodys',
        formattedRelativeTime: 'January 30, 2017' ,
        description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'
   
    },
    {
        id: 100,        
        latitude: 40.64878, 
        longitude:  -73.953435,
        jobtitle: 'Back endDeveloper',
        company: 'amazon',
        formattedRelativeTime: 'January 24, 2017' ,
        description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'
   
    },
    {
        id: 2,        
        latitude: 40.642878, 
        longitude:  -73.943435,
        jobtitle: 'front end Developer',
        company: 'facebook',
        formattedRelativeTime: 'December 19, 2016' ,
        description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'
   
    },
    {
        id: 3,        
        latitude: 40.642878, 
        longitude:  -73.933435,
        jobtitle: 'fullstack Developer',
        company: 'Sgoogoleey',
        formattedRelativeTime: 'October 01, 2016' ,
        description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'
   
    },
    {
        id: 4,        
        latitude: 30.642878, 
        longitude:  -73.973435,
        jobtitle: 'Developer',
        company: 'mmoodys',
        formattedRelativeTime: 'January 30, 2017' ,
        description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'
   
    },
    {
        id: 5,
        latitude: 30.64878, 
        longitude:  -73.953435,
        jobtitle: 'Back endDeveloper',
        company: 'amazon',
        formattedRelativeTime: 'January 24, 2017' ,
        description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'
   
    },
    {
        id: 6,
        latitude: 30.642878, 
        longitude:  -73.943435,
        jobtitle: 'front end Developer',
        company: 'facebook',
        formattedRelativeTime: 'December 19, 2016' ,
        description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'
   
    },
    {
        id: 7,
        latitude: 30.642878, 
        longitude:  -73.933435,
        jobtitle: 'fullstack Developer',
        company: 'Sgoogoleey',
        formattedRelativeTime: 'October 01, 2016',
        description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'
    }
]

export const fetchJobs = (region, keyword, callback) => async (dispatch) => {
    try {
        // let zip = await reverseGeocode(region);
        // const url = buildJobsUrl(zip, keyword);
        // let { data } = await axios.get(url);
        await dispatch({ type: FETCH_JOBS, payload: FAKE_DATA_JOBS})
        // callback()
    } catch (err) {
        console.error('heres the errror', err)
    }
}

export const saveJob = (jobId) => async (dispatch) => {
    try {
        
    } catch (err) {
        console.error('heres the errror', err)        
    }
}

const INITIAL_STATE = [

]

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_JOBS: 
            return [...action.payload]
        default:
            return state;
    } 
}

// export const likeJob = (job) => {
//     return {
//         payload: job,
//         type: LIKE_JOB
//     }
// }

// export const clearLikedJobs = () => {
//     return {
//         type: CLEAR_LIKED_JOBS
//     }
// }