import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testModels() {
  try {
    // Create a User
    const newUser = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'securepass',
        company: 'Test Corp',
      },
    });
    console.log('User created successfully:', newUser);

    // Create a Bot linked to the User
    const newBot = await prisma.bot.create({
      data: {
        botName: 'TestBot',
        description: 'A test bot',
        category: 'Utility',
        demoVideoLink: 'http://test.com/video',
        qrCodeImage: 'http://test.com/qr',
        botImage: 'http://test.com/image',
        userId: newUser.id,
      },
    });
    console.log('Bot created successfully:', newBot);

    // Create a Rating linked to the User and Bot
    const newRating = await prisma.rating.create({
      data: {
        value: 4,
        userId: newUser.id,
        botId: newBot.id,
      },
    });
    console.log('Rating created successfully:', newRating);

    //Read
    const userWithRelations = await prisma.user.findUnique({
      where: {id: newUser.id},
      include:{bots:true, ratings:true}
    });
    console.log('User with relations:', userWithRelations);

    const botWithRatings = await prisma.bot.findUnique({
      where: {id: newBot.id},
      include:{ratings:true}
    })
    console.log('Bot with ratings:', botWithRatings);

    //update
    const updateUser = await prisma.user.update({
      where:{id: newUser.id},
      data:{name:'Bavithran'}
    })
    console.log('User updated successfully:', updateUser);

    const updateBot = await prisma.bot.update({
      where:{id: newBot.id},
      data:{botName:'UpdatedBot'}
    })
    console.log('Bot updated successfully:', updateBot);

    const updateRating = await prisma.rating.update({
      where:{id: newRating.id},	    
      data:{value:5}
    })
    console.log('Rating updated successfully:', updateRating);

    //delete
    await prisma.rating.delete({
      where:{id:newRating.id}
    })
    console.log('Rating deleted successfully:', newRating.id);

    await prisma.bot.delete({
      where:{id:newBot.id}
    })
    console.log('Bot deleted successfully:', newBot.id);      

    await prisma.user.delete({
      where:{id:newUser.id}
    })
    console.log('User deleted successfully:', newUser.id);

    
  } catch (error) {
    console.error('Error creating records:', error);
    throw error; // Throw to fail fast and catch schema issues
  } finally {
    await prisma.$disconnect();
  }
}

testModels().catch((e) => {
  console.error('Test failed:', e);
  process.exit(1);
});