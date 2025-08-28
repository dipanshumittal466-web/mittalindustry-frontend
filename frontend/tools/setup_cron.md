# Mittal Industry – SEO Automation Setup

## Linux (Cron Job)
1. SSH into your server.
2. Open cron editor:
   crontab -e
3. Add:
   0 0 * * * cd /var/www/mittalindustry_next_electrical && npm run seo >> cron.log 2>&1

## Windows (Task Scheduler)
1. Open Task Scheduler -> Create Basic Task
2. Trigger -> Daily at 12 AM
3. Action -> Start a program
   Program: cmd.exe
   Arguments: /c cd C:\mittalindustry_next_electrical && npm run seo

## PM2 (Alternative)
pm2 start "npm run seo" --name seo-generator --cron "0 0 * * *"
