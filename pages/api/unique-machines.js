import Cors from 'micro-cors'
import axios from 'axios'

const cors = Cors()

const handler = (req, res) => {

  const URL = 'https://insights-api.newrelic.com/v1/accounts/2673149/query?nrql=SELECT%20uniques(machine_id)%20FROM%20Heartbeat'
  const AuthStr = 'NRIQ-dBGqek4MzSXRGUO6T620tBT50oe14fXI';

  axios.get(URL, { headers: { "X-Query-Key": AuthStr } })
 .then(response => {
    return res.json(response.data.results[0].members);
  })
 .catch((error) => {
     console.log('error ' + error);
  });
};

export default cors(handler)
