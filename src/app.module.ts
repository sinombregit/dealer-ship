import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SalesModule } from './sales/sales.module';
import { BrandsModule } from './brands/brands.module';
import { SeedModule } from './seed/seed.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CarsModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname, '..', 'public')
    }),
    MongooseModule.forRoot('mongodb+srv://master:z2ct1m2dYeJndzlm@dealer.xcjs6cm.mongodb.net/'),
    SalesModule,
    BrandsModule,
    SeedModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
