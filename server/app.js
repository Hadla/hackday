const express = require('express');
const fetch = require('node-fetch');
const app = express();




app.get('/', async function (req, res) {
  try {
    //Fetch API
    const response = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed')
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

app.get('/deaths/:country', function (req, res) {
  res.send('Hello World')
})


// // Get one president
// app.get('/api/presidents/:id', (req, res) => {
// 	const id = req.params.id;
// 	const onePresident = getPresedentById(id);
// 	if (!onePresident) {
// 		res.status(404);
// 		res.json({ error: 'No president with that id exists' });
// 	} else {
// 		res.json(onePresident);
// 	}
// });


app.listen(8080, () => {
  console.log('http://localhost:8080/');
});