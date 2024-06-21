# Base image
FROM node:18-alpine


# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Set production environment
ENV NODE_ENV="production"

# Install app dependencies
RUN yarn install

RUN npx playwright install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["yarn", "start:prod"]