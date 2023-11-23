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
export class AdmNewUserCreate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"new_user_create"})
  eventName: string

  @Column({default:"admin-personal"})
  eventSender: string

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  nombre: string;

  @Column({nullable: true})
  apellido: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  document: string;

  @Column({type: "enum", enum: Groups})
  grupo: string;
}