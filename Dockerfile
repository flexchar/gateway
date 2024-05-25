# Use an official Node.js runtime as a parent image
FROM oven/bun:1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN bun install

# Bundle app source
COPY . .

# Expose the port your app runs on
EXPOSE 8787

# Define the command to run your app
CMD ["bun run src/start-bun.ts"]