import { Container } from "@/components/shared";
import { CircleIcon } from "lucide-react";
import React from "react";

export default async function About() {
  return (
    <Container className="h-fit p-6 pb-16 text-gray-900 bg-white flex flex-col items-center">
      <div id="about_us" className="w-[80%] mt-8 flex flex-col gap-12">
        <div className="flex flex-col justify-center items-center text-center border-b pb-6">
          <h1 className="text-2xl font-semibold">Про нас</h1>
          <p className="mt-4 text-lg">
            UARENT – це зручний сервіс прокату автомобілів у Львові, створений
            для вашого комфорту. Ми пропонуємо широкий вибір авто: від
            компактних міських моделей до просторих кросоверів. Наша мета –
            зробити оренду авто швидкою, прозорою та безпечною.
          </p>
        </div>

        <div
          id="about_service"
          className="flex flex-col justify-center items-center text-center border-b pb-6"
        >
          <h1 className="text-2xl font-semibold">Сервіс</h1>
          <p className="mt-4 text-lg">На платформі UARENT ви можете:</p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3 items-center text-lg">
              <CircleIcon size={10} /> Обрати авто за категоріями, фільтруючи за
              параметрами
            </li>
            <li className="flex gap-3 items-center text-lg">
              <CircleIcon size={10} /> Забронювати машину онлайн у кілька кліків
            </li>
            <li className="flex gap-3 items-center text-lg">
              <CircleIcon size={10} /> Додати автомобілі до улюблених
            </li>
            <li className="flex gap-3 items-center text-lg">
              <CircleIcon size={10} /> Переглядати всі свої резервації у
              персональному кабінеті
            </li>
            <li className="flex gap-3 items-center text-lg">
              <CircleIcon size={10} /> Керувати бронюваннями та особистими
              даними
            </li>
          </ul>
        </div>

        <div
          id="about_contacts"
          className="flex flex-col justify-center items-center text-center border-b pb-6"
        >
          <h1 className="text-3xl font-bold">Контакти</h1>
          <div className="mt-4 text-lg space-y-3">
            <p className="flex items-center gap-2">
              📍 <span>Адреса: Львів, вул. Городоцька, 1</span>
            </p>
            <p className="flex items-center gap-2">
              📞 <span>Телефон: +380 (97) 111-11-11</span>
            </p>
            <p className="flex items-center gap-2">
              ✉️ <span>Email: support_uarent@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              🕒 <span>Графік роботи: Пн-Нд, 08:00 – 23:00</span>
            </p>
          </div>
        </div>

        <div
          id="about_faq"
          className="flex flex-col justify-center items-center text-center"
        >
          <h1 className="text-2xl font-semibold">FAQ (Поширені запитання)</h1>
          <div className="mt-6 text-lg space-y-4 text-left">
            <p>
              <span className="font-semibold">Як забронювати авто?</span>
              Виберіть автомобіль, вкажіть дати оренди, оформіть бронювання та
              підтвердьте оплату.
            </p>
            <p>
              <span className="font-semibold">
                Які документи потрібні для оренди?
              </span>
              Паспорт або ID-картка, водійське посвідчення (категорія B) та
              банківська картка.
            </p>
            <p>
              <span className="font-semibold">
                Чи можна змінити або скасувати бронювання?
              </span>
              Так, через сторінку резервацій. Деякі зміни можуть передбачати
              додаткові умови або комісію.
            </p>
            <p>
              <span className="font-semibold">
                Які варіанти оплати доступні?
              </span>
              Оплатити можна банківською карткою або готівкою при отриманні
              авто.
            </p>
            <p>
              <span className="font-semibold">
                Чи є обмеження за віком водія?
              </span>
              Так, мінімальний вік – 21 рік. Деякі авто можуть мати додаткові
              вимоги.
            </p>
            <p>
              <span className="font-semibold">Чи є страховка?</span> Так, усі
              автомобілі мають обов’язкове страхування. Є додаткові пакети
              страхового покриття.
            </p>
            <p>
              <span className="font-semibold">
                Чи потрібно вносити завдаток перед орендою?
              </span>
              Так, для більшості авто передбачено завдаток, який повертається
              після завершення оренди за умови відсутності пошкоджень.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
