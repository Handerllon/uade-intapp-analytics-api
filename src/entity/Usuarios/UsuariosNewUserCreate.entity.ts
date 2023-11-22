import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsuariosNewUserCreate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"new_user_create"})
  eventName: string

  @Column({default:"usuarios"})
  eventSender: string

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  document: string;

  @Column()
  address: string;
}