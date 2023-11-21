import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
    LOW_BATTERY = "LOW_BATTERY",
    BUSY = "BUSY",
    AVAILABLE = "AVAILABLE",
    RETURNING = "RETURNING"
}

@Entity()
export class RobotUpdate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"robot_update"})
  eventName: string

  @Column({default:"robots"})
  eventSender: string

  @Column()
  id: string;

  @Column()
  x: string;

  @Column()
  y: string;

  @Column()
  name: string;

  @Column()
  velocity: string;

  @Column()
  battery: string;

  @Column({type: "enum", enum: Status})
  robotStatus: string;

  @Column()
  deliveryId: string;

}