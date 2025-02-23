DROP TRIGGER IF EXISTS update_tasks_metadata_and_history ON tasks;
DROP FUNCTION IF EXISTS update_task_metadata_and_history;

CREATE OR REPLACE FUNCTION update_task_metadata_and_history()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO task_history (task_id, changed_by, old_values, new_values)
    VALUES (
      NEW.id,
      COALESCE(NEW.last_updated_by, NEW.creator_id), -- Fallback on creator_id if last_updated_by NULL
      NULL, 
      jsonb_build_object(
        'title', NEW.title,
        'description', NEW.description,
        'status', NEW.status,
        'assignee_id', NEW.assignee_id,
        'group_id', NEW.group_id
      )
    );
  ELSIF TG_OP = 'UPDATE' THEN
    NEW.updated_at = NOW();
    INSERT INTO task_history (task_id, changed_by, old_values, new_values)
    VALUES (
      NEW.id,
      COALESCE(NEW.last_updated_by, NEW.creator_id), -- Fallback on creator_id if last_updated_by NULL
      jsonb_build_object(
        'title', OLD.title,
        'description', OLD.description,
        'status', OLD.status,
        'assignee_id', OLD.assignee_id,
        'group_id', OLD.group_id
      ),
      jsonb_build_object(
        'title', NEW.title,
        'description', NEW.description,
        'status', NEW.status,
        'assignee_id', NEW.assignee_id,
        'group_id', NEW.group_id
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_metadata_and_history
AFTER INSERT OR UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_task_metadata_and_history();