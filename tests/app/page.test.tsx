import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import fixture from "../fixtures/products.json";
import type { Product } from "@/lib/types";

vi.mock("@/lib/products", () => ({ getProducts: vi.fn() }));

import { getProducts } from "@/lib/products";
import Home from "@/app/page";

const products = fixture.data as unknown as Product[];

describe("Home page", () => {
  beforeEach(() => {
    vi.mocked(getProducts).mockReset();
  });

  test("renders a card for every product plus the style section", async () => {
    vi.mocked(getProducts).mockResolvedValue(products);
    render(await Home());
    expect(screen.getAllByRole("button", { name: /^View (ADISA|CHAUEN|KESSIE)$/ }).length).toBeGreaterThanOrEqual(products.length);
    expect(screen.getByRole("heading", { level: 1, name: "PRODUCTS" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "HOW TO STYLE THEM" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ALL ITEMS" })).toBeInTheDocument();
  });

  test("shows an error state with a retry link when the API fails, keeping header and footer", async () => {
    vi.mocked(getProducts).mockRejectedValue(new Error("boom"));
    render(await Home());
    expect(screen.getByRole("alert")).toHaveTextContent("商品情報を読み込めませんでした");
    expect(screen.getByRole("link", { name: "Try again" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
