import request from "supertest";
import server from "..";

const restaurantId = 567051;
const menuName = "ข้าวผัดปลาทู";

afterAll(() => {
  server.close();
});

describe("Restaurant API", () => {

  it(`should fetch restaurant data and verify the format for restaurant ID ${restaurantId}`, async () => {
    const res = await request(server).get(`/api/restaurants/${restaurantId}`);
    expect(res.status).toBe(200);

    const expectedFormat = {
      name: expect.any(String),
      id: expect.any(Number),
      coverImage: expect.any(String),
      menus: expect.arrayContaining([expect.any(String)]),
      activeTimePeriod: {
        open: expect.any(String),
        close: expect.any(String)
      }
    };

    expect(res.body).toMatchObject(expectedFormat);
  });

  it(`should fetch short menu data and verify the format for menu ${menuName} of restaurant ID ${restaurantId}`, async () => {
    const menuRes = await request(server).get(`/api/restaurants/${restaurantId}/menus/${menuName}/short`);
    expect(menuRes.status).toBe(200);
    expect(menuRes.body).toMatchObject({
      "name":"ข้าวผัดปลาทู",
      "id":"ข้าวผัดปลาทู",
      "thumbnailImage":"https://img.wongnai.com/p/100x100/2021/08/14/95cf2410d1734ca7905672446141a699.jpg",
      "discountedPercent":0,
      "fullPrice":80,
      "sold":100,
      "totalInStock":200
    });
  });

  it(`should fetch full menu data and verify the format for menu ${menuName} of restaurant ID ${restaurantId}`, async () => {
    const fullMenuRes = await request(server).get(`/api/restaurants/${restaurantId}/menus/${menuName}/full`);
    expect(fullMenuRes.status).toBe(200);
    expect(fullMenuRes.body).toMatchObject({
      "name":"ข้าวผัดปลาทู",
      "id":"ข้าวผัดปลาทู",
      "thumbnailImage":"https://img.wongnai.com/p/100x100/2021/08/14/95cf2410d1734ca7905672446141a699.jpg",
      "discountedPercent":0,
      "sold":100,
      "fullPrice":80,
      "totalInStock":200,
      "options":[{
        "label":"ไข่",
        "choices":[{
          "label":"ไข่ดาว"
        }]
      }],
      "largeImage":"https://img.wongnai.com/p/1920x0/2021/08/14/95cf2410d1734ca7905672446141a699.jpg"
    });
  });
});
