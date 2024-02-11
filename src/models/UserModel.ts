class UserModel {
  email?: string;
  username?: string;
  themePref?: string;
  langPref?: string;
  addresses?: [];
  orders?: [];
  promocodes?: [];
  favoriteProducts?: [];
  carts?:[];
  constructor(
    email?: string,
    username?: string,
    themePref?: string,
    langPref?: string,
    addresses?: [],
    orders?: [],
    promocodes?: [],
    favoriteProducts?: [],
    carts?: []
  ) {
    this.email = email;
    this.username = username;
    this.themePref = themePref;
    this.langPref = langPref;
    this.addresses = addresses;
    this.orders = orders;
    this.promocodes = promocodes;
    this.favoriteProducts = favoriteProducts;
    this.carts = carts;
  }

  setEmail?(email:string){
    this.email = email;
  }
}

export default UserModel;
