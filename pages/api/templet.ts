import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data, filename } = req.body;
    console.log('Data:', data);
    console.log('Filename:', filename);

    const dir = path.join(process.cwd(), 'data/templets');
    const filePath = path.join(dir, `${filename}.json`);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write data to JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(200).json({ message: 'File saved successfully' });
  } else if (req.method === 'GET') {
    const { filename } = req.query;
    console.log('Filename:', filename);
    const filePath = path.join(process.cwd(), 'data/templets', `${filename}.json`);

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      res.status(200).json(JSON.parse(fileData));
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}