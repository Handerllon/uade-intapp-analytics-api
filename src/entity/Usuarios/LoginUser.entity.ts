import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsuariosLoginUser {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"login_user"})
  eventName: string

  @Column({default:"usuarios"})
  eventSender: string

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  document: string;

  @Column({nullable: true})
  address: string;
}