import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RobotDelivery {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"delivery"})
  eventName: string

  @Column()
  robotName: string;

  @Column()
  neighbourhoodLot: number;

  @Column()
  itemName: string;

}