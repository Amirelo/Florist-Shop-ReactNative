class UserModel {
  email?: string;
  username?: string;
  themePref?: string;
  langPref?: string;
  addresses?: [];
  orders?: [];
  promocodes?: [];
  favoriteProducts?: [];
  constructor(
    email?: string,
    username?: string,
    themePref?: string,
    langPref?: string,
    addresses?: [],
    orders?: [],
    promocodes?: [],
    favoriteProducts?: [],
  ) {
    this.email = email;
    this.username = username;
    this.themePref = themePref;
    this.langPref = langPref;
    this.addresses = addresses;
    this.orders = orders;
    this.promocodes = promocodes;
    this.favoriteProducts = favoriteProducts;
  }

  setEmail?(email:string){
    this.email = email;
  }
}

export default UserModel;
