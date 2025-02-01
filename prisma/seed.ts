import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        id: 1,
        email: "AdminRentalCarLviv@gmail.com",
        password: hashSync("Rt/b9dhXd_eHE7H", 10),
        role: "ADMIN",
      },
      {
        name: "Oleg",
        id: 2,
        email: "oleg@gmail.com",
        password: hashSync("123123", 10),
        role: "USER",
      },
      {
        name: "Ivan",
        id: 5,
        email: "Ivan@gmail.com",
        password: hashSync("123123", 10),
        role: "USER",
      },
      {
        name: "Volodymir",
        id: 6,
        email: "vova@gmail.com",
        password: hashSync("123123", 10),
        role: "USER",
      },
      {
        name: "Yaroslav",
        id: 7,
        email: "Yaroslav@gmail.com",
        password: hashSync("123123", 10),
        role: "USER",
      },
      {
        name: "Victoria",
        id: 8,
        email: "Victoria@gmail.com",
        password: hashSync("123123", 10),
        role: "USER",
      },
    ],
  });
  console.log("Users created");
  await prisma.comment.createMany({
    data: [
      {
        content: "Просторий і комфортний SUV, ідеальний для сімейних подорожей і тривалих поїздок. Добре підходить для оренди завдяки надійності та економічності.",
        rating: 5,
        userId: 2,

        carId: 7,
      },

      {
        content: "Елегантний і зручний автомобіль, що підходить для бізнес-поїздок або романтичних вихідних. Приваблює своїм стильним дизайном.",
        rating: 4,
        userId: 5,

        carId: 8,
      },
      {
        content: "Розкішний вибір для ділових клієнтів або тих, хто хоче максимального комфорту. Висока вартість оренди, але преміальний досвід гарантований.",
        rating: 5,
        userId: 6,

        carId: 9,
      },
      {
        content: "Спортивний маслкар, який стане відмінним вибором для клієнтів, що бажають відчути адреналін. Не найкращий вибір для практичної щоденної оренди.",
        rating: 3,
        userId: 7,

        carId: 10,
      },
      {
        content: "Ідеальний вибір для екологічно свідомих клієнтів. Інноваційний, тихий, ідеальний для міста. Обмеження можуть виникати через зарядні станції.",
        rating: 5,
        userId: 8,

        carId: 11,
      },
      {
        content: "Вражаючий електрокар для особливих випадків чи люксової оренди. Підходить для клієнтів, які шукають елегантність і технологічність.",
        rating: 4,
        userId: 5,

        carId: 12,
      },
      {
        content: "Ідеальний для клієнтів, які бажають стильний і спортивний досвід. Чудовий вибір для особливих подій, але менш практичний для повсякденного використання.",
        rating: 4,
        userId: 6,

        carId: 13,
      },
      {
        content: "Просторий позашляховик для сімей або компаній, які шукають містке авто. Ідеальний для тривалих подорожей та позашляхових пригод.",
        rating: 5,
        userId: 7,

        carId: 14,
      },
      {
        content: "Компактний і спортивний автомобіль, який чудово підходить для клієнтів, які цінують швидкість і керованість. Не дуже практичний для подорожей із багажем.",
        rating: 4,
        userId: 8,

        carId: 15,
      },
      {
        content: "Авто мрії для спеціальних подій чи унікального досвіду. Приваблює естетикою і швидкістю, але має високу вартість оренди.",
        rating: 4,
        userId: 2,

        carId: 16,
      },
      {
        content: "Практичний, економічний і сучасний кросовер. Прекрасний вибір для щоденних поїздок і сімейного використання.",
        rating: 5,
        userId: 6,

        carId: 17,
      },
      {
        content: "Надійний і зручний автомобіль середнього розміру для сімейних поїздок. Добре підходить для тривалих поїздок або міського використання.",
        rating: 4,
        userId: 5,

        carId: 18,
      },
    ],
  });
  console.log("comments created");
}

async function down() {
  await prisma.comment.deleteMany();
  await prisma.user.deleteMany();
  console.log("deleting comments and users");
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
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
