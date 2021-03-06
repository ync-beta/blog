import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
          votes: 0
        },
        {
          title: 'Join the Prisma Apple Messenger',
          content: 'https://slack.prisma.io',
          published: true,
          votes: 0
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    password: '$2a$10$k2rXCFgdmO84Vhkyb6trJ.oH6MYLf141uTPf81w04BImKVqDbBivi', // random42
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
          viewCount: 42,
          votes: 0
        },
        {
          title: 'Follow Prisma on Facebook',
          content: 'https://www.twitter.com/prisma',
          published: true,
          viewCount: 23,
          votes: 0
        },
        {
          title: 'Follow Prisma on Instagram',
          content: 'https://www.twitter.com/prisma',
          published: true,
          viewCount: 11,
          votes: 0
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: '$2a$10$lTlNdIBQvCho0BoQg21KWu/VVKwlYsGwAa5r7ctOV41EKXRQ31ING', // iLikeTurtles42
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
          viewCount: 128,
          votes: 0
        },
        {
          title: 'Prisma on Uphold',
          content: 'https://pris.ly/youtube',
          published: true,
          viewCount: 3,
          votes: 0
        },
        {
          title: 'Prisma on New York Times',
          content: 'https://pris.ly/youtube',
          published: true,
          viewCount: 5,
          votes: 0
        },
        {
          title: 'Prisma on Linkedin',
          content: 'https://pris.ly/youtube',
          published: true,
          viewCount: 2,
          votes: 0
        },
        {
          title: 'Prisma on Line',
          content: 'https://pris.ly/youtube',
          published: true,
          viewCount: 3,
          votes: 0
        },
        {
          title: 'Prisma on Messenger',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
  {
    name: 'Alice2',
    email: 'alice2@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
  {
    name: 'Alice3',
    email: 'alice3@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
  {
    name: 'Alice4',
    email: 'alice4@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
  {
    name: 'Alice5',
    email: 'alice5@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
  {
    name: 'Alice6',
    email: 'alice6@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
  {
    name: 'Alice7',
    email: 'alice7@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
  {
    name: 'Alice8',
    email: 'alice8@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
  {
    name: 'Alice9',
    email: 'alice2@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
  {
    name: 'Alice9',
    email: 'alice9@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
