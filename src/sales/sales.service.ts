import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Model } from 'mongoose';
import { Sale } from './entities/sale.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SalesService {

  constructor(
    @InjectModel(Sale.name)
    private readonly salesModel:Model<Sale>){}

  async create(createSaleDto: CreateSaleDto) {

    const sale=await this.salesModel.create(createSaleDto);

    return sale;
  }

  async  findAll() {
    return await this.salesModel.find()
  }

  async findOne(id: number) {

    let sale:any

    if(!isNaN(+id))
    {
      sale=await this.salesModel.findOne({ticket:+id})
    }

    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
