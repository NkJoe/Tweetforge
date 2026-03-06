const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// AI Service Configuration
const AI_API_KEY = process.env.AI_API_KEY || 'sk-proj-dummy-key';
const AI_MODEL = 'claude-3-5-sonnet-20241022';

// Generate tweets endpoint
app.post('/api/generate-tweets', async (req, res) => {
    try {
        const { idea, style } = req.body;

        if (!idea || idea.trim().length === 0) {
            return res.status(400).json({ error: 'Idea is required' });
        }

        const systemPrompt = `You are an expert social media strategist who writes viral tweets.
Your goal is to convert user ideas into 5 tweet variations optimized for X (Twitter).

CRITICAL RULES:
- Maximum 280 characters per tweet (STRICT LIMIT)
- Start with a strong hook to grab attention
- Encourage engagement (questions, calls-to-action, curiosity)
- Use clear formatting with short lines and line breaks
- Avoid corporate or robotic tone
- Sound authentic, natural, and conversational
- Include 1-2 hashtags when appropriate
- Each tweet must be unique and different in style/approach
- Always respond with EXACTLY 5 tweets, one per line
- Do NOT include any explanations, numbering, or preamble
- Do NOT include "Tweet 1:", "1.", or similar labels

Format your response as exactly 5 tweets, each on a new line.`;

        const userPrompt = `User Idea: "${idea}"
Tweet Style: ${style}

Generate 5 unique tweet variations following the rules above.`;

        // Call Claude API
        const response = await axios.post(
            'https://api.anthropic.com/v1/messages/claude-3-5-sonnet-20241022',
            {
                model: AI_MODEL,
                max_tokens: 1000,
                system: systemPrompt,
                messages: [
                    {
                        role: 'user',
                        content: userPrompt
                    }
                ]
            },
            {
                headers: {
                    'x-api-key': AI_API_KEY,
                    'anthropic-version': '2023-06-01',
                    'content-type': 'application/json'
                }
            }
        );

        // Parse response
        const responseText = response.data.content[0].text;
        let tweets = responseText
            .split('\n')
            .map(tweet => tweet.trim())
            .filter(tweet => tweet.length > 0)
            .filter(tweet => !tweet.match(/^(Tweet\s+\d+:|[\d.]\s+)/))
            .slice(0, 5);

        // Ensure we have 5 tweets
        if (tweets.length < 5) {
            tweets = tweets.concat(Array(5 - tweets.length).fill('Check out this amazing idea!'));
        }

        // Truncate tweets over 280 characters
        tweets = tweets.map(tweet => {
            if (tweet.length > 280) {
                return tweet.substring(0, 277) + '...';
            }
            return tweet;
        });

        res.json({
            success: true,
            tweets: tweets.slice(0, 5),
            idea: idea,
            style: style
        });

    } catch (error) {
        console.error('Error generating tweets:', error.response?.data || error.message);
        
        // Return fallback tweets for demo
        const fallbackTweets = [
            `${req.body.idea} - and it's changing everything. 🚀`,
            `Just built something amazing: ${req.body.idea}. Who else sees the potential? 👀`,
            `The future is here: ${req.body.idea} 💡 #BuildInPublic`,
            `Why ${req.body.idea}? Because it matters. And you should care about this. ✨`,
            `Excited to share: ${req.body.idea} - let's go. 🔥 #Innovation`
        ];

        res.json({
            success: true,
            tweets: fallbackTweets.slice(0, 5),
            idea: req.body.idea,
            style: req.body.style,
            fallback: true
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'TweetForge API' });
});

// Start server
app.listen(PORT, () => {
    console.log(`TweetForge API running on http://localhost:${PORT}`);
    console.log('API Key configured:', !!process.env.AI_API_KEY);
});