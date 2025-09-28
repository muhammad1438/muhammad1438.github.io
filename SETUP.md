# 🚀 Quick Setup Guide

## Step 1: Repository Setup
```bash
git clone https://github.com/muhammad1438/muhammad1438.github.io.git
cd muhammad1438.github.io
```

## Step 2: Enable GitHub Pages
1. Go to your repository **Settings**
2. Navigate to **Pages** section
3. Under **Source**, select **"GitHub Actions"**
4. Your site will be live at: `https://muhammad1438.github.io`

## Step 3: Customize Your Profile
Edit `index.html` to update:
- Personal information and contact details
- Experience and education sections
- Research interests and skills

## Step 4: Add Your Profile Photo
Save your professional photo as `assets/profile.jpg`

## Step 5: Update Your CV
Replace `assets/cv.pdf` with your latest CV

## Automatic Features ✨

### Monthly Publication Updates
- Publications automatically update on the 1st of each month
- Uses your ORCID (0000-0003-1828-9458) to fetch latest papers
- Citation counts update automatically

### Manual Updates
Trigger publication updates anytime:
1. Go to **Actions** tab
2. Select **"Refresh publications"**
3. Click **"Run workflow"**

## Customization Options

### Colors and Styling
Edit CSS variables in `index.html`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
}
```

### Custom Domain (Optional)
1. Add `CNAME` file with your domain name
2. Configure DNS with your domain provider
3. Enable HTTPS in repository settings

### Publication Links
Add custom links in `data/manual_overrides.json`:
```json
{
  "links": {
    "10.1002/example.doi": "https://custom-link.com/paper"
  }
}
```

## 🔧 Technical Details

- **Framework**: Pure HTML/CSS/JavaScript
- **Hosting**: GitHub Pages (free)
- **Updates**: GitHub Actions (automated)
- **APIs**: OpenAlex + Crossref for publications
- **Performance**: Lighthouse optimized

## 📞 Support

Questions? Check the [main README](README.md) or open an issue.

---

## About

Professional CV website template for academic researchers.
