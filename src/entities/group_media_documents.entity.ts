import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GenericAppLevel } from "./generic_app_level.entity";
import { Document } from "./document.entity";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity({ name: "group_media_documents" })
export class GroupMediaDocument extends GenericAppLevel {
  @Column({ name: "group_id", type: "int" })
  groupId: number;

  @Column({ name: "uploaded_by_user_id", type: "int" })
  uploadedByUserId: number;

  @Column({ name: "document_id", type: "int" })
  documentId: number;

  @Index()
  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({ name: "group_id", referencedColumnName: "id" })
  group: Group;

  @Column({ name: "uploaded_at", type: "timestamp with time zone" })
  uploadedAt: Date;

  @Index()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "uploaded_by_user_id", referencedColumnName: "id" })
  user: User;

  @Index()
  @ManyToOne(() => Document, (document) => document.id)
  @JoinColumn({ name: "document_id", referencedColumnName: "id" })
  document: Document;
}
