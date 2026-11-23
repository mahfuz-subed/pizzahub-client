import "dotenv/config"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()
const db = client.db("pizzahubDB")
const users = await db.collection("user").find({}).toArray()
console.log(users.map((u) => `${u.email} (${u.role})`).join("\n"))
const orders = await db.collection("orders").countDocuments()
console.log(`orders: ${orders}`)
await client.close()
