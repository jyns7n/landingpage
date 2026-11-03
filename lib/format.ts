const yen = new Intl.NumberFormat("en-US");

export function formatPriceGrid(price: number): string {
  return `${formatYen(price)}+tax`;
}

export function formatPriceModal(price: number): string {
  return `${formatYen(price)} 税込`;
}

export function formatYen(price: number): string {
  return `¥${yen.format(price)}`;
}
