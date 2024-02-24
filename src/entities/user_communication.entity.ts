import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GenericAppLevel } from "./generic_app_level.entity";
import { DeliveryStatus } from "../commons/common.types";
import { User } from "./user.entity";
import { UserDocument } from "./user_document.entity";

@Entity({ name: "user_communications" })
export class UserCommunication extends GenericAppLevel {
  @Column({ name: "sender_user_id", type: "int" })
  senderUserId: number;

  @Column({ name: "recipient_user_id", type: "int" })
  recipientUserId: number;

  @Column({ name: "message" })
  message: string;

  @Column({ name: "user_document_id", type: "int" })
  userDocumentId: number;

  @Column({ name: "send_at", type: "timestamp with time zone" })
  sendAt: Date;

  @Column({ name: "received_at", type: "timestamp with time zone" })
  receivedAt: Date;

  @Column({ name: "seen_at", type: "timestamp with time zone" })
  seenAt: Date;

  @Column({ name: "delivery_status", type: "enum", enum: DeliveryStatus })
  deliveryStatus: DeliveryStatus;

  @Index()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "sender_user_id", referencedColumnName: "id" })
  user: User;

  @Index()
  @ManyToOne(() => User, (userDoc) => userDoc.id)
  @JoinColumn({ name: "recipient_user_id", referencedColumnName: "id" })
  userDoc: User;

  @Index()
  @ManyToOne(() => UserDocument, (userDocument) => userDocument.id)
  @JoinColumn({ name: "user_document_id", referencedColumnName: "id" })
  groupDocument: UserDocument;
}
