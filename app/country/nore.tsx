// 2. What are API Routes?

// Next.js lets you create backend endpoints inside your project without setting up a separate server (like Express or Django).

//     By placing files within the /pages/api directory (for the Pages Router) or /app/api directory (for the App Router), each file automatically becomes an API endpoint.
//     These files contain server-side code that can handle various HTTP methods (GET, POST, PUT, DELETE, etc.) and perform tasks like fetching data, interacting with databases, or handling form submissions.
//     When deployed to platforms like Vercel, these API routes are often treated as serverless functions, meaning they scale automatically and only run in response to requests.