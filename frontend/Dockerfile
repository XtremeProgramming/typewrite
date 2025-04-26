# 1. Use an official Node image
FROM node:23-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only yarn.lock and package.json first (to cache installs)
COPY package.json yarn.lock ./

# 4. Install dependencies with Yarn
RUN yarn install

# 5. Copy the rest of your project
COPY . .

# 6. Expose the Vite dev server port
EXPOSE 5173

# 7. Start Vite
CMD ["yarn", "dev", "--host"]
