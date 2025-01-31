### **📌 `README.md`**
```md
# 🕌 InspireFM Prayer Timings Scraper

This is a **Node.js web scraper** that extracts **daily prayer timings** from InspireFM for multiple mosques and saves each mosque’s data as a **separate JSON file** inside the `data/` folder.

---

## 📜 Features
✅ Scrapes **daily prayer times** for multiple mosques from [InspireFM](https://www.inspirefm.org).  
✅ **Each mosque gets its own JSON file** in the `data/` directory.  
✅ **Automatically updates URLs** based on the current month.  
✅ Uses **Cheerio** to parse HTML and **fetch API** to handle HTTP requests.  
✅ **Handles timeouts** to prevent failures due to slow responses.  

---

## 📂 Folder Structure

/your-project
 ├── data/                      # JSON files for each mosque (auto-generated)
 ├── scraper.js                 # Main scraper script
 ├── util.js                    # Utility functions (modular)
 ├── package.json
 ├── node_modules/
 ├── README.md
```

- **`scraper.js`** → Runs the scraper and saves JSON files.  
- **`util.js`** → Contains helper functions (fetching, sanitizing filenames, handling directories).  
- **`data/`** → Stores **individual mosque JSON files** (auto-created).  

---

## ⚙️ Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/inspire-prayer-scraper.git
cd inspire-prayer-scraper
```

### ** Install Dependencies**
```bash
npm install
```

---

## 🚀 Usage

### **Run the Scraper**
```bash
node scraper.js
```
This will:
- Scrape **prayer times** for each mosque.
- Save each mosque’s data in **a separate JSON file** inside `data/`.

### **Example Output (`data/jalalabad-jamia-masjid.json`)**
```json
{
  "mosqueName": "Jalalabad Jamia Masjid",
  "timings": [
    {
      "day": "Monday",
      "date": "01-01-2025",
      "fajr": "06:00",
      "zuhr": "12:30",
      "asr": "15:45",
      "magrib": "17:15",
      "isha": "18:30"
    }
  ]
}
```


## 🛠️ Troubleshooting

### **1️⃣ "Permission Denied" When Pushing to GitHub**
If GitHub Actions fails with `Permission to <repo> denied`, ensure:
- You have a **fine-grained PAT** with `Contents: Read & Write` enabled.
- You stored the token correctly as `INSPIRE_SCRAPER` in GitHub Secrets.

### **2️⃣ "Timeout Error" When Fetching Data**
If InspireFM is slow, try increasing the timeout in `util.js`:
```javascript
const fetchWithTimeout = (url, options, timeout = 10000) => ...
```

### **3️⃣ JSON File Not Found?**
Ensure the `data/` directory exists. The script **auto-creates it**, but if you deleted it manually, re-run:
```bash
mkdir data
```

---

## 👨‍💻 Contributing
Pull requests are welcome! If you find any issues, feel free to **open an issue**.

---

## 📜 License
This project is open-source under the **MIT License**.

---

### 🚀 **Now You’re All Set!** Run `node scraper.js` to get started!
