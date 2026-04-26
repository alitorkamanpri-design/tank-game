# Quick Start Guide - Overtime Management System v2.0

## 🚀 How to Run the Application

### Option 1: Using Batch File (Easiest - Windows)

1. Double-click `run_server.bat`
2. Command Prompt window will open
3. Server will start on `http://localhost:8000`
4. Your browser will open the app automatically

### Option 2: Manual Python Run

```bash
cd path/to/project
python server.py
```

Then open: `http://localhost:8000`

### Option 3: Direct File Open (No Server Needed)

- Right-click on `app.html`
- Select "Open with" → Your browser
- App works locally without server

---

## 📝 Using the Application

### Recording Overtime

1. Select date in calendar
2. Enter start time (e.g., 18:00)
3. Enter end time (e.g., 21:00)
4. Enter hourly rate in Rials
5. Click "✓ Submit Record"

### Dashboard Features

- **⏱️ Total Hours** - Hours worked this month
- **💰 Total Amount** - Income calculated in Rials
- **📅 Total Days** - Number of overtime days

### Filtering Data

- Select month (Jalali calendar)
- Select year
- Table updates automatically

### Advanced Features

- **Edit** (✏️) - Modify existing records
- **Delete** (🗑️) - Remove single records
- **Export** (📊) - Download Excel file
- **Clear All** (🗑️) - Delete all records

---

## 💾 Data Storage

- **All data is stored locally** in browser's localStorage
- **Data persists** after closing the application
- **No internet required** - Fully offline
- **No external servers** - 100% private
- **Backup your data** by exporting to Excel

---

## 🔍 Console Features (Advanced)

Open Developer Tools (F12) and use:

```javascript
// Show all data as JSON
app.exportDataJSON();

// Import data from JSON
app.importDataJSON(jsonString);

// View statistics
app.showStats();
```

---

## 🐛 Bug Fixes in v2.0

✅ Fixed rate input validation
✅ Improved date filtering
✅ Better error handling
✅ Enhanced responsive design
✅ Added data persistence
✅ Improved UI/UX

---

## 📱 Device Compatibility

- ✅ Desktop/Laptop (PRIMARY)
- ✅ Tablets
- ✅ Smartphones
- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)

---

## ⚙️ System Requirements

- **Browser:** Any modern browser (Chrome, Firefox, Safari, Edge)
- **Internet:** Optional (works offline)
- **Python:** Only if using server mode
- **Storage:** Uses browser's localStorage (~5-10MB)

---

## 🎮 Bonus: Simple Games

Access simple 2D games at: `http://localhost:8000/games.html`

- Tic-Tac-Toe (XO)
- Snake Game
- Pong

---

## ⚠️ Tips & Warnings

- **Backup regularly:** Export to Excel for safety
- **Clear cache:** If you see old data, clear browser cache
- **Private mode:** Doesn't work well with localStorage
- **Export before:** Keep Excel backups of your data

---

## 🔧 Troubleshooting

### Server won't start

```bash
# Use different port
python server.py 8001
# Then use http://localhost:8001
```

### Python not found

- Install Python from https://www.python.org/downloads/
- Add Python to PATH during installation

### Data not saving

- Check if localStorage is enabled
- Exit Private/Incognito mode
- Clear browser cache and reload

---

## 📊 Application Features

✨ **Complete Features:**

- ✅ Record entry with date/time/rate
- ✅ Real-time calculations
- ✅ Monthly dashboard
- ✅ Detailed reports
- ✅ Smart filtering
- ✅ Excel export
- ✅ Edit/Delete records
- ✅ Beautiful dark theme
- ✅ Fully responsive
- ✅ Offline capable

---

**Version:** 2.0
**Status:** Stable & Ready for Use
**Last Updated:** 1402 (Persian Calendar)
