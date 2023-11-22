import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
    LOW_BATTERY = "LOW_BATTERY",
    BUSY = "BUSY",
    AVAILABLE = "AVAILABLE",
    RETURNING = "RETURNING"
}

@Entity()
export class RobotRepair {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"robot_repair"})
  eventName: string

  @Column({default:"robots"})
  eventSender: string

  @Column()
  robotId: string;

  @Column()
  robotX: string;

  @Column()
  robotY: string;

  @Column()
  robotName: string;

  @Column()
  robotVelocity: string;

  @Column()
  robotBattery: string;

  @Column({type: "enum", enum: Status})
  robotStatus: string;

  @Column()
  robotDeliveryId: string;

  @Column()
  user: string;

  @Column()
  previousRobotStatus: string;

}