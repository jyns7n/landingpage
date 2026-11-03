import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import fixture from "../fixtures/products.json";
import type { Product } from "@/lib/types";
import { ModalProvider, useProductModal } from "@/components/ModalProvider";
import { ProductModal } from "@/components/ProductModal";

const products = fixture.data as unknown as Product[];
const byName = (n: string) => products.find((p) => p.product.model_name === n)!;
const adisa = byName("ADISA");
const chauen = byName("CHAUEN");

function Opener({ product }: { product: Product }) {
  const { open } = useProductModal();
  return <button onClick={() => open(product)}>open {product.product.model_name}</button>;
}

const setup = (product: Product) => {
  const user = userEvent.setup();
  render(
    <ModalProvider>
      <Opener product={product} />
      <ProductModal />
    </ModalProvider>,
  );
  return user;
};

const openIt = async (user: ReturnType<typeof userEvent.setup>, name: string) =>
  user.click(screen.getByRole("button", { name: `open ${name}` }));

describe("ProductModal", () => {
  test("is closed until opened, then shows all product info", async () => {
    const user = setup(adisa);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await openIt(user, "ADISA");
    const dialog = screen.getByRole("dialog", { name: "ADISA" });
    expect(within(dialog).getByText("P/No.").nextElementSibling).toHaveTextContent("ML2001D-6S C1");
    expect(within(dialog).getByText("TYPE").nextElementSibling).toHaveTextContent("SQUARE");
    expect(within(dialog).getByText("PRICE").nextElementSibling).toHaveTextContent("¥7,800 税込");
    expect(within(dialog).getByText(adisa.localization.description)).toBeInTheDocument();
    expect(within(dialog).getByText("OWNDAYSオンラインストアに移動します")).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "ONLINE STORE" })).toHaveAttribute(
      "href",
      "https://www.owndays.com/jp/ja/products/ML2001D-6S?sku=9445",
    );
  });

  test("selecting a color chip switches code, store link and carousel images", async () => {
    const user = setup(adisa);
    await openIt(user, "ADISA");
    const carousel = () => screen.getByRole("region", { name: "ADISA images" });
    expect(within(carousel()).getAllByRole("img")).toHaveLength(6);
    await user.click(screen.getByRole("radio", { name: "Brown Demi" }));
    expect(screen.getByText("P/No.").nextElementSibling).toHaveTextContent("ML2001D-6S C2");
    expect(screen.getByRole("link", { name: "ONLINE STORE" })).toHaveAttribute(
      "href",
      expect.stringContaining("sku=9446"),
    );
    expect(within(carousel()).getAllByRole("img")).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "Brown Demi" })).toHaveAttribute("aria-checked", "true");
  });

  test("close button, ESC and backdrop each dismiss and restore scroll + focus", async () => {
    const user = setup(adisa);
    const trigger = screen.getByRole("button", { name: "open ADISA" });

    await user.click(trigger);
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    await user.click(trigger);
    await user.click(screen.getByTestId("modal-backdrop"));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  test("out-of-stock product shows a disabled OUT OF STOCK button and no store link", async () => {
    const user = setup(chauen);
    await openIt(user, "CHAUEN");
    expect(screen.getByRole("button", { name: "OUT OF STOCK" })).toBeDisabled();
    expect(screen.queryByRole("link", { name: "ONLINE STORE" })).not.toBeInTheDocument();
  });
});
