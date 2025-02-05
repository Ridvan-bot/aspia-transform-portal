import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const getFilePath = (filename: string) => {
  const dir = path.join(process.cwd(), 'data/templates');
  const filePath = path.join(dir, `${filename}.json`);
  return { dir, filePath };
};

const createDirectoryIfNotExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const saveFile = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf-8');
};

const handlePostRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const { data, filename } = req.body;
  const { dir, filePath } = getFilePath(filename);

  createDirectoryIfNotExists(dir);
  saveFile(filePath, data);

  res.status(200).json({ message: 'File saved successfully' });
};

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const { filename } = req.query;
  const { filePath } = getFilePath(filename as string);

  if (fs.existsSync(filePath)) {
    const fileData = readFile(filePath);
    res.status(200).json(JSON.parse(fileData));
  } else {
    res.status(404).json({ message: 'File not found' });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    handlePostRequest(req, res);
  } else if (req.method === 'GET') {
    handleGetRequest(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}