/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('deployments', (table) => {
    table.increments()
    table.string('deployment_id')
    table.timestamp('deployment_time').defaultTo(knex.fn.now()).notNullable()
    table.integer('squad_id').references('id').inTable('squads')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('deployments')
}
