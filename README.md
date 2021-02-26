# Tends 🍕

Tends is what I'm calling a *selfish* project, or a project that is being developed for my own sake. My vision for Tends is for it to help users manage "quantities" in their lives (i.e. daily calories, screen time, exercise time, etc.). 

This project is being built alongside a number of other projects from other members of the egghead.io Portfolio Project Club. The goal for this club is to develop a subscription-based SaaS using (mostly) similar tech stacks. Furthermore, we've all committed to follow the [Readme Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html) methodology. This readme aims to lay out what Tends will do and how.

## Inspiration ✨

My inspiration for this project came from a recent interest in taking control of my life. I want to become both efficient and healthy, and I've come to realize that these qualities are *trained over time*. One doesn't suddenly become efficient or healthy. Instead, one must work those qualities into their lives through consistent practice. The goal for Tends is for it to be a simple tool that people (like me) can use to make sure that they are headed in the right direction. 

## Functionality 🎰

### Core ⚛️

Tends at its core allows users to create a list of tendencies (or "tends") that they want to monitor. Essentially, each tend will be an element in a list. I'm imagining a list with a "+" button at the bottom that, when pressed, causes a form to pop up that allows the user to add a tend. Each tend will store quantities relating to what the user wants to monitor.

### Tend Types 👑
These tends will be highly customizable with *types*. Currently, I am certain that I want to implement a basic *count* type that stores and displays a quanity and a *timer* type that stores and displays time active/remaining. 

I'm also considering implementing *subtypes* that are specific to what the user wants to monitor (i.e. a calorie subtype on a count tend would let the user view their BMR for comparision and perhaps even let the user search calorie counts for foods). Perhaps these subtypes will only be available to premium members.

### Resets 🔁
The quantity stored in a tend will be reset automatically at a time designated by the user. By "reset", I mean that the quantity displayed to the user will be return to a default value, and whatever quantity was stored in the tend at that time will be saved. For example, a user could create a "daily calorie count" tend and choose to have it reset every day. Or perhaps the user wants to keep track of the number of pages that she reads in a week, so she could choose to have the quantity reset weekly. 

A tend like the "intermittent fasting timer" would reset when the user is finished with whatever they were timing. This would be an example of a tend that needs to be reset manually. These tends will have a clear "end timer" button that, when pressed, will allow the user to change the end time if they need to and submit.

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