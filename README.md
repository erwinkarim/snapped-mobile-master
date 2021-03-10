# snapped_mobile

## Project details

Backend: [snapped-system (Laravel)](https://gitlab.com/boneyboneventures/snapped/snapped-system)
Deployment: [Vercel](https://vercel.com/bbv)

## Project setup
```
npm install
```

### Environment variables (.env)
```
NODE_ENV=
VUE_APP_URL=
VUE_APP_TITLE=
VUE_APP_BACKEND_ENDPOINT=
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
npm run build:styles
```

### Implementing integration with Google Classroom.

#### Implementing integration with Google Classroom.


1) Get an OAuth client ID from Google Developers Console

```
Redirect URI: {frontend_domain}/auth/google/callback
```

2) Update backend's .env with values from Google oAuth Client generated

```
GOOGLE_APP_ID={ App ID }
GOOGLE_CLIENT_ID={ Client ID }
GOOGLE_CLIENT_SECRET={ Client secret }
GOOGLE_REDIRECT={frontend_domain}/auth/google/callback
```
