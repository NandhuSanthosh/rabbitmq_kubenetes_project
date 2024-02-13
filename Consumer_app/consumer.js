const amqp = require('amqplib/callback_api');

const username = 'myuser';
const password = 'mypassword';
const rabbitmq_service = 'rabbitmq-service';
const port = '5672';

amqp.connect(`amqp://${username}:${password}@${rabbitmq_service}:${port}`, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        let queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});