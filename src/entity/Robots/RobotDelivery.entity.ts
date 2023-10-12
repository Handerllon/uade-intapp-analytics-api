import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RobotDelivery {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventid: string;

  @Column()
  eventName: string

  @Column()
  robotName: string;

  @Column()
  neighbourhoodLot: number;

  @Column()
  itemName: string;

  @Column()
  createdDate: number;
}