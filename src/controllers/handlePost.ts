import type { Knex } from 'knex'
import { getSquadId } from '../utils/getSquadId'

export const handlePost = async (knex: Knex, data: Data) => {
  const { project_name, deployment_id } = data

  try {
    const id = await getSquadId(knex, project_name)

    if (!id) {
      return { error: `No id found for project name: ${project_name}` }
    }

    const data = await knex('deployments').insert(
      {
        deployment_id,
        squad_id: id,
      },
      ['deployment_id', 'squad_id']
    )

    return data[0]
  } catch (err) {
    console.log('error whilst inserting data: ', err)

    return {
      error: 'Could not add data, check server logs',
      deployment_id,
      project_name,
    }
  }
}

///////// IMPLEMENTATION /////////

type Data = {
  project_name: string
  deployment_id: string
}
