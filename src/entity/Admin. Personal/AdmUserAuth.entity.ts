import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AdmUserAuth {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"userAuthentication"})
  eventName: string

  @Column()
  username: string

  @Column()
  organization: string

}