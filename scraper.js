const cheerio = require("cheerio");
const path = require("path");
const {
  ensureDataDirectory,
  addMonthToUrls,
  fetchWithTimeout,
  sanitizeFilename,
  saveToFile,
  generateMosqueIndex,
} = require("./util");

const { baseUrls } = require("./baseUrls");

// Ensure data directory exists
const dataDir = ensureDataDirectory();

// Generate URLs dynamically based on the current month
const urls = addMonthToUrls(baseUrls);

// Function to scrape a single URL
const scrapePrayerTimings = async (url) => {
  try {
    const response = await fetchWithTimeout(url, {}, 10000);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const html = await response.text();
    const $ = cheerio.load(html);

    let mosqueName = $("h3.text-center span.color-green").text().trim();
    const fileName = sanitizeFilename(mosqueName);
    const filePath = path.join(dataDir, fileName);

    const timings = [];

    $("table.table-hover tbody tr").each((index, row) => {
      const cols = $(row).find("td");
      if (cols.length === 7) {
        timings.push({
          day: $(cols[0]).text().trim(),
          date: $(cols[1]).text().trim(),
          fajr: $(cols[2]).text().trim(),
          zuhr: $(cols[3]).text().trim(),
          asr: $(cols[4]).text().trim(),
          magrib: $(cols[5]).text().trim(),
          isha: $(cols[6]).text().trim(),
        });
      }
    });

    saveToFile(filePath, { mosqueName, timings });
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
  }
};

// Main function to scrape all URLs
const scrapeAll = async () => {
  console.log(`Starting to scrape ${urls.length} mosques...`);

  for (const url of urls) {
    await scrapePrayerTimings(url);
  }

  console.log("Scraping completed. Generating mosque index...");
  generateMosqueIndex(dataDir);
  console.log("All done!");
};

scrapeAll();
