exports.up = async function (knex) {
  await knex.schema.table("users", (table) => {
    table.index("email", "idx_users_email");
  });

  await knex.schema.table("groups", (table) => {
    table.index("creator_id", "idx_groups_creator_id");
  });

  await knex.schema.table("group_members", (table) => {
    table.index("group_id", "idx_group_members_group_id");
    table.index("user_id", "idx_group_members_user_id");
  });

  await knex.schema.table("tasks", (table) => {
    table.index("creator_id", "idx_tasks_creator_id");
    table.index("assignee_id", "idx_tasks_assignee_id");
    table.index("group_id", "idx_tasks_group_id");
    table.index(["group_id", "status"], "idx_tasks_group_id_status");
  });

  await knex.schema.table("task_history", (table) => {
    table.index("task_id", "idx_task_history_task_id");
  });
};

exports.down = async function (knex) {
  await knex.schema.table("users", (table) => {
    table.dropIndex("email", "idx_users_email");
  });

  await knex.schema.table("groups", (table) => {
    table.dropIndex("creator_id", "idx_groups_creator_id");
  });

  await knex.schema.table("group_members", (table) => {
    table.dropIndex("group_id", "idx_group_members_group_id");
    table.dropIndex("user_id", "idx_group_members_user_id");
  });

  await knex.schema.table("tasks", (table) => {
    table.dropIndex("creator_id", "idx_tasks_creator_id");
    table.dropIndex("assignee_id", "idx_tasks_assignee_id");
    table.dropIndex("group_id", "idx_tasks_group_id");
    table.dropIndex(["group_id", "status"], "idx_tasks_group_id_status");
  });

  await knex.schema.table("task_history", (table) => {
    table.dropIndex("task_id", "idx_task_history_task_id");
  });
};
