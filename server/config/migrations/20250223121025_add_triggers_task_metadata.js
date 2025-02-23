const fs = require("fs").promises;
const path = require("path");

exports.up = async function (knex) {
  const triggerFile = path.join(
    __dirname,
    "../triggers/update_task_metadata_and_history.sql"
  );
  const triggerSql = await fs.readFile(triggerFile, "utf8");
  return knex.raw(triggerSql);
};

exports.down = function (knex) {
  return knex.raw(`
    DROP TRIGGER IF EXISTS update_tasks_metadata_and_history ON tasks;
    DROP FUNCTION IF EXISTS update_task_metadata_and_history;
  `);
};
