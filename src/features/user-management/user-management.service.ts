import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

export class UserManagementService {
  userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getUsers() {
    try {
      const users = await this.userRepository.find();
      return await this.userRepository.find();
    } catch (err) {
      console.log("Error =", err);
      throw err;
    }
  }
}
