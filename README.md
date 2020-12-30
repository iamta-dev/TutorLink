# TutorLink

## UX/UI appClient

First Header | Second Header
------------ | -------------
<center><img src="markdown/TutorLink-UI001.png" width="30%"></center> | <img src="markdown/TutorLink-UI002.png" width="30%">
<img src="markdown/TutorLink-UI003.png" width="30%"> | <img src="markdown/TutorLink-UI02.png" width="30%">
<img src="markdown/TutorLink-UI03.png" width="30%"> | <img src="markdown/TutorLink-UI04.png" width="30%">
<img src="markdown/TutorLink-UI05.png" width="30%"> | 


## first run Backend
  gcloud auth application-default login
  ./mvnw spring-boot:run
## app Example projects
  https://github.com/infinitered/ignite-bowser-examples
## Navigation
  https://reactnavigation.org/docs/4.x/getting-started
## Font
  https://materialdesignicons.com/
  add font android
  `appClient/android/app/build.gradle`
### clear all file in gitignore [Click](https://stackoverflow.com/questions/13541615/how-to-remove-files-that-are-listed-in-the-gitignore-but-still-on-the-repositor)
## Usefull
    
    #fix error android run (must not use JAVA 13)
      brew install gradle
      change java version tutorial https://stackoverflow.com/questions/21964709/how-to-set-or-change-the-default-java-jdk-version-on-os-x
      ## reinstall brew
        ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
        ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    #check npm
      sudo npm install npm@latest -g 
      sudo npm doctor
    #update all package in npm before npm install
      sudo npm update -g
    #run command
      npx react-native run-ios
      npx react-native run-android
    #set path in zsh
      nano ~/.zshrc
    #open menu in ios simulator
      command + d
    #open menu in android simulator
      command + m
    #tool to debug 
      (Link) https://www.npmjs.com/package/react-devtools
    #debug method 
      (Link) https://reactnative.dev/docs/debugging#accessing-the-in-app-developer-menu
    #don't use sudo when use ignite init project
      ignite new client
    #ignite commands
      ignite generate 
      ignite doctor //see more info
## Backend
- `cd backend`
- `sudo ./gradlew bootRun`
- แนะนำให้ใช้ IntelijIDE แทน vsCode

- PostMan

 - https://www.getpostman.com/collections/bbcf1ae28ddfbadbd04b

#### ลำดับการทำงาน

- 1 นักเรียนสร้างโพส อยากเรียนวิชา...

- 2 ติวเตอร์จอยโพส 

## WebAdmin - adminClient 
- `cd adminClient`
- `sudo yarn serve`
 

 ## Frontend
 
 * UI Test
   (Link) https://youtu.be/IphAavfTUz4
 
 * setup frontend
 
   - `cd frontend`
   - `npm install`
   - `cd ios`
   - `pod install`
   - `cd ..`
   - `npx react-nanive run-ios | npx react-nanive run-android`
 
 * frontend support
 
   - `native-base": "^2.13.8`
   - `react": "16.9.0`
   - `react-native": "0.61.5`
   - `react-native-vector-icons": "^6.6.0`
   - `react-router-native": "^5.1.2`
   - `react-router-native-stack": "0.0.16`

## mobileBowser
  - คำสั่งที่เป็นประโยชน์
  - `killall node` 
