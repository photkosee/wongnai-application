import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import isWithinTimePeriod from "../src/utils/isWithinTimePeriod";
import { Restaurant } from "../src/types/restuarant";
import RestaurantCard from "../src/components/cards/RestaurantCard";

jest.mock("../src/utils/isWithinTimePeriod", () => ({
  __esModule: true,
  default: jest.fn((open, close) => true), // Mock to return true by default
}));

describe("RestaurantCard", () => {
  const restaurant: Restaurant = {
    name: "Example Restaurant",
    id: 1,
    coverImage: "/example.jpg",
    menus: [],
    activeTimePeriod: {
      open: "10:00",
      close: "22:00",
    },
  };

  test("renders restaurant details correctly", async () => {
    render(
      <Router>
        <RestaurantCard {...restaurant} />
      </Router>
    );
    expect(screen.getByAltText("restaurant image")).toHaveAttribute(
      "src",
      "/example.jpg"
    );
    expect(screen.getByText("Example Restaurant")).toBeInTheDocument();
  });

  test('displays "Open" when restaurant is within active time period', async () => {
    (isWithinTimePeriod as jest.Mock).mockReturnValue(true);

    render(
      <Router>
        <RestaurantCard {...restaurant} />
      </Router>
    );
    expect(screen.getByText("เปิด")).toBeInTheDocument();
  });

  test('displays "Closed" when restaurant is not within active time period', async () => {
    (isWithinTimePeriod as jest.Mock).mockReturnValue(false);

    render(
      <Router>
        <RestaurantCard {...restaurant} />
      </Router>
    );
    expect(screen.getByText("ปิด")).toBeInTheDocument();
  });
});
