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

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}

@Entity({ name: "users" })
export class User extends GenericAppLevel {
  @Column({ name: "display_name" })
  displayName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @Column({
    name: "role",
    type: "enum",
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({ name: "gender", type: "enum", enum: Gender, default: Gender.Male })
  gender: string;

  @Column({
    name: "status",
    type: "enum",
    enum: UserStatus,
    default: UserStatus.Active,
  })
  status: UserStatus;

  @Column({ name: "uid", nullable: true })
  uid: string;

  @Column({ name: "is_system_generated", default: false })
  isSystemGenerated: boolean;

  @Column({ name: "otp", nullable: true })
  otp: string;
}
