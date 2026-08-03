import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          published: false,
        },
      });

      return res.status(201).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to create post.' });
    }
  }

  if (req.method === 'GET') {
    try {
      const draftsOnly = req.query.drafts === 'true';
      const posts = await prisma.post.findMany({
        where: { published: draftsOnly ? false : true },
        orderBy: { id: 'desc' },
      });

      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch posts.' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
