import sqlite3 from 'sqlite3';

export interface ita_keta_more_price {
    id: number,
    ita_keta_id: number,
    stock_code: string,
    current_price: number,
    price_time: string,
};

export default function db_initialize() {
    global.db = new sqlite3.Database('../kabu/db/order.db', (err) => {
        if (err) {
            console.error('Error opening database', err);
        } else {
            console.log('Successfully opened/created the database');
        }
    });
}
