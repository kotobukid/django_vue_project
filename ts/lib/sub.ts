const calc_tax = (price: number, tax_rate: number): number => {
    return Math.round(price * ((100 + tax_rate) / 100));
};


export {
    calc_tax
};