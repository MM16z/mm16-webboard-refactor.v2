# # Use an official Node.js runtime as the base image
# FROM node:18-alpine

# # Set the working directory
# WORKDIR /app

# # Install PM2 globally
# RUN npm install -g pm2

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install production dependencies
# RUN npm ci --omit=dev

# # Copy the rest of the code
# COPY . .

# # # Install dependencies
# # RUN npm install

# # Install dependencies including dev dependencies
# RUN npm install --include=dev

# # Run TypeScript build
# RUN npm run build

# # Expose the port
# EXPOSE 8001

# # Start the application with PM2
# CMD ["pm2-runtime", "dist/server.js", "--name", "mm16-webboard-express-refactor"]

# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Install dependencies including dev dependencies
RUN npm install --include=dev

# Copy the rest of the code
COPY . .

# Run TypeScript build
RUN npm run build

# Run Prisma generate
RUN npx prisma generate

# Expose the port
EXPOSE 8001

# Start the application with PM2
CMD ["pm2-runtime", "dist/server.js", "--name", "mm16-webboard-express-refactor"]
