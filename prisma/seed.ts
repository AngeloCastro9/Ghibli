import { PrismaClient, verification } from '@prisma/client';

const prisma = new PrismaClient();

const admins = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456789',
        status: verification.Activate,
    },
];

async function main() {

    for (const admin of admins) {
        await prisma.admin.upsert({
            where: {
                email: admin.email,
            },
            update: admin,
            create: admin,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
