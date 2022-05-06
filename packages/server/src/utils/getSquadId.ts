import type { Knex } from "knex";

export const getSquadId = async (
  knex: Knex,
  squadName: string
): Promise<string> => {
  const squadData = await knex("squads").where("name", squadName).select("id");

  if (!squadData.length) {
    return "";
  }

  return squadData[0].id;
};
