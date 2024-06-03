import {
	Model,
	Table,
	DataType,
	PrimaryKey,
	AutoIncrement,
	Column,
} from 'sequelize-typescript';
import { User as UserInterface } from '../interfaces/User';

@Table({
	tableName: 'users',
	timestamps: true,
})
class User extends Model<User, UserInterface> {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	id!: number | string;

	@Column(DataType.STRING)
	name!: string;

	@Column(DataType.STRING)
	password!: string;

	@Column(DataType.STRING)
	email!: string;
}
export default User;
