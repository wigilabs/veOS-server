import Cors from 'micro-cors'
import axios from 'axios'

const cors = Cors()


const handler = async (req, res) => {

  let URL = 'https://insights-api.newrelic.com/v1/accounts/2673149/query?nrql=SELECT%20*%20FROM%20Sale%20SINCE%203%20week%20ago'
  const AuthStr = 'NRIQ-dBGqek4MzSXRGUO6T620tBT50oe14fXI'

  axios.get(URL, { headers: { "X-Query-Key": AuthStr } })
  .then(response => {

    let sales = response.data.results[0].events
    // console.log('sales: ', sales)

    let total_sales = sales.length
    console.log('total_sales: ', total_sales)

    URL = 'https://insights-api.newrelic.com/v1/accounts/2673149/query?nrql=SELECT%20*%20FROM%20Dispense%20SINCE%203%20week%20ago'
    axios.get(URL, { headers: { "X-Query-Key": AuthStr } })
    .then(response => {

       let dispense = response.data.results[0].events
       // console.log('dispense: ', dispense)

       let total_dispense = dispense.length
       console.log('total_dispense: ', total_dispense)

       let ret = {
        dispensations: total_sales,
        conflicts: total_dispense,
       }

      return res.json(ret);
     })
  })
};

export default cors(handler)
