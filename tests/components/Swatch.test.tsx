import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import fixture from "../fixtures/products.json";
import type { Product } from "@/lib/types";
import { Swatch } from "@/components/Swatch";

const products = fixture.data as unknown as Product[];
const adisa = products.find((p) => p.product.model_name === "ADISA")!;
const kessie = products.find((p) => p.product.model_name === "KESSIE")!;
const dot = (name: string) =>
  screen.getByRole("radio", { name }).querySelector<HTMLElement>("[data-swatch-dot]")!;

describe("Swatch", () => {
  test("solid hex color fills the dot", () => {
    render(<Swatch colors={adisa.skus[0].colors} selected label="Black" onSelect={() => {}} />);
    expect(dot("Black").style.backgroundColor).toBe("rgb(0, 0, 0)");
  });

  test("pattern image is used when hex_code is null", () => {
    render(<Swatch colors={adisa.skus[1].colors} selected={false} label="Brown Demi" onSelect={() => {}} />);
    const bg = decodeURIComponent(dot("Brown Demi").style.backgroundImage);
    expect(bg).toContain("https://storage.owndays.com/storage/colors/");
    expect(bg).toContain("/_next/image");
  });

  test("two-color sku renders a two-tone gradient", () => {
    render(<Swatch colors={kessie.skus[3].colors} selected={false} label="Black × Orange" onSelect={() => {}} />);
    const bg = dot("Black × Orange").style.backgroundImage;
    expect(bg).toContain("linear-gradient");
    expect(bg).toContain("rgb(0, 0, 0)");
    expect(bg).toContain("rgb(239, 127, 28)");
  });

  test("reflects selection and calls onSelect", async () => {
    const onSelect = vi.fn();
    render(<Swatch colors={adisa.skus[0].colors} selected label="Black" onSelect={onSelect} />);
    const radio = screen.getByRole("radio", { name: "Black" });
    expect(radio).toHaveAttribute("aria-checked", "true");
    await userEvent.setup().click(radio);
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
