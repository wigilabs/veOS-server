import Cors from 'micro-cors'
import axios from 'axios'

const cors = Cors()

const handler = async (req, res) => {

  const query = req.query

  const machines = JSON.parse(query.machines)

  let count = machines.length


  const AuthStr = 'NRIQ-dBGqek4MzSXRGUO6T620tBT50oe14fXI';
  let ret = []

  while(count--) {

    let machine_id = machines[count]
    console.log('machine_id: ', machine_id)

    let URL =`https://insights-api.newrelic.com/v1/accounts/2673149/query?nrql=SELECT%20state%20FROM%20Heartbeat%20WHERE%20machine_id%20%3D%20%27${machine_id}%27%20LIMIT%201`

    let res = await axios.get(URL, { headers: { "X-Query-Key": AuthStr } })
    const state = res.data.results[0].events[0].state
    console.log('state: ', state)

    ret.push({machine_id, state})
  }

  return res.json(ret)
};

export default cors(handler)
