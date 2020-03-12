const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path')
const cors = require('cors')

app.use(cors())
// Total confirmed cases by country
app.get('/confirmed', async function (req, res) {
  try {
    //Fetch API
    // const data = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed');
    // const dataJSON = await data.json()
    // console.log(dataJSON)
    //   res.json(dataJSON);
    const confirmedResponse = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed')
    const confirmedData = await confirmedResponse.json();
    const deathResponse = await fetch('https://coronavirus-tracker-api.herokuapp.com/deaths')
    const deathData = await deathResponse.json();
    const recoveredResponse = await fetch('https://coronavirus-tracker-api.herokuapp.com/recovered')
    const recoveredData = await recoveredResponse.json();

    const deathResult = deathData.locations.map(location => {
      return {
        deaths: location.latest
      }
    })  
    const recoveredResult = recoveredData.locations.map(location => {
      return {
        recovered: location.latest
      }
    })
    const confirmedResult = confirmedData.locations.map((location, index) => {
      return {
        country: location.country,
        confirmed: location.latest,
        deaths: deathResult[index].deaths,
        recovered: recoveredResult[index].recovered,

      }
    })

    const result = [...confirmedResult, deathResult, recoveredResult]

    console.log('result', result)
    res.json(result)
  } catch (error) {
    console.log(error.message)
  }
})
// Total confirmed
app.get('/all/confirmed', async function (req, res) {
  try {
    //Fetch API
    const response = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed')
    const data = await response.json();
    console.log('LOGGIN DATA', data)
    const result = data.latest
    
    console.log('result', result)
    res.json(result)
  } catch (error) {
    console.log(error.message)
  }
})

// Death by country
app.get('/deaths', async function (req, res) {
  try {
    const country = req.params.country;
    //Fetch API
    const response = await fetch('https://coronavirus-tracker-api.herokuapp.com/deaths')
    const data = await response.json();
    console.log('LOGGIN DATA', data)
    const result = data.locations.map(location => {
      return {
        country: location.country,
        latest: location.latest
      }
    })
    console.log('result', result)
    res.json(result)
  } catch (error) {
    console.log(error.message)
  }
})
// Total deaths
app.get('/all/deaths', async function (req, res) {
  try {
    //Fetch API
    const response = await fetch('https://coronavirus-tracker-api.herokuapp.com/deaths')
    const data = await response.json();
    console.log('LOGGIN DATA', data)
    const result = data.latest
    
    console.log('result', result)
    res.json(result)
  } catch (error) {
    console.log(error.message)
  }
})

// Recovered by country
app.get('/recovered', async function (req, res) {
  try {
    //Fetch API
    const response = await fetch('https://coronavirus-tracker-api.herokuapp.com/recovered')
    const data = await response.json();
    console.log('LOGGIN DATA', data)
    const result = data.locations.map(location => {
      return {
        country: location.country,
        latest: location.latest
      }
    })
    console.log('result', result)
    res.json(result)
  } catch (error) {
    console.log(error.message)
  }
})
app.get('/all/recovered', async function (req, res) {
  try {
    //Fetch API
    const response = await fetch('https://coronavirus-tracker-api.herokuapp.com/recovered')
    const data = await response.json();
    console.log('LOGGIN DATA', data)
    const result = data.latest
    
    console.log('result', result)
    res.json(result)
  } catch (error) {
    console.log(error.message)
  }
})

app.use(express.static(path.join(__dirname, 'client/build/index.html')))

app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname + 'client/build/index.html')))
});

app.listen(8080, () => {
  console.log('http://localhost:8080/');
});
