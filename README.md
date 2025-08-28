# 🕌 InspireFM Prayer Timings Scraper

A **Node.js web scraper** that extracts **daily prayer timings** from InspireFM for multiple mosques in Luton. The scraper generates individual JSON files for each mosque and creates a consolidated index with **Jummah schedule** information for easy integration with React Native apps.

---

## 📜 Features

✅ **Scrapes prayer times** for 28+ mosques from [InspireFM](https://www.inspirefm.org)  
✅ **Individual JSON files** for each mosque in the `data/` directory  
✅ **Consolidated mosque index** with metadata and Jummah schedules  
✅ **Automatic Jummah time extraction** from Friday prayers (single or multiple times)  
✅ **Month-based URL generation** for current prayer timetables  
✅ **Robust error handling** with timeouts and graceful failures  
✅ **Comprehensive test suite** with Jest  
✅ **Clean data structure** optimized for mobile app consumption

---

## 📂 Project Structure

```
inspire-prayer-scraper/
├── data/                          # Generated JSON files for each mosque
│   ├── al-hira-centre.json
│   ├── bury-park-jamia-masjid.json
│   └── ...
├── tests/                         # Test suite
│   ├── simple.test.js
│   ├── mosque-urls.test.js
│   ├── integration.test.js
│   └── README.md
├── scraper.js                     # Main scraper script
├── util.js                        # Utility functions
├── mosque-urls.js                 # Mosque configuration (names, slugs, URLs)
├── mosque-index.json              # Generated consolidated index
├── package.json
├── jest.config.js
└── README.md
```

---

## ⚙️ Installation

### **1️⃣ Clone the Repository**

```bash
git clone <repository-url>
cd inspire-prayer-scraper
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

---

## 🚀 Usage

### **Run the Scraper**

```bash
npm start
# or
node scraper.js
```

This will:

- Scrape prayer times for all configured mosques
- Save individual JSON files in `data/` directory
- Generate/update `mosque-index.json` with metadata and Jummah schedules

### **Run Tests**

```bash
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

---

## 📊 Data Structure

### **Individual Mosque File (`data/bury-park-jamia-masjid.json`)**

```json
{
  "mosqueName": "Bury Park Jamia Masjid",
  "timings": [
    {
      "day": "Thursday",
      "date": "28-08-2025",
      "fajr": "05:30",
      "zuhr": "13:30",
      "asr": "18:15",
      "magrib": "20:02",
      "isha": "21:30"
    },
    {
      "day": "Friday",
      "date": "29-08-2025",
      "fajr": "05:30",
      "zuhr": "13:30   16:00",
      "asr": "18:15",
      "magrib": "19:59",
      "isha": "21:30"
    }
  ]
}
```

### **Mosque Index (`mosque-index.json`)**

```json
{
  "mosques": [
    {
      "name": "Bury Park Jamia Masjid",
      "slug": "bury-park-jamia-masjid",
      "dataFile": "data/bury-park-jamia-masjid.json",
      "hasData": true,
      "jummahSchedule": [
        {
          "date": "29-08-2025",
          "times": ["13:30", "16:00"]
        }
      ]
    }
  ],
  "lastUpdated": "2025-08-28T18:27:51.667Z"
}
```

---

## 📱 React Native Integration

The generated data is optimized for mobile app consumption:

```javascript
// Load mosque index
const mosqueIndex = await fetch("/api/mosque-index.json").then((r) => r.json());

// Find a mosque
const mosque = mosqueIndex.mosques.find(
  (m) => m.slug === "bury-park-jamia-masjid"
);

// Access Jummah times (pre-processed!)
if (mosque.jummahSchedule.length > 0) {
  mosque.jummahSchedule.forEach((schedule) => {
    console.log(`Jummah on ${schedule.date}:`);
    schedule.times.forEach((time) => {
      console.log(`  🕌 ${time}`);
    });
  });
}

// Load detailed prayer times
const detailedData = await fetch(`/api/${mosque.dataFile}`).then((r) =>
  r.json()
);
```

---

## 🏗️ Architecture

### **Key Components**

- **`scraper.js`** - Main scraping orchestrator with batch processing
- **`util.js`** - Core utilities (HTTP client, file operations, index generation)
- **`mosque-urls.js`** - Mosque configuration with names, slugs, and URLs
- **`tests/`** - Comprehensive test suite covering all functionality

### **Key Features**

- **Batch Processing**: Processes mosques in batches of 5 to avoid overwhelming servers
- **Automatic Month URLs**: Appends current month parameter to URLs
- **Jummah Time Extraction**: Automatically detects and extracts multiple Jummah times
- **Error Recovery**: Gracefully handles HTTP errors and malformed data
- **Clean Data**: Generates both individual files and consolidated index

---

## 🧪 Testing

The project includes a comprehensive test suite:

- **Configuration Tests**: Validates mosque URLs and configuration
- **Data Validation**: Ensures proper JSON structure and required fields
- **Integration Tests**: Tests with real data files
- **Edge Case Handling**: Tests missing data, malformed inputs, etc.

**Coverage**: 82%+ on core utilities with 19 passing tests

---

## 📝 Configuration

### **Adding New Mosques**

Add entries to `mosque-urls.js`:

```javascript
{
  name: "New Mosque Name",
  slug: "new-mosque-slug",
  url: "https://www.inspirefm.org/view-prayer-timings/new-mosque-slug?refkey=XXXXX"
}
```

### **Customizing Batch Size**

Modify the batch size in `scraper.js`:

```javascript
const batchSize = 5; // Adjust as needed
```

---

## 🛠️ Troubleshooting

### **Network Issues**

- Increase timeout in `util.js` if needed (default: 10 seconds)
- Check InspireFM website availability

### **Missing Data**

- Some mosques may not have current data - this is normal
- Check `hasData: false` entries in mosque index

### **Test Failures**

- Ensure data directory exists with valid JSON files
- Run `npm install` to ensure all dependencies are installed

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Run the test suite: `npm test`
5. Submit a pull request

---

## 📜 License

This project is open-source under the **MIT License**.

---

## 🎯 **Perfect for Prayer Time Apps!**

This scraper is specifically designed for developers building prayer time applications for the Luton Muslim community. The clean data structure and pre-processed Jummah schedules make integration seamless.

**Run `npm start` to get started!** 🚀
