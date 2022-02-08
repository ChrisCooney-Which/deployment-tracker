import type { Knex } from 'knex'
import { getSquadId, createResponse } from '../utils'
import type { Data } from '../types'

export const handleDelete = async (knex: Knex, data: Data) => {
  const { squad_name, deployment_id } = data

  try {
    const id = await getSquadId(knex, squad_name)

    if (!id) {
      return { error: `No id found for project name: ${squad_name}` }
    }

    const data = await knex('deployments')
      .where({
        deployment_id,
        squad_id: id,
      })
      .delete(['deployment_id', 'squad_id'])

    return createResponse({
      action: 'delete',
      data: data[0],
      squadName: squad_name,
    })
  } catch (err) {
    console.log('error whilst inserting data: ', err)

    return {
      error: 'Could not delete data, check server logs',
      deployment_id,
      squad_name,
    }
  }
}
