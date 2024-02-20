import { GenericAppLevel } from "./generic_app_level.entity";
import { Entity, Column, ManyToOne, In, Index, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Document } from "./document.entity";

@Entity({ name: "user_documents" })
export class UserDocument extends GenericAppLevel {
  @Column({ name: "user_id", type: "int" })
  userId: number;

  @Column({ name: "document_id", type: "int" })
  documentId: number;

  @Index()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Index()
  @ManyToOne(() => Document, (document) => document.id)
  @JoinColumn({
    name: "document_id",
    referencedColumnName: "id",
  })
  document: Document;
}
