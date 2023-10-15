import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AdmUserCreate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: number;

  @Column({default:"userCreation"})
  eventName: string

  @Column()
  username: string

  @Column()
  organization: string

}