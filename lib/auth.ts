import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db("pizzahubDB")

export const auth = betterAuth({
  plugins: [jwt()],
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  // Google must live inside "socialProviders"
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // Extra fields saved on every user, matching your database design
  user: {
    additionalFields: {
      // input: true  -> the sign-up form is allowed to send this field
      // input: false -> the client can never set it (only the server can)
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true,
      },
      businessName: { type: "string", required: false, input: true },
      isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      subscriptionPlan: {
        type: "string",
        required: false,
        defaultValue: "free",
        input: false,
      },
      subscriptionExpiresAt: { type: "date", required: false, input: false },
    },
  },

  // Runs just before a new user is saved
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Only "vendor" is kept. Anything else (including "admin") becomes "customer".
          const role = user.role === "vendor" ? "vendor" : "customer"
          return { data: { ...user, role } }
        },
      },
    },
  },
})
