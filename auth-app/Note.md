# Note

- nextJS is a file based routing system. Based on React

# Tech Stack
- NextJS
- online mongodb
- mailtrap


# Pages
- signIn
- Login
    - reset
    - verify
- profile

# Libs
- axios
- bcryptjs: to encrypting password, create token

# theory
## source structure
- Src
    - App
        - API
            - backend
            - route
        - frontend
            - page
    - Models
    - helpers
        - verify JWT tokens
        - email service
    - middleware
    - components
    - ...


# Set up projects
## frontend part: create page route
### basic page
1. create app/your-route
2. create app/your-route/page.tsx

### dynamic params route
1. create app/your-route/[paramName]/page.tsx, eg: app/profile/[id]/page/tsx;
2. to get params. destruct {params} from arguments that passed to Component, then get it by params.paramName;




## backend part: create api route
1. create app/api/your-api-route
2. create app/api/your-api-route/route.ts

## connect to mongoDB


## dataBase
- dbConfig.ts: connecting mongoDB with Mongoose


# Creating Page Logic
## make front-end pages
- 'use client' to create client-side component;
