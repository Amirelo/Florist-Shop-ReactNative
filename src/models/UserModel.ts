class UserModel {
  email?: string;
  username?: string;
  image?:string;
  phoneNumber?:string;
  themePref?: string;
  langPref?: string;
  constructor(
    email?: string,
    username?: string,
    image?:string,
    phoneNumber?:string,
    themePref?: string,
    langPref?: string,
  ) {
    this.email = email;
    this.username = username;
    this.image = image;
    this.phoneNumber = phoneNumber;
    this.themePref = themePref;
    this.langPref = langPref;
  }

  setEmail(email:string){
    this.email = email;
  }
  setUsername(username:string){
    this.username = username;
  }
}

export default UserModel;
