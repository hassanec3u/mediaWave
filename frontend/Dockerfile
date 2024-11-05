FROM node:18
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 4200
CMD ["yarn", "run", "start", "--host", "0.0.0.0"]
