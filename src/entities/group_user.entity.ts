import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GenericAppLevel } from "./generic_app_level.entity";
import { Document } from "./document.entity";
import { Group } from "./group.entity";
import { User } from "./user.entity";
import { Role, Status } from "../commons/common.types";

@Entity({ name: "group_users" })
export class GroupUser extends GenericAppLevel {
  @Column({ name: "group_id", type: "int" })
  groupId: number;

  @Column({ name: "user_id", type: "int" })
  userId: number;

  @Column({ name: "role", type: "enum", enum: Role })
  role: Role;

  @Column({ name: "added_by_user_id", type: "int" })
  addedByUserId: number;

  @Column({ name: "added_at", type: "timestamp with time zone" })
  addedAt: Date;

  @Column({ name: "removed_at", type: "timestamp with time zone" })
  removedAt: Date;

  @Column({ name: "removed_by", type: "int" })
  removedBy: number;

  @Column({ name: "status", type: "enum", enum: Status })
  status: Status;

  @Index()
  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({ name: "group_id", referencedColumnName: "id" })
  group: Group;

  @Index()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Index()
  @ManyToOne(() => User, (userDoc) => userDoc.id)
  @JoinColumn({ name: "removed_by", referencedColumnName: "id" })
  userDoc: User;
}
