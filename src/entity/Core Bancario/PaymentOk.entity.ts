import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PaymentOk {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"payment_ok"})
  eventName: string

  @Column({default:"core-bancario"})
  eventSender: string

  @Column()
  dni: string;

  @Column()
  monto: string;

  @Column()
  result: string;
}