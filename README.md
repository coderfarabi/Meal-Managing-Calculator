# 🍽️ Meal Managing Calculator

> **A web-based dining management and meal calculation system for managing resident meals, deposits, expenses, meal rates, balances, and dining reports.**

**Meal Managing Calculator** is a lightweight web application designed to simplify monthly dining management for **Hazrat Uthman (R) Hall, IIUC**.

The application helps dining managers calculate the **meal rate**, manage resident **meal counts and deposits**, calculate individual **meal costs and balances**, import data from Excel/CSV files, and generate printable dining reports.

It is built as a client-side web application using **HTML, Tailwind CSS, and Vanilla JavaScript**, with **SheetJS** for spreadsheet data import.

---

# ✨ Features

## 📊 Dining Summary

The application provides an overview of the dining accounts, including:

* Total Deposit
* Total Bazaar
* Guest Meals Income
* Remaining Bazaar
* Meal Rate
* Cash in Hand
* Total Refund

These values are dynamically calculated based on the entered dining data.

---

## 🍛 Meal Management

The system allows the dining manager to enter meal information for residents.

Each record can contain:

* Serial number
* Meal count
* Deposit amount
* Calculated meal cost
* Remaining balance

The application initially provides records for **315 members** and also allows additional rows to be added when needed.

---

## 💰 Automatic Meal Rate Calculation

The application automatically calculates the meal rate using the dining cost and total meal consumption.

The core calculation is based on:

```text
Net Cost = Total Bazaar - Guest Meals Income - Remaining Bazaar

Meal Rate = Net Cost / Total Meals
```

The calculated meal rate is then used to determine the cost for each resident.

---

## 🧮 Individual Cost & Balance Calculation

For every resident, the system calculates:

```text
Meal Cost = Meals × Meal Rate

Balance = Deposit - Meal Cost
```

Negative balances are visually highlighted to make them easier to identify.

---

## 📥 Smart Excel / CSV Import

The application supports importing dining data from spreadsheet files.

Supported formats include:

```text
.xlsx
.xls
.csv
```

Users can either:

* Drag and drop a file
* Click to browse and select a file

The application reads the spreadsheet directly in the browser using **SheetJS/XLSX**.

---

## 📋 Quick Text Import

Users can also paste structured data directly into the application.

Example:

```text
1 45 2000
2 30 1500
3 40 1800
```

The application interprets the values as:

```text
Serial Number → Meals → Deposit
```

and automatically updates the corresponding records.

---

## 🖨️ Printable Reports

The application provides two printing options:

### Deposit Ledger

Generates a simplified printable deposit ledger.

### Full Report

Generates a complete dining report containing the relevant dining calculations and signatures.

Before generating a full report, the application checks that required summary values and signatures have been provided.

---

## ✍️ Digital Signatures

The report includes fields for:

* Dining Manager
* Hall Auditor

These names can be entered before generating the full report.

---

## 📅 Month & Year Selection

The interface provides month and year selectors for managing dining records according to a specific reporting period.

---

## 🔄 Dynamic Data Updates

Calculations are updated immediately when the user changes:

* Meal count
* Deposit
* Total Bazaar
* Guest Meals Income
* Remaining Bazaar

This provides real-time feedback without requiring a page reload.

---

## 🔝 Navigation Controls

The application includes:

* Sticky navigation
* Scroll-to-top button
* Scroll-to-bottom button
* Responsive layout

These features make the interface easier to use when working with large dining tables.

---

# 🛠️ Tech Stack

| Technology                  | Purpose                            |
| --------------------------- | ---------------------------------- |
| **HTML5**                   | Application structure              |
| **Tailwind CSS**            | UI styling and responsive design   |
| **Vanilla JavaScript**      | Application logic and calculations |
| **SheetJS (XLSX)**          | Excel/CSV file processing          |
| **Google Material Symbols** | Dining iconography                 |
| **Google Fonts**            | Typography                         |
| **Vercel**                  | Deployment                         |

The repository currently contains an `index.html` application and a `_config.yml` configuration file. The frontend loads Tailwind CSS, SheetJS, and Google Material Symbols externally.

---

# 🏗️ Application Architecture

The application follows a simple **client-side architecture**.

```text
                    ┌───────────────────────┐
                    │       User Input      │
                    └───────────┬───────────┘
                                │
                ┌───────────────┼────────────────┐
                │               │                │
                ▼               ▼                ▼
          Manual Entry     Text Import      Excel / CSV
                │               │                │
                └───────────────┼────────────────┘
                                ▼
                    ┌───────────────────────┐
                    │   JavaScript Engine   │
                    │                       │
                    │  Data Processing      │
                    │  Meal Calculation     │
                    │  Balance Calculation  │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │    Dining Summary     │
                    │                       │
                    │  Meal Rate            │
                    │  Total Deposit        │
                    │  Total Expense        │
                    │  Total Balance        │
                    └───────────┬───────────┘
                                │
                         ┌──────┴──────┐
                         │             │
                         ▼             ▼
                  Deposit Ledger   Full Report
                         │             │
                         └──────┬──────┘
                                ▼
                           Print Output
```

---

# 🧮 Calculation Logic

## Meal Rate

The application calculates the meal rate using:

```text
Net Cost = Total Bazaar - Guest Meals Income - Remaining Bazaar
```

Then:

```text
Meal Rate = Net Cost / Total Meals
```

If there are no meals, the application safely returns a meal rate of `0`.

---

## Individual Meal Cost

For each resident:

```text
Meal Cost = Number of Meals × Meal Rate
```

---

## Individual Balance

The resident's balance is calculated as:

```text
Balance = Deposit - Meal Cost
```

A negative balance is displayed in a warning style so it can be identified easily.

---

# 📥 Data Import

## Excel / CSV

The application uses **SheetJS** to read spreadsheet files directly in the browser.

Supported file types:

```text
.xlsx
.xls
.csv
```

The first worksheet is processed and the application reads:

```text
SL | Meals | Deposit
```

format data.

---

## Quick Paste Format

You can paste data in this format:

```text
1 45 2000
2 30 1500
3 40 1800
```

or using tab/comma-separated values.

The application parses the data and updates the matching serial numbers.

---

# 🖥️ User Interface

The interface is designed with a clean dashboard-style layout.

### Main Sections

```text
┌──────────────────────────────────────────────┐
│              HURH Dining                     │
│       Month / Year Selection                 │
├──────────────────────────────────────────────┤
│ Total Deposit │ Bazaar │ Guest │ Balance     │
├──────────────────────────────────────────────┤
│              Import Tools                    │
│        Excel / CSV / Text                    │
├──────────────────────────────────────────────┤
│              Dining Table                    │
│ SL │ Meals │ Deposit │ Cost │ Balance        │
├──────────────────────────────────────────────┤
│             Add Record Row                   │
├──────────────────────────────────────────────┤
│ Dining Manager        Hall Auditor           │
└──────────────────────────────────────────────┘
```

---

# 📱 Responsive Design

The interface uses responsive Tailwind CSS utility classes to adapt the layout for different screen sizes.

The application includes:

* Mobile-friendly spacing
* Responsive summary cards
* Responsive navigation
* Responsive data sections
* Desktop-friendly large tables

---

# 🖨️ Print Support

The application contains dedicated print styling using CSS `@media print`.

The print mode can:

* Remove unnecessary UI elements
* Expand the dining table
* Adjust table borders and spacing
* Generate a clean report
* Create a simplified deposit ledger

This allows the web application to function as both a digital management tool and a report-generation system.

---

# 📂 Project Structure

The current repository is intentionally lightweight:

```text
Meal-Managing-Calculator/
│
├── index.html
├── dining_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg
├── _config.yml
└── README.md
```

The main application logic, styling, UI, calculations, import handling, and printing functionality are currently contained in `index.html`.

---

# 🚀 Getting Started

Since this is a client-side web application, no backend server or database setup is required for the current version.

## 1. Clone the Repository

```bash
git clone https://github.com/coderfarabi/Meal-Managing-Calculator.git
```

## 2. Enter the Project Directory

```bash
cd Meal-Managing-Calculator
```

## 3. Run the Application

You can open:

```text
index.html
```

directly in a modern web browser.

Alternatively, serve the directory using a local development server.

For example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

# 🌐 Deployment

The project is currently deployed as a web application and the repository provides the following live deployment:

**Live Demo:**
https://hurh-meal-managing-calculator.vercel.app/

The application can also be deployed easily using static hosting platforms that support HTML/CSS/JavaScript applications.

---

# 🔒 Data & Privacy

The current application is primarily client-side.

Data entered into the application is processed by JavaScript in the browser, and the repository does not currently contain a dedicated backend or database layer.

For sensitive dining records, users should follow their organization's data-handling policies.

---

# 🎯 Use Case

This project was designed for managing dining accounts in a residential hall environment.

It can be useful for:

* University halls
* Student residences
* Shared dining systems
* Mess management
* Meal-based expense tracking
* Monthly dining reports

The project is specifically branded for **Hazrat Uthman (R) Hall, IIUC**.

---

# 🔮 Future Improvements

Possible future improvements include:

* 💾 Persistent database storage
* 👥 User authentication
* 👨‍💼 Admin and dining manager roles
* 📊 Monthly analytics dashboard
* 📈 Expense and meal charts
* 📅 Historical month management
* 🔎 Search and filtering
* 📤 PDF report export
* 📥 Improved Excel import mapping
* ☁️ Cloud data synchronization
* 🗄️ Backend API
* 🧾 Automated monthly report generation
* 📱 Progressive Web App support

---

# 🐛 Known Considerations

The current implementation is a lightweight client-side application.

For production-scale multi-user usage, a backend and persistent database would be useful for:

* Centralized data storage
* Multi-user access
* Authentication
* Data backup
* Historical records
* Concurrent editing

---

# 👨‍💻 Author

**A A R Farabi**

**Affiliation:** Hazrat Uthman (R) Hall, IIUC

---

# 📜 License

Add your preferred license here.

For example:

```text
MIT License
```

---

# ⭐ Project Summary

**Meal Managing Calculator** transforms a traditionally manual dining-management process into a browser-based calculation and reporting system.

### Core Workflow

```text
Meal Data
   ↓
Deposit Data
   ↓
Dining Expenses
   ↓
Automatic Meal Rate
   ↓
Individual Meal Cost
   ↓
Individual Balance
   ↓
Dining Report
```

### Built With

**HTML5 · Tailwind CSS · Vanilla JavaScript · SheetJS · Google Material Symbols · Vercel**

---

## 🔗 Links

* **Repository:** https://github.com/coderfarabi/Meal-Managing-Calculator
* **Live Demo:** https://hurh-meal-managing-calculator.vercel.app/
