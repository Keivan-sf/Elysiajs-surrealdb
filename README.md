# Elysiajs + Surrealdb sample

This is just me learning a fresh stack

To install dependencies:

```bash
bun install
```

Setup an `.env` like below

```
SURREAL_USER=
SURREAL_PASS=
# uri should have ws protocol, e.g: ws://0.0.0.0:8080
SURREAL_URI=
PORT=
```

Setup your database:

```bash
bun setup:db
```

To run:

```bash
bun start
```

You may now use `/book` with **CREATE** along side `/book/:hash` with **GET**,**DELETE**,**PATCH**
