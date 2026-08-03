import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
      const post = await prisma.post.update({
        where: { id },
        data: { title, content },
      });

      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to update post.' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.post.delete({ where: { id } });
      return res.status(200).json({ message: 'Post deleted.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to delete post.' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
