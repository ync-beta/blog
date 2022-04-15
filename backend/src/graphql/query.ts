// after update this file, run 
// $ npx prisma migrate dev 
import {
    intArg,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
    enumType,
  } from 'nexus'
import { Context } from '../context'
import { User } from './types/user'
import { Post } from './types/post'
import { Prisma } from '@prisma/client'

export const SortOrder = enumType({
    name: 'SortOrder',
    members: ['asc', 'desc'],
  })
  
export const PostOrderByUpdatedAtInput = inputObjectType({
    name: 'PostOrderByUpdatedAtInput',
    definition(t) {
      t.nonNull.field('updatedAt', { type: SortOrder })
    },
  })
  
export const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('content')
  },
})
  
export const Query = objectType({
    name: 'Query',
    definition(t) {

      t.nullable.field('postById', {
        type: Post,
        args: {
          id: intArg(),
        },
        resolve: (_parent, args, context: Context) => {
          return context.prisma.post.findUnique({
            where: { id: args.id || undefined },
          })
        },
      })
  
      t.list.field('draftsByUser', {
        type: Post,
        args: {
          userUniqueInput: nonNull(
            arg({
              type: 'UserUniqueInput',
            }),
          ),
        },
        resolve: (_parent, args, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: {
                id: args.userUniqueInput.id || undefined,
                email: args.userUniqueInput.email || undefined,
              },
            })
            .posts({
              where: {
                published: false,
              },
            })
        },
      })

      t.field('posts', {
        type: PostConnection,
        args:{
          take: intArg(),
          skip: intArg(),
          after: intArg(),
          searchString: stringArg(),
          orderBy: arg({
            type: 'PostOrderByUpdatedAtInput',
          }),
        },
        resolve: async (_parent, args, context: Context) => {
          console.log('take', args.take)
          console.log('skip', args.skip )
          console.log('after', args.after)
          console.log('searchString', args.searchString )
          console.log('--------------')
          const or: any = args.searchString
            ? {
                OR: [
                  { title: { contains: args.searchString } },
                  { content: { contains: args.searchString } },
                ],
              }
            : {}
  
          const where = {
              published: true,
              ...or,
          }

          const posts = await context.prisma.post.findMany({
            take: args.take || undefined,
            skip: args.skip || undefined,
            cursor: args.after && { 
              id: args.after 
            } || undefined, 
            where,
            orderBy: args.orderBy || undefined,
          })

          const allPosts = await context.prisma.post.findMany({
            where
          }) || 0
          // console.log('totalCount', totalCount)
          // console.log('posts.length', posts.length )

          return {
            cursor: posts && posts.length > 0 && posts[posts.length - 1].id || 0,
            hasMore: 
              posts.length ? 
                posts[posts.length - 1].id !== allPosts[allPosts.length - 1].id
                : false,
            totalCount: allPosts.length, 
            posts
          };
        },
      })

      t.nonNull.list.nonNull.field('uers', {
        type: User,
        args:{
          skip: intArg(),
          take: intArg(),
        },
        resolve: async (_parent, args, context: Context) => {
           const results = await context.prisma.user.findMany({
            take: args.take || undefined,
            skip: args.skip || undefined,
          })
          console.log('results', results.map(p => p.id))
          return results
        },
      })
    
      t.nullable.field('user', {
        type: User,
        args: {
          id: intArg(),
        },
        resolve: (_parent, args, context: Context) => {
          return context.prisma.user.findUnique({
            where: { id: args.id || undefined },
          })
        },
      })  
    },
  })

  export const PostConnection = objectType({
    name: 'PostConnection',
    definition(t) {
      t.nonNull.int('cursor')
      t.nonNull.boolean('hasMore')
      t.nonNull.int('totalCount')
      t.nonNull.list.nonNull.field('posts', { 
       type: Post})
    }
  })
  
  