import express from "express"
import dotenv from "dotenv"
import axios from "axios"
const app = express();
app.use(express.json())
dotenv.config({
    path: './.env'
})

const headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

app.get('/github/', async(req,res)=>{
    try {
        const userResponse = await axios.get(`${process.env.GITHUB_API_URL}/users/${process.env.GITHUB_USERNAME}`, { headers });
        const reposResponse = await axios.get(`${process.env.GITHUB_API_URL}/users/${process.env.GITHUB_USERNAME}/repos`, { headers });
        res.status(200).json({
          username: userResponse.data.login,
          followers: userResponse.data.followers,
          following: userResponse.data.following,
          repositories: reposResponse.data.map(repo => ({
            name: repo.name,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
          })),
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

app.get('/github/:repoName', async(req,res)=>{
  try {
    const { repoName } = req.params
    const userResponse = await axios.get(`${process.env.GITHUB_API_URL}/repos/${process.env.GITHUB_USERNAME}/${repoName}`, { headers });
    res.status(200).json(userResponse.data)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})

app.post("/github/:repoName/issues", async (req, res) => {
  
  const { repoName } = req.params;
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: "Title and body are required." });

  try {
    const issueResponse = await axios.post(
      `${process.env.GITHUB_API_URL}/repos/${process.env.GITHUB_USERNAME}/${repoName}/issues`,
      { title, body },
      { headers }
    );
    res.status(200).json({ response: issueResponse.data.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 9000, ()=>{
    console.log(`server is listening on ${process.env.PORT}`)
})

