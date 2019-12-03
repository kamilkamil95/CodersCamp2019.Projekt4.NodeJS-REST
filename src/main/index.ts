import express from 'express';

console.log("Hello from TS!");

const app = express();

app.get("/", (req,res) => {
    res.send('Hello World');
});

app.listen(5000, () => console.log('Server running!'));
