import {Table, Column, Model, DataType, AutoIncrement, PrimaryKey, Unique } from 'sequelize-typescript' ;


@Table({
    tableName : 'cart',
    timestamps : true
})

class Cart extends Model <Cart>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id! :number
    
    @Column(DataType.STRING)
    name! : string

    @Column(DataType.INTEGER)
    quantityProduct! : number

    @Column(DataType.INTEGER)
    price! : number

    @Column(DataType.STRING)
    image! : string

    @Column(DataType.STRING)
    id_purchase! : string
};

export default Cart