import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoreBancDeepRacerPaymentOk {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"deep_racer_payment_ok"})
  eventName: string

  @Column({default:"core-bancario"})
  eventSender: string

  @Column({nullable: true})
  paymentDate: Date;

  @Column({nullable: true})
  totalAmount: string;
}