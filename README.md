# 🕌 InspireFM Prayer Times Data

This repository contains **automatically generated prayer time data** for mosques in Luton, UK. The data is updated daily via GitHub Actions from the main scraper repository.

## 📊 Data Structure

### **Mosque Index** (`mosque-index.json`)
Contains metadata for all available mosques:
- Mosque names and slugs
- Data file locations
- Jummah schedules
- Last updated timestamp

### **Individual Mosque Data** (`data/*.json`)
Each mosque has its own JSON file containing:
- Daily prayer times (Fajr, Zuhr, Asr, Magrib, Isha)
- Jummah prayer schedules
- Date ranges for current month

## 📱 Usage

### **For React Native Apps**
```typescript
// Fetch mosque list
const mosqueIndex = await fetch(
  'https://raw.githubusercontent.com/tan-ahmed/inspire-prayer-scraper/main/mosque-index.json'
).then(r => r.json());

// Fetch specific mosque data
const mosqueData = await fetch(
  'https://raw.githubusercontent.com/tan-ahmed/inspire-prayer-scraper/main/data/al-hira-centre.json'
).then(r => r.json());
```

### **Data URLs**
- **Mosque Index**: `https://raw.githubusercontent.com/tan-ahmed/inspire-prayer-scraper/main/mosque-index.json`
- **Individual Data**: `https://raw.githubusercontent.com/tan-ahmed/inspire-prayer-scraper/main/data/{mosque-slug}.json`

## 🔄 Updates

This data is automatically updated **daily at midnight UTC** via GitHub Actions from the main scraper repository. No manual intervention required.

## 📝 Note

This repository contains **only generated data files**. The scraper logic and configuration are maintained in the main application repository.

---

**Last Updated**: See `mosque-index.json` for the latest timestamp.