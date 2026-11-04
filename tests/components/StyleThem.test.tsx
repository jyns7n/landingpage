import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import fixture from "../fixtures/products.json";
import type { Product } from "@/lib/types";
import { ModalProvider, useProductModal } from "@/components/ModalProvider";
import { StyleThem } from "@/components/StyleThem";
import { STYLE_ITEMS } from "@/lib/style-items";

const products = fixture.data as unknown as Product[];

function Probe() {
  const { state } = useProductModal();
  return <output data-testid="probe">{state ? state.product.product.model_name : "closed"}</output>;
}

const setup = (list: Product[] = products) =>
  render(
    <ModalProvider>
      <StyleThem products={list} />
      <Probe />
    </ModalProvider>,
  );

describe("StyleThem", () => {
  test("renders the HOW TO / STYLE THEM title and one photo per look", () => {
    setup();
    expect(screen.getByRole("heading", { level: 2, name: "HOW TO STYLE THEM" })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(STYLE_ITEMS.length);
  });

  test("+ button opens the modal for the mapped product", async () => {
    setup();
    await userEvent.setup().click(screen.getAllByRole("button", { name: "View CHAUEN" })[0]);
    expect(screen.getByTestId("probe")).toHaveTextContent("CHAUEN");
  });

  test("looks whose product is not loaded render no + button", () => {
    setup([products[0]]);
    expect(screen.getAllByRole("button")).toHaveLength(
      STYLE_ITEMS.filter((i) => i.productCode === "ML2001D-6S").length,
    );
  });

  test("mouse drag scrolls the strip horizontally", () => {
    setup();
    const strip = screen.getByRole("region", { name: "Style looks" });
    fireEvent.mouseDown(strip, { clientX: 300, button: 0 });
    fireEvent.mouseMove(window, { clientX: 100 });
    fireEvent.mouseUp(window);
    expect(strip.scrollLeft).toBe(200);
  });
});
