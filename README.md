# Resume Parser AI - Frontend Only

This is a frontend-only Resume Parser AI mini project. It does not need Python, Streamlit, Flask, Node, or any backend server.

The app runs entirely in the browser using:

- `index.html`
- `styles.css`
- `script.js`

## Features

- Paste resume text
- Select a target job role
- Analyze matching skills
- Show missing skills
- Predict the closest role
- Generate a resume score out of 10
- Display a recommendation

## Run Locally

Open `index.html` directly in a browser.

## Deploy On GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the repository root:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `.nojekyll`
   - `README.md`
3. Go to the repository on GitHub.
4. Open **Settings**.
5. Open **Pages**.
6. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ root**
7. Click **Save**.

After a minute, GitHub will publish the project at a link like:

```text
https://your-username.github.io/your-repository-name/
```

## Important

Keep `index.html` in the root folder. GitHub Pages automatically opens that file as the homepage.
