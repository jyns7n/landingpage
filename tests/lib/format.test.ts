import { describe, expect, test } from "vitest";
import { formatPriceGrid, formatPriceModal } from "@/lib/format";

describe("price formatting", () => {
  test("grid price is ¥7,800+tax", () => {
    expect(formatPriceGrid(7800)).toBe("¥7,800+tax");
  });
  test("modal price is ¥7,800 税込", () => {
    expect(formatPriceModal(7800)).toBe("¥7,800 税込");
  });
  test("thousands separators for larger prices", () => {
    expect(formatPriceGrid(12345)).toBe("¥12,345+tax");
  });
});
