import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoreBancNewPaymentDeliverar {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"new_payment_deliverar"})
  eventName: string

  @Column({default:"core-bancario"})
  eventSender: string

  @Column({nullable: true})
  businessName: string;

  @Column({nullable: true})
  paymentDate: Date;

  @Column({nullable: true})
  amount: string;
}