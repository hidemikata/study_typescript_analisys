import { ita_keta_more_price } from './db_init.js';

export async function db_search_buying_data(code: string, ita_keta_id: number): Promise<ita_keta_more_price[] | undefined> {

    return new Promise((resolve, reject) => {

        global.db.all("SELECT * FROM ita_keta_more_price WHERE stock_code = ? and ita_keta_id = ?;",
            [code, ita_keta_id], (err, rows: ita_keta_more_price[] | undefined) => {

                if (err) {
                    console.error('Error search table', err);
                    reject(undefined)
                } else {
                    console.log('success search');
                }
                resolve(rows);

            });
    });
}
export async function db_get_stock_codes(): Promise<{ stock_code: string, ita_keta_id: number }[] | undefined> {

    return new Promise((resolve, reject) => {

        global.db.all("select distinct stock_code, ita_keta_id from ita_keta_more_price;",
            (err, rows: { stock_code: string, ita_keta_id: number }[] | undefined) => {

                if (err) {
                    console.error('Error search table', err);
                    reject(undefined)
                } else {
                    console.log('success search');
                }
                resolve(rows);

            });
    });
}