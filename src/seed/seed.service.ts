import { Injectable } from '@nestjs/common';
import { CarsService } from '../modules/cars/services/cars.service';
import { initialData } from './data/seed-data';
import { Car } from '../modules/cars/entities/car.entity';
import { BrandsService } from '../modules/brands/services/brands.service';
import { Brand } from '../modules/brands/entities/brand.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly bransService: BrandsService,
  ) {}

  async runSeedCars() {
    await this.insertNewCars();
    return 'SEED CARS EXECUTED';
  }

  async runSeedBrands() {
    await this.insertNewBrands();
    return 'SEED BRANDS EXECUTED';
  }

  private async insertNewBrands() {
    await this.bransService.deleteAllBrands();
    const brands = initialData.brands;
    const insertPromises: Promise<Brand | undefined>[] = [];
    brands.forEach((brand) => {
      insertPromises.push(this.bransService.create(brand));
    });

    return true;
  }

  private async insertNewCars() {
    await this.carsService.deleteAllCars();

    const cars = initialData.cars;
    const insertPromises: Promise<Car | undefined>[] = [];

    cars.forEach((car) => {
      insertPromises.push(this.carsService.create(car));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
