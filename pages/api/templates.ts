import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const getTemplatesDirectory = () => {
  return path.join(process.cwd(), 'data/templates');
};

const getAllTemplateNames = (dir: string) => {
  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => path.basename(file, '.json'));
};

const handlePostRequest = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'This function has not been implemented' });
};

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const dir = getTemplatesDirectory();

  if (fs.existsSync(dir)) {
    const templates = getAllTemplateNames(dir);
    res.status(200).json({ templates });
  } else {
    res.status(404).json({ message: 'Templates directory not found' });
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