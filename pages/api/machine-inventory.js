import Cors from 'micro-cors'
import axios from 'axios'

const cors = Cors()


const handler = async (req, res) => {

  const URL = 'https://insights-api.newrelic.com/v1/accounts/2673149/query?nrql=SELECT%20*%20FROM%20Sale'
  const AuthStr = 'NRIQ-dBGqek4MzSXRGUO6T620tBT50oe14fXI'

  axios.get(URL, { headers: { "X-Query-Key": AuthStr } })
 .then(response => {

    let data = response.data.results[0].events

    var flags = [], output = [], l = data.length, i;

    for( i=0; i<l; i++) {
      if( flags[data[i].machine_id]) continue;
      flags[data[i].machine_id] = true;
      output.push({ machine_id: data[i].machine_id, inventory: data[i].inventory });
    }

    console.log('output: ', output)

    return res.json(output);
  })
 .catch((error) => {
     console.log('error ' + error);
  });

};

export default cors(handler)
