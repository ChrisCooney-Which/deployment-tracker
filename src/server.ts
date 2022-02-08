const express = require('express')
const { PORT, DATABASE_CONFIG } = require('./config')
const knex = require('knex')(DATABASE_CONFIG)
const { handlePost, handleUpdate, handleDelete } = require('./controllers')

const app = express()
app.use(express.json())

app.post('/deployment', async (req, res) => {
  const { attributes } = req.body.data

  if (!attributes) {
    handleBadData(res)

    return
  }

  const data = await handlePost(knex, attributes)

  if (data.error) {
    HandleError(res, data)

    return
  }

  res.json(data)
})

app.patch('/update', async (req, res) => {
  const { attributes } = req.body.data

  if (!attributes) {
    handleBadData(res)

    return
  }

  const data = await handleUpdate(knex, attributes)

  if (data.error) {
    HandleError(res, data)

    return
  }

  res.json(data)
})

app.delete('/delete', async (req, res) => {
  const { attributes } = req.body.data

  if (!attributes) {
    handleBadData(res)

    return
  }

  const data = await handleDelete(knex, attributes)

  if (data.error) {
    HandleError(res, data)

    return
  }

  res.json(data)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

const handleBadData = (res) => {
  res.status(400)
  res.json('Error Data was not supplied in the correct format')
}

const HandleError = (res, data) => {
  res.status(400)
  res.json(data)
}
