import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MarketCreation {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"marketplaceCreate"})
  eventName: string

  @Column()
  marketplaceName: string
}