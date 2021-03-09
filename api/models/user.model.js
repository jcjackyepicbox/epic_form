class UserModel {
  constructor() {}

  parseGoogleProfile(user) {
    this.display_name = user.displayName;
    this.provider = user.provider;
    this.email_verified = user.email_verified;
    this.email = user.email;
    this.image = user.picture;
    this.provider_id = user.id;
  }

  getUserCreation(new_workspace) {
    return {
      provider_id: this.provider_id,
      display_name: this.display_name,
      provider: this.provider,
      email_verified: this.email_verified,
      image: this.image,
      email: this.email,
      workspaces: [new_workspace],
    };
  }
}

export default UserModel;
