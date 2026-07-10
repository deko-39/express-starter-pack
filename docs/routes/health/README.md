# Health Route

## Base Path

`/api/v1/health`

## Endpoint

### `GET /api/v1/health`

Returns a simple uptime-style response that can be used by load balancers, Docker health checks, or orchestration probes.

Example response:

```json
{
  "status": "ok",
  "timestamp": "2026-07-10T10:00:00.000Z"
}
```

## Source

- `src/routes/index.ts`
