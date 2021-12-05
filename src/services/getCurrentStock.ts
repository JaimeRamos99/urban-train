import { getStockFromDB } from '../adapters/mongo';

export async function calculateCurrentStock(productID: string) {
    const transactions = await getStockFromDB(productID);
    let total = 0;
    for (const entry of transactions) {
        if (entry.productID === productID) {
            let delta = entry.quantity;
            if (entry.orderType === 'SALE') {
                delta = delta * -1;
            }
            total += delta;
        }
    }
    return total;
}
