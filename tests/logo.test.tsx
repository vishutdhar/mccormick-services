import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Logo } from "@/components/logo";

describe("Logo", () => {
  it("renders an SVG with accessible label", () => {
    const { container, getByRole } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(getByRole("img", { name: /mccormick services/i })).toBeInTheDocument();
  });

  it("scales via width prop", () => {
    const { container } = render(<Logo width={48} />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("48");
  });
});
