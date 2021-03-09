import { ObjectId } from 'bson';

class WorkspaceModel {
  constructor() {}

  getFirstWorkspace() {
    return {
      workspace_name: 'My Workspace',
      forms: [],
      _id: ObjectId(),
    };
  }
}

export default WorkspaceModel;
