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
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeout)),
    ]);

// Sanitize mosque names to create safe JSON filenames
const sanitizeFilename = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + ".json";

// Save data to a JSON file
const saveToFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filePath}`);
};

module.exports = {
    ensureDataDirectory,
    getCurrentMonth,
    addMonthToUrls,
    fetchWithTimeout,
    sanitizeFilename,
    saveToFile
};
