import { Body, Controller,Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {

    constructor(private carService:CarsService)
    {
    }   

    @Get('activos')
    getAllCars(){
        return this.carService.getAll()
    }

    @Get('activos/:id')
    get(@Param('id' ) id:string ){
        return this.carService.get(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCar(@Body() createCar: CreateCarDto){
        return createCar
    }
}
