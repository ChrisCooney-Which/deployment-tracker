export const createResponse = ({
  action,
  data,
  squadName,
}: CreateResponseArgs) => {
  return {
    action: `${action} was successful`,
    squadName,
    data,
  }
}

///////// IMPLEMENTATION /////////

type CreateResponseArgs = {
  action: Action
  squadName: string
  data: Data
}

type Action = 'insert' | 'update' | 'delete'

type Data = {
  deployment_id: string
  squad_id: number
}
