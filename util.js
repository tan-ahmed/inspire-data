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

// Append the month parameter dynamically to URLs
const addMonthToUrls = (urls) => {
  const monthFormatted = getCurrentMonth();
  return urls.map((url) => `${url}&month=${monthFormatted}`);
};

// Fetch with timeout handling
const fetchWithTimeout = (url, options, timeout = 5000) =>
  Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), timeout)
    ),
  ]);

// Sanitize mosque names to create safe JSON filenames
const sanitizeFilename = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "") + ".json";

// Save data to a JSON file
const saveToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${filePath}`);
};

// Generate mosque index from existing data files
const generateMosqueIndex = (dataDir) => {
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
  addMonthToUrls,
  fetchWithTimeout,
  sanitizeFilename,
  saveToFile,
  generateMosqueIndex,
};
