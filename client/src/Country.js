import React from "react";
import SearchBox from './Searchbox'

class Country extends React.Component {
    state = {
        loading: true,
        data: [], 
        filteredData: []

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

    filterData = (query) => {        
        const data = this.state.data.filter(item => {            
          const regex = new RegExp(query, 'gi');
          if(item.country) {
            return item.country.match(regex)
          }
        });
        this.setState(() => {
          return { filteredData: data }
        })
      }

    render() {

        const listData = this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data;
    
        return (
            <div>
                <SearchBox searchFilter={this.filterData}/>
                {this.state.loading ? ( 
                <div>Loading...</div> 
                ) : (
                <div>{listData.map(country => {
                    const deathRate = (country.deaths/country.confirmed*100);
                    return(
                    <div>
                        <h3>{country.country}</h3>
                        <p>Confirmed: {country.confirmed}</p>
                        <p>Deaths: {country.deaths}</p>
                        <p>Recovered: {country.recovered}</p>
                        <p>Death rate: { deathRate === 0 ? deathRate : deathRate.toFixed(2)}%</p><br/>

                    </div>)})}
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


