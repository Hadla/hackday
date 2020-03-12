import React from "react";

class Country extends React.Component {
    state = {
        loading: true
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/confirmed';
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState(() => ({
            data: data, 
            loading: false
            // deaths: data.deaths[0],
            // recovered: data.recovered[0]
        }))
        
    }
    render() {
        return (
            <div>
                {this.state.loading ? ( 
                <div>Loading...</div> 
                ) : (
                <div>{this.state.data.map(country => {
                    return(
                    <ul>

                        <li>{country.country}</li>
                        <li>{country.confirmed}</li>
                        <li>{country.deaths}</li>
                        <li>{country.recovered}</li>
                    </ul>)})}
                    </div>
                //<div>{this.state.confirmed.location.latest}</div>
                //<div>{this.state.deaths.location.latest}</div>
                //<div>{this.state.recovered.location.latest}</div>
                )}
            </div>
        )
    }
}
export default Country;

//     state = {
//         postData: [],
//         filteredPosts: [],
//     }

//     async updateData() {
//         const response = await axios.get('https://coronavirus-tracker-api.herokuapp.com/deaths');
//         const data = await response.json();
//         const result = data.locations.map(location => {
//             return {
//                 country: location.country,
//                 latest: location.latest
//             }
//         })
//         this.setState(() => ({ postData: result }))
//         console.log('RESULT 123: ', result);
        
//     }

//     componentDidMount() {
//         this.updateData();
//     }

//     render() {
//         return (
//             <div className='country'>
//                 <h3>{this.props.country}</h3>
//                 <a href={this.props.latest}>{this.props.url}</a>
//                 <p>{this.props.date}</p>
//             </div>
//         );
//     }
// }


// export default Country;
