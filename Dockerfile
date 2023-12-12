# Use an official Node.js runtime with Alpine Linux as the parent image
FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN cp .env.prod .env

# Expose the port your application will listen on (if applicable)
EXPOSE 8082

# Start your Node.js application
CMD ["npm", "start"]
