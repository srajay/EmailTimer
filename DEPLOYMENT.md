# Deployment Guide

This guide will help you deploy your Email Countdown Timer to various hosting platforms.

## Table of Contents
1. [Heroku](#heroku)
2. [Vercel](#vercel)
3. [Railway](#railway)
4. [DigitalOcean](#digitalocean)
5. [AWS (EC2)](#aws-ec2)
6. [Docker](#docker)
7. [Traditional VPS](#traditional-vps)

---

## Heroku

### Prerequisites
- Heroku account
- Heroku CLI installed
- Git installed

### Steps

1. **Login to Heroku**
```bash
heroku login
```

2. **Create a new Heroku app**
```bash
heroku create your-countdown-timer
```

3. **Deploy**
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

4. **Open your app**
```bash
heroku open
```

Your timer is now live at: `https://your-countdown-timer.herokuapp.com`

### Notes
- Heroku dynos sleep after 30 minutes of inactivity on free tier
- First request after sleep may be slow
- Consider upgrading to Hobby dyno ($7/month) for always-on service

---

## Vercel

### Prerequisites
- Vercel account
- Vercel CLI installed (optional)

### Method 1: CLI Deployment

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow prompts and deploy to production**
```bash
vercel --prod
```

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Go to vercel.com and click "Import Project"
3. Select your repository
4. Vercel will auto-detect settings
5. Click "Deploy"

### Notes
- Vercel has serverless function limitations
- Free tier includes 100GB bandwidth
- Custom domains available

---

## Railway

### Prerequisites
- Railway account
- GitHub repository

### Steps

1. **Visit railway.app**
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js
6. Click "Deploy"

### Environment Variables
Railway automatically sets PORT, so no configuration needed.

### Notes
- Free tier includes $5/month credit
- Very easy deployment process
- Custom domains available

---

## DigitalOcean

### Prerequisites
- DigitalOcean account
- GitHub repository

### Steps

1. **Go to DigitalOcean App Platform**
2. Click "Create App"
3. Connect your GitHub repository
4. Configure your app:
   - **Name**: countdown-timer
   - **Branch**: main
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`
   - **HTTP Port**: 3000

5. Click "Next" and select your plan
6. Click "Launch App"

### Notes
- Basic plan starts at $5/month
- Includes automatic HTTPS
- Auto-deploy on git push

---

## AWS EC2

### Prerequisites
- AWS account
- SSH key pair

### Steps

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.micro (free tier eligible)
   - Configure security group: Allow HTTP (80), HTTPS (443), SSH (22)

2. **SSH into your instance**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

4. **Clone your repository**
```bash
git clone your-repo-url
cd email-countdown-timer
npm install --production
```

5. **Install PM2**
```bash
sudo npm install -g pm2
pm2 start server.js --name countdown-timer
pm2 save
pm2 startup
```

6. **Install Nginx**
```bash
sudo apt-get install nginx
```

7. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/countdown-timer
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Enable site**
```bash
sudo ln -s /etc/nginx/sites-available/countdown-timer /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. **Install SSL with Let's Encrypt**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Docker

### Prerequisites
- Docker installed
- Docker Compose installed (optional)

### Method 1: Docker only

1. **Build image**
```bash
docker build -t countdown-timer .
```

2. **Run container**
```bash
docker run -d -p 3000:3000 --name countdown-timer countdown-timer
```

### Method 2: Docker Compose

1. **Start with Docker Compose**
```bash
docker-compose up -d
```

2. **View logs**
```bash
docker-compose logs -f
```

3. **Stop**
```bash
docker-compose down
```

### Notes
- Access at `http://localhost:3000`
- Persists across restarts
- Easy to manage and update

---

## Traditional VPS (Ubuntu/Debian)

### Prerequisites
- VPS with Ubuntu 20.04+ or Debian 10+
- Root or sudo access

### Steps

1. **Update system**
```bash
sudo apt-get update
sudo apt-get upgrade
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install build tools for canvas**
```bash
sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

4. **Create app directory**
```bash
sudo mkdir -p /var/www/countdown-timer
sudo chown $USER:$USER /var/www/countdown-timer
```

5. **Upload your files**
```bash
cd /var/www/countdown-timer
# Upload files via SCP, SFTP, or git clone
npm install --production
```

6. **Install PM2**
```bash
sudo npm install -g pm2
pm2 start server.js --name countdown-timer
pm2 save
pm2 startup systemd
```

7. **Configure firewall**
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

8. **Install and configure Nginx** (see AWS EC2 section above)

---

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Test the homepage loads
- [ ] Generate a test countdown timer
- [ ] Copy the image URL and test in browser
- [ ] Send a test email with the countdown
- [ ] Verify timer updates when email is re-opened
- [ ] Set up monitoring (optional)
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate
- [ ] Add analytics (optional)

---

## Monitoring and Maintenance

### Health Check Endpoint
Your app includes a health check at `/health`

### PM2 Monitoring
```bash
pm2 monit
pm2 logs countdown-timer
```

### Uptime Monitoring Services
- UptimeRobot (free)
- Pingdom
- Better Uptime
- StatusCake

---

## Troubleshooting

### Port already in use
```bash
# Find process using port 3000
sudo lsof -i :3000
# Kill process
sudo kill -9 PID
```

### Canvas installation errors
Make sure all system dependencies are installed:
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

### Permission errors
```bash
sudo chown -R $USER:$USER /path/to/app
```

---

## Support

If you encounter issues, please check:
1. Server logs
2. Node.js version (should be 14.x or higher)
3. All dependencies installed correctly
4. Firewall settings
5. Port availability

For more help, open an issue on the repository.