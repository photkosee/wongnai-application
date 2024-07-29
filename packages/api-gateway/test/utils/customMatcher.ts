export const toMatchRestaurantFormat = (received: any) => {
  const pass =
    typeof received.name === "string" &&
    typeof received.id === "number" &&
    typeof received.coverImage === "string" &&
    Array.isArray(received.menus) &&
    received.menus.every((menu: any) => typeof menu === "string") &&
    typeof received.activeTimePeriod === "object" &&
    typeof received.activeTimePeriod.open === "string" &&
    typeof received.activeTimePeriod.close === "string";

  if (pass) {
    return {
      message: () => `expected ${JSON.stringify(received)} not to match the restaurant format`,
      pass: true,
    };
  } else {
    return {
      message: () => `expected ${JSON.stringify(received)} to match the restaurant format`,
      pass: false,
    };
  }
};

export const toMatchShortMenuFormat = (received: any) => {
  const pass =
    typeof received.name === "string" &&
    typeof received.id === "string" &&
    (
      typeof received.thumbnailImage === "undefined" ||
      typeof received.thumbnailImage === "string"
    ) &&
    typeof received.fullPrice === "number" &&
    typeof received.discountedPercent === "number" &&
    (
      typeof received.discountedTimePeriod === "undefined" ||
      (
        typeof received.discountedTimePeriod.begin === "string" &&
        typeof received.discountedTimePeriod.end === "string"
      )
    ) &&
    typeof received.sold === "number" &&
    typeof received.totalInStock === "number";

  if (pass) {
    return {
      message: () => `expected ${JSON.stringify(received)} not to match the menu format`,
      pass: true,
    };
  } else {
    return {
      message: () => `expected ${JSON.stringify(received)} to match the menu format`,
      pass: false,
    };
  }
};

export const toMatchFullMenuFormat = (received: any) => {
  const pass =
    typeof received.name === "string" &&
    typeof received.id === "string" &&
    (
      typeof received.thumbnailImage === "undefined" ||
      typeof received.thumbnailImage === "string"
    ) &&
    typeof received.fullPrice === "number" &&
    typeof received.discountedPercent === "number" &&
    (
      typeof received.discountedTimePeriod === "undefined" ||
      (
        typeof received.discountedTimePeriod.begin === "string" &&
        typeof received.discountedTimePeriod.end === "string"
      )
    ) &&
    typeof received.sold === "number" &&
    typeof received.totalInStock === "number" &&
    (
      typeof received.largeImage === "undefined" ||
      typeof received.largeImage === "string"
    ) &&
    (Array.isArray(received.options) &&
      received.options.every((option: any) =>
        typeof option.label === "string" &&
        Array.isArray(option.choices) &&
        option.choices.every((choice: any) => typeof choice.label === "string")
      )
    );

  if (pass) {
    return {
      message: () => `expected ${JSON.stringify(received)} not to match the menu format`,
      pass: true,
    };
  } else {
    return {
      message: () => `expected ${JSON.stringify(received)} to match the menu format`,
      pass: false,
    };
  }
};

expect.extend({ toMatchRestaurantFormat, toMatchShortMenuFormat, toMatchFullMenuFormat });

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchRestaurantFormat(): R;
      toMatchShortMenuFormat(): R;
      toMatchFullMenuFormat(): R;
    }
  }
}
