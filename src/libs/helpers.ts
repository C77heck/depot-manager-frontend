export const priceFormat = (amount: number, decimal = 1, currency: string = 'huf') => {
    const val = !!amount ? amount : 0;
    const price = Math.round(val * decimal);

    return Intl
        .NumberFormat('hu-HU', {
            style: 'currency', currency: (currency || '')
                .toUpperCase()
        })
        .format(price)
        .replace(/\D00(?=\D*$)/, '')
        .replace(/hun/i, 'Ft');
};
