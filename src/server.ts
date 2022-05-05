const express = require('express')
const { PORT, DATABASE_CONFIG } = require('./config')
const knex = require('knex')(DATABASE_CONFIG)
const { handlePost, handleUpdate, handleDelete } = require('./controllers')
const { handleRequest } = require('./utils')

const app = express()
app.use(express.json())

app.post('/deployment', async (req, res) => {
  await handleRequest({
    request: req,
    knex,
    handlerFunction: handlePost,
    response: res,
  })

  return
})

app.patch('/update', async (req, res) => {
  await handleRequest({
    request: req,
    knex,
    handlerFunction: handleUpdate,
    response: res,
  })

  return
})

app.delete('/delete', async (req, res) => {
  await handleRequest({
    request: req,
    knex,
    handlerFunction: handleDelete,
    response: res,
  })

  return
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
