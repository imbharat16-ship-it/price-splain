# Price-Splain

A Chrome extension that translates corporate jargon in SaaS pricing tables into plain English with humor.

![Extension Icon](icons/icon128.png)

## 🎯 Features

- **Smart Detection**: Automatically scans pricing pages for jargon terms
- **Plain English Translations**: Converts confusing pricing terms into understandable language
- **Humorous Explanations**: Adds personality and humor to make pricing pages more engaging
- **Hover Tooltips**: Clean, professional tooltips that appear on hover
- **Real-time Processing**: Works on dynamic content and single-page applications
- **Comprehensive Glossary**: 400+ jargon terms with translations

## 🚀 Installation

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/price-splain.git
   cd price-splain
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right

4. Click "Load unpacked" and select the project folder

5. The extension will appear in your Chrome toolbar

## 📖 Usage

1. **Activate**: Click the extension icon and toggle "Unjargon Mode" to On
2. **Navigate**: Go to any SaaS pricing page (e.g., Stripe, GitHub, Anthropic)
3. **Hover**: Hover over highlighted jargon terms to see plain English translations
4. **Enjoy**: Discover the hidden meanings behind pricing page jargon!

## 🛠️ How It Works

### Architecture

- **Content Scripts**: Scan and modify page content in real-time
- **Background Service Worker**: Manages extension state and statistics
- **Popup Interface**: Clean, modern UI for extension control
- **Jargon Dictionary**: Comprehensive JSON database of terms and translations

### Detection Process

1. **Page Scan**: Analyzes all text elements on the page
2. **Term Matching**: Compares text against 400+ jargon terms
3. **Highlighting**: Wraps matched terms in styled spans
4. **Tooltip Integration**: Adds hover functionality for translations

## 📁 Project Structure

```
├── manifest.json          # Extension manifest
├── background.js          # Service worker
├── content/               # Content scripts
│   ├── content.js        # Main orchestrator
│   ├── translator.js     # Jargon translation logic
│   ├── tooltip.js        # Tooltip management
│   └── styles.css        # Extension styles
├── popup/                # Extension popup UI
│   ├── popup.html        # Popup structure
│   ├── popup.css         # Popup styles
│   └── popup.js          # Popup functionality
├── data/                 # Data files
│   ├── glossary.json     # Jargon dictionary
│   └── glossary.js       # Dictionary loader
├── icons/                # Extension icons
└── archive/              # Development files
```

## 🎨 Design Philosophy

- **Clean & Modern**: Professional UI with subtle grey palette
- **Non-intrusive**: Minimal visual impact on original pages
- **Accessible**: High contrast and readable typography
- **Fast**: Optimized for performance and minimal resource usage

## 🔧 Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: Active tab access for content scanning
- **Storage**: Local storage for settings and statistics
- **Fonts**: Roboto for consistent typography
- **Responsive**: Adapts to different screen sizes

## 📊 Supported Sites

The extension works on all websites but is optimized for:
- Stripe Pricing
- GitHub Plans
- Anthropic Pricing
- AWS Pricing
- Google Cloud Pricing
- And many more SaaS pricing pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Adding New Jargon Terms

To add new terms to the glossary:

1. Open `data/glossary.json`
2. Add new entries with the format:
   ```json
   "TERM": {
     "translation": "Plain English explanation",
     "explanation": "Funny or detailed explanation",
     "severity": "warning|good|neutral"
   }
   ```
3. Test the new terms
4. Submit a PR

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by the complexity of SaaS pricing pages
- Built with modern web technologies
- Designed for developer productivity

## 📞 Support

- **Issues**: Report bugs via GitHub Issues
- **Features**: Request features via GitHub Discussions
- **Questions**: Open a GitHub Discussion

---

**Made with ❤️ for developers who are tired of corporate pricing BS**
