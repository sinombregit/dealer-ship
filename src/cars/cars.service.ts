import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'

@Injectable()
export class CarsService {

    private cars:{id:string,model:string, marca:string}[] =[
        {id:uuid(), model:'civic', marca:'honda'}, 
        {id:uuid(), model:'mercedes benz', marca:'mercedes benz'}, 
        {id:uuid(), model:'cherokee', marca:'Jeep'}]

    getAll()
    {
        return this.cars;
    }

    get(id:string)
    {
        return this.cars.find(x => x.id==id)
    }
}
