Flags is an open-source feature flag management software. You may ask what are feature flags.

Well here is a google definition of it.

> Feature flags (also commonly known as feature toggles) is a software engineering technique that turns select functionality on and off during runtime, without deploying new code
>

Now you may think why does one need to use feature flags? 


# Why use feature flagging?

Feature flagging is a great tool that mostly all-grown companies use. I think Hashnode uses it for the new features they roll out to us. 

Feature flags greatly benefit the teams/companies who want to perform controlled experimentation on a particular feature. Companies could turn off the flag and **baam** feature is hidden from the users without deploying the new code.

There are great companies like Launch Darkly, PostHog, etc which provide you with feature flagging functionalities. The main problem is this software is that they are proprietary. 
So we thought why not create an open source alternative for it?

Let’s now dive in on how we build it.

# Project Architecture

<img width="985" alt="w6CMIiN7B" src="https://user-images.githubusercontent.com/34994081/196028006-05fe77ee-9c4b-4080-8f72-7adad6c279fd.png">


![l9yC7EmG4](https://user-images.githubusercontent.com/34994081/196028030-5fe98d53-4977-48ec-b523-3da28ddb001f.jpeg)

This is a simple architecture of our system. It follows a few simple steps

1. You create your account and projects.
2. In each project you will create flags. You could theoretically create as many flags as you want.
3. You can turn on/off your flags through our dashboard.
4. Our front-end dashboard will notify the back-end.
5. On your website you will need to call our API and pass your ```projectId``` which you want to use.
6. This API call will open up the Event Source connection.
7. So whenever the flags in the project are updated, our back-end will notify your front-end.
8. You will need to wrap your feature in a condition based on the flag's state. Check the example below
9. The change would be immediate you or your users don’t have to do anything.


##  💻 Tech Stack used

- Nx monorepo (React and Express)
- Typescript
- TailwindCSS and Chakra UI
- AWS EC2 instance to host backend
- Nginx for proxy server
- Planet scale as the database
- Knex for the ORM
- Event Source web API

# 🎥 Walkthrough

Here is a quick walkthrough of the project and the use case.

%[https://youtu.be/BXvpIzcyZ90]


# 🗂 Docs

Check out our [docs page](https://flags.jeel.dev/docs) for further details, best practices, and how to add the flags to your project.


# 🔗 Useful Links


- [Main Website Github](https://github.com/JeelPatel2000/flags)
- [Main Website](https://flags.jeel.dev/)

- [Demo Website using feature flags](https://flags-demo.vercel.app/)

### How to test the project
- Open the main website. Log in with the below credentials
- Open the **Hashnode** project
- NOTE: The project's actions such as deleting the project, and adding/ deleting the feature flags is restricted.
- To test those functionalities please create a different project.
- In the Hashnode project you will see three feature flags that are being used in a demo website we have created for you.
- All the three flags represent three different features on that website.
- Open the demo project. Place both tabs side by side for easier testing
- Try toggling the feature flags on/off and see the result in real-time on the demo website.
- See the above walk-through video for an example.
- If you want to test this on your own website please see our docs and ask any questions if you are stuck.

###  Login Credentials

- Username: demo4@flags.com
- Password: demo123


# 👊 Team
- @[Jeel Patel](@jeelpatel3)
- @[Rushil Patel](@rushilp2311)

Attribution
PlanetScale x Hackathon
