import { MongoClient } from "mongodb"

/**
 * Vercel reuses module instances across warm invocations. A MongoClient that
 * is created once but never explicitly connected can be reused after its
 * topology was closed, causing "MongoTopologyClosedError".
 *
 * Cache one connected client promise on globalThis so every warm invocation
 * reuses a live connection instead of creating a new one or a stale one.
 */
const globalWithMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>
}

export function getMongoClient() {
  if (!globalWithMongo.mongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI as string)

    // If the first attempt fails, clear the cache so the next request retries.
    globalWithMongo.mongoClientPromise = client.connect().catch((error) => {
      globalWithMongo.mongoClientPromise = undefined
      throw error
    })
  }

  return globalWithMongo.mongoClientPromise
}
