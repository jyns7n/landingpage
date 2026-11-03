import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import fixture from "../fixtures/products.json";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { ModalProvider, useProductModal } from "@/components/ModalProvider";
import { imageUrl, sortedImages } from "@/lib/product-utils";

const products = fixture.data as unknown as Product[];
const adisa = products.find((p) => p.product.model_name === "ADISA")!;

function Probe() {
  const { state } = useProductModal();
  return <output data-testid="probe">{state ? `${state.product.product.model_name}:${state.skuId}` : "closed"}</output>;
}

const setup = (product: Product = adisa) =>
  render(
    <ModalProvider>
      <ProductCard product={product} />
      <Probe />
    </ModalProvider>,
  );

const srcOf = (img: HTMLElement) => decodeURIComponent(img.getAttribute("src") ?? "");

describe("ProductCard", () => {
  test("shows model name, product code + sku and grid price", () => {
    setup();
    expect(screen.getByText("ADISA")).toBeInTheDocument();
    expect(screen.getByText("ML2001D-6S C1")).toBeInTheDocument();
    expect(screen.getByText("¥7,800")).toBeInTheDocument();
    expect(screen.getByText("+tax")).toBeInTheDocument();
  });

  test("clicking a swatch changes image and code but does not open the modal", async () => {
    setup();
    await userEvent.setup().click(screen.getByRole("radio", { name: "Clear Gray" }));
    expect(screen.getByText("ML2001D-6S C3")).toBeInTheDocument();
    const first = imageUrl(sortedImages(adisa.skus[2])[0].path);
    expect(srcOf(screen.getByRole("img", { name: /ADISA/ }))).toContain(first);
    expect(screen.getByTestId("probe")).toHaveTextContent("closed");
  });

  test("clicking the card opens the modal with the active sku", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("radio", { name: "Clear Gray" }));
    await user.click(screen.getByRole("button", { name: "View ADISA" }));
    expect(screen.getByTestId("probe")).toHaveTextContent(`ADISA:${adisa.skus[2].id}`);
  });

  test("shows at most 4 swatches and a +N for the overflow", () => {
    const extra = { ...adisa.skus[0], id: 99999, code: "C5" };
    setup({ ...adisa, skus: [...adisa.skus, extra] });
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  test("swatch group is labelled with the radiogroup role", () => {
    setup();
    const group = screen.getByRole("radiogroup", { name: "ADISA colors" });
    expect(within(group).getAllByRole("radio")).toHaveLength(4);
  });
});
