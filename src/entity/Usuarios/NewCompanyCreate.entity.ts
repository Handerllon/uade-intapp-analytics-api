import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsuariosNewCompanyCreate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"new_company_create"})
  eventName: string

  @Column({default:"usuarios"})
  eventSender: string

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  businessName: string;

  @Column({nullable: true})
  cuit: string;

  @Column({nullable: true})
  domain: string;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  phone: string;

  @Column({nullable: true})
  category: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  password: string;
}