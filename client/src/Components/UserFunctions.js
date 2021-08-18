import axios from 'axios';
// source: https://www.youtube.com/watch?v=IXVURoGB59E

export const pt_signup = newUser => {
    const request = axios
        .post('http://localhost:4000/pt_signup', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
    
    request.then((response => {
            if (response.status === 400) {
                alert("Duplicate email");
                return;
            }
            else if (response){
                console.log(response);
                localStorage.setItem('trainer_id', response.data);
                // return response.data;
            }
    }))
    .catch(err => {
        console.log(err);
    })

    return request;
}

export const options = user => {
    return axios
        .get('http://localhost:4000/options')
        .then((response => {
            if (response){
                return response.data;
            }
        }))
        .catch(err => {
            console.log(err)
        })
}

export const pt_login = user => {
    return axios
        .post('http://localhost:4000/pt_login', {
            email: user.email,
            password: user.password
        })
        .then((response => {
            if (response){
                localStorage.setItem('trainer_id', response.data);
                return response.data;
            }
        }))
        .catch(err => {
            console.log(err)
        })
}

export const pt_google_signin = user => {
    return axios
        .post('http://localhost:4000/pt_google_signin', {
            google_id: user.google_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        })
        .then(response => {
            localStorage.setItem('trainer_id', response.data)
            // return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const client_signup = newUser => {
    return axios
        .post('http://localhost:4000/client_signup', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            localStorage.setItem('client_id', response.data)
            return response.data
        })
}

export const client_login = user => {
    return axios
        .post('http://localhost:4000/client_login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('client_id', response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const get_home_pts = a => {
    return axios
        .get('http://localhost:4000/home_page_pts')
        .then(response => {
            if (response.status === 400) {
                console.log("Not enough PTS");
                return;
            }
            return response.data;
        })
        .catch(err => {
            console.log(err)
        })
}

export const get_pt_profile = user => {
    return axios
        .post('http://localhost:4000/get_pt_profile', {
            trainer_id: localStorage.getItem('trainer_id')
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        })
}

export const get_pt_profile_client_booking = user => {
    return axios
        .post('http://localhost:4000/get_pt_profile', {
            trainer_id: localStorage.getItem('trainer_booking_id')
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        })
}

export const post_pt_biography = user => {
    return axios
        .post('http://localhost:4000/post_pt_biography', {
            trainer_id: localStorage.getItem('trainer_id'),
            biography: localStorage.getItem('biography')
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        })
}

export const post_pt_profile = user => {
    return axios
        .post('http://localhost:4000/post_pt_profile', {
            profile: JSON.parse(localStorage.getItem('pt_profile_changes'))
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        })
}

export const admin_login = user => {
    console.log(user)
    return axios
        .post('http://localhost:4000/admin_login', {
            user_name: user.username,
            password: user.password
        })
        .then((response => {
            if (response){
                localStorage.setItem('admin_id', response.data);
                return response.data;
            }
        }))
        .catch(err => {
            console.log(err)
        })
}

// export const get_search_results = user => {
//     console.log("RUN get_search_results");
//     fetch("http://localhost:4000/pt_search", {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             location: "",
//             gender: localStorage.getItem('search_gender'),
//             muscle: localStorage.getItem('search_muscle'),
//             language: localStorage.getItem('search_language'),
//             search_term: localStorage.getItem('search_query')
//         })
//     })
//     .then (response => response.json())
//     .then (data => {
//         console.log("RESPONSE TRAINERS", data);
//         return data;
//     })
// }