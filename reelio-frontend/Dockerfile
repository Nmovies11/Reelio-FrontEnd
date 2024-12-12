# Use the official Node.js image as the base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the Next.js app into the container
COPY . .

# Set the environment file based on the build argument
ARG ENV_FILE=.env.production

# Ensure the specified environment file is available and copy it
RUN if [ -f "$ENV_FILE" ]; then cp "$ENV_FILE" .env; else echo "Error: $ENV_FILE not found!" && exit 1; fi

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL



# Expose the port that the app will run on
EXPOSE 3000

# Build the Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]
