//create a new entity called DocumentType

import { GenericAppLevel } from "./generic_app_level.entity";
import { Entity, Column, OneToMany } from "typeorm";

@Entity({ name: "document_types" })
export class DocumentType extends GenericAppLevel {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "identifier", unique: true })
  identifier: string;

  @Column({ name: "allowed_file_types", type: "varchar", array: true })
  allowedFileTypes: string[];
}
