# Dr. Muhammad Fahad Arshad - Professional CV Website

A modern, responsive CV website with automated publication tracking from OpenAlex API.

## Features

- 🎨 **Modern Design**: Responsive, mobile-first design with print optimization
- 📊 **Auto-Updated Publications**: Automatically fetches and updates publications using your ORCID
- 🔍 **SEO Optimized**: Open Graph tags, Twitter Cards, and JSON-LD structured data
- 📱 **Mobile Responsive**: Looks great on all devices
- 🖨️ **Print Ready**: Optimized CSS for PDF generation
- ⚡ **Fast Loading**: Lightweight, optimized for performance

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository Settings
2. Navigate to Pages section
3. Under "Source", select "GitHub Actions"
4. The site will be available at `https://muhammad1438.github.io/muhammad1438`

### 2. Automatic Updates

The website automatically updates publications on the 1st of every month at 06:00 UTC using GitHub Actions. You can also trigger manual updates:

1. Go to the "Actions" tab in your repository
2. Select "Refresh publications" workflow
3. Click "Run workflow"

### 3. Custom Domain (Optional)

1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Enable "Enforce HTTPS" in repository settings

## File Structure

```text
├── index.html                 # Main CV webpage
├── scripts/
│   └── update_publications.py # Publication fetching script
├── data/
│   ├── publications.json      # Generated publication data
│   ├── publications.html      # Generated publication HTML
│   └── manual_overrides.json  # Manual link overrides
└── .github/workflows/
    ├── publications.yml       # Auto-update workflow
    └── pages.yml              # Deployment workflow
```

## Customization

### Personal Information

Edit the personal information, contact details, and experience sections directly in `index.html`.

### Publication Links

Add custom links for specific publications in `data/manual_overrides.json`:

```json
{
  "links": {
    "10.1002/example.doi": "https://custom-link.com/paper"
  }
}
```

### Styling

Modify the CSS variables in `index.html` to change colors and styling:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
}
```

## Technical Details

- **Publication Data**: Fetched from OpenAlex API using ORCID: 0000-0003-1828-9458
- **Citation Counts**: Real-time citation data from OpenAlex
- **DOI Resolution**: Links to publisher pages via Crossref API
- **Automation**: GitHub Actions runs weekly to check for new publications

## License

MIT License - Feel free to use this template for your own CV website.
