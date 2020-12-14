## First Installing
1. install gCloud **Do not create new project when install success
   - [Download gCloud SDK](https://cloud.google.com/sdk/docs/downloads-interactive)

2. login gCloud in command line
   - `gcloud auth application-default login`

3. install RabbitMQ
    [MacOs](https://www.rabbitmq.com/install-homebrew.html)
    [Windows](https://www.rabbitmq.com/install-windows.html)
## Command
   - run backend `./mvnw spring-boot:run`

## Note
    To have launchd start rabbitmq now and restart at login:
       brew services start rabbitmq
     Or, if you don't want/need a background service you can just run:
       rabbitmq-server