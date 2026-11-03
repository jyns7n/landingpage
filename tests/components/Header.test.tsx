import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Header } from "@/components/Header";

describe("Header", () => {
  test("desktop nav exposes ABOUT / PRODUCTS / STORES anchors", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "ABOUT" })).toHaveAttribute("href", "#about");
    expect(within(nav).getByRole("link", { name: "PRODUCTS" })).toHaveAttribute("href", "#products");
    expect(within(nav).getByRole("link", { name: "STORES" })).toHaveAttribute("href", "#stores");
  });

  test("hamburger opens a dialog with the three links and locks body scroll", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const burger = screen.getByRole("button", { name: "Open menu" });
    expect(burger).toHaveAttribute("aria-expanded", "false");
    await user.click(burger);
    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(burger).toHaveAttribute("aria-expanded", "true");
    for (const label of ["ABOUT", "PRODUCTS", "STORES"]) {
      expect(within(dialog).getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(document.body.style.overflow).toBe("hidden");
  });

  test("clicking a menu link closes the menu and restores scroll", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(within(screen.getByRole("dialog", { name: "Menu" })).getByRole("link", { name: "PRODUCTS" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  test("close button and ESC dismiss the menu", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("header becomes solid orange after scrolling", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header.className).not.toContain("bg-orange");
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 200, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.className).toContain("bg-orange");
  });
});
