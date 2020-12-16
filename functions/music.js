const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async function(event, context) {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  });
  return client.query(
    q.Get(
      q.Collection('music')
    )
  )
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    });
}