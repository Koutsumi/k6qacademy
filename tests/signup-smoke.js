import http from 'k6/http';
import { sleep, check } from 'k6';
import uuid from './libs/uuid.js'

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    // * 95% das requisições devem responder em até 2s
    http_req_duration: ['p(95)<2000'],
    // * 1% das requisições podem ocorrer erro
    http_req_failed: ['rate<0.01']
  }
}

export default function () {

    const url_base = 'http://localhost:3333/signup'
    const payload = JSON.stringify({
        email: `${uuid.v4().substring(24)}@qa.academy.com.br`,
        password: 'pwd123'
    })
    const headers = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }

  const res = http.post(url_base, payload, headers);

  //console.log(res.body)

  check(res, {
    'status should be 201': (r) => r.status === 201
  })

  sleep(1);
}