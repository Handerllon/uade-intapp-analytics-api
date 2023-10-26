import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MarketProductCreate {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"productCreate"})
  eventName: string

  @Column()
  marketplaceName: string

  @Column()
  productName: string

  @Column()
  productCategory: string
}