export default class CategoryModel{
    id: string|number;
    name: string;
    image: string;
    constructor(id: string|number, name: string, image:string){
        this.id = id;
        this.name = name;
        this.image = image;
    }
}
