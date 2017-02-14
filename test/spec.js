import chai from 'chai'
import fetch from 'node-fetch'
import applicationServer from '../source/server/app_server'

const port = applicationServer()

chai.should()

describe('api test', async () => { // eslint-disable-line no-undef
  it('say hello name param', async () => { // eslint-disable-line no-undef
    const res = await fetch(`http://localhost:${port}/hello/chris`)
    const json = await res.json()
    json.hello.should.be.a('string')
    json.hello.should.equal('chris')
  })

  it('say hello number param', async () => { // eslint-disable-line no-undef
    const res = await fetch(`http://localhost:${port}/hello/123`)
    const json = await res.json()
    json.message.should.be.a('string')
    json.message.should.equal('Name should not be a number')
  })
})
