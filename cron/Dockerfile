FROM ubuntu:latest
RUN apt-get update && apt-get install -y cron curl
COPY cron/cron-jobs /etc/cron.d/my-job
COPY cron/cron.sh /cron.sh
COPY .env /etc/.env
RUN chmod 0644 /etc/cron.d/my-job
RUN chmod u+x /cron.sh
RUN crontab /etc/cron.d/my-job
# Run cron in the foreground (-f) to keep the container alive
CMD ["cron", "-f"]
