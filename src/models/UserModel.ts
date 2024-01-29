class UserModel{
    id:number|string;
    fullname: string;
    email: string;
    themePref: string;
    langPref: string;
    constructor(id:number|string,fullname: string,email: string,themePref: string,langPref: string){
        this.id = id
        this.fullname = fullname
        this.email = email
        this.themePref = themePref
        this.langPref = langPref
    }
}