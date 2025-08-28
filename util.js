const fs = require("fs");
const path = require("path");

// Ensure the data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  return dataDir;
};

// Get the current month dynamically
const getCurrentMonth = () => {
  const currentDate = new Date();
  return (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Format as "01", "02", etc.
};

// Append the month parameter dynamically to mosque configs
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

// Save data to a JSON file
const saveToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${filePath}`);
};

// Generate mosque index from existing data files and mosque configs
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

        indexData.mosques.push({
          name: data.mosqueName,
          slug: slug,
          dataFile: `data/${file}`,
          hasData: data.timings && data.timings.length > 0,
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

module.exports = {
  ensureDataDirectory,
  getCurrentMonth,
  addMonthToMosqueConfigs,
  httpClient,
  saveToFile,
  generateMosqueIndex,
};
