/**
 * @fileoverview InspireFM Prayer Times Scraper
 * Scrapes daily prayer timings from InspireFM for multiple mosques and saves data as individual JSON files
 */

const cheerio = require("cheerio");
const path = require("path");
const {
  ensureDataDirectory,
  addMonthToMosqueConfigs,
  httpClient,
  saveToFile,
  generateMosqueIndex,
} = require("./util");

const { mosqueUrls } = require("./mosque-urls");

// Ensure data directory exists
const dataDir = ensureDataDirectory();

// Generate mosque configs with URLs dynamically based on the current month
const mosqueConfigsWithMonth = addMonthToMosqueConfigs(mosqueUrls);

/**
 * Scrapes prayer timings for a single mosque from InspireFM
 * @param {Object} config - Mosque configuration object
 * @param {string} config.slug - URL-friendly mosque identifier
 * @param {string} config.url - Full URL to the mosque's prayer times page
 * @param {string} config.name - Human-readable mosque name
 * @returns {Promise<void>}
 */
const scrapePrayerTimings = async (config) => {
  try {
    const response = await httpClient.get(config.url);
    const html = response.data;
    const $ = cheerio.load(html);

    const mosqueName = $("h3.text-center span.color-green").text().trim();
    const filePath = path.join(dataDir, `${config.slug}.json`);

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
    const errorMsg = error.response?.status
      ? `HTTP ${error.response.status}`
      : error.message;
    console.error(`Error scraping ${config.slug}: ${errorMsg}`);
  }
};

/**
 * Main function to scrape all mosques with batch processing
 * Processes mosques in batches to avoid overwhelming the server
 * @returns {Promise<void>}
 */
const scrapeAll = async () => {
  console.log(`Starting to scrape ${mosqueConfigsWithMonth.length} mosques...`);

  // Process in batches of 5 to avoid overwhelming the server
  const batchSize = 5;
  for (let i = 0; i < mosqueConfigsWithMonth.length; i += batchSize) {
    const batch = mosqueConfigsWithMonth.slice(i, i + batchSize);
    console.log(
      `Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
        mosqueConfigsWithMonth.length / batchSize
      )}...`
    );

    await Promise.all(batch.map((config) => scrapePrayerTimings(config)));

    // Small delay between batches to be respectful
    if (i + batchSize < mosqueConfigsWithMonth.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("Scraping completed. Generating mosque index...");
  generateMosqueIndex(dataDir, mosqueUrls);
  console.log("All done!");
};

scrapeAll();
