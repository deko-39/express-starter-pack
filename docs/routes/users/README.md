# Users Route

## Base Path

`/api/v1/users`

## Endpoints

### `GET /api/v1/users`

Returns a placeholder response indicating the user listing endpoint is wired.

Example response:

```json
{
  "message": "List users endpoint is ready."
}
```

### `GET /api/v1/users/:id`

Returns a placeholder response for a single user lookup.

Example response:

```json
{
  "message": "Get user by id endpoint is ready.",
  "data": {
    "id": "123"
  }
}
```

### `GET /api/v1/users/:id/profile`

Returns a placeholder user profile payload. Throws an application error if the route param is missing.

Example response:

```json
{
  "message": "Get user profile endpoint is ready.",
  "data": {
    "id": "123",
    "profileComplete": false
  }
}
```

### `POST /api/v1/users`

Echoes the submitted body in a placeholder create response.

### `PATCH /api/v1/users/:id`

Echoes the submitted body in a placeholder update response.

### `DELETE /api/v1/users/:id`

Returns `204 No Content`.

## Source

- `src/routes/user/index.ts`
