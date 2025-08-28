const fs = require("fs");
const path = require("path");
const { generateMosqueIndex } = require("../util");
const { mosqueUrls } = require("../mosque-urls");

describe("Integration Tests", () => {
  describe("Real Data Processing", () => {
    test("should process actual mosque data files", () => {
      const dataDir = path.join(__dirname, "..", "data");

      // Check if data directory exists
      if (!fs.existsSync(dataDir)) {
        console.log("Skipping integration test - no data directory found");
        return;
      }

      const files = fs
        .readdirSync(dataDir)
        .filter((file) => file.endsWith(".json"));

      if (files.length === 0) {
        console.log("Skipping integration test - no data files found");
        return;
      }

      // Generate index with real data
      const indexPath = generateMosqueIndex(dataDir, mosqueUrls);

      expect(indexPath).toBeTruthy();
      // Note: indexPath is the path where the file was saved, which should exist
      expect(fs.existsSync(indexPath)).toBe(true);

      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      // Validate index structure
      expect(indexData).toHaveProperty("mosques");
      expect(indexData).toHaveProperty("lastUpdated");
      expect(Array.isArray(indexData.mosques)).toBe(true);

      // Each mosque should have required fields
      indexData.mosques.forEach((mosque) => {
        expect(mosque).toHaveProperty("name");
        expect(mosque).toHaveProperty("slug");
        expect(mosque).toHaveProperty("dataFile");
        expect(mosque).toHaveProperty("hasData");
        expect(mosque).toHaveProperty("jummahSchedule");

        expect(typeof mosque.name).toBe("string");
        expect(typeof mosque.slug).toBe("string");
        expect(typeof mosque.dataFile).toBe("string");
        expect(typeof mosque.hasData).toBe("boolean");
        expect(Array.isArray(mosque.jummahSchedule)).toBe(true);
      });

      // Don't delete the real index file
      console.log(`Processed ${indexData.mosques.length} mosques successfully`);
    });

    test("should have consistent mosque count between config and data", () => {
      const dataDir = path.join(__dirname, "..", "data");

      if (!fs.existsSync(dataDir)) {
        console.log("Skipping consistency test - no data directory found");
        return;
      }

      const dataFiles = fs
        .readdirSync(dataDir)
        .filter((file) => file.endsWith(".json"));
      const configCount = mosqueUrls.length;

      console.log(
        `Config has ${configCount} mosques, data has ${dataFiles.length} files`
      );

      // There might be slight differences if some scraping failed,
      // so we just check they're in the same ballpark
      expect(Math.abs(dataFiles.length - configCount)).toBeLessThanOrEqual(5);
    });

    test("should have valid Jummah schedules for mosques with data", () => {
      const dataDir = path.join(__dirname, "..", "data");

      if (!fs.existsSync(dataDir)) {
        return;
      }

      const indexPath = generateMosqueIndex(dataDir, mosqueUrls);
      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      const mosquesWithData = indexData.mosques.filter((m) => m.hasData);

      mosquesWithData.forEach((mosque) => {
        // Each Jummah schedule entry should have date and times
        mosque.jummahSchedule.forEach((schedule) => {
          expect(schedule).toHaveProperty("date");
          expect(schedule).toHaveProperty("times");
          expect(typeof schedule.date).toBe("string");
          expect(Array.isArray(schedule.times)).toBe(true);
          expect(schedule.times.length).toBeGreaterThan(0);

          // Each time should be a valid time string
          schedule.times.forEach((time) => {
            expect(typeof time).toBe("string");
            expect(time).toMatch(/^\d{2}:\d{2}$/); // HH:MM format
          });
        });
      });
    });
  });

  describe("Data File Validation", () => {
    test("should have valid mosque data structure in all files", () => {
      const dataDir = path.join(__dirname, "..", "data");

      if (!fs.existsSync(dataDir)) {
        return;
      }

      const files = fs
        .readdirSync(dataDir)
        .filter((file) => file.endsWith(".json"));

      files.forEach((filename) => {
        const filePath = path.join(dataDir, filename);

        try {
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

          expect(data).toHaveProperty("mosqueName");
          expect(data).toHaveProperty("timings");
          expect(typeof data.mosqueName).toBe("string");
          expect(Array.isArray(data.timings)).toBe(true);

          // Each timing should have required fields
          data.timings.forEach((timing) => {
            expect(timing).toHaveProperty("day");
            expect(timing).toHaveProperty("date");
            expect(timing).toHaveProperty("fajr");
            expect(timing).toHaveProperty("zuhr");
            expect(timing).toHaveProperty("asr");
            expect(timing).toHaveProperty("magrib");
            expect(timing).toHaveProperty("isha");

            // Validate time formats
            ["fajr", "zuhr", "asr", "magrib", "isha"].forEach((prayer) => {
              expect(typeof timing[prayer]).toBe("string");
              // zuhr might have multiple times, others should be single
              // Some mosques might have empty strings for certain prayers
              if (prayer !== "zuhr" && timing[prayer] !== "") {
                expect(timing[prayer]).toMatch(/^\d{2}:\d{2}$/);
              }
            });
          });
        } catch (error) {
          throw new Error(`Invalid JSON in ${filename}: ${error.message}`);
        }
      });
    });
  });
});
