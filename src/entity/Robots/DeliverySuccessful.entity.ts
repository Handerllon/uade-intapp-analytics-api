import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
  DELIVERED = "delivered"
}

@Entity()
export class RobotsDeliverySuccessful {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"delivery_successful"})
  eventName: string

  @Column({default:"robots"})
  eventSender: string

  @Column({nullable: true})
  purchaseId: number;

  @Column({nullable: true})
  status: string;

  @Column({nullable: true})
  deliveryDate: Date;

  @Column({nullable: true})
  requestDate: Date;

}