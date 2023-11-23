import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsuariosUserSupplierCount {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"user_supplier_count"})
  eventName: string

  @Column({default:"usuarios"})
  eventSender: string

  @Column({nullable: true})
  userCount: string;

  @Column({nullable: true})
  supplierCount: string;
}