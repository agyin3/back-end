
exports.up = function(knex) {
  return knex.schema.createTable('projects', proj => {
        proj.increments()
        proj.integer('dueDate')
            .notNullable()
        proj.string('name')
            .notNullable()
        proj.string('notes')
        proj.integer('studentId')
            .notNullable()
            .references('id')
            .inTable('students')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
  })
  .createTable('reminders', reminders => {
        reminders.increments()
        reminders.integer('date')
            .notNullable()
        reminders.string('message')
            .notNullable()
        reminders.integer('projectId')
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reminders')
    .dropTableIfExists('projects')
};
