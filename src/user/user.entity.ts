import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Task from '../task/task.entity';

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    login: string;

    @Column({
        transformer: {
            to: (value: string) => value,
            from: () => null
        }
    })
    password: string;

    @OneToMany(() => Task, task => task.user, { cascade: true })
    tasks: Task[];

}

