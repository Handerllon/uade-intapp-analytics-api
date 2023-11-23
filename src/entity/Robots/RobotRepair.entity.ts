import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
    LOW_BATTERY = "LOW_BATTERY",
    BUSY = "BUSY",
    AVAILABLE = "AVAILABLE",
    RETURNING = "RETURNING"
}

@Entity()
export class RobotsRobotRepair {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"robot_repair"})
  eventName: string

  @Column({default:"robots"})
  eventSender: string

  @Column({nullable: true})
  robotId: string;

  @Column({nullable: true})
  robotX: string;

  @Column({nullable: true})
  robotY: string;

  @Column({nullable: true})
  robotName: string;

  @Column({nullable: true})
  robotVelocity: string;

  @Column({nullable: true})
  robotBattery: string;

  @Column({nullable: true})
  robotStatus: string;

  @Column({nullable: true})
  robotDeliveryId: string;

  @Column({nullable: true})
  user: string;

  @Column({nullable: true})
  previousRobotStatus: string;

}