import type { Knex } from 'knex'
import { getSquadId } from '../utils/getSquadId'

export const handleUpdate = async (knex: Knex, data: Data) => {
  const { project_name, deployment_id, updated_deployment_id } = data

  try {
    const id = await getSquadId(knex, project_name)

    if (!id) {
      return { error: `No id found for project name: ${project_name}` }
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

    console.log('data', data[0])

    return data[0]
  } catch (err) {
    console.log('error whilst inserting data: ', err)

    return {
      error: 'Could not update data, check server logs',
      deployment_id,
      project_name,
    }
  }
}

///////// IMPLEMENTATION /////////

type Data = {
  project_name: string
  deployment_id: string
  updated_deployment_id: string
}
