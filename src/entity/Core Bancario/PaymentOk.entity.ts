import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoreBancPaymentOk {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"payment_ok"})
  eventName: string

  @Column({default:"core-bancario"})
  eventSender: string

  @Column({nullable: true})
  dni: string;

  @Column({nullable: true})
  monto: string;

  @Column({nullable: true})
  result: string;
}