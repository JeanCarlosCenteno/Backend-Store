import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { UserImage } from './entities/user-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserImage])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersModule],
})
export class UsersModule {}