# 🎬 toWatch — Movie Discovery App

**toWatch** is a responsive and beautifully styled movie discovery app built with React, Tailwind CSS, Vite, and Appwrite. It lets users search for movies, view trending content, and explore detailed movie info — powered by the TMDB API and backed by a custom Appwrite database for tracking trending searches.

---

## 🚀 Features

- 🔍 **Live Movie Search** — Instantly find movies using the TMDB API with debounce optimization
- 📈 **Trending Tracker** — Top 5 trending movies based on user search history stored in Appwrite
- 🎥 **Movie Details View** — See language, rating, year, and overview in a clean layout
- 🧾 **Appwrite Integration** — Search terms and movie metadata saved and ranked in a cloud database
- 🌐 **Responsive Design** — Fully mobile-friendly with modern Tailwind CSS utility classes

---

## 🛠 Tech Stack

| Tech         | Description                     |
| ------------ | ------------------------------- |
| React        | Frontend UI framework           |
| Tailwind CSS | Utility-first styling           |
| Appwrite     | Backend-as-a-service (database) |
| TMDB API     | Movie metadata provider         |
| Vite         | Lightning-fast development tool |

---

## ⚙️ Local Development Setup

### 1. 📦 Clone the Repo

```bash
git clone https://github.com/your-username/toWatch.git
cd toWatch
2. 📦 Install Dependencies
bash
Copy
Edit
npm install
🔐 Environment Variables
Create a .env file in the root of the project:

env
Copy
Edit
VITE_TMBD_API_KEY=your_tmdb_api_key_here
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
🔑 Get your TMDB API key from: https://www.themoviedb.org/settings/api

☁️ Appwrite Setup Instructions
1. 🔧 Create an Appwrite Project
Go to https://cloud.appwrite.io (or self-host Appwrite)

Click New Project → give it a name (e.g., MovieSearch)

Save your Project ID (VITE_APPWRITE_PROJECT_ID)

2. 🗃 Create a Database
Inside the project, go to Database tab → Create database

Name: MoviesDB or similar

Save the Database ID (VITE_APPWRITE_DATABASE_ID)

3. 📂 Create a Collection
Inside your DB, click Create Collection

Name: SearchHistory or similar

Save the Collection ID (VITE_APPWRITE_COLLECTION_ID)

✍️ Add Attributes (fields):
Field Name	Type	Required	Description
searchTerm	String	✅ Yes	The keyword the user searched for
count	Int	✅ Yes	How many times it’s been searched
movie_id	String	✅ Yes	TMDB movie ID
poster_url	String	✅ Yes	Image URL of the movie

After adding, click “Save” and Deploy the collection schema.

4. 🔑 API Access Permissions
To allow your frontend to access Appwrite:

Go to your collection → Settings

Under Permissions, set Create, Read, and Update to:

role:all
☑️ This makes your database open to public interaction — for production apps, you’d use secure auth rules instead.

🧪 Run the App
bash
Copy
Edit
npm run dev
Open in your browser:
http://localhost:5173

You’re all set! 🎉

```
