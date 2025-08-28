const fs = require("fs");
const path = require("path");

/**
 * Ensures the data directory exists and creates it if it doesn't
 * @returns {string} The path to the data directory
 */
const ensureDataDirectory = () => {
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  return dataDir;
};

/**
 * Gets the current month as a zero-padded string
 * @returns {string} Current month formatted as "01", "02", etc.
 */
const getCurrentMonth = () => {
  const currentDate = new Date();
  return (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Format as "01", "02", etc.
};

/**
 * Appends the current month parameter to mosque config URLs
 * @param {Array<{slug: string, url: string, name: string}>} mosqueConfigs - Array of mosque configuration objects
 * @returns {Array<{slug: string, url: string, name: string}>} Updated configs with month parameter added to URLs
 */
const addMonthToMosqueConfigs = (mosqueConfigs) => {
  const monthFormatted = getCurrentMonth();
  return mosqueConfigs.map((config) => ({
    ...config,
    url: `${config.url}&month=${monthFormatted}`,
  }));
};

// HTTP client with timeout and better error handling
const axios = require("axios");

const httpClient = axios.create({
  timeout: 10000,
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; PrayerTimesScraper/1.0)",
  },
});

/**
 * Saves data to a JSON file with pretty formatting
 * @param {string} filePath - The path where the file should be saved
 * @param {Object} data - The data object to save as JSON
 */
const saveToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${filePath}`);
};

/**
 * Generates a consolidated mosque index from existing data files
 * @param {string} dataDir - Path to the directory containing mosque data files
 * @param {Array<{slug: string, url: string, name: string}>} mosqueConfigs - Array of mosque configuration objects
 * @returns {string|null} Path to the generated index file, or null if an error occurred
 */
const generateMosqueIndex = (dataDir, mosqueConfigs = []) => {
  const indexData = {
    mosques: [],
    lastUpdated: new Date().toISOString(),
  };

  try {
    const files = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith(".json"));

    files.forEach((file) => {
      const filePath = path.join(dataDir, file);
      try {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const slug = file.replace(".json", "");

        // Find the corresponding mosque config for the URL
        const mosqueConfig = mosqueConfigs.find(
          (config) => config.slug === slug
        );

        // Generate Jummah schedule from the timing data
        const jummahSchedule = generateJummahSchedule(data.timings);

        indexData.mosques.push({
          name: data.mosqueName,
          slug: slug,
          dataFile: `data/${file}`,
          hasData: data.timings && data.timings.length > 0,
          jummahSchedule: jummahSchedule,
        });
      } catch (error) {
        console.error(`Error reading ${file}:`, error.message);
      }
    });

    // Sort mosques alphabetically by name
    indexData.mosques.sort((a, b) => a.name.localeCompare(b.name));

    const indexPath = path.join(__dirname, "mosque-index.json");
    saveToFile(indexPath, indexData);

    console.log(
      `Generated mosque index with ${indexData.mosques.length} mosques`
    );
    return indexPath;
  } catch (error) {
    console.error("Error generating mosque index:", error.message);
    return null;
  }
};

/**
 * Generates a Jummah schedule by extracting Friday prayer times from timing data
 * @param {Array<{day: string, date: string, zuhr: string}>} timings - Array of prayer timing objects
 * @returns {Array<{date: string, times: Array<string>}>} Array of Jummah schedule entries
 */
const generateJummahSchedule = (timings) => {
  if (!timings || !Array.isArray(timings)) {
    return [];
  }

  const jummahSchedule = [];

  // Find all Fridays and extract Jummah times
  timings.forEach((timing) => {
    if (timing.day && timing.day.toLowerCase() === "friday" && timing.zuhr) {
      const jummahTimes = extractJummahTimesFromZuhr(timing.zuhr);

      // If multiple times found, use them
      if (jummahTimes.length > 0) {
        jummahSchedule.push({
          date: timing.date,
          times: jummahTimes,
        });
      } else {
        // Single Jummah time - use the zuhr time as is
        jummahSchedule.push({
          date: timing.date,
          times: [timing.zuhr.trim()],
        });
      }
    }
  });

  return jummahSchedule;
};

/**
 * Extracts multiple Jummah times from a zuhr time string
 * @param {string} zuhrTime - The zuhr time string (may contain multiple times separated by spaces)
 * @returns {Array<string>} Array of individual time strings, or empty array if single time
 */
const extractJummahTimesFromZuhr = (zuhrTime) => {
  if (!zuhrTime || !zuhrTime.includes("   ")) {
    return [];
  }

  const times = zuhrTime
    .split(/\s{2,}/)
    .map((t) => t.trim())
    .filter((t) => t);
  return times.length > 1 ? times : [];
};

module.exports = {
  ensureDataDirectory,
  getCurrentMonth,
  addMonthToMosqueConfigs,
  httpClient,
  saveToFile,
  generateMosqueIndex,
};
