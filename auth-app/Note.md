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

# Create API
in app/api/users/signUp/route.ts, write RESTFUL API method.

# SignIn page
- api/user/signin/route

# Logout function
- to log out, can simply clear the cookie, like set it to "" or expires: new Date(0)

# conclusion 
## set up the project:
DB part: 
- set up connection config, and implement a common connect method.
- defined model schema with mongoose, provide it to backend logic to use.

frontend Part:  
- write UI in app/your-route/page.tsx
- add 'use client': maybe ssr page don't need this, check document later.
- call api by api route with axios or fetch, whatever you like.
- switch page route by `useRouter` provided by `next/navigator`

backend Part: 
- connect to the db instance by a util method, in this case, `dbConfig`.
- write restful API in app/api/xxx/route.ts
- `NextRequest`, `NextResponse` provided by "next/server" is handy.
- CRUD with database by defined models provided by mongoose.

## User Auth

