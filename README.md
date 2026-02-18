# 🏫 Sistem Akademik Sekolah

Enterprise Structured Frontend Academic Information System

![GitHub
stars](https://img.shields.io/github/stars/bagus-beep/sistem_akademik_sekolah?style=flat-square)
![GitHub
forks](https://img.shields.io/github/forks/bagus-beep/sistem_akademik_sekolah?style=flat-square)
![GitHub
license](https://img.shields.io/github/license/bagus-beep/sistem_akademik_sekolah?style=flat-square)
![GitHub last
commit](https://img.shields.io/github/last-commit/bagus-beep/sistem_akademik_sekolah?style=flat-square)

------------------------------------------------------------------------

## 📌 Executive Summary

**Sistem Akademik Sekolah** adalah aplikasi web modular berbasis HTML,
CSS, dan Vanilla JavaScript yang dirancang untuk mensimulasikan sistem
manajemen akademik sekolah dengan struktur arsitektur yang rapi,
scalable, dan siap dikembangkan ke tahap production-level system.

------------------------------------------------------------------------

## 🎯 Objective

-   Prototype sistem akademik berbasis web
-   Foundation integrasi backend (REST API / BaaS)
-   Media pembelajaran arsitektur frontend terstruktur
-   Portfolio technical project

------------------------------------------------------------------------

## 🌐 Demo (GitHub Pages) 

🔗 https://bagus-beep.github.io/data_sekolah/ 

Repository: 🔗 https://github.com/bagus-beep/data_sekolah

------------------------------------------------------------------------

## 🏗️ Diagram Arsitektur Sistem

### 🔹 High-Level Architecture

    +-----------------------+
    |      User Browser     |
    |  (Chrome / Edge etc)  |
    +-----------+-----------+
                |
                v
    +-----------------------+
    |     index.html        |
    |     pages/*.html      |
    +-----------+-----------+
                |
                v
    +-----------------------+
    |   JavaScript Layer    |
    |   (js/classes.js)     |
    +-----------+-----------+
                |
                v
    +-----------------------+
    |      Data Layer       |
    |   (data/*.json)       |
    +-----------------------+

------------------------------------------------------------------------

### 🔹 Layered Architecture View

    ┌─────────────────────────────────────┐
    │         Presentation Layer          │
    │  - index.html                       │
    │  - pages/lesson_schedule.html       │
    └─────────────────────────────────────┘
                    │
    ┌─────────────────────────────────────┐
    │            Logic Layer              │
    │  - js/classes.js                    │
    └─────────────────────────────────────┘
                    │
    ┌─────────────────────────────────────┐
    │             Data Layer              │
    │  - data/ (JSON Simulation)          │
    └─────────────────────────────────────┘

------------------------------------------------------------------------

## 📁 Project Structure

    sistem_akademik_sekolah/
    │
    ├── index.html
    ├── css/
    │   └── style.css
    ├── js/
    │   └── classes.js
    ├── data/
    │   └── (data simulation)
    ├── pages/
    │   └── lesson_schedule.html
    ├── partials/
    │   └── header.html
    └── README.md

------------------------------------------------------------------------

## ⚙️ Core Features

-   Dashboard Akademik
-   Manajemen Data Kelas
-   Jadwal Pelajaran
-   Struktur Modular & Scalable
-   Template Partial Layout

------------------------------------------------------------------------

## 🛠️ Technology Stack

  Layer             Technology
  ----------------- --------------------
  Markup            HTML5
  Styling           CSS3
  Logic             Vanilla JavaScript
  Data              JSON
  Version Control   Git
  Repository        GitHub

------------------------------------------------------------------------

## 🚀 Local Development Setup

### 1️⃣ Clone Repository

``` bash
git clone https://github.com/bagus-beep/sistem_akademik_sekolah.git
```

### 2️⃣ Navigate to Project Folder

``` bash
cd sistem_akademik_sekolah
```

### 3️⃣ Run Project

Gunakan: - VS Code + Live Server (recommended) - Atau buka index.html
langsung di browser

------------------------------------------------------------------------

## 🔄 Scalability Roadmap

-   Authentication System (Admin / Guru)
-   CRUD Siswa & Guru
-   REST API Integration
-   Database (Supabase / MySQL / PostgreSQL)
-   Export PDF / Excel
-   Migration to SPA Framework

------------------------------------------------------------------------

## 👤 Author

**bagus-beep**\
Frontend System Developer

------------------------------------------------------------------------

## ☕ Dukungan & Kontak

Jika project ini bermanfaat dan ingin mendukung pengembang:

**Babesugab**\
📱 Traktir kopi via **GoPay / DANA**\
📞 0856-4543-9575

Dukungan Anda membantu pengembangan sistem pendidikan berbasis teknologi
yang lebih baik.

------------------------------------------------------------------------

## 📄 License

Open-source untuk pembelajaran dan pengembangan internal sekolah.
