import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticaded');
    }
    const documents = await ctx.db.query('documents').collect();
    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parenDocument: v.optional(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticaded');
    }
    const userId = identity.subject;
    const document = await ctx.db.insert('documents', {
      title: args.title,
      parentDocument: args.parenDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });
    return document;
  },
});
