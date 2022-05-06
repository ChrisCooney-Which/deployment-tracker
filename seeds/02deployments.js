/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('deployments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('deployments').insert([
        { deployment_id: 'test1', squad_id: '1' },
        { deployment_id: 'test2', squad_id: '2' },
        { deployment_id: 'test3', squad_id: '2' },
      ])
    })
}
