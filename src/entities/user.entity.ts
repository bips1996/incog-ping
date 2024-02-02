import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenericAppLevel } from "./generic_app_level.entity";

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

@Entity({ name: "users" })
export class User extends GenericAppLevel {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({
    name: "role",
    type: "enum",
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({ name: "gender", type: "enum", enum: Gender, default: Gender.Male })
  gender: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @Column({ name: "is_deleted", type: "boolean", default: false })
  isDeleted: boolean;

  @Column({ name: "display_picture_url", type: "text", nullable: true })
  displayPictureUrl: string;
}
