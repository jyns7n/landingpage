const yen = new Intl.NumberFormat("en-US");

export function formatPriceGrid(price: number): string {
  return `¥${yen.format(price)}+tax`;
}

export function formatPriceModal(price: number): string {
  return `¥${yen.format(price)} 税込`;
}
