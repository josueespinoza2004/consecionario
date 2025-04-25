import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('cars')
  executedSeed() {
    return this.seedService.runSeedCars();
  }

  @Get('brands')
  executeSeedBrands() {
    return this.seedService.runSeedBrands();
  }
}
