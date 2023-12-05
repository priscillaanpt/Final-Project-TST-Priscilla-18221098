# Version of Python
FROM python:3.8

# Setup Working Directory
WORKDIR /womenclothing

# Copy requirement.txt into working directory 
COPY ./requirements.txt /womenclothing/requirements.txt

# Install all the dependency
RUN pip install --no-cache-dir --upgrade -r /womenclothing/requirements.txt
# Copy code into working directory
COPY ./app /womenclothing/app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]