import React from "react";
import SearchBox from './Searchbox'
import moment from 'moment'



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

        const mon = moment().subtract(7, 'days').format('D/MM/YYYY');
        const tue = moment().subtract(6, 'days').format('D/MM/YYYY');
        const wed = moment().subtract(5, 'days').format('D/MM/YYYY');
        const thu = moment().subtract(4, 'days').format('D/MM/YYYY');
        const fri = moment().subtract(3, 'days').format('D/MM/YYYY');
        const sat = moment().subtract(2, 'days').format('D/MM/YYYY');
        const sun = moment().subtract(1, 'days').format('D/MM/YYYY');
        const weekArray = [mon, tue, wed, thu, fri, sat, sun];
        console.log('ARRAY OF THE WEEK: ', weekArray);
        




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
            if (item.country) {
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
                <div className="searchbox-container">
                    <SearchBox searchFilter={this.filterData} />
                </div>
                {this.state.loading ? (
                    <div>Loading...</div>
                ) : (
                        <div className="container-container">{listData.map(country => {
                            console.log('DATES: ', country.dates, 'COUNTRY: ', country.country);
                            
                            const deathRate = (country.deaths / country.confirmed * 100);
                            return (
                                <div className="country-container">
                                    <h3 className="country-info">{country.country}</h3>
                                    <p className="country-info">Confirmed: {country.confirmed}</p>
                                    <p className="country-info">Deaths: {country.deaths}</p>
                                    <p className="country-info">Recovered: {country.recovered}</p>
                                    <p className="country-info">Death rate: {deathRate === 0 ? deathRate : deathRate.toFixed(2)}% 💀</p><br />

                                </div>)
                        })}
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


