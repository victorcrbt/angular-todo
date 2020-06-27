import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export default class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;
}
