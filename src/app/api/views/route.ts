import { getRedisClient } from "@/lib/redis"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const redis = await getRedisClient()
    const now = Date.now()
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown"
    const ipKey = `viewed:${ip}`

    // time ranges
    const oneWeekAgo = now - 1000 * 60 * 60 * 24 * 7
    const oneMonthAgo = now - 1000 * 60 * 60 * 24 * 30
    const oneYearAgo = now - 1000 * 60 * 60 * 24 * 365

    // time set keys
    const zsetWeek = "views:week"
    const zsetMonth = "views:month"
    const zsetYear = "views:year"

    const alreadyViewed = await redis.get(ipKey)

    // checks if given IP is unique
    if (!alreadyViewed) {
      await redis.set(ipKey, "1", { EX: 60 * 15 })
      await redis.incr("site:views")

      // adds IP to the time sets
      await redis.zAdd(zsetWeek, { score: now, value: ip })
      await redis.zAdd(zsetMonth, { score: now, value: ip })
      await redis.zAdd(zsetYear, { score: now, value: ip })

      // updates online-users
      await redis.sAdd("online-users", ip)
      await redis.expire("online-users", 60 * 15)
    }

    // clean up old entries
    await Promise.all([
      redis.zRemRangeByScore(zsetWeek, 0, oneWeekAgo),
      redis.zRemRangeByScore(zsetMonth, 0, oneMonthAgo),
      redis.zRemRangeByScore(zsetYear, 0, oneYearAgo)
    ])


    // get unique stats
    const [week, month, year, total, online] = await Promise.all([
      redis.zCard(zsetWeek),
      redis.zCard(zsetMonth),
      redis.zCard(zsetYear),
      redis.get("site:views"),
      redis.sCard("online-users")
    ])

    return NextResponse.json({
      week,
      month,
      year,
      total: Number(total || 0),
      online
    })

  } catch (err) {
    console.error("stats.error.redis:", err)
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    )
  }
}
