import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AdmEmployeePayment {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"employee_payment"})
  eventName: string

  @Column({default:"admin-personal"})
  eventSender: string

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  document: string
}