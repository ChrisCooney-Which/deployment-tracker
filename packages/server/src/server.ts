import express from 'express'
import { config } from './config'
import { handlePost, handleUpdate, handleDelete } from './controllers'
import { handleRequest } from './utils'

const knex = require('knex')(config.DATABASE_CONFIG)

const app = express()
app.use(express.json())

app.post('/deployment', async (req, res) => {
  await handleRequest({
    request: req,
    knex,
    handlerFunction: handlePost,
    response: res,
  })
})

app.patch('/update', async (req, res) => {
  await handleRequest({
    request: req,
    knex,
    handlerFunction: handleUpdate,
    response: res,
  })
})

app.delete('/delete', async (req, res) => {
  await handleRequest({
    request: req,
    knex,
    handlerFunction: handleDelete,
    response: res,
  })
})

app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`))
