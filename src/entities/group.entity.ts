import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GenericAppLevel } from "./generic_app_level.entity";
import { Document } from "./document.entity";

enum groupStatus {
  Active = "active",
  Inactive = "inactive",
  Deleted = "deleted",
}
@Entity({ name: "groups" })
export class Group extends GenericAppLevel {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "tagline" })
  tagline: string;

  @Column({ name: "icon_document_id", type: "int" })
  iconDocumentId: number;

  @Column({ name: "status", type: "enum", enum: groupStatus })
  status: groupStatus;

  @Index()
  @ManyToOne(() => Document, (document) => document.id)
  @JoinColumn({ name: "icon_document_id", referencedColumnName: "id" })
  document: Document;
}
