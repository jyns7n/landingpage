import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  test("has nav anchors that the header links also target", () => {
    const { container } = render(<Footer />);
    const nav = screen.getByRole("navigation", { name: "Footer" });
    expect(within(nav).getByRole("link", { name: "ABOUT" })).toHaveAttribute("href", "#about");
    expect(within(nav).getByRole("link", { name: "PRODUCTS" })).toHaveAttribute("href", "#products");
    expect(within(nav).getByRole("link", { name: "STORES" })).toHaveAttribute("href", "#stores");
    expect(container.querySelector("#about")).not.toBeNull();
    expect(container.querySelector("#stores")).not.toBeNull();
  });

  test("ALL ITEMS leads to the full collection grid", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "ALL ITEMS" })).toHaveAttribute("href", "#products");
  });

  test("ONLINE STORE / OWNDAYS.COM open the store in a new tab", () => {
    render(<Footer />);
    for (const name of ["ONLINE STORE", "OWNDAYS.COM"]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", "https://www.owndays.com/jp/ja");
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("shows legal links and copyright", () => {
    render(<Footer />);
    for (const t of ["CONTACT US", "PRIVACY POLICY", "TERMS OF USE", "特定商取引法表示"]) {
      expect(screen.getByRole("link", { name: t })).toBeInTheDocument();
    }
    expect(screen.getByText(/COPYRIGHT \(C\) OWNDAYS CO\., LTD\. ALL RIGHTS RESERVED\./i)).toBeInTheDocument();
  });
});
