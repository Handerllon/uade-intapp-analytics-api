import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoreContPurchase {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: number;

  @Column({default:"purchase"})
  eventName: string

  @Column()
  transactionId: string;

  @Column()
  paymentMethod: string;

  @Column()
  paymentAmount: number;

}