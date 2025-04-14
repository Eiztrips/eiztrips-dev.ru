import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fetchRandomCatGif } from './src/randomCatGif/randomCatGif';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/api/random-cat-gif', async (req: Request, res: Response) => {
  const gifUrl = await fetchRandomCatGif();

  if (gifUrl) {
    res.json({ url: gifUrl });
  } else {
    res.status(404).json({ error: 'No gif data found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
