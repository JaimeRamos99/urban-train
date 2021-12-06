import { getStockFromDB } from '../adapters/mongo';
import { getCurrentDate } from '../common/utils/getTime';

export async function calculateCurrentStock(productID: string) {
    const transactions = await getStockFromDB(productID);
    let availableItems = 0;
    let purchaseThisMonth = 0;

    for (const entry of transactions) {
        if (entry.productID === productID) {
            let delta = entry.quantity;
            if (entry.orderType === 'SALE') {
                delta = delta * -1;
            }
            availableItems += delta;
            const transactionMonth = entry.date.substring(0, 2);
            const transactionYear = entry.date.substring(6, 10);
            const currentDate = getCurrentDate();
            const currentMonth = currentDate.substring(0, 2);
            const currentYear = currentDate.substring(6, 10);

            if (transactionMonth === currentMonth && transactionYear == currentYear && entry.orderType === 'PURCHASE') {
                purchaseThisMonth += entry.quantity;
            }
        }
    }
    return { purchaseThisMonth, availableItems };
}
