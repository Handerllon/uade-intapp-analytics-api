import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoreContableEmployeePayment {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"employee_payment"})
  eventName: string

  @Column({default:"core-contable"})
  eventSender: string

  @Column()
  document: string

  @Column()
  salary: string
}