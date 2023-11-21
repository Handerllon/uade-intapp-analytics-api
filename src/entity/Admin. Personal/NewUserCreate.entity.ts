import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Groups {
    ADMINISTRADORES = "500",
    USUARIOS = "501",
    MARKETPLACE = "502",
    CONTABLE = "504",
    ROBOTS = "505",
    ANALITICA = "507",
    BANCARIO = "508",
    CEO = "509"
}

@Entity()
export class NewUserCreate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"new_user_create"})
  eventName: string

  @Column({default:"admin-personal"})
  eventSender: string

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  document: string;

  @Column({type: "enum", enum: Groups})
  grupo: string;
}