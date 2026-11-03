import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { OnlineStoreButton } from "@/components/OnlineStoreButton";

describe("OnlineStoreButton", () => {
  test("renders an external link when in stock", () => {
    render(<OnlineStoreButton href="https://www.owndays.com/jp/ja/products/X?sku=1" disabled={false} />);
    const link = screen.getByRole("link", { name: "ONLINE STORE" });
    expect(link).toHaveAttribute("href", "https://www.owndays.com/jp/ja/products/X?sku=1");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  test("renders a disabled OUT OF STOCK button without a link when out of stock", () => {
    render(<OnlineStoreButton href="https://x" disabled />);
    expect(screen.getByRole("button", { name: "OUT OF STOCK" })).toBeDisabled();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
