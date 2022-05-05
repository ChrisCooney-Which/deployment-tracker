import { Knex } from 'knex'
import type { Response, Request } from 'express'

export const handleRequest = async ({
  request,
  knex,
  handlerFunction,
  response,
}: HandleRequestArgs) => {
  const { attributes } = request.body.data

  if (!attributes) {
    handleBadData(response)

    return
  }

  const data = await handlerFunction(knex, attributes)

  if (data.error) {
    HandleError(response, data)

    return
  }

  response.json(data)
}

///////// IMPLEMENTATION /////////

type HandleRequestArgs = {
  request: Request
  knex: Knex
  handlerFunction: Function
  response: Response
}

const handleBadData = (res) => {
  res.status(400)
  res.json('Error Data was not supplied in the correct format')
}

const HandleError = (res, data) => {
  res.status(400)
  res.json(data)
}
