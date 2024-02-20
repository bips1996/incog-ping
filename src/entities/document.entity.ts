import { GenericAppLevel } from "./generic_app_level.entity";
import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { DocumentType } from "./document_type.entity";

export enum StoreType {
  S3 = "s3",
  Local = "local",
  DB = "db",
}

@Entity({ name: "documents" })
export class Document extends GenericAppLevel {
  @Column({ name: "file_name" })
  fileName: string;

  @Column({ name: "file_type" })
  fileType: string;

  @Column({ name: "document_type_id" })
  documentTypeId: number;

  @Column({ name: "uploaded_on" })
  uploadedOn: Date;

  @Column({ name: "user_id" })
  userId: number;

  @Column({
    name: "store_type",
    type: "enum",
    enum: StoreType,
    default: StoreType.DB,
  })
  storeType: StoreType;

  @Column({ name: "file_stream", nullable: true })
  fileStream: string;

  @Column({ name: "object_key", nullable: true })
  objectKey: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => DocumentType, (documentType) => documentType.id)
  documentType: DocumentType;
}
