import type { Knex } from 'knex'
import { getSquadId, createResponse } from '../utils'
import type { Data as BaseData } from '../types'

export const handleUpdate = async (knex: Knex, data: Data) => {
  const { squad_name, deployment_id, updated_deployment_id } = data

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
      .update({ deployment_id: updated_deployment_id }, [
        'deployment_id',
        'squad_id',
      ])

    return createResponse({
      action: 'update',
      data: data[0],
      squadName: squad_name,
    })
  } catch (err) {
    console.log('error whilst inserting data: ', err)

    return {
      error: 'Could not update data, check server logs',
      deployment_id,
      squad_name,
    }
  }
}

///////// IMPLEMENTATION /////////

type Data = BaseData & { updated_deployment_id: string }
