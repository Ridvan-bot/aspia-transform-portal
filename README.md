# aspia-transform-portal


![Build Status](https://github.com/Ridvan-bot/aspia-transform-portal/actions/workflows/deploy.yml/badge.svg)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/Ridvan-bot/aspia-transform-portal?label=version&sort=semver)
![Last Commit](https://img.shields.io/github/last-commit/Ridvan-bot/aspia-transform-portal)
![GitHub issues](https://img.shields.io/github/issues/Ridvan-bot/aspia-transform-portal)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Ridvan-bot/aspia-transform-portal)

## Project Information
This project is an automation portal designed to streamline and automate various tasks. It is hosted on Azure and leverages several Azure services to provide a robust and scalable solution.

### Features
- Task automation
- User management
- Reporting and analytics
- Integration with other services

### Architecture
This project follows a microservices architecture and is built using the following technologies:
- **Frontend**: React, Next.js
- **Backend**: Node.js, Express
- **Database**: Azure SQL Database
- **Authentication**: Azure Active Directory
- **Deployment**: Azure App Services, Docker

### Requirements
- Node.js
- Azure account
- Docker


### Setup
1. Clone the repository
2. Install dependencies using `npm install`
3. Configure your Azure services
4. Run the application using `npm run start`

### Run website on Windows server
1. Install the following software:
   - [Node.js](https://nodejs.org/) (Ensure it's added to your PATH)
   - [Git](https://git-scm.com/)
   - [Docker](https://www.docker.com/products/docker-desktop) (optional, if using Docker)
2. Clone the repository
3. Install dependencies using `npm install`
4. Configure your Azure services
5. Run the application using `npm run start`
6. Ensure the necessary ports are open on your Windows server
7. Access the application through your server's IP address or domain

### Ensure website is always running
To ensure the website starts automatically after a server restart, you can use a process manager like [PM2](https://pm2.keymetrics.io/).

1. Install PM2 globally:
   ```sh
   npm install pm2 -g
   ```
2. Start your application with PM2:
   ```sh
   pm2 start npm --name "aspia-transform-portal" -- run start
   ```
3. Save the PM2 process list and corresponding environments:
   ```sh
   pm2 save
   ```
4. Setup PM2 to start on boot:
   ```sh
   pm2 startup
   ```

### Cypress Testing
To run Cypress tests, follow these steps:

1. Add a .csv file named test.csv in the fixtures folder. This file is required for the tests to run correctly.

2. 
```sh
npm run cypress:run
```

### Contributing
We welcome contributions to this project. To contribute, follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

### License
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.

### Access
You can access the dev automation portal via this URL:
[http://dev-az-automation-portal-pohlmanprotean-dns.northeurope.azurecontainer.io:8080/](http://dev-az-automation-portal-pohlmanprotean-dns.northeurope.azurecontainer.io:8080/)

You can access the prod automation portal via this URL:
[http://main-az-automation-portal-pohlmanprotean-dns.northeurope.azurecontainer.io:8080/](http://main-az-automation-portal-pohlmanprotean-dns.northeurope.azurecontainer.io:8080/)

##
<p align="center">
  Crafted with care by <strong>Robin Pohlman</strong> at <strong>Pohlman Protean AB</strong>.
</p>
