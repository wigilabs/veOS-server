import Cors from 'micro-cors'
import axios from 'axios'

const cors = Cors()


const handler = async (req, res) => {

  const URL = 'https://insights-api.newrelic.com/v1/accounts/2673149/query?nrql=SELECT%20*%20FROM%20Connectivity'
  const AuthStr = 'NRIQ-dBGqek4MzSXRGUO6T620tBT50oe14fXI'

  axios.get(URL, { headers: { "X-Query-Key": AuthStr } })
 .then(response => {

    let data = response.data.results[0].events
    // console.log('data: ', data)

    var flags = [], output = [], l = data.length, i;

    for( i=0; i<l; i++) {
      if( flags[data[i].machine_id]) continue;
      flags[data[i].machine_id] = true;
      output.push({ machine_id: data[i].machine_id, speed: data[i].speed, stability: data[i].stability });
    }

    console.log('output: ', output)

    return res.json(output);
  })
 .catch((error) => {
     console.log('error ' + error);
  });

};

export default cors(handler)
