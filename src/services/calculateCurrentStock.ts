import { getStockFromDB } from '../adapters/mongo';
import { getCurrentDate } from '../common/utils/getTime';

export async function calculateCurrentStock(productID: string) {
    const transactions = await getStockFromDB(productID);
    let totalStock = 0;
    let purchaseThisMonth = 0;

    for (const entry of transactions) {
        let delta = entry.quantity;

        if (entry.orderType === 'SALE') {
            delta = delta * -1;
        }
        const transactionMonth = entry.date.substring(3, 5);
        const transactionYear = entry.date.substring(6, 10);
        const currentDate = getCurrentDate();
        const currentMonth = currentDate.substring(3, 5);
        const currentYear = currentDate.substring(6, 10);
        totalStock += delta;
        if (transactionMonth === currentMonth && transactionYear == currentYear && entry.orderType === 'PURCHASE') {
            purchaseThisMonth += entry.quantity;
        }
    }
    return { purchaseThisMonth, totalStock };
}
