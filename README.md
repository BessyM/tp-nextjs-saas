This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

**IMPORTANT:** This project uses **Neon** (remote PostgreSQL database). You need the DATABASE_URL from the project owner. Edit `.env.local`:
```
DATABASE_URL=postgresql://neondb_owner:password@ep-xxxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Configuration Gmail pour Nodemailer
GMAIL_USER=votre-email@gmail.com
GMAIL_APP_PASSWORD=votre-mot-de-passe-application

# Email sender info
EMAIL_FROM=votre-email@gmail.com
EMAIL_FROM_NAME=Nom de votre application
```

**Configuration Gmail App Password :**

Le projet utilise un **mot de passe d'application Gmail** (App Password) pour envoyer des emails via Nodemailer.

Si vous devez créer un nouveau mot de passe d'application :

1. **Activer la validation en 2 étapes** sur votre compte Google (obligatoire)
   - Allez sur [Compte Google](https://myaccount.google.com/security)
   - Activez la "Validation en deux étapes"

2. **Créer un mot de passe d'application** :
   - Allez sur [App Passwords](https://myaccount.google.com/apppasswords)
   - Sélectionnez "Autre (nom personnalisé)" dans le menu déroulant
   - Entrez "NextJS App" ou un nom de votre choix
   - Cliquez sur "Générer"
   - Copiez le mot de passe généré (16 caractères, format: xxxx xxxx xxxx xxxx)
   - Utilisez ce mot de passe comme valeur de `GMAIL_APP_PASSWORD`

**Note :** Retirez les espaces du mot de passe avant de l'ajouter dans `.env.local` (exemple: `apbybyjwanjgauqq`)

**💡 Ask the project owner for the DATABASE_URL connection string** - it's required to connect to the shared database.

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Database Migrations
```bash
npx prisma migrate deploy
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Troubleshooting

### Error: "can't reach database server at prisma"
**This means the database connection failed.** Check:
1. ✅ `.env.local` file exists with the correct DATABASE_URL
2. ✅ Neon database is accessible (check network/firewall)
3. ✅ DATABASE_URL starts with `postgresql://neondb_owner:` and ends with `?sslmode=require`
4. ✅ SSL certificates are properly configured (Neon requires SSL)
5. ✅ Run `npx prisma generate` to create the Prisma client
6. ✅ Run `npx prisma migrate deploy` to apply schema

### Error: "Database does not exist"
Run Prisma migrations to create tables:
```bash
npx prisma migrate deploy
```

### Neon Connection Issues
If you're having connection issues with Neon:
1. Make sure the DATABASE_URL is correct from your Neon dashboard
2. Check that Neon IP allowlist permits your location
3. Ensure SSL mode is set to `require` (already in the URL)

## Getting Started (Original)

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
