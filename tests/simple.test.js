const fs = require("fs");
const path = require("path");
const { mosqueUrls } = require("../mosque-urls");

describe("Simple Project Tests", () => {
  describe("Configuration Validation", () => {
    test("mosque-urls.js should have valid structure", () => {
      expect(Array.isArray(mosqueUrls)).toBe(true);
      expect(mosqueUrls.length).toBeGreaterThan(20); // We know there are 28

      // Check first few entries have required fields
      mosqueUrls.slice(0, 3).forEach((mosque) => {
        expect(mosque).toHaveProperty("name");
        expect(mosque).toHaveProperty("slug");
        expect(mosque).toHaveProperty("url");
        expect(typeof mosque.name).toBe("string");
        expect(typeof mosque.slug).toBe("string");
        expect(typeof mosque.url).toBe("string");
        expect(mosque.url).toContain("inspirefm.org");
      });
    });

    test("should have unique slugs", () => {
      const slugs = mosqueUrls.map((m) => m.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });
  });

  describe("Data Files Validation", () => {
    test("should have corresponding data files for most mosques", () => {
      const dataDir = path.join(__dirname, "..", "data");

      if (!fs.existsSync(dataDir)) {
        console.log("Skipping data file test - no data directory");
        return;
      }

      const dataFiles = fs
        .readdirSync(dataDir)
        .filter((f) => f.endsWith(".json"))
        .map((f) => f.replace(".json", ""));

      const configSlugs = mosqueUrls.map((m) => m.slug);

      // Most slugs should have corresponding data files
      const matchingCount = configSlugs.filter((slug) =>
        dataFiles.includes(slug)
      ).length;
      expect(matchingCount).toBeGreaterThan(configSlugs.length * 0.8); // At least 80% should match
    });

    test("should have valid JSON structure in data files", () => {
      const dataDir = path.join(__dirname, "..", "data");

      if (!fs.existsSync(dataDir)) {
        return;
      }

      const files = fs
        .readdirSync(dataDir)
        .filter((f) => f.endsWith(".json"))
        .slice(0, 5); // Test first 5 files

      files.forEach((filename) => {
        const filePath = path.join(dataDir, filename);
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        expect(data).toHaveProperty("mosqueName");
        expect(data).toHaveProperty("timings");
        expect(typeof data.mosqueName).toBe("string");
        expect(Array.isArray(data.timings)).toBe(true);

        if (data.timings.length > 0) {
          const timing = data.timings[0];
          expect(timing).toHaveProperty("day");
          expect(timing).toHaveProperty("date");
          expect(timing).toHaveProperty("fajr");
          expect(timing).toHaveProperty("zuhr");
          expect(timing).toHaveProperty("asr");
          expect(timing).toHaveProperty("magrib");
          expect(timing).toHaveProperty("isha");
        }
      });
    });
  });

  describe("Utility Functions Basic Tests", () => {
    test("util module should export required functions", () => {
      const util = require("../util");
      expect(typeof util.generateMosqueIndex).toBe("function");
      expect(typeof util.getCurrentMonth).toBe("function");
      expect(typeof util.ensureDataDirectory).toBe("function");
    });

    test("getCurrentMonth should return valid month", () => {
      const { getCurrentMonth } = require("../util");
      const month = getCurrentMonth();
      expect(month).toMatch(/^(0[1-9]|1[0-2])$/);
    });
  });

  describe("Mosque Index Structure", () => {
    test("mosque-index.json should have valid structure if it exists", () => {
      const indexPath = path.join(__dirname, "..", "mosque-index.json");

      if (!fs.existsSync(indexPath)) {
        console.log("Skipping index test - no mosque-index.json found");
        return;
      }

      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      expect(indexData).toHaveProperty("mosques");
      expect(indexData).toHaveProperty("lastUpdated");
      expect(Array.isArray(indexData.mosques)).toBe(true);

      if (indexData.mosques.length > 0) {
        const mosque = indexData.mosques[0];
        expect(mosque).toHaveProperty("name");
        expect(mosque).toHaveProperty("slug");
        expect(mosque).toHaveProperty("dataFile");
        expect(mosque).toHaveProperty("hasData");
        expect(mosque).toHaveProperty("jummahSchedule");
        expect(Array.isArray(mosque.jummahSchedule)).toBe(true);

        // Test jummahSchedule structure if it has entries
        if (mosque.jummahSchedule.length > 0) {
          const schedule = mosque.jummahSchedule[0];
          expect(schedule).toHaveProperty("date");
          expect(schedule).toHaveProperty("times");
          expect(Array.isArray(schedule.times)).toBe(true);
          expect(schedule.times.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe("Package Configuration", () => {
    test("package.json should have correct structure", () => {
      const packagePath = path.join(__dirname, "..", "package.json");
      const packageData = JSON.parse(fs.readFileSync(packagePath, "utf8"));

      expect(packageData).toHaveProperty("name");
      expect(packageData).toHaveProperty("scripts");
      expect(packageData).toHaveProperty("dependencies");
      expect(packageData.scripts).toHaveProperty("test");
      expect(packageData.scripts).toHaveProperty("start");
      expect(packageData.dependencies).toHaveProperty("axios");
      expect(packageData.dependencies).toHaveProperty("cheerio");
    });
  });
});
