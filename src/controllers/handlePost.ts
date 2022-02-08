import type { Knex } from 'knex'
import { getSquadId, createResponse } from '../utils'

export const handlePost = async (knex: Knex, data: Data) => {
  const { squad_name, deployment_id } = data

  try {
    const id = await getSquadId(knex, squad_name)

    if (!id) {
      return { error: `No id found for project name: ${squad_name}` }
    }

    const data = await knex('deployments').insert(
      {
        deployment_id,
        squad_id: id,
      },
      ['deployment_id', 'squad_id']
    )

    return createResponse({
      action: 'insert',
      data: data[0],
      squadName: squad_name,
    })
  } catch (err) {
    console.log('error whilst inserting data: ', err)

    return {
      error: 'Could not add data, check server logs',
      deployment_id,
      squad_name,
    }
  }
}

///////// IMPLEMENTATION /////////

type Data = {
  squad_name: string
  deployment_id: string
}
