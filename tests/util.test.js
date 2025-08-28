const fs = require("fs");
const path = require("path");
const {
  generateMosqueIndex,
  ensureDataDirectory,
  getCurrentMonth,
  addMonthToMosqueConfigs,
} = require("../util");

// Mock data for testing
const mockMosqueConfigs = [
  { slug: "test-mosque", url: "https://example.com/test-mosque" },
  { slug: "another-mosque", url: "https://example.com/another-mosque" },
];

const mockTimingsData = {
  mosqueName: "Test Mosque",
  timings: [
    {
      day: "Thursday",
      date: "28-08-2025",
      fajr: "05:30",
      zuhr: "13:30",
      asr: "18:15",
      magrib: "20:02",
      isha: "21:30",
    },
    {
      day: "Friday",
      date: "29-08-2025",
      fajr: "05:30",
      zuhr: "13:30   16:00",
      asr: "18:15",
      magrib: "19:59",
      isha: "21:30",
    },
    {
      day: "Saturday",
      date: "30-08-2025",
      fajr: "05:30",
      zuhr: "13:30",
      asr: "18:15",
      magrib: "19:57",
      isha: "21:30",
    },
  ],
};

const mockTimingsDataSingleJummah = {
  mosqueName: "Single Jummah Mosque",
  timings: [
    {
      day: "Friday",
      date: "29-08-2025",
      fajr: "05:30",
      zuhr: "13:45",
      asr: "18:15",
      magrib: "19:59",
      isha: "21:30",
    },
  ],
};

describe("Utility Functions", () => {
  let testDataDir;

  beforeEach(() => {
    // Create a temporary test data directory
    testDataDir = path.join(__dirname, "temp-data");
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir);
    }
  });

  afterEach(() => {
    // Clean up test directory
    if (fs.existsSync(testDataDir)) {
      fs.readdirSync(testDataDir).forEach((file) => {
        fs.unlinkSync(path.join(testDataDir, file));
      });
      fs.rmdirSync(testDataDir);
    }

    // Clean up any generated test index files (but not the real one)
    const testIndexPattern = /mosque-index.*\.json$/;
    const currentDir = path.join(__dirname, "..");
    if (fs.existsSync(currentDir)) {
      fs.readdirSync(currentDir)
        .filter(
          (file) => testIndexPattern.test(file) && file !== "mosque-index.json"
        )
        .forEach((file) => {
          try {
            fs.unlinkSync(path.join(currentDir, file));
          } catch (e) {
            // Ignore cleanup errors
          }
        });
    }
  });

  describe("ensureDataDirectory", () => {
    test("should create data directory if it does not exist", () => {
      const testDir = path.join(__dirname, "test-ensure-dir");

      // Mock __dirname for the test
      const originalJoin = path.join;
      jest.spyOn(path, "join").mockImplementation((...args) => {
        if (args.includes("data")) {
          return testDir;
        }
        return originalJoin(...args);
      });

      const result = ensureDataDirectory();

      expect(fs.existsSync(testDir)).toBe(true);
      expect(result).toBe(testDir);

      // Cleanup
      fs.rmdirSync(testDir);
      path.join.mockRestore();
    });
  });

  describe("getCurrentMonth", () => {
    test("should return current month as zero-padded string", () => {
      const result = getCurrentMonth();
      const currentMonth = new Date().getMonth() + 1;
      const expected = currentMonth.toString().padStart(2, "0");

      expect(result).toBe(expected);
      expect(result).toMatch(/^(0[1-9]|1[0-2])$/);
    });
  });

  describe("addMonthToMosqueConfigs", () => {
    test("should append current month to mosque URLs", () => {
      const result = addMonthToMosqueConfigs(mockMosqueConfigs);
      const currentMonth = getCurrentMonth();

      expect(result).toHaveLength(2);
      expect(result[0].url).toBe(
        `https://example.com/test-mosque&month=${currentMonth}`
      );
      expect(result[1].url).toBe(
        `https://example.com/another-mosque&month=${currentMonth}`
      );
      expect(result[0].slug).toBe("test-mosque");
      expect(result[1].slug).toBe("another-mosque");
    });

    test("should handle empty configs array", () => {
      const result = addMonthToMosqueConfigs([]);
      expect(result).toEqual([]);
    });
  });

  describe("generateMosqueIndex", () => {
    test("should generate mosque index with multiple Jummah times", () => {
      // Create clean test directory for this test
      const uniqueTestDir = path.join(__dirname, "temp-multi-test");
      if (!fs.existsSync(uniqueTestDir)) {
        fs.mkdirSync(uniqueTestDir);
      }

      // Create test data file
      const testFile = path.join(uniqueTestDir, "test-mosque.json");
      fs.writeFileSync(testFile, JSON.stringify(mockTimingsData, null, 2));

      const result = generateMosqueIndex(uniqueTestDir, mockMosqueConfigs);

      expect(result).toBeTruthy();

      // Read the generated index
      const indexData = JSON.parse(fs.readFileSync(result, "utf8"));

      expect(indexData.mosques).toHaveLength(1);
      expect(indexData.mosques[0].name).toBe("Test Mosque");
      expect(indexData.mosques[0].slug).toBe("test-mosque");
      expect(indexData.mosques[0].hasData).toBe(true);
      expect(indexData.mosques[0].jummahSchedule).toHaveLength(1);
      expect(indexData.mosques[0].jummahSchedule[0].date).toBe("29-08-2025");
      expect(indexData.mosques[0].jummahSchedule[0].times).toEqual([
        "13:30",
        "16:00",
      ]);
      expect(indexData.lastUpdated).toBeTruthy();

      // Cleanup
      fs.unlinkSync(testFile);
      fs.rmdirSync(uniqueTestDir);
      if (fs.existsSync(result)) {
        fs.unlinkSync(result);
      }
    });

    test("should generate mosque index with single Jummah time", () => {
      // Create test data file
      const testFile = path.join(testDataDir, "single-jummah.json");
      fs.writeFileSync(
        testFile,
        JSON.stringify(mockTimingsDataSingleJummah, null, 2)
      );

      const result = generateMosqueIndex(testDataDir, []);

      expect(result).toBeTruthy();

      // Read the generated index
      const indexData = JSON.parse(fs.readFileSync(result, "utf8"));

      expect(indexData.mosques).toHaveLength(1);
      expect(indexData.mosques[0].name).toBe("Single Jummah Mosque");
      expect(indexData.mosques[0].jummahSchedule).toHaveLength(1);
      expect(indexData.mosques[0].jummahSchedule[0].times).toEqual(["13:45"]);

      // Cleanup
      fs.unlinkSync(result);
    });

    test("should handle mosque with no Friday data", () => {
      const dataWithoutFriday = {
        mosqueName: "No Friday Mosque",
        timings: [
          {
            day: "Thursday",
            date: "28-08-2025",
            fajr: "05:30",
            zuhr: "13:30",
            asr: "18:15",
            magrib: "20:02",
            isha: "21:30",
          },
        ],
      };

      const testFile = path.join(testDataDir, "no-friday.json");
      fs.writeFileSync(testFile, JSON.stringify(dataWithoutFriday, null, 2));

      const result = generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(result, "utf8"));

      expect(indexData.mosques[0].jummahSchedule).toEqual([]);

      // Cleanup
      fs.unlinkSync(result);
    });

    test("should handle malformed JSON files gracefully", () => {
      // Create malformed JSON file
      const testFile = path.join(testDataDir, "malformed.json");
      fs.writeFileSync(testFile, "{ invalid json }");

      // Should not throw, but should log error
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = generateMosqueIndex(testDataDir, []);

      expect(result).toBeTruthy();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
      fs.unlinkSync(result);
    });

    test("should sort mosques alphabetically by name", () => {
      // Create multiple test files
      const mosque1 = { ...mockTimingsData, mosqueName: "Zebra Mosque" };
      const mosque2 = { ...mockTimingsData, mosqueName: "Alpha Mosque" };

      fs.writeFileSync(
        path.join(testDataDir, "zebra.json"),
        JSON.stringify(mosque1, null, 2)
      );
      fs.writeFileSync(
        path.join(testDataDir, "alpha.json"),
        JSON.stringify(mosque2, null, 2)
      );

      const result = generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(result, "utf8"));

      expect(indexData.mosques).toHaveLength(2);
      expect(indexData.mosques[0].name).toBe("Alpha Mosque");
      expect(indexData.mosques[1].name).toBe("Zebra Mosque");

      // Cleanup
      fs.unlinkSync(result);
    });

    test("should handle empty data directory", () => {
      const result = generateMosqueIndex(testDataDir, []);
      const indexData = JSON.parse(fs.readFileSync(result, "utf8"));

      expect(indexData.mosques).toEqual([]);
      expect(indexData.lastUpdated).toBeTruthy();

      // Cleanup
      fs.unlinkSync(result);
    });
  });
});
