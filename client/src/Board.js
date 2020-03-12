import React, { Component } from "react";
import axios from 'axios';


class Board extends Component {

    state = {
      postData: [],
      filteredPosts: [],
    }
  
    async updateData() {
      const response = await axios.get('https://coronavirus-tracker-api.herokuapp.com/confirmed');
      const data = await response.json();
      const result = data.locations.map(location => {
        return {
          country: location.country,
          latest: location.latest
        }
      })
      this.setState(() => ({ postData: result }))
    }
  
    componentDidMount() {
      this.updateData();
    }


    
    render() {

        const result = this.state.filteredPosts.length > 0 ? this.state.filteredPosts : this.state.postData;
    
        return (
          <div className="App">
            {/* <header className="App-header">
              <p>
                CORONAVIRUS COVID-19
              </p>
             // <Searchbox theBag={this.filterData} />
            </header>
            <div className='card-container'>
              {data.map(hit =>
                //<Card key={hit.id} title={hit.title} date={hit.created} url={hit.url} />
              )}
            </div> */}
          </div>
        );
      }

  }

export default Board;