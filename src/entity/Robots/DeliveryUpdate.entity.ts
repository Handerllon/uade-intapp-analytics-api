import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
  WAITING_PACKAGE = "waiting_for_package",
  WAITING_ROBOT = "waiting_for_robot",
  ON_TRANSIT = "on_transit"
}

@Entity()
export class RobotsDeliveryUpdate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"delivery_update"})
  eventName: string

  @Column({default:"robots"})
  eventSender: string

  @Column({nullable: true})
  purchaseId: string;

  @Column({nullable: true})
  status: string;

}