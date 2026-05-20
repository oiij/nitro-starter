import { useRedis } from './redis'

export const onlineCache = useRedis('online', 3000)
