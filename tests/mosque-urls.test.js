const { mosqueUrls } = require("../mosque-urls");

describe("Mosque URLs Configuration", () => {
  test("should have all required fields for each mosque", () => {
    expect(mosqueUrls).toBeDefined();
    expect(Array.isArray(mosqueUrls)).toBe(true);
    expect(mosqueUrls.length).toBeGreaterThan(0);

    mosqueUrls.forEach((mosque, index) => {
      expect(mosque).toHaveProperty("name");
      expect(mosque).toHaveProperty("slug");
      expect(mosque).toHaveProperty("url");

      expect(typeof mosque.name).toBe("string");
      expect(typeof mosque.slug).toBe("string");
      expect(typeof mosque.url).toBe("string");

      expect(mosque.name.length).toBeGreaterThan(0);
      expect(mosque.slug.length).toBeGreaterThan(0);
      expect(mosque.url.length).toBeGreaterThan(0);
    });
  });

  test("should have unique slugs", () => {
    const slugs = mosqueUrls.map((mosque) => mosque.slug);
    const uniqueSlugs = [...new Set(slugs)];

    expect(slugs.length).toBe(uniqueSlugs.length);
  });

  test("should have valid URL format", () => {
    mosqueUrls.forEach((mosque) => {
      expect(mosque.url).toMatch(
        /^https:\/\/www\.inspirefm\.org\/view-prayer-timings\//
      );
      expect(mosque.url).toContain("refkey=");
    });
  });

  test("should have slug format matching URL path", () => {
    mosqueUrls.forEach((mosque) => {
      const urlPath = mosque.url
        .split("/view-prayer-timings/")[1]
        ?.split("?")[0];
      expect(urlPath).toBe(mosque.slug);
    });
  });

  test("should have consistent naming conventions", () => {
    mosqueUrls.forEach((mosque) => {
      // Slug should be lowercase with hyphens
      expect(mosque.slug).toMatch(/^[a-z0-9-]+$/);

      // Name should not be empty or just whitespace
      expect(mosque.name.trim()).toBe(mosque.name);
      expect(mosque.name.length).toBeGreaterThan(2);
    });
  });

  test("should contain expected mosque entries", () => {
    const expectedMosques = [
      "Al Hira Centre",
      "Bury Park Jamia Masjid",
      "Luton Central Masjid",
      "Masjid Bilal",
    ];

    expectedMosques.forEach((expectedName) => {
      const found = mosqueUrls.find((mosque) => mosque.name === expectedName);
      expect(found).toBeDefined();
    });
  });

  test("should have valid refkey format", () => {
    mosqueUrls.forEach((mosque) => {
      const refkeyMatch = mosque.url.match(/refkey=([a-zA-Z0-9]+)/);
      expect(refkeyMatch).toBeTruthy();
      expect(refkeyMatch[1]).toMatch(/^[a-zA-Z0-9]{15}$/); // Refkeys appear to be 15 characters
    });
  });
});
