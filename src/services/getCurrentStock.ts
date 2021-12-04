export function calculateCurrentStock(stockArray: any, idProducto: string) {
    let total = 0;
    for (const entry of stockArray) {
        if (entry.idProducto === idProducto) {
            let delta = entry.cantidad;
            if (entry.tipoOperacion === 'SALE') {
                delta = delta * -1;
            }
            total += delta;
        }
    }
    return total;
}
