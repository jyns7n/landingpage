import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ImageCarousel } from "@/components/ImageCarousel";

const images = [1, 2, 3, 4].map((n) => ({ id: n, path: `products/${n}.webp`, order: n }));

describe("ImageCarousel", () => {
  test("mouse drag scrolls the carousel (no scrollbar / arrows exist)", () => {
    render(<ImageCarousel images={images} label="ADISA" resetKey={1} />);
    const region = screen.getByRole("region", { name: "ADISA images" });
    fireEvent.mouseDown(region, { clientX: 300, button: 0 });
    fireEvent.mouseMove(window, { clientX: 120 });
    fireEvent.mouseUp(window);
    expect(region.scrollLeft).toBe(180);
  });
});
