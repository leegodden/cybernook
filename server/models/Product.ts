import {
	Table,
	Column,
	Model,
	DataType,
	AutoIncrement,
	PrimaryKey,
} from 'sequelize-typescript';
import { sequelize } from '../connection/db';

@Table({
	tableName: 'products',
	timestamps: true,
})
class Product extends Model<Product> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id!: number;

	@Column(DataType.STRING)
	name!: string;

	@Column(DataType.INTEGER)
	price!: number;

	@Column(DataType.STRING)
	image!: string;

	@Column(DataType.STRING)
	category!: string;
}

export default Product;

//Opcion 2

// class Product extends Model{}

// Product.init({
//     id : {
//         type : DataType.INTEGER,
//         autoIncrement : true,
//         primaryKey : true,
//         unique : true
//     },
//     name : {
//         type : DataType.STRING
//     },
//     price : {
//         type : DataType.INTEGER,

//     },
//     image : {
//         type : DataType.STRING
//     },

// }, {sequelize})
// Product.sync({force : false})
// export default Product
