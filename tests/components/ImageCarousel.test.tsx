import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ImageCarousel } from "@/components/ImageCarousel";

const images = [1, 2, 3, 4].map((n) => ({ id: n, path: `products/${n}.webp`, order: n }));

describe("ImageCarousel", () => {
  test("is a Swiper carousel exposing one slide per image", () => {
    const { container } = render(<ImageCarousel images={images} label="ADISA" resetKey={1} />);
    const region = screen.getByRole("region", { name: "ADISA images" });
    expect(region).toHaveClass("swiper");
    expect(container.querySelectorAll(".swiper-slide")).toHaveLength(4);
    expect(within(region).getAllByRole("img")).toHaveLength(4);
  });

  test("is not a keyboard tab stop that traps focus after a drag", () => {
    render(<ImageCarousel images={images} label="ADISA" resetKey={1} />);
    expect(screen.getByRole("region", { name: "ADISA images" })).not.toHaveAttribute("tabindex");
  });

  test("starts on the first slide again when resetKey changes", () => {
    const { container, rerender } = render(<ImageCarousel images={images} label="ADISA" resetKey={1} />);
    rerender(<ImageCarousel images={images.slice(0, 2)} label="ADISA" resetKey={2} />);
    const slides = container.querySelectorAll(".swiper-slide");
    expect(slides).toHaveLength(2);
    expect(slides[0]).toHaveClass("swiper-slide-active");
  });
});
