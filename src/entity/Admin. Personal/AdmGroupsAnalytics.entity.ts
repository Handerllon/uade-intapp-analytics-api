import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AdmGroupsAnalytics {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"groups_analytics"})
  eventName: string

  @Column({default:"admin-personal"})
  eventSender: string

  @Column({nullable: true})
  grupo: string;

  @Column({nullable: true})
  cantidad: string
}