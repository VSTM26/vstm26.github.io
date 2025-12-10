# Teja Mathukumalli Portfolio

A modern, animated personal portfolio website showcasing projects, skills, and achievements.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Particle effects, parallax scrolling, and interactive elements
- **Modern UI**: Clean, professional design with gradient backgrounds
- **Project Showcase**: Filterable project grid with hover effects
- **Auto-Commit Scripts**: Easy version control automation

## Auto-Commit Scripts

This project includes several ways to automatically commit changes to git:

### Windows (Batch File)
```bash
auto-commit.bat
```

### Cross-Platform (Shell Script)
```bash
./auto-commit.sh
```

### NPM Scripts
```bash
# Just commit locally
npm run commit

# Commit and push to remote
npm run push

# Full deploy (commit + push)
npm run deploy
```

## Usage

1. Make your changes to the website files
2. Run one of the auto-commit scripts above
3. Your changes will be automatically committed with a timestamp

## File Structure

```
├── index.html          # Main website file
├── styles.css          # Styles and animations
├── script.js           # JavaScript functionality
├── auto-commit.bat     # Windows auto-commit script
├── auto-commit.sh      # Cross-platform auto-commit script
├── package.json        # NPM scripts configuration
└── TejaMathukumalliPictureLinkedIn.jpg  # Profile image
```

## Technologies Used

- HTML5
- CSS3 (Animations, Flexbox, Grid)
- JavaScript (ES6+)
- Canvas API (Particle effects)
- SVG Animations

## Development

To run the website locally, simply open `index.html` in your browser.

## License

MIT License
