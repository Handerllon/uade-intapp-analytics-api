import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
    LOW_BATTERY = "LOW_BATTERY",
    BUSY = "BUSY",
    AVAILABLE = "AVAILABLE",
    RETURNING = "RETURNING"
}

@Entity()
export class RobotsRobotUpdate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"robot_update"})
  eventName: string

  @Column({default:"robots"})
  eventSender: string

  @Column({nullable: true})
  id: string;

  @Column({nullable: true})
  x: string;

  @Column({nullable: true})
  y: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  velocity: string;

  @Column({nullable: true})
  battery: string;

  @Column({nullable: true})
  robotStatus: string;

  @Column({nullable: true})
  deliveryId: string;

}