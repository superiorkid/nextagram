# Nextagram - Instagram Clone

Built with the Next.js App Router, Typescript and Tailwind

### Features

- Authentication using Discord & Credentials with email validation
- Infinite scroll for dynamic loading posts
- Follow & unfollow user with optimistic update UI
- Like & dislike post with optimistic update UI
- Full comment functionality
- Create new post & story for authentication users
- Image upload and image preview
- Server action
- Better SEO (_i think so_)
- ... and much more

### Getting Started

To get started with this project, run

```shell
git clone https://github.com/superiorkid/nextagram
```

install packages

```shell
pnpm install
```

and copying these .env.example variables into separate .env file:

```dotenv
DATABASE_URL=
NEXTAUTH_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
NODEMAILER_PW=
NODEMAILER_EMAIL=
```

setup prisma

```shell
pnpx prisma db push
```

start the app

```shell
pnpm run dev
```

and that's all you need to get started!
