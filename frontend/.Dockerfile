FROM node

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

EXPOSE 5173

# for tests
CMD ["npm", "run", "dev"]

