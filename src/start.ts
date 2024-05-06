import db_initialize from './db/db_init.js';
import ita_keta_more_price from './db/db_init.js';

import { db_search_buying_data, db_get_stock_codes } from './db/db_select_ita_keta_more_price.js';
import file_output from './file_output.js';

// npx tsc -p .\tsconfig.json; node .\dist\start.js
db_initialize();
const stock_codes: { stock_code: string, ita_keta_id: number }[] | undefined = await db_get_stock_codes();

if (!stock_codes) {
    process.exit();
}

let data;
export interface setting_data {
    label: string[],
    price: number[],
    max: number,
    min: number,
    time: string
};
let set_data: setting_data;
let file_index: number = 0;
for (const item of stock_codes) {
    let code = item.stock_code;
    let ita_keta_id = item.ita_keta_id;

    data = await db_search_buying_data(code, ita_keta_id);

    set_data = create_setting_data(data);

    file_output(code, ita_keta_id, file_index++, set_data);

}

process.exit();

function create_setting_data(data: any): setting_data {
    let index_arr: string[] = [];
    let price_arr: number[] = [];
    let max = 0;
    let min = 9999999;

    for (let i = 0; i < data.length; i++) {
        index_arr.push(i.toString())
        price_arr.push(data[i].current_price)
        if (max < data[i].current_price) {
            max = data[i].current_price;
        }

        if (min > data[i].current_price) {
            min = data[i].current_price;
        }
    }
    max = max * 1.01;
    min = min * 0.99;

    return {
        label: index_arr,
        price: price_arr,
        max: max,
        min: min,
        time: data[0].price_time
    };
}
