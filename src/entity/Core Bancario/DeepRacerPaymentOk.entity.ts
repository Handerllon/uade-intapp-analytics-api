import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DeepRacerPaymentOk {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"deep_racer_payment_ok"})
  eventName: string

  @Column({default:"core-bancario"})
  eventSender: string

  @Column()
  paymentDate: Date;

  @Column()
  totalAmount: string;
}