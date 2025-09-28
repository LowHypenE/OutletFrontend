# OutletV1 Frontend

A modern React-based web portal frontend for OutletV1.

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open in browser**
   - Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🌐 Deployment on Render

### Automatic Deployment

1. **Connect to GitHub**
   - Push this repository to GitHub
   - Connect your GitHub account to Render

2. **Create Static Site**
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect your repository

3. **Configure Build Settings**
   - **Root Directory**: `outlet_frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`

4. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy

### Manual Configuration

If you prefer manual setup:

- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18.x (or latest)

## 🔧 Configuration

The frontend is configured to use the backend at:
```
https://outletbackend.onrender.com/proxy?url=<TARGET_URL>
```

To change the backend URL, update the `backendUrl` constant in:
- `src/components/PortalFrame.js` (line 6)

## 📁 Project Structure

```
outlet_frontend/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # SEO robots file
│   └── _redirects          # SPA routing redirects
├── src/
│   ├── components/
│   │   ├── LoadingScreen.js    # Loading animation
│   │   ├── MainPortal.js       # Main portal interface
│   │   └── PortalFrame.js      # Iframe portal view
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── render.yaml            # Render deployment config
└── README.md              # This file
```

## ✨ Features

- **Modern Loading Screen**: Animated spinner with progress bar
- **Responsive Design**: Works on desktop and mobile
- **Quick Access Links**: Pre-configured popular websites
- **Error Handling**: User-friendly error messages
- **Keyboard Shortcuts**: Escape to close portal
- **Smooth Animations**: CSS transitions and animations

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🔗 Backend Integration

The frontend communicates with the backend through:
- **Proxy Endpoint**: `/proxy?url=<TARGET_URL>`
- **Health Check**: `/health` (for monitoring)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚨 Troubleshooting

### Build Issues
- Ensure Node.js 16+ is installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors in console

### Deployment Issues
- Verify build command: `npm run build`
- Check publish directory: `build`
- Ensure all dependencies are in `package.json`

### Runtime Issues
- Check browser console for errors
- Verify backend URL is correct
- Test backend health endpoint

## 📄 License

MIT License - see LICENSE file for details.
