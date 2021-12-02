interface DatabaseStorage {
    savePurchase(): Promise<void>;
    saveSale(): Promise<void>;
}

export { DatabaseStorage };
