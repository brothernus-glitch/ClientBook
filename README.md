# Yummy Layers Client Book: setup

1. Put this folder on GitHub (or use the Netlify CLI: `npm i -g netlify-cli`, then `netlify deploy --prod`).
2. On Netlify: Add new site, Import from Git, pick the repo. Build settings are read from netlify.toml.
3. Site settings, Environment variables: add `SYNC_PASSCODE` with a passcode of your choice, then redeploy.
   On each phone open the site, tap Sync, enter that passcode. Records now stay in step on all phones.
4. Optional, Google Drive backup: in Google Cloud Console create a project, enable the Google Drive API,
   create an OAuth Client ID (type Web application) and add your Netlify URL under Authorized JavaScript origins.
   Paste the Client ID into public/config.js and redeploy.
5. Install: Android Chrome shows "Install app" (or menu, Add to Home screen). On iPhone use Safari, Share, Add to Home Screen.
