# Email Countdown Timer Generator

A free, open-source email countdown timer generator with no watermarks. Perfect for email marketing campaigns, product launches, sales, and events.

## Features

- ✅ **No Watermarks** - Completely clean output
- ✅ **Free & Open Source** - No payment required
- ✅ **Customizable** - Colors, font size, event name
- ✅ **Multiple Timezones** - Works globally
- ✅ **Live Preview** - See your timer in real-time
- ✅ **Dynamic Images** - Updates each time email is opened
- ✅ **Easy Integration** - Simple HTML code for emails

## Quick Start

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

### For Development

Use nodemon for auto-restart on file changes:
```bash
npm run dev
```

## How It Works

1. **Frontend**: User-friendly interface to configure countdown timers
2. **Backend**: Node.js server that generates countdown images on-the-fly
3. **Dynamic Images**: Each time an email is opened, the image is regenerated with the current remaining time

## API Endpoint

### GET /countdown

Generates a countdown timer image.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `target` | number | Yes | Target timestamp in milliseconds |
| `tz` | string | No | Timezone (default: UTC) |
| `bg` | string | No | Background color (default: #667eea) |
| `text` | string | No | Text color (default: #ffffff) |
| `size` | number | No | Font size in pixels (default: 24) |
| `name` | string | No | Event name to display |
| `width` | number | No | Image width (default: 600) |
| `height` | number | No | Image height (default: 200) |

**Example:**
```
http://localhost:3000/countdown?target=1735689600000&tz=America/New_York&bg=%23667eea&text=%23ffffff&size=24&name=New%20Year%20Sale
```

**Response:** PNG image with countdown timer

## Deployment

### Deploy to Heroku

1. Create a new Heroku app:
```bash
heroku create your-app-name
```

2. Deploy:
```bash
git push heroku main
```

3. Your timer will be available at:
```
https://your-app-name.herokuapp.com
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Deploy to Railway

1. Connect your GitHub repository to Railway
2. Railway will auto-detect Node.js and deploy
3. Set PORT environment variable if needed

### Deploy to DigitalOcean App Platform

1. Connect your GitHub repository
2. Select Node.js as the environment
3. Set build command: `npm install`
4. Set run command: `npm start`

### Deploy to Your Own Server

1. Copy files to your server
2. Install dependencies: `npm install --production`
3. Use PM2 to keep the app running:
```bash
npm install -g pm2
pm2 start server.js --name countdown-timer
pm2 save
pm2 startup
```

4. Set up Nginx as reverse proxy (recommended)

## Using in Email Campaigns

### For Email Marketing Platforms

**Mailchimp:**
1. Copy the HTML code from the generator
2. Add an HTML block to your email
3. Paste the code

**Constant Contact:**
1. Use the "Custom Code" block
2. Paste the HTML code

**SendGrid:**
1. Use the code editor
2. Insert the HTML where you want the timer

**Campaign Monitor:**
1. Use a custom HTML content block
2. Paste the code

### Generic HTML Email

Simply paste the generated HTML code into your email template:
```html
<img src="YOUR_SERVER_URL/countdown?target=TIMESTAMP&..." alt="Countdown" style="display: block; max-width: 100%;" />
```

### Important Notes

- The `{{timestamp}}` parameter ensures emails clients don't cache the image
- Test your emails across different clients (Gmail, Outlook, Apple Mail)
- Some email clients may have slight delays in image updates

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |

## Technology Stack

- **Backend**: Node.js, Express
- **Image Generation**: node-canvas
- **Timezone Handling**: moment-timezone
- **Frontend**: Vanilla JavaScript, HTML5, CSS3

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Email Client Support

Tested and working with:
- Gmail
- Outlook (Desktop & Web)
- Apple Mail
- Yahoo Mail
- Thunderbird
- Most major email clients

## Troubleshooting

### Images not updating in email

- Some email clients cache images aggressively
- The `{{timestamp}}` parameter helps prevent this
- Test by opening the email multiple times with several minutes between opens

### Server won't start

- Check if port 3000 is already in use
- Verify Node.js version is 14.x or higher
- Ensure all dependencies are installed

### Canvas errors

The `canvas` package requires native dependencies. On Linux:
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

On macOS:
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this in your projects!

## Support

For issues and questions, please open an issue on the repository.

## Alternatives

This project is inspired by services like Sendtric but is completely free and open-source with no watermarks or restrictions.

---

Made with ❤️ for email marketers everywhere