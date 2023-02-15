import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello friends! The API server is up and running. This API was built by me.',
    })
});

app.post('/', async (req, res) => {
    try {
        const promt = req.body.promt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${promt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          })
          
          res.status(200).send({
            bot: response.data.choices[0].text
          })

    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
});

app.listen(3000, () => console.log('server is running on port http://localhost:3000'));
