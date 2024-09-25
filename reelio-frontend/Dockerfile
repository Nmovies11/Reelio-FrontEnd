# Use official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 to access the app
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "start"]