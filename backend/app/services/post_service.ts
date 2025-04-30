import Post from '#models/post'

export class PostService {
  public static async createPost(content: string) {
    const creatorId = 1

    const createPost = await Post.create({
      UserId: creatorId,
      Content: content,
    })

    return createPost
  }

  public static async likePost(postId: number) {
    try {
      const post = await Post.findBy({ id: postId })

      if (!post) {
        throw new Error('Post not found')
      }

      post.like = (post.like || 0) + 1

      await post.save()

      return post
    } catch (error) {
      console.error('Error liking post:', error)
      throw error
    }
  }
}
