import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/user.dto";
import { User } from '../entities/user.entity';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ){}
    //Crear un registro
    async create(CreateUserDto: CreateUserDto) {
        const user = this.userRepo.create(CreateUserDto);
        await this.userRepo.save(user);

        return user;
    }
    //Encontrar un registro
    findOne(id: number){
        return this.userRepo.findOneBy({id});
    }
    //Mostrar todos los registros 
    findAll() {
        return this.userRepo.find({
            order: {id: 'ASC'},
        });
    }
    //Eliminar un registro
    async remove(id: number) {
        const User = await this.findOne(id);
        await this.userRepo.remove(User);
        return 'Usuario eliminado con exito!';
    }
    //Actualizar un registro o producto
    async update (id: number, cambios: CreateUserDto){
        const oldUser = await this.findOne(id);
        const updateUser = await this.userRepo.merge(oldUser, cambios);
        return this.userRepo.save(updateUser);
    }

}