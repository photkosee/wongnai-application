import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import MenuCard from "../src/components/cards/MenuCard";
import isWithinTimePeriod from "../src/utils/isWithinTimePeriod";
import { ShortMenu } from "../src/types/restuarant";

jest.mock("../src/utils/isWithinTimePeriod", () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

describe("MenuCard", () => {
  const menu: ShortMenu = {
    name: "Pizza",
    id: "1",
    thumbnailImage: "/pizza.jpg",
    fullPrice: 10.99,
    discountedPercent: 20,
    discountedTimePeriod: { begin: "00:00", end: "23:59" },
    sold: 10,
    totalInStock: 50,
  };

  test("renders menu details correctly", () => {
    render(<MenuCard {...menu} />);

    expect(screen.getByAltText("menu image")).toHaveAttribute(
      "src",
      "/pizza.jpg"
    );
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("10.99 บาท")).toBeInTheDocument();
  });

  test("shows discounted price when within discount period", () => {
    (isWithinTimePeriod as jest.Mock).mockReturnValue(true);

    render(<MenuCard {...menu} />);

    // 10.99 * (1 - 0.20)
    expect(screen.getByText("8.79 บาท")).toBeInTheDocument();
    expect(screen.getByText("10.99 บาท")).toBeInTheDocument();
  });
});
