import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../../model/entities/Users';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    return await this.usersRepository.findOneBy({ userId: id });
  }
  async findByUser(uname: string): Promise<Users> {
    return await this.usersRepository.findOne({ where: { username: uname } });
  }
  async createUser(data: Users) {
    const newUser = new Users();
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(data.password, salt);
    newUser.firstName = data.firstName;
    newUser.lastName = data.lastName;
    newUser.username = data.username;
    newUser.password = passHash;

    await this.usersRepository.insert(newUser);

    return newUser;
  }

  async updateUser(id: number, data: Users): Promise<any> {
    // const userUpdate = new Users()
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(data.password, salt);
    await this.usersRepository.update(
      { userId: id },
      {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: passHash,
      },
    );
    return `Data with ID num : ${id} have been updated`;
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete({ userId: id });
    return `Data with ID num : ${id} have been deleted`;
  }

  async createUserToken(body: any, data: any): Promise<any> {
    // membandingkan password dari postman dan database dimana body diambil dari postman dan data dari database
    if (await bcrypt.compare(body.password, data.password)) {
      // mendeklarasi variable untuk menampung hasil dari jwt.sign
      const token = jwt.sign(
        {
          /** payload yang akan di tandatangani atau sign
           * object yang berisi properti (username) yang diisi nilai dari database (data.username)
           * payload juga bisa berisi informasi yang dapat digunakan oleh penerima token atau untuk authentikasi
           */
          username: data.username,
        },
        /**
         * secret key yang digunakan untuk menghasilkan signature
         */
        process.env.SECRET_KEY,
        {
          // Lama token berlaku dangan format s, m, h, d, m, y
          expiresIn: '1d',
        },
      );
      return {
        token: token,
      };
    } else {
      return {
        error: 'Password Incorrect',
      };
    }
  }
}
