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

export enum Events {
    LOGIN = "login",
    PWRESET = "passwordReset",
    QR = "qrGeneration",
}

@Entity()
export class UserActivity {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"user_activity"})
  eventName: string

  @Column({default:"admin-personal"})
  eventSender: string

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({type: "enum", enum: Groups})
  grupo: string;

  @Column({type: "enum", enum: Events})
  evento: string;
}