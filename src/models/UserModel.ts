class UserModel {
  email?: string;
  username?: string;
  themePref?: string;
  langPref?: string;
  constructor(
    email?: string,
    username?: string,
    themePref?: string,
    langPref?: string,
  ) {
    this.email = email;
    this.username = username;
    this.themePref = themePref;
    this.langPref = langPref;
  }

  setEmail?(email:string){
    this.email = email;
  }
}

export default UserModel;
