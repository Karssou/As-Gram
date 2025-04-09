import vine from '@vinejs/vine'

export const UpdateUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(3)
      .maxLength(30)
      .unique(async (db, value, { meta }) => {
        const userId = meta?.userId
        const match = await db
          .from('users')
          .select('id')
          .where('username', value)
          .whereNot('id', userId)
          .first()
        return !match
      })
      .optional(),

    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value, { meta }) => {
        const userId = meta?.userId
        const match = await db
          .from('users')
          .select('id')
          .where('email', value)
          .whereNot('id', userId)
          .first()
        return !match
      })
      .optional(),
    fullName: vine.string().optional(),
    biography: vine.string().minLength(6).maxLength(250).optional(),
    gender: vine.string().optional(),
    birthdate: vine.string().optional(),
  })
)
