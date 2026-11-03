import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";

describe("Hero", () => {
  test("renders the PRODUCTS h1", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: "PRODUCTS" })).toBeInTheDocument();
  });
});

describe("SectionTitle", () => {
  test("renders each line in order under one accessible heading name", () => {
    render(<SectionTitle as="h2" size="section" lines={["HOW TO", "STYLE THEM"]} />);
    const heading = screen.getByRole("heading", { level: 2, name: "HOW TO STYLE THEM" });
    expect(Array.from(heading.querySelectorAll("[data-line]")).map((n) => n.textContent)).toEqual([
      "HOW TO",
      "STYLE THEM",
    ]);
  });
});
