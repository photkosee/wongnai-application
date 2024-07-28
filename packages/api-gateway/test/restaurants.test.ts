import request from "supertest";
import server from "../src";
import "../test/utils/customMatcher";

const restaurantId = 567051;
const menuName = "ข้าวผัดปลาทู";

afterAll((done) => {
  server.close(done);
});

describe("Restaurant API", () => {
  test(`should fetch restaurant data and verify the format for restaurant ID ${restaurantId}`, async () => {
    const res = await request(server).get(`/api/restaurants/${restaurantId}`);
    expect(res.status).toBe(200);

    expect(res.body).toMatchRestaurantFormat();
  });

  test(`should fetch short menu data and verify the format for menu ${menuName} of restaurant ID ${restaurantId}`, async () => {
    const menuRes = await request(server).get(`/api/restaurants/${restaurantId}/menus/${menuName}/short`);
    expect(menuRes.status).toBe(200);

    expect(menuRes.body).toMatchShortMenuFormat();
  });

  test(`should fetch full menu data and verify the format for menu ${menuName} of restaurant ID ${restaurantId}`, async () => {
    const fullMenuRes = await request(server).get(`/api/restaurants/${restaurantId}/menus/${menuName}/full`);
    expect(fullMenuRes.status).toBe(200);
    expect(fullMenuRes.body).toMatchFullMenuFormat();
  });
});
