import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserType {
  ADMIN = "admin",
  USER = "user",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ type: "enum", enum: UserType, default: UserType.USER })
  userType: UserType;
}
