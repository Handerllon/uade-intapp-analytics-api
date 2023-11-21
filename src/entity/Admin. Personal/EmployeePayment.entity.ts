import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmployeePayment {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"employee_payment"})
  eventName: string

  @Column({default:"admin-personal"})
  eventSender: string

  @Column()
  username: string;

  @Column()
  document: string
}