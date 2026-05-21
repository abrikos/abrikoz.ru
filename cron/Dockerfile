FROM ubuntu:latest
RUN apt-get update && apt-get install -y cron curl
COPY cron.sh /etc/cron.d/my-job
RUN chmod 0644 /etc/cron.d/my-job
RUN crontab /etc/cron.d/my-job
# Run cron in the foreground (-f) to keep the container alive
CMD ["cron", "-f"]
