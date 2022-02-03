import type { Knex } from "knex";

export const handlePost = async (knex: Knex, data: Data) => {
  const { project_name, deployment_id } = data;
  console.log("data", data);
  console.log("knex", knex);

  try {
    const id = await returnSquadId(knex, project_name);

    if (!id) {
      return false;
    }

    await knex("linked_test").insert({
      name: deployment_id,
      team_id: id,
    });

    return true;
  } catch (err) {
    console.log("error whilst inserting data: ", err);
    return false;
  }
};

///////// IMPLEMENTATION /////////

type Data = {
  project_name: string;
  deployment_id: string;
};

const returnSquadId = async (
  knex: Knex,
  projectName: string
): Promise<string> => {
  const squadData = await knex("test").where("name", projectName).select("id");

  if (!squadData.length) {
    return "";
  }

  return squadData[0].id;
};
