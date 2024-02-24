import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GenericAppLevel } from "./generic_app_level.entity";
import { Group } from "./group.entity";
import { DeliveryStatus } from "../commons/common.types";
import { GroupUser } from "./group_user.entity";
import { GroupMediaDocument } from "./group_media_documents.entity";

@Entity({ name: "group_communications" })
export class GroupCommunication extends GenericAppLevel {
  @Column({ name: "group_id", type: "int" })
  groupId: number;

  @Column({ name: "sender_group_user_id", type: "int" })
  senderGroupUserId: number;

  @Column({ name: "group_document_id", type: "int" })
  groupDocumentId: number;

  @Column({ name: "send_at", type: "timestamp with time zone" })
  sendAt: Date;

  @Column({ name: "delivery_status", type: "enum", enum: DeliveryStatus })
  deliveryStatus: DeliveryStatus;

  @Index()
  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({ name: "group_id", referencedColumnName: "id" })
  group: Group;

  @Index()
  @ManyToOne(() => GroupUser, (groupUser) => groupUser.id)
  @JoinColumn({ name: "sender_group_user_id", referencedColumnName: "id" })
  groupUser: GroupUser;

  @Index()
  @ManyToOne(
    () => GroupMediaDocument,
    (groupMediaDocument) => groupMediaDocument.id
  )
  @JoinColumn({ name: "group_document_id", referencedColumnName: "id" })
  groupMediaDocument: GroupMediaDocument;
}
