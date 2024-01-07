# Phishing training application

Application used for training users against phishing attacks using emails for communication. 
App also provides statistics about emails used in training.

## Starting the application

### Requirements

To run the application you need to install following dependencies

* [Python](https://www.python.org/downloads/release/python-360/) - required version 3.6.X
* [Node](https://nodejs.org/en/download/) - required version 19+
* [PostgreSQL](https://www.postgresql.org/download/) - required version 15+

### Environment setup

You need to create an .env file from .env.template. This file configures your application environment ( e.g. development, production, ... ). This file contains following settings:

```SECRET_KEY:```       Application secret key used by Django framework  
```DEBUG:```            Debug mode switch, should be False for production
```ALLOWED_HOSTS:```    List of hosts (domains), from which the application should be accessible
```SWAGGER_ENABLED:```  Swagger interface switch, should be False for production
```EMAIL_GENERATOR:```  The implementation of email set generator, which should be used
```DATABASE_URL:```     Database configuration string

### PostgreSQL setup

To run the application, you need to create a PostgreSQL database based on the configuration. Connection to database is configured in the .env.template file. The current configuration is:

```DATABASE:```  phishingdb  
```PORT:```      5432  
```NAME:```      postgres  
```PASSWORD:```  postgres

If you want to use different database settings, you need to change the DATABASE_URL environment variable. After the databas is created, you need to run  following commands, to install all necessary dependencies an then create the database schema.

```bash
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate
```

### Backend
Firstly make sure you have installed python3, pip3 and pipenv. Then you can run following command to start the backend server.

```bash
pipenv run python manage.py runserver
```

### Frontend
Firstly make sure you have installed nodejs and npm. Then you can run following command to install the dependencies and serve the frontend.

```bash
cd frontend
npm install
npm run start
```

After running these commands, the application will be accessible at http://localhost:3000. If you want to build the frontend to static bundle, which will be then served by server at http://localhost:8000, run the following command at the root of the project. It is command prepared for the deployment process, where it installs the dependencies, build the frontend application and copy it to server static folder.

```
npm run build
```

### Training configuration

If you want to enter the administration section you need to configure a new administration account. You can easily do it using the Swagger interface at ```/swagger``` ( Keep in mind you need to have configured Debug=True in the .env file ), or using the Django API interface at ```/api/auth/register/```.

After logging in, you need to setup the basic configuration of gameruns and then the list of available *phishing signs* and *email types*. You can do it easily on the general settings page at ```/settings```.

### Email templates

To setup the training emails, you can use the examples which are stored inside the **examples** folder. There are 23 email samples, which are all simple text files following the requested structure. To load these examples you need to visit ```/settings/emails/import``` page, where you select the requested files, select appropriate type and phishing signs and hit "IMPORT". You can find all of the imported emails in the ```/settings/emails``` page afterwards


**authors:** Marko Ondrejička, Patrik Brosz  
**version:** 1.0.0  
**license:** MIT  
**repository:** [Github](https://github.com/MarkoOndrejicka/phishing-game)