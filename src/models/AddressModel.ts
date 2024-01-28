class AddressModel{
    id?: number|string;
    streetNumber?: string
    street?: string;
    ward?: string;
    district?: string;
    city?: string;

    constructor(id?:number|string, streetNumber?: string ,street?: string ,ward?: string ,district?: string ,city?: string){
        this.id = id;
        this.streetNumber = streetNumber;
        this.street = street;
        this.ward = ward;
        this.district = district;
        this.city = city;
    }
    
    setStreetNumber(streetNumber: string){
        this.streetNumber = streetNumber;
    }

    setStreet(street: string) {
        this.street = street;
    }

    setWard(ward: string){
        this.ward = ward;
    }

    setDistrict(district:string){
        this.district = district;
    }

    setCity(city:string){
        this.city = city;
    }
}

export default AddressModel;