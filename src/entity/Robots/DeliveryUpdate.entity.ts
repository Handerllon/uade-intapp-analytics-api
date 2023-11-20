import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
  WAITING_PACKAGE = "waiting_for_package",
  WAITING_ROBOT = "waiting_for_robot",
  ON_TRANSIT = "on_transit"
}

@Entity()
export class DeliveryUpdate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"delivery_update"})
  eventName: string

  @Column({default:"robots"})
  eventSender: string

  @Column()
  purchaseId: number;

  @Column()
  status: string;

}