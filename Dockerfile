# Use an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Set environment variables (optional, can also be set in Render)
ENV PORT=8080
ENV DB_HOST=<your_database_host>
ENV DB_USER=<your_database_user>
ENV DB_PASSWORD=<your_database_password>
ENV DB_NAME=<your_database_name>

# Command to start the backend server
CMD ["node", "index.js"]
