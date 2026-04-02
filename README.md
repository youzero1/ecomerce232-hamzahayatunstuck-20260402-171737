# ShopNext - E-Commerce App

A full-featured e-commerce application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Features

- 🛍️ **Product Catalog** - Browse products with filtering, sorting, and search
- 🛒 **Shopping Cart** - Add/remove items, update quantities, persistent sidebar cart
- 💳 **Checkout Flow** - Multi-step checkout with shipping and payment forms
- 📱 **Responsive Design** - Mobile-first, works on all screen sizes
- ⚡ **Fast Performance** - Built with Next.js App Router and optimized images
- 🎨 **Modern UI** - Clean design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Docker

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t shopnext .

# Run the container
docker run -p 3000:3000 shopnext
```

### Docker Compose

```bash
docker-compose up --build
```

## Project Structure

```
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose config
├── public/                 # Static assets
│   ├── placeholder.svg
│   ├── logo.svg
│   └── hero-banner.svg
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Home page
│   │   ├── products/       # Products listing & detail
│   │   ├── cart/           # Cart page
│   │   └── checkout/       # Checkout flow
│   ├── components/         # Reusable components
│   ├── context/            # React Context (Cart)
│   ├── data/               # Mock product data
│   └── types/              # TypeScript types
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, categories, featured products |
| `/products` | Product listing with filters & search |
| `/products/[id]` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout |
