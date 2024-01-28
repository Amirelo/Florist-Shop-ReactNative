class AddressModel{
    id: number|string;
    streetNumber: string
    street: string;
    ward: string;
    district: string;
    city: string;

    constructor(id:number|string, streetNumber: string ,street: string ,ward: string ,district: string ,city: string){
        this.id = id;
        this.streetNumber = streetNumber;
        this.street = street;
        this.ward = ward;
        this.district = district;
        this.city = city;
    }
}

export default AddressModel;