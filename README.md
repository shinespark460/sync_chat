Synk — Real-Time Chat Application

A place where conversations breathe in real time — fast, fresh, and built with the precision of a dev who knows their craft. Synk isn’t just another chat app; it’s a space where messages sync like heartbeat pulses.

🚀 Purpose

Synk exists for one simple reason:
to make communication instant, clean, and damn smooth.
A lightweight chat system built for performance, developer sanity, and real real-time feels.

⚙️ Tech Stack

Frontend

React.js

Vite

Tailwind CSS

Zustand / Redux (whichever you’re using—tell me if I should fix this)

Axios

Lucide Icons

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Bcrypt

Multer / Cloudinary (if you’re using image upload)

Real-Time Layer

Socket.IO

Other

JWT-based auth

REST API

Deployed on (Vercel / Render / Railway) — tell me if you want this tailored.

🔥 Core Features
1. Real-Time Messaging

Messages sync instantly using Socket.IO — no delay, no cringe loading circle.

2. Typing Indicators

Know when the homie is crafting a message — the poetry of ellipses.

3. Online/Offline Presence

Green dot speaks louder than words.

4. Message Previews

Auto-detect URLs → fetch preview → show lightweight metadata card.

5. Image Uploads

Share moments, memes, screenshots with smooth upload + preview.

6. Chat Search

Find old messages like a detective scrolling through memories.

7. Message Seen Status

Because everyone wants to know if they’re being ignored or not.

8. User Authentication

JWT-powered login/signup + protected routes.

9. Mobile Responsive UI

Looks crisp on every screen — desktop, tablet, mobile.

10. Smooth UI Animations

Minimal, elegant transitions keeping the vibe intact.

📁 Folder Structure
/synk
│
├── /client
│   ├── /src
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── utils/
│   └── vite config, etc.
│
└── /server
    ├── /controllers
    ├── /models
    ├── /routes
    ├── /middlewares
    └── server.js

🛠️ How to Run Locally
Clone the repo
git clone https://github.com/your-username/synk.git
cd synk

Setup server
cd server
npm install
npm run dev

Setup client
cd client
npm install
npm run dev

🔗 Environment Variables

Your backend .env should include:

MONGO_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


Client .env:

VITE_SERVER_URL=http://localhost:5000

✨ Future Enhancements

Voice notes

Video calling (WebRTC)

Group chats

Message reactions

End-to-end encryption

Push notifications

🤝 Contributing

Pull requests? Always welcome.
Just keep the code clean, the vibes good, and the commit messages sane.

📜 License

MIT License — safe, open, yours.

💬 Final Words

Synk is built on the belief that real-time conversations should feel alive —
like a river flowing with emotion, speed, and clarity.
Keep building, keep syncing, and keep pushing the craft forward.
