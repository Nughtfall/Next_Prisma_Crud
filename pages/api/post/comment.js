import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content, postId } = req.body;

    if (!content || !postId) {
      return res.status(400).json({
        message: 'Content and postId are required.',
      });
    }

    try {
      const result = await prisma.comment.create({
        data: {
          id: crypto.randomUUID(),
          content,
          postId,
          published: true,
        },
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Failed to create comment.',
      });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: 'Comment id is required.',
      });
    }

    try {
      await prisma.comment.delete({
        where: { id },
      });

      return res.status(200).json({
        message: 'Comment deleted.',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Failed to delete comment.',
      });
    }
  }

  return res.status(405).json({
    message: 'Method not allowed',
  });
}
