FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the already-built Vite assets from ./dist into nginx
COPY dist /usr/share/nginx/html

# Expose port 80 from the container
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
