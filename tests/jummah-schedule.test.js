const fs = require("fs");
const path = require("path");

// We need to test the internal functions, so let's extract them
// Create a test helper to access internal functions
const utilModule = require("../util");

describe("Jummah Schedule Generation", () => {
  describe("Jummah Times Extraction", () => {
    test("should extract multiple Jummah times from Friday zuhr field", () => {
      const timings = [
        {
          day: "Friday",
          date: "29-08-2025",
          zuhr: "13:30   16:00",
        },
      ];

      // Test via the main generateMosqueIndex function
      const testDataDir = path.join(__dirname, "temp-jummah-test");
      if (!fs.existsSync(testDataDir)) {
        fs.mkdirSync(testDataDir);
      }

      const testData = {
        mosqueName: "Test Mosque",
        timings: timings,
      };

      const testFile = path.join(testDataDir, "test.json");
      fs.writeFileSync(testFile, JSON.stringify(testData, null, 2));

      const indexPath = utilModule.generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      expect(indexData.mosques[0].jummahSchedule).toHaveLength(1);
      expect(indexData.mosques[0].jummahSchedule[0].times).toEqual([
        "13:30",
        "16:00",
      ]);

      // Cleanup
      fs.unlinkSync(testFile);
      fs.rmdirSync(testDataDir);
      fs.unlinkSync(indexPath);
    });

    test("should handle three Jummah times", () => {
      const timings = [
        {
          day: "Friday",
          date: "29-08-2025",
          zuhr: "13:15   14:00   14:30",
        },
      ];

      const testDataDir = path.join(__dirname, "temp-triple-jummah");
      if (!fs.existsSync(testDataDir)) {
        fs.mkdirSync(testDataDir);
      }

      const testData = {
        mosqueName: "Triple Jummah Mosque",
        timings: timings,
      };

      const testFile = path.join(testDataDir, "triple.json");
      fs.writeFileSync(testFile, JSON.stringify(testData, null, 2));

      const indexPath = utilModule.generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      expect(indexData.mosques[0].jummahSchedule[0].times).toEqual([
        "13:15",
        "14:00",
        "14:30",
      ]);

      // Cleanup
      fs.unlinkSync(testFile);
      fs.rmdirSync(testDataDir);
      fs.unlinkSync(indexPath);
    });

    test("should handle single Jummah time as array", () => {
      const timings = [
        {
          day: "Friday",
          date: "29-08-2025",
          zuhr: "13:45",
        },
      ];

      const testDataDir = path.join(__dirname, "temp-single-jummah");
      if (!fs.existsSync(testDataDir)) {
        fs.mkdirSync(testDataDir);
      }

      const testData = {
        mosqueName: "Single Jummah Mosque",
        timings: timings,
      };

      const testFile = path.join(testDataDir, "single.json");
      fs.writeFileSync(testFile, JSON.stringify(testData, null, 2));

      const indexPath = utilModule.generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      expect(indexData.mosques[0].jummahSchedule[0].times).toEqual(["13:45"]);

      // Cleanup
      fs.unlinkSync(testFile);
      fs.rmdirSync(testDataDir);
      fs.unlinkSync(indexPath);
    });

    test("should handle multiple Fridays in month", () => {
      const timings = [
        {
          day: "Friday",
          date: "01-08-2025",
          zuhr: "13:30   14:30",
        },
        {
          day: "Friday",
          date: "08-08-2025",
          zuhr: "13:30   16:00",
        },
        {
          day: "Friday",
          date: "15-08-2025",
          zuhr: "13:45",
        },
      ];

      const testDataDir = path.join(__dirname, "temp-multi-friday");
      if (!fs.existsSync(testDataDir)) {
        fs.mkdirSync(testDataDir);
      }

      const testData = {
        mosqueName: "Multi Friday Mosque",
        timings: timings,
      };

      const testFile = path.join(testDataDir, "multi.json");
      fs.writeFileSync(testFile, JSON.stringify(testData, null, 2));

      const indexPath = utilModule.generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      expect(indexData.mosques[0].jummahSchedule).toHaveLength(3);
      expect(indexData.mosques[0].jummahSchedule[0].date).toBe("01-08-2025");
      expect(indexData.mosques[0].jummahSchedule[0].times).toEqual([
        "13:30",
        "14:30",
      ]);
      expect(indexData.mosques[0].jummahSchedule[1].date).toBe("08-08-2025");
      expect(indexData.mosques[0].jummahSchedule[1].times).toEqual([
        "13:30",
        "16:00",
      ]);
      expect(indexData.mosques[0].jummahSchedule[2].date).toBe("15-08-2025");
      expect(indexData.mosques[0].jummahSchedule[2].times).toEqual(["13:45"]);

      // Cleanup
      fs.unlinkSync(testFile);
      fs.rmdirSync(testDataDir);
      fs.unlinkSync(indexPath);
    });

    test("should handle whitespace variations in zuhr times", () => {
      const timings = [
        {
          day: "Friday",
          date: "29-08-2025",
          zuhr: "13:30     16:00   ", // Extra spaces and trailing space
        },
      ];

      const testDataDir = path.join(__dirname, "temp-whitespace");
      if (!fs.existsSync(testDataDir)) {
        fs.mkdirSync(testDataDir);
      }

      const testData = {
        mosqueName: "Whitespace Test Mosque",
        timings: timings,
      };

      const testFile = path.join(testDataDir, "whitespace.json");
      fs.writeFileSync(testFile, JSON.stringify(testData, null, 2));

      const indexPath = utilModule.generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      expect(indexData.mosques[0].jummahSchedule[0].times).toEqual([
        "13:30",
        "16:00",
      ]);

      // Cleanup
      fs.unlinkSync(testFile);
      fs.rmdirSync(testDataDir);
      fs.unlinkSync(indexPath);
    });

    test("should handle missing zuhr field gracefully", () => {
      const timings = [
        {
          day: "Friday",
          date: "29-08-2025",
          fajr: "05:30",
          // zuhr missing
          asr: "18:15",
        },
      ];

      const testDataDir = path.join(__dirname, "temp-missing-zuhr");
      if (!fs.existsSync(testDataDir)) {
        fs.mkdirSync(testDataDir);
      }

      const testData = {
        mosqueName: "Missing Zuhr Mosque",
        timings: timings,
      };

      const testFile = path.join(testDataDir, "missing.json");
      fs.writeFileSync(testFile, JSON.stringify(testData, null, 2));

      const indexPath = utilModule.generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      expect(indexData.mosques[0].jummahSchedule).toEqual([]);

      // Cleanup
      fs.unlinkSync(testFile);
      fs.rmdirSync(testDataDir);
      fs.unlinkSync(indexPath);
    });

    test("should handle case insensitive day matching", () => {
      const timings = [
        {
          day: "FRIDAY", // Uppercase
          date: "29-08-2025",
          zuhr: "13:30   16:00",
        },
        {
          day: "friday", // Lowercase
          date: "05-09-2025",
          zuhr: "13:45",
        },
      ];

      const testDataDir = path.join(__dirname, "temp-case-test");
      if (!fs.existsSync(testDataDir)) {
        fs.mkdirSync(testDataDir);
      }

      const testData = {
        mosqueName: "Case Test Mosque",
        timings: timings,
      };

      const testFile = path.join(testDataDir, "case.json");
      fs.writeFileSync(testFile, JSON.stringify(testData, null, 2));

      const indexPath = utilModule.generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

      expect(indexData.mosques[0].jummahSchedule).toHaveLength(2);
      expect(indexData.mosques[0].jummahSchedule[0].times).toEqual([
        "13:30",
        "16:00",
      ]);
      expect(indexData.mosques[0].jummahSchedule[1].times).toEqual(["13:45"]);

      // Cleanup
      fs.unlinkSync(testFile);
      fs.rmdirSync(testDataDir);
      fs.unlinkSync(indexPath);
    });
  });
});
