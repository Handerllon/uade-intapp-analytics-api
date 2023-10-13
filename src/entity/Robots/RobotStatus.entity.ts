import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RobotStatus {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: number;

  @Column({default:"status"})
  eventName: string

  @Column()
  robotName: string;

  @Column()
  robotStatus: string;

  @Column()
  batteryLeft: number;

}