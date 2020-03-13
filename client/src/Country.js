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
                        <h2 className="what-is-covid">What is COVID-19</h2>
                        <p className="symptoms">* Fever </p>
                        <p className="symptoms">* Cough </p>
                        <p className="symptoms">* Respitory problems</p>
                        <img src="https://www.cdc.gov/coronavirus/2019-ncov/images/symptoms-fever.jpg" class="image" />
                        <img src="https://www.cdc.gov/coronavirus/2019-ncov/images/symptoms-cough.jpg" class="image" />
                        <img src="https://www.cdc.gov/coronavirus/2019-ncov/images/symptoms-shortness-breath.jpg" class="image" />
                    </div>
                    {this.state.loading ? (
                        // <div className="hidden-loading-box"></div>
                        // <div className="hidden-loading-box"></div>
                        <p className="loading">Loading...</p>
                    ) : (
                            <div className="container-container">{listData.map(country => {
                                console.log('DATES: ', country.dates, 'COUNTRY: ', country.country);

                                const deathRate = (country.deaths / country.confirmed * 100);
                                return (
                                    <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
                                        <div className="flipper">
                                            <div className="country-container" className="front">

                                                <h3 className="country">{country.country}</h3>
                                                <div className="box-container">
                                                    <div className="box">
                                                        <p className="country-info">Confirmed</p>
                                                        <span className="country-info-number">{country.confirmed}</span>
                                                    </div>
                                                    <div className="box">
                                                        <p className="country-info">Deaths</p>
                                                        <span className="country-info-number">{country.deaths}</span>
                                                    </div>
                                                    <div className="box">
                                                        <p className="country-info">Death rate💀</p>
                                                        <span className="percent">{deathRate === 0 ? deathRate : deathRate.toFixed(2)}%</span>
                                                    </div>
                                                    <div className="box">
                                                        <p className="country-info">Recovered</p>
                                                        <span className="recovered">{country.recovered}</span>
                                                    </div>
                                                    <br />
                                                </div>

                                            </div>

                                            <div className="back">
                                                <h1 className="country-info-story">{country.country}</h1>
                                                <p className="country-info-story">Today {country.country} have {country.confirmed} confirmed cases, where {country.recovered} have recovered and {country.deaths} have died.</p>
                                                <p className="call-number" className="country-info-story">Call <span className="phone-number">113 113</span> if you have any symptoms or questions.</p>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })}

                            </div>
                        )}

                </div>
                <div className="important-corona">
                    <h3 className="more-about-corona">More about the Coronavirus</h3>
                    <p><span className="bullet-points">1.</span> If you have a runny nose and sputum, you have a common cold </p>
                    <p><span className="bullet-points">2.</span> Coronavirus pneumonia is a dry cough with no runny nose. </p>
                    <p><span className="bullet-points">3.</span> This new virus is not heat-resistant and will be killed by a temperature of just 26/27 degrees. It hates the Sun. </p>
                    <p><span className="bullet-points">4.</span> If someone sneezes with it, it takes about 10 feet before it drops to the ground and is no longer airborne. </p>
                    <p><span className="bullet-points">5.</span> If it drops on a metal surface it will live for at least 12 hours - so if you come into contact with any metal surface - wash your hands as soon as you can with a bacterial soap. </p>
                    <p><span className="bullet-points">6.</span> On fabric it can survive for 6-12 hours. normal laundry detergent will kill it. </p>
                    <p><span className="bullet-points">7.</span> Drinking warm water is effective for all viruses. Try not to drink liquids with ice. </p>
                    <p><span className="bullet-points">8.</span> Wash your hands frequently as the virus can only live on your hands for 5-10 minutes, but - a lot can happen during that time - you can rub your eyes, pick your nose unwittingly and so on.</p>
                    <p><span className="bullet-points">9.</span> You should also gargle as a prevention. A simple solution of salt in warm water will suffice. </p>
                    <p><span className="bullet-points">10.</span> Can't emphasis enough - drink plenty</p>
                    <br />
                    <p className="second-paragraph">The new Coronavirus may not show sign of infection for many days. How can one know if he/she is infected? </p>
                    <p className="second-paragraph">By the time they have fever and/or cough and go to the hospital, the lung is usually 50% Fibrosis and it's too late. Taiwan experts provide a simple self-check that we can do every morning. </p>
                    <p className="second-paragraph">Take a deep breath and hold your breath for more than 10 seconds. If you complete it successfully without coughing, without discomfort, stiffness or tightness, etc., it proves there is no Fibrosis in the lungs, basically indicates no infection. In critical time, please self-check every morning in an environment with clean air. </p>
                    <br />
                    <p className="second-paragraph-title">Serious excellent advice by Japanese doctors treating COVID-19 cases: </p>
                    <p className="second-paragraph">Everyone should ensure your mouth & throat are moist, never dry. Take a few sips of water every 15 minutes at least. </p>
                    <p className="second-paragraph">Why? Even if the virus gets into your mouth, drinking water or other liquids will wash them down through your throat and into the stomach. Once there, your stomach acid will kill all the virus. </p>
                    <p className="second-paragraph">If you don't drink enough water more regularly, the virus can enter your windpipe and into the lungs. That's very dangerous.</p>
                </div>
                <div className="graph-container">
                <h2>Graphs</h2>
                <p>These are the latest graphs</p>
                <img src="https://media.nature.com/lw800/magazine-assets/d41586-020-00154-w/d41586-020-00154-w_17764222.png" className="graph" />
                <img src="https://www.biancoresearch.com/bianco/samples/2020/01/DashVirusQuarantine012820.png" className="graph" />
                <img src="https://ichef.bbci.co.uk/news/624/cpsprodpb/124FF/production/_111070057_coronavirusstockimpact_28022020_dp-nc.png" className="graph" />
                <img src="https://www.who.int/emergencies/mers-cov/daily-epicurve-republic-of-korea-china-cases-deaths2015-06-21.png?ua=1" className="graph" />
                <img src="https://www.total-croatia-news.com/images/china_coronavirus_live_15.jpg" className="graph" />
                <img src="https://content.fortune.com/wp-content/uploads/2020/02/china-inflation-rates-by-category-graph.png?w=1024" className="graph" />
                <img src="" className="graph" />
                </div>
            </div>
        )
    }
}
export default Country;


