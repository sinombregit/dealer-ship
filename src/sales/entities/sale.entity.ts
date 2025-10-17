import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Sale extends Document 
{
    @Prop({
        unique:true,
        index:true
    })
    ticket:number

    name:string;
}

export const SaleSchema=SchemaFactory.createForClass(Sale)
