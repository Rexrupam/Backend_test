import express from "express"
import dotenv from "dotenv"
import axios from "axios"
const app = express();

dotenv.config({
    path: './.env'
})

const headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

app.get('/github', async(req,res)=>{
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
        console.log(error)
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

app.listen(process.env.PORT || 9000, ()=>{
    console.log(`server is listening on ${process.env.PORT}`)
})

