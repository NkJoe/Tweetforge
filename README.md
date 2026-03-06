# TweetForge - AI-Powered Tweet Generator

TweetForge helps creators, founders, developers, and marketers turn simple ideas into engaging tweets optimized for X (Twitter). Using AI, the app generates multiple tweet variations designed to maximize engagement.

## ✨ Features

- **AI Tweet Generation** - Generates 5 unique tweet variations from any idea
- **Style Selection** - Choose from 5 tweet styles: Viral, Educational, Storytelling, Promotional, Build in Public
- **Character Counter** - Real-time character count for each tweet (280 character limit)
- **Copy to Clipboard** - One-click copying of generated tweets
- **Regenerate Tweets** - Create new variations with the same idea
- **Dark/Light Mode** - Toggle between themes
- **Save Favorites** - Star your best tweets for later reference
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Beautiful SaaS-style interface with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Claude API key (get one at https://console.anthropic.com)

### Setup

1. **Clone/Download the project** and navigate to the root directory

2. **Setup Backend API**
   ```bash
   cd backend
   npm install
   ```

3. **Configure API Key**
   - Copy `.env.example` to `.env`
   - Add your Claude API key: `AI_API_KEY=sk-proj-xxxxx`

4. **Start the Backend**
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:3000`

5. **Serve Frontend**
   - Open `index.html` in your browser, or
   - Use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node (http-server)
     npx http-server
     ```

6. **Access the App**
   - Navigate to `http://localhost:8000` (or your server port)

## 📋 How It Works

1. **Enter Your Idea** - Type or paste your tweet idea/topic
2. **Select Style** - Choose a tweet style (Viral, Educational, etc.)
3. **Generate** - Click "Generate Tweets" to create 5 variations
4. **Copy & Post** - Copy your favorite tweet and share on X
5. **Regenerate** - Create new variations anytime

## 🎨 Design Features

- **Modern Dark Theme** - Sleek slate/zinc dark surfaces
- **Smooth Animations** - Fade-in and slide effects
- **Card-Based Layout** - Clean, organized tweet display
- **High Contrast** - Easy-to-read text for accessibility
- **Responsive Grid** - Adapts to all screen sizes
- **Interactive Elements** - Hover effects and smooth transitions

## 🛠️ Tech Stack

### Frontend
- HTML5
- Vanilla JavaScript
- Tailwind CSS (CDN)
- Custom animations and styling

### Backend
- Node.js + Express
- Claude API (Anthropic)
- CORS enabled for cross-origin requests

## 📱 Project Structure

```
/
├── index.html              # Main frontend app
├── backend/
│   ├── server.js          # Express API server
│   ├── package.json       # Dependencies
│   └── .env.example       # Environment template
└── README.md              # This file
```

## 🔑 API Endpoints

### POST `/api/generate-tweets`
Generate tweet variations

**Request:**
```json
{
  "idea": "Your tweet idea here",
  "style": "viral"
}
```

**Response:**
```json
{
  "success": true,
  "tweets": [
    "Tweet 1...",
    "Tweet 2...",
    // ... 5 total tweets
  ],
  "idea": "Your tweet idea here",
  "style": "viral"
}
```

**Tweet Styles:** `viral`, `educational`, `storytelling`, `promotional`, `build-in-public`

### GET `/api/health`
Health check endpoint

## 💾 Local Storage

The app uses browser local storage for:
- **Favorites** - Starred tweets (`tweetForgeFavorites`)
- **Theme Preference** - Dark/light mode (`tweetForgeTheme`)

## 🎯 Tweet Generation Rules

Generated tweets follow these principles:
- ✅ Maximum 280 characters (strict limit)
- ✅ Strong hook to grab attention
- ✅ Encourages engagement
- ✅ Clear formatting with line breaks
- ✅ Authentic, natural tone
- ✅ 1-2 relevant hashtags
- ✅ Unique and diverse variations

## 🌐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
AI_API_KEY=sk-proj-your-api-key-here
PORT=3000
```

## 📝 Example Usage

1. Enter idea: "I built an AI tool that writes tweets"
2. Select style: "Build in Public"
3. Generate tweets
4. Get 5 variations like:
   - "Just launched an AI tweet writer... and it's wild 🚀"
   - "Spent 3 months building this. Here's my AI that writes tweets ✨"
   - etc.

## 🔧 Troubleshooting

**Backend won't connect:**
- Ensure backend is running on `http://localhost:3000`
- Check API key is set correctly in `.env`
- Verify CORS is enabled

**Tweets not generating:**
- Check Claude API key is valid
- Ensure backend logs show successful requests
- Try regenerating with a different idea

**Characters showing as incorrect:**
- JavaScript counts are accurate to Twitter's algorithm
- Emojis count as 2 characters

## 📄 License

MIT

## 🤝 Support

For issues or feedback, please create an issue in the repository.

---

**TweetForge** - Turn Ideas Into Viral Tweets ⚡