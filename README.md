### Run
- npm start: to run the project

### Development 
- npm watch: start ts compiler to watch for file changes

- npm dev: start project with hot reload support

#### Following env variables are recommended but not required (fallback is provided in code)

- `PORT` : port to run express server on
- `CACHE_LIMIT`: Maximum number of cache entries allowed
- `MONGO_URL`: Mongodb connection string
- `TTL` : Time To Live in `ms` for cache item

