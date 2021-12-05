export function calculateCurrentStock(stockArray: any, productID: string) {
    let total = 0;
    for (const entry of stockArray) {
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
