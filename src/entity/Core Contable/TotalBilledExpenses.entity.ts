import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoreContTotalBilledExpenses {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"total_billed_expenses"})
  eventName: string

  @Column({default:"core-contable"})
  eventSender: string

  @Column({nullable: true})
  totalBilled: string

  @Column({nullable: true})
  totalExpensed: string
}