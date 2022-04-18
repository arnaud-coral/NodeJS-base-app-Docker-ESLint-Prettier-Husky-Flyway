import axios from 'axios'

const chai = require('chai')

const url = 'http://127.0.0.1:3143'
const headers = { key: 'zfUyeg75XQNyFDS55xHQAZE9g', pass: 'GNe7aYpykCj72XXvvNaTMkXDc' }

chai.should()

describe('All unit tests', () => {
    describe('/api/v1/health', () => {
        it('return a simple message if service is available', async () => {
            const response = await axios.get(`${url}/api/v1/health`, { headers })
            response.status.should.be.equal(200)
            response.data.should.have.property('result').to.be.a('String').to.equal('ok')
            response.data.should.have.property('message').to.be.a('String').to.equal('I\'m alive!')
        })
    })
})
