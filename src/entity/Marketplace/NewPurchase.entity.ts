import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NewPurchase {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"new_purchase"})
  eventName: string

  @Column({default:"marketplace"})
  eventSender: string

  @Column()
  productName: string;

  @Column()
  productPrice: number;

  @Column()
  productAmount: number;

  @Column()
  productMarketplace: string;

  @Column()
  productMarketplaceCUIT: string;

  @Column()
  deliveryLot: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  document: string;

  @Column()
  purchaseId: number;
}