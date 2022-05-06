/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('squads')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('squads').insert([
        { name: 'CTX' },
        { name: 'RRR' },
        { name: 'CAS' },
      ])
    })
}
