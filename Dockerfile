# pull official base image
FROM python:3.11

# set work directory
WORKDIR /usr/src/jfm

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN pip install pipenv
COPY ./Pipfile ./Pipfile
COPY ./Pipfile.lock ./Pipfile.lock
RUN pipenv install --system
RUN pip install gunicorn
COPY . .