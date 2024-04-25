#!/bin/bash

echo "# Required" > .env

# Set environment variables for Vercel deployment
echo "NODE_ENV=production" >> .env
echo "PORT=80" >> .env  # Vercel uses port 80 for HTTP traffic by default
echo "SERVER_DATABASE_URL=your-production-database-url" >> .env
echo "SERVER_AUTHENTICATION_SECRET=your-production-auth-secret" >> .env
echo "SERVER_CLIENT_BASE_URL=https://vaxhasai-bwn7f8wtu-kaqons-projects.vercel.app" >> .env
echo "SERVER_BASE_URL=https://your-production-server-url" >> .env  # Replace with your actual server URL

# Optional environment variables
echo "# Optional" >> .env
echo "SERVER_OPENAI_API_KEY=" >> .env
echo "SERVER_GOOGLE_CLIENT_ID=" >> .env
echo "SERVER_EMAIL_MAILPIT_HOST=" >> .env
echo "SERVER_EMAIL_MAILPIT_PORT=" >> .env
echo "SERVER_EMAIL_MAILJET_API_KEY=" >> .env
echo "SERVER_EMAIL_MAILJET_SECRET_KEY=" >> .env

# Set authentication token method
echo "SERVER_AUTHENTICATION_TOKEN_METHOD=header" >> .env
