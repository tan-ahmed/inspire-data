const cheerio = require("cheerio");
const path = require("path");
const {
    ensureDataDirectory,
    addMonthToUrls,
    fetchWithTimeout,
    sanitizeFilename,
    saveToFile
} = require("./util");

// Base URLs (without the month parameter)
const baseUrls = [
    "https://www.inspirefm.org/view-prayer-timings/al-hira-centre?refkey=H69pKMxtH1Kztwe",
    "https://www.inspirefm.org/view-prayer-timings/jalalabad-jamia-masjid?refkey=sUwxYOInm6JyotH",
    "https://www.inspirefm.org/view-prayer-timings/bait-ul-abrar-jamia-masjid?refkey=dkuKAhYnSNXGvqn",
    "https://www.inspirefm.org/view-prayer-timings/bury-park-jamia-masjid?refkey=G81ehjaJ7fP5ih6",
    "https://www.inspirefm.org/view-prayer-timings/faizan-e-mushkil-kusha?refkey=vCoQLkUuXU5yO09",
    "https://www.inspirefm.org/view-prayer-timings/hockwell-ring-masjid?refkey=5ykxLZeGUjOoh8U",
    "https://www.inspirefm.org/view-prayer-timings/farley-hill-masjid?refkey=8H5VvyjFIruMyiw",
    "https://www.inspirefm.org/view-prayer-timings/jamia-islamia-ghousia-trust?refkey=SMnmK9CWUuPdaze",
    "https://www.inspirefm.org/view-prayer-timings/leagrave-hall-masjid?refkey=NoEtlOSFgfnWqKe",
    "https://www.inspirefm.org/view-prayer-timings/lewsey-community-centre?refkey=Rwc3aJBphwlkNbd",
    "https://www.inspirefm.org/view-prayer-timings/madinah-masjid?refkey=Mg7JBd0Ntm3EX3f",
    "https://www.inspirefm.org/view-prayer-timings/luton-central-masjid?refkey=W9DeMtrs5IOnSKe",
    "https://www.inspirefm.org/view-prayer-timings/kokni-masjid?refkey=e31KjldaiV1piny",
    "https://www.inspirefm.org/view-prayer-timings/masjid-al-huda?refkey=Zca8cRxIOQBAucL",
    "https://www.inspirefm.org/view-prayer-timings/masjid-as-sunnah?refkey=4k5QdbC1Z1DVB9e",
    "https://www.inspirefm.org/view-prayer-timings/masjid-bilal?refkey=FQEhRGD3UvmSZPw",
    "https://www.inspirefm.org/view-prayer-timings/masjid-irshad?refkey=CjpkjmLW4S6vaTj",
    "https://www.inspirefm.org/view-prayer-timings/masjid-suffa-tul-islam?refkey=wXzyqvR4jtutql3",
    "https://www.inspirefm.org/view-prayer-timings/masjid-e-ali?refkey=1YUVYu1jnwl6Ugr",
    "https://www.inspirefm.org/view-prayer-timings/masjid-e-noor?refkey=jmwgz9T4vEaeLPq",
    "https://www.inspirefm.org/view-prayer-timings/saints-area-masjid?refkey=HnualvqjTQSsQni",
    "https://www.inspirefm.org/view-prayer-timings/yusuf-hall?refkey=4oT6kawaV6OA9oj",
    "https://www.inspirefm.org/view-prayer-timings/turkish-community-assoc?refkey=NWLVMpvbQxaPYIs",
    "https://www.inspirefm.org/view-prayer-timings/zakariya-masjid?refkey=6NHPZpjAgFaicdr",
    "https://www.inspirefm.org/view-prayer-timings/zuhri-academy?refkey=isRqMqaSStYbjcp",
    "https://www.inspirefm.org/view-prayer-timings/luton-islamic-centre?refkey=OWCIb9HCIwj74jN"
];

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
                    isha: $(cols[6]).text().trim()
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
    for (const url of urls) {
        await scrapePrayerTimings(url);
    }
};

scrapeAll();
