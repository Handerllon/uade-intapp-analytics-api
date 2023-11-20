import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
  DELIVERED = "delivered"
}

@Entity()
export class DeliverySuccessful {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"delivery_successful"})
  eventName: string

  @Column({default:"robots"})
  eventSender: string

  @Column()
  purchaseId: number;

  @Column()
  status: string;

}