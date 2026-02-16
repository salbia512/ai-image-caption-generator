# AI-Based Image Caption Generator

An AI-powered web application that generates high-quality social media captions from uploaded images.
Built with Next.js App Router, TypeScript, and Google Gemini Vision API.

This project combines computer vision and generative AI to produce captions in different tones such as professional or funny.

---

## Features

* Image upload with drag-and-drop support
* AI-generated captions using Google Gemini Vision
* Tone selection (professional, funny, etc.)
* Copy-to-clipboard functionality
* Animated modern UI
* Responsive layout
* Secure server-side API handling
* Environment variable protection
* Production-ready error handling

---

## Tech Stack

Frontend:

* Next.js (App Router)
* TypeScript
* Bootstrap 5 

Backend:

* Next.js Route Handlers
* Google Gemini API (Vision + Text generation)

Other:

* Environment Variables (.env.local)
* Server-side image base64 conversion

---

## Project Structure

```
src/
 ├── app/
 │    ├── api/
 │    │    └── caption/route.ts
 │    ├── page.tsx
 │    ├── layout.tsx
 │    └── globals.css
 ├── components/
 │    ├── ImageUploader.tsx
```

---

## How It Works

1. User uploads an image.
2. Image is sent to a secure API route.
3. The server converts the image to Base64.
4. The Gemini Vision model analyzes the image.
5. A structured prompt generates a caption.
6. The caption is returned and displayed in the UI.

All AI calls are executed on the server to protect the API key.

---

## Installation

Clone the repository:

```
git clone https://github.com/your-username/ai-image-caption-generator.git
cd ai-image-caption-generator
```

Install dependencies:

```
npm install
```

Create a `.env.local` file:

```
GEMINI_API_KEY=your_api_key_here
```

Run the development server:

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Screenshots

### Home Interface

![Home](screenshots/home.png)

### Generated Caption Result

![Caption Result](screenshots/caption-result.png)

### Mobile View

![Mobile](screenshots/mobile-view.png)

---


## What This Project Demonstrates

* Next.js App Router architecture
* Secure server-side AI integration
* Image processing with Base64 conversion
* Prompt engineering for structured AI output
* UI/UX design with Bootstrap and animations
* Production-ready error handling

---

## Future Improvements

* Multi-language caption generation
* Download caption as image
* Caption history
* Social media auto-share integration
* User authentication

---

## License

This project is for educational and portfolio purposes.
