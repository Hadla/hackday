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
                <div className="about-and-countainer">
                    <div class="info-and-images">
                        <h2>What is COVID-19</h2>
                        <p>Cough, fever, respitory problems</p>
                        <img src="https://www.cdc.gov/coronavirus/2019-ncov/images/symptoms-fever.jpg" class="image" />
                        <img src="https://www.cdc.gov/coronavirus/2019-ncov/images/symptoms-cough.jpg" class="image" />
                        <img src="https://www.cdc.gov/coronavirus/2019-ncov/images/symptoms-shortness-breath.jpg" class="image" />
                    </div>
                    {this.state.loading ? (
                        <div>Loading...</div>
                    ) : (
                            <div className="container-container">{listData.map(country => {
                                console.log('DATES: ', country.dates, 'COUNTRY: ', country.country);

                                const deathRate = (country.deaths / country.confirmed * 100);
                                return (
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="country-container" className="flip-card-front">
                                                <h3 className="country">{country.country}</h3>
                                                <p className="country-info">Confirmed: {country.confirmed}</p>
                                                <p className="country-info">Deaths: {country.deaths}</p>
                                                <p className="country-info">Recovered: {country.recovered}</p>
                                                <p className="country-info">Death rate: {deathRate === 0 ? deathRate : deathRate.toFixed(2)}% 💀</p><br />

                                            </div>
                                            <div className="flip-card-back">
                                                <h1 className="country-info-story">{country.country}</h1>
                                                <p className="country-info-story">Today {country.country} have {country.confirmed} confirmed cases, where {country.recovered} have recovered and unfortunately {country.deaths} have died.</p>
                                                <p className="call-number" className="country-info-story">Call 113113 if you have any symptoms.</p>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })}

                            </div>
                        )}
                    <div className="graphs">
                        <h2>Graphs</h2>
                        <p>These are the latest graphs:</p>
                        <img src="https://media.nature.com/lw800/magazine-assets/d41586-020-00154-w/d41586-020-00154-w_17764222.png" class="image" />
                        <img src="https://www.biancoresearch.com/bianco/samples/2020/01/DashVirusQuarantine012820.png" class="image" />
                        <img src="https://www.nationalgeographic.com/content/dam/science/2020/02/05/wuhan/ngscience-20-coronavirus-compared_ai2html-timeline-standalone-fallback.jpg" class="image" />

                    </div>
                </div>

            </div>
        )
    }
}
export default Country;


