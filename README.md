# Nextagram - Instagram Clone

Built with the Next.js App Router, Typescript and Tailwind

![auth page](https://res.cloudinary.com/dho3hwjzn/image/upload/v1698882683/nextagram/tsv01fdpw3ffjelgtjbh.png "Authentication page")
![main page](https://res.cloudinary.com/dho3hwjzn/image/upload/v1698882685/nextagram/ppgincnd5dsd8xa9yqpp.png "Main page")
![explore page](https://res.cloudinary.com/dho3hwjzn/image/upload/v1698882688/nextagram/mgj5duhws1gru7q2spso.png "Explore page")

### Features

- Authentication using Discord & Credentials with email validation
- Follow & unfollow user with optimistic update UI
- Like & dislike post with optimistic update UI
- Full comment functionality
- Create new post & story for authentication users
- Image upload and preview
- Data fetching using server action
- Better SEO (_i think so_)
- ... and much more

### TODO

- Infinite scroll for dynamic loading posts
- Nested comment
- Responsive design
- ...

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
