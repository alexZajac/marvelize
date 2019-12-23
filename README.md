# Marvelize
React app displaying Marvel characters in a grid layout.

![](https://media.giphy.com/media/rj12FejFUysTK/source.gif)

This challenge was realized in the process of a Software Engineering challenge for [SmartRenting.](https://smart-renting.com/)

The project runs a Node server in one container, serving a react-app in another and all wrapped up with Docker Compose.

## Preview

![](https://raw.githubusercontent.com/alexZajac/marvelize/master/demo.webm)

## Development

```docker-compose up``` 

The two folders are mounted in their own docker containers and volume-mounted. Open http://host:3000 (where host is localhost for docker desktop and docker-machine id for VMs).

## Production

```docker-compose -f docker-compose.prod.yml up``` 

The app is compiled and built into its own docker container, that is opened with docker-compose as as service. Open http://host:8080 (where host is localhost for docker desktop and docker-machine id for VMs).

