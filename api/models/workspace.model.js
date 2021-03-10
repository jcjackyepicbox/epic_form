import { ObjectId } from 'bson';

class WorkspaceModel {
  constructor() {}

  getFirstWorkspace() {
    return {
      workspace_name: 'My Workspace',
      forms: [],
      _id: ObjectId(),
      is_default: true,
    };
  }

  getNewInsertWorkspace(title) {
    return {
      workspace_name: title,
      forms: [],
      _id: ObjectId(),
      is_default: false,
    };
  }
}

export default WorkspaceModel;
