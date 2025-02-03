# Use the official Nginx image as a base
FROM nginx:alpine

# Set a working directory inside the container (optional but neat)
WORKDIR /usr/share/nginx/html

# Copy the HTML file into the container
COPY ./index.html ./index.html

# Copy the 'styles' folder into the container
COPY ./styles ./styles

# Copy the 'scripts' folder into the container
COPY ./scripts ./scripts

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
