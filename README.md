# ❤️ HeartLink

HeartLink is a simple yet powerful **full-stack social media application** built to help you stay connected with family and friends.  
Users can share posts, like, comment, and follow each other — keeping relationships strong and communication easy.

---

## ✨ Features

- 👤 **User Accounts**
  - Create, update, and delete accounts  
  - Follow/unfollow other users  

- 📝 **Posts**
  - Create, edit, and delete posts  
  - View posts from all users in a feed  
  - Like and comment on posts  

- 🌐 **Social Interactions**
  - Follow friends and family to see their content  
  - Stay connected through comments and likes  

---

## 🛠️ Tech Stack

**Frontend**  
- ⚛️ React  
- 🎨 Tailwind CSS  
- ⚡ Vite  

**Backend**  
- 🟩 Node.js  
- 🌐 Express.js  
- 🍃 MongoDB (for database)  
- ☁️ Cloudinary (for media storage)  

---

## 🚀 Getting Started

Follow these steps to set up HeartLink locally:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/heartlink.git
cd heartlink
```

### 2. Install Dependencies

- Frontend
```bash
cd client
npm install
```

- Backend
```bash
cd server
npm install
```

### 3. Set up environment variables
Create a .env file inside the server folder and add:

```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

### 4. Run the Application
- Start backend Server
```bash
cd server
npm run dev
```

- Start frontend
```bash
cd client
npm run dev
```

### 5. Open in Browser

```
http://localhost:5173
```

---

## 📂 Project Structure

```
heartlink/
│
├── client/            
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── src/
│
├── server/            
│   ├── models/
│   ├── routes/
│   ├── controllers/
|   ├── config/
│   ├── utils/
│   └── middlewares/
│
└── README.md
```

---

## 💡 Future Improvements

- Real-time notifications
- Direct messaging
- Light Mode

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo, open an issue, or submit a pull request.


