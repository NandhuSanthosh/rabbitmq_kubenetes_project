const amqp = require('amqplib/callback_api');
const express = require('express');

const app = express();



app.get('/:msg', (req, res) => {

    const msg = req.params.msg;
    if(msg === "favicon.ico")
        return;
    try {
        publishMessage(msg);
        res.send('Message published: ' + msg);
    } catch (error) {
        res.send('Error: ' + error);
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


function publishMessage(msg){
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
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });
    });
}