# Tends 🍕

Tends is what I'm calling a *selfish* project, or a project that is being developed for my own sake. My vision for Tends is for it to help users manage "quantities" in their lives (i.e. daily calories, screen time, exercise time, etc.). 

This project is being built alongside a number of other projects from other members of the egghead.io Portfolio Project Club. The goal for this club is to develop a subscription-based SaaS using (mostly) similar tech stacks. The stack I've chosen to use is Next.js (and React) for the frontend, Stripe for handling payments, and Firebase for handling authentication. Also, at a lower level, this project employs TypeScript and Tailwind.

As a group, we've all committed to follow the [Readme Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html) methodology. This readme aims to lay out what Tends will do and how. The section that immediately follows this one contains information about the development process and is kept up to date.

## Development Notes 📱

The first step in this development process was to formulate my visions for this project in this readme.

I was still struggling to imagine how this website would operate, so I hopped onto Figma to visualize each component. This step was very helpful for me in the process of figuring out what pieces to prioritize.

After getting an idea about the general layout and style of my project, I started a new project, installed and configured Next.js, Tailwind, and TypeScript, and began to develop the necessary components. It is worth noting that, because I aim to grow comfortable with TypeScript, I have configured it with the `strict` and `strictNullChecks` settings. 

I started out by styling a basic container for all the tends, then I moved to styling the basic quantity tend. I only used CSS Grid and Flexbox for positioning, and I am thrilled with the results. In fact, I am convinced that there is little need for any forms of layout. Furthermore, I was able to quickly and easily implement Grid, Flexbox, and responsive design with Tailwind.

Throughout this process, I implemented the necessary props and state that the component would need to function. At this point, the functionality was limited to adding and removing a quantity from the tend.

Once I was happy with the tend, I moved on to developing the "Create Tend" form. I started out by reading into `Formik` and `react-hook-form`, but I ended up just using my own form management. Again, I used the combination of CSS Grid, Flexbox, and Tailwind to style this form and make it responsive.

I then needed a way to pass the form data back to the index page from the form, so I decided to use the opportunity to learn about React Context. I created a `TendsContext` that provides all components in `App` with a list of the user's tends. I imagine that this implementation may have to change once authentication is implemented, but this is sufficient until then.

The next step was to implement my Firebase backend. Following the React 2025 tutorial, I was able to do this easily. Furthermore, because I had learned about React context to share the list of tends throughout my application, I was familiar with how it is implemented in the React 2025 course.

However, when it came time to set up the API, I realized that I did not need context to provide the list of user tends to all components because the API provides that. Thus, I removed all implementation of `TendsContext` in my code. To fetch information from the API, I'm using SWR.

## Inspiration ✨

My inspiration for this project came from a recent interest in taking control of my life. I want to become both efficient and healthy, and I've come to realize that these qualities are *trained over time*. One doesn't suddenly become efficient or healthy. Instead, one must work those qualities into their lives through consistent practice. The goal for Tends is for it to be a simple tool that people (like me) can use to make sure that they are headed in the right direction. 

## Functionality 🎰

### Core ⚛️

Tends at its core allows users to create a list of tendencies (or "tends") that they want to monitor. Essentially, each tend will be an element in a list. I'm imagining a list with a "+" button at the bottom that, when pressed, causes a form to pop up that allows the user to add a tend. Each tend will store quantities relating to what the user wants to monitor.

### Tend Types 👑
These tends will be highly customizable with *types*. Currently, I am certain that I want to implement a basic *count* type that stores and displays a quantity and a *timer* type that stores and displays time active/remaining. 

I'm also considering implementing *subtypes* that are specific to what the user wants to monitor (i.e. a calorie subtype on a count tend would let the user view their BMR for comparision and perhaps even let the user search calorie counts for foods). Perhaps these subtypes will only be available to premium members.

### Resets 🔁
The quantity stored in a tend will be reset automatically at a time designated by the user. By "reset", I mean that the quantity displayed to the user will be return to a default value, and whatever quantity was stored in the tend at that time will be saved. For example, a user could create a "daily calorie count" tend and choose to have it reset every day. Or perhaps the user wants to keep track of the number of pages that she reads in a week, so she could choose to have the quantity reset weekly. 

A tend like the "intermittent fasting timer" would reset when the user is finished with whatever they were timing. This would be an example of a tend that needs to be reset manually. These tends will have a clear "end timer" button that, when pressed, will allow the user to change the end time if they need to and submit.

### Tend Creation 🔨

When the "+" button is pressed at the bottom of the tend list, a form will appear that will allow the user to customize the tend that they make. Customization options include types, subtypes, title, units, and when the tend resets.

### Trends 📈

When a tend is clicked, I would like to display its trends (yes, tends have trends). These are statistics about the tend that make it clear to the user whether they are headed in the right direction to achieve their goal. Perhaps the trend is displayed as a simple as a line chart, but maybe I will have a chance to use some of my statistics skills here!

These trends could also be unique for subtypes. For a tend with an "intermittent fasting" subtype, a flat bar could run horizontally across the chart to show where the fasting goal was or wasn't met. A similar thing could be implemented for a calorie count subtype. This is another potential area for premium content to exist.

The trends tab will also contain helpful statistics like the number of entries, averages, max, and min.

### Plans 📝

Plans have the potential to act as premium content. Plans would allow users to input extensive information about themselves in order to develop a plan to reach a goal. 

### Tends Content 🌃

Premium members could also gain access to a library of video content. The topics of this video content might include health, fitness, motivation, productivity, and psychology. Ideally, we would have experts discussing their expertise.

### Tends Teams 👥

Tends Teams would allow teams to collaborate on managing their tends. This is not something that I plan to implement anytime soon, but it has a lot of potential to be premium content.

# Create Next App Information

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
