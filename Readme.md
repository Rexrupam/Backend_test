This project provides an API that connects to the GitHub API to retrieve user details, repository information, and create issues in repositories. The API is built using Express.js and utilizes Axios for making HTTP requests to GitHub.

Features

-Get GitHub user details, including followers and following count.

-Fetch information about a specific repository.

-Create an issue in a GitHub repository and return the issue URL.

Endpoints

1. Get GitHub User Information

Endpoint: GET /github


Description: Fetches details about the GitHub user, including username, followers, and following count.

2. Get Repository Details

Endpoint: GET /github/:repoName

Description: Fetches information about a specific GitHub repository owned by the user.

3. Create an Issue in a Repository

Endpoint: POST /github/:repoName/issues

Description: Creates a new issue in the specified repository and returns the issue URL.