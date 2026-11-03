import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("jsdom and jest-dom matchers are wired", () => {
  render(<p>hello</p>);
  expect(screen.getByText("hello")).toBeInTheDocument();
});
