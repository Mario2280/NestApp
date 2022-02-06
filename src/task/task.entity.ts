/* eslint-disable import/no-cycle */
import {
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import User from '../user/user.entity';
import Board from '../board/board.entity';
// import ColumnEntity from './Column';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (users) => users.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User;

  // eslint-disable-next-line spaced-comment
  //No profit
  @Column({ nullable: true })
  columnId: string;

  // @ManyToOne(() => ColumnEntity, column => column.tasks, { onDelete: 'SET NULL' })
  // @JoinColumn({name: 'columnId'})
  // column: ColumnEntity;

  @Column({ nullable: true })
  boardId: string;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;
}
