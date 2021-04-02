# How I Built My First SaaS Application

As my high school experience abruptly ended in the wake of COVID-19, I quickly transitioned from being a busy high school senior to spending my days feeling unfulfilled as I was stuck inside. Eventually, restlessness motivated me to take advantage of the free time that I had been granted. Instead of burning through hours by staring at the ceiling, I decided to focus on developing the habits that I had always desired. 

In pursuit of control over my habits, I found myself always keeping track of several quantities at once: calories consumed, pages read, hours fasted, etc. Furthermore, I'd always be managing different quantities in different locations: one app for timing my fasts, another app for storing calories consumed, the 'Notes' app for tracking the number of pages I had read... While this was not a major inconvenience, I couldn't help but imagine a central dashboard for managing all of my quantities. 

Fast-forward: I'm halfway through the winter term at my university where my courseload is relatively light and many COVID restrictions are still in place. I get a notification from the egghead.io Discord server advertising a club for web developers of varying skill levels. The goal for this club is to have each member develop individual SaaS applications using similar tech stacks. I was hooked; I had spent the summer learning React, Next.js, Tailwind, and Typescript, and it looked like I would finally have the opportunity to apply that knowledge.

What would I develop? A central dashboard for those who, like me, are looking to keep track of their habits. This dashboard would display widgets called "tends" (short for tendencies) that could be customized by the user according to what habit the user was looking to keep track of. Furthermore, my application would display trends for each tend so that the user knows whether they are headed in the right direction with their habit building.

Here's how I've worked to bring that idea to life.

## Design

As members of this Portfolio Project Club, we each committed to following the [Readme Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html) methodology. The first step of writing a Readme file before doing any coding seemed too simple to be effective, but it ended up being incredibly useful as, otherwise, I would have been trying to store all the information about implementation and functionality in my head.

The step that naturally followed for me was to hop into Figma and start designing the layout of the application based on the functionality described in the Readme. The Readme acted as a space for me to spill all of my ideas onto, but, because I didn't expect to implement all of those features within the timespan set by the club, I really only wanted to use Figma to design the application's foundation.

![My Initial Figma Design](img/figma.png)

## Getting Started With Implementation

With the functionality and visuals of my application already created, it was finally time for me to set up my project and begin implementing my ideas. I began by using [Create Next App](https://nextjs.org/docs/api-reference/create-next-app) to get started with Next.js, then configured TypeScript.

### TypeScript Configuration
```js
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
, "src/pages/trends/[tendId].js"  ],
  "exclude": [
    "node_modules"
  ],
}
```

Notice that I'm using `strict` and `strictNullChecks` in my TypeScript configuration. I really wanted this project to be an opportunity for me to become better with TypeScript, so I decided to challenge myself with strict mode.

To style my components according to my Figma design, I also added and configured Tailwind. Unlike TypeScript, Tailwind is a technology that I'm confident with, so it took me no time to implement a foundation for my application that I was satisfied with.

![Empty Tends List](img/empty-tends-list.png)

And with a tend:

![Parker Points Tend](img/parker-points-tend.png)

## Worries

While I felt confident in making the website look the way I wanted it to, I also felt a lingering sense of insecurity regarding the structure of my application. Firstly, I've never created something on the scale of what I had in mind for this project. My web development career has so far consisted of a lot of *learning* and not as much *doing* (unfortunately). Secondly, before this project, I've had little to no experience with implementing backend features. Thus, I couldn't help but worry about the components of my application needing to be majorly refactored when it came time to bring in the backend (as it turns out, this was not the case).

## Creating Tends with a Form

The next step in the process of implemention was to create a form that took in the information necessary to create a tend. I knew each tend would have a different "type" depending on the habit that was being tracked by the user, and, for the first iteration of this application, I had only planned on two options for tend type: quantity and timer. The creation of a quantity tend would take in an intital quantity, a target quantity, and the units of the quantity (i.e. calories), and the creation of a timer tend would take in the target hours and minutes for the timer. Thus, the inputs of the tend creation form needed to be dependent on the type selected by the user. 

I am aware of the existence of libraries that make managing forms easier in React, but I decided to implement this form without those libraries. Perhaps,as I expand the types of tends available to the user, I will refactor the form code to use one of those libraries.

### Create Tend Form Component Structure
```jsx
...

export default function CreateTendForm() {

    ...

    const [type, setType] = useState("");

    ...

    return (
        <div>
            ...

            <form
                className="grid grid-cols-8 p-4 gap-x-4 md:gap-x-8"
                autoComplete="off"
                onSubmit={(e) => handleSubmit(e)}
            >
                ...

                {/* Select the Tend Type */}
                <select
                    name="type"
                    className="mb-3 col-span-8 md:col-span-2"
                    id="type"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    required
                >
                    <option value="">-- Pick a Tend Type --</option>
                    <option value="quantity">Quantity</option>
                    <option value="timer">Timer</option>
                </select>
                
                {type === "quantity" && (
                    <div className="col-span-8 grid grid-cols-8 gap-x-4 sm:gap-x-8">
                        {/* Form content for quantity tend type */}
                        ...
                    </div>
                )}
                {type === "timer" && (
                    <div className="col-span-8 grid grid-cols-8 gap-x-4 sm:gap-x-8">
                        {/* Form content for timer tend type */}
                        ...
                    </div>
                )}
            </form>
        </div>
    );
}
```

Blank tend creation form:

![Create New Tend Blank](./img/create-new-tend-blank.png)

Tend creation form with "quantity" type selected:

![Create New Quantity Tend](./img/create-tend-form-quantity-empty.png)

## Backend

Now that I had created mediums for tend creation and display, I needed to store and fetch data. As previously mentioned, I have very little experience with backend development. However, [React2025](https://react2025.com/) made this process as painless as possible for me. The React2025 tutorial walks through building an application that stores feedback for a user's sites. My application aims to store data for a user's tends. At a high level of abstraction, my application is very similar to that which is created in the React2025 tutorial. Thus, I was able to implement the features from the React2025 tutorials with minor tweaks.

## Firebase

The first step to building out the backend was to set up Firebase.

### Firebase Initialization
```js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
}

export default firebase;
```

## Authentication

Setting up authentication with Firebase was easier than I could have ever imagined it would be. First, I enabled GitHub and Google as sign-in methods for my Firebase project. After some more configuration, the React Context Hook below is able to provide every component in the application with both user data and methods to sign-in and sign-out.

```js
import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
import { createUser } from "./db";

const authContext = createContext();
export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
    return useContext(authContext);
};
function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const handleUser = (rawUser) => {
    
    ...

    return {
        user,
        loading,
        signinWithGitHub,
        signinWithGoogle,
        signout,
    };
}
...
```

Now we can have the user sign in if they have not already done so.

```js
if (!auth.user) {
    return (
        <ContentContainer>
            <SignIn />
        </ContentContainer>
    );
}
```

Here's a functional skeleton of the `SignIn` component:

```jsx
export default function SignIn() {
    const auth = useAuth();
    ...
    return (
        <div>
            <button
                onClick={(e) => {
                    auth.signinWithGitHub();
                }}
            >
                Sign In with GitHub
            </button>
            <button
                onClick={(e) => {
                    auth.signinWithGoogle();
                }}
            >
                Sign In with Google
            </button>
        </div>
    );
}
```

And here's an example of user data in Firebase:

![User Data in Firebase](./img/quantity-trend-firebase.png)

## Creating, Reading, Updating, and Deleting from Firestore

In the above code, we `import { createUser } from "./db"`.

`db.js` holds all the functions that the application uses to create, update, and delete data from Firestore.

### A Snippet from db.js
```js
export function createUser(uid, data) {
    return firestore
        .collection("users")
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
}

export function createTend(data) {
    const tend = firestore.collection('tends').doc();
    tend.set(data)
    return tend;
}

export function updateTendQuantity(id, newQuantity) {
    return firestore.collection("tends").doc(id).update({ quantity: newQuantity })
}

...
```

From `db.js`, I could import these functions into a component and then call them within the component.

To read data from Firestore, I needed to host that data on API routes that my components could then fetch from. 

### Get User Tends API Route
```js
import { getUserTends } from "../../lib/db-admin";
import { auth } from "../../lib/firebase-admin";

export default async (req, res) => {
    try {
        const token = req.headers.token;
        const { uid } = await auth.verifyIdToken(token);
        const tends = await getUserTends(uid);
        res.status(200).json({ tends });
    } catch (error) {
        res.status(500).json({ error });
    }
};
```

Notice that the API route verifies the token in the request header. Without that check, anybody would have access to any user's data. API Route authentication is a topic covered in the React2025 course that, like most backend development, was completely foreign to me prior to this project.

## Trends

At this point in development, the user could successfully create a tend and have it display on their dashboard. Now I wanted to store data points associated with that tend. The app I use to track my intermittent fasting displays statistics and graphs for weight and time spent fasting: this is exactly what I envisioned for my application, except not exclusive to fasting nor weight.

Firstly, I needed to determine *when* a data point should be stored. For the quantity tend, I have it set up for now to store a data point when the "reset" button is manually clicked. However, eventually, I would like to allow the user to decide how often they would like their quantity tend to be automatically reset and stored (think: weekly pages read, daily calories). For the timer tend, a data point is stored whenever the timer is stopped.

### Example Quantity Trend Data Stored in Firebase
![Quantity Trend Data Stored in Firebase](./img/quantity-trend-firebase.png)

### Example Timer Trend Data Stored in Firebase
![Timer Trend Data Stored in Firebase](./img/timer-trend-firebase.png)

```jsx
<ContentContainer>
    <div className="border-b border-gray-300 p-5">
        <h1 className="ml-3 font-semibold text-gray-700">
            {initialTrends[0].tendTitle} Line Graph
        </h1>
    </div>

    <hr className="text-gray-400" />
    <h2 className="mx-auto text-gray-700 mt-3">
        {initialTrends[0].tendUnits} over Time
    </h2>
    <ResponsiveContainer
        width="80%"
        height="30%"
        className="mx-auto my-4"
    >
        <LineChart data={sortedTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                height={40}
                dataKey="createdAt"
                scale="time"
                type="number"
                domain={["auto", "auto"]}
                tickFormatter={(unixTime) =>
                    format(new Date(unixTime), "P")
                }
            >
                <Label position="insideBottom" offset={0}>
                    Date
                </Label>
            </XAxis>
            <YAxis
                dataKey="currentValue"
                domain={[0, targetValue * 2]}
                type="number"
            >
                <Label
                    position="insideLeft"
                    angle="-90"
                    offset={10}
                >
                    {tendUnits}
                </Label>
            </YAxis>
            <ReferenceLine
                y={targetValue}
                stroke="black"
                strokeDasharray="3 3"
            >
                <Label
                    position="top"
                    offset={10}
                >{`Target ${tendUnits}`}</Label>
            </ReferenceLine>
            <Line
                dataKey="currentValue"
                unit={tendUnits}
                stroke="#CD3838"
            />
            <Tooltip
                formatter={(value) => [`${value} `, `Recorded`]}
                labelFormatter={(unixTime) =>
                    format(new Date(unixTime), "PPpp")
                }
            />
        </LineChart>
    </ResponsiveContainer>
</ContentContainer>
```