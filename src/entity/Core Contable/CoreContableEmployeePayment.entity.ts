import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoreContEmployeePayment {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"employee_payment"})
  eventName: string

  @Column({default:"core-contable"})
  eventSender: string

  @Column({nullable: true})
  document: string

  @Column({nullable: true})
  salary: string
}