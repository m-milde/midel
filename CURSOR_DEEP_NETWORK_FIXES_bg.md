<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Свободно ползване; без продажба, ребрандиране или извличане на печалба от този софтуер. Вижте LICENSE. -->

# Ръководство за Cursor: дълбока невронна мрежа — стабилна памет и отговори тип LM (езиков модел)

> **Актуализация 21.10.2026:** текущата дълбока мрежа ще бъде изчистена и изградена наново. Пълният и най-нов план (измерени данни, размери, пропуски, стъпки) е в **[DEEP_NETWORK_REBUILD_PLAN.md](./DEEP_NETWORK_REBUILD_PLAN.md)** (на английски). Това българско ръководство още не е обновено.


Целева аудитория: Cursor AI (или друг агент за програмиране), работещ в `nn-tutorial/`.

**Последна актуализация:** 6 октомври 2026 г.

Първо прочетете: **[MODEL.md](./MODEL.md)** (операции), **[ROADMAP.md](./ROADMAP.md)** (стратегия), **`train_stage3.py`** (модул за обучение), **`deep_model.js`** + **`neural_lab.html`** (извеждане на резултати/инференция и маршрутизиране на чата).

Подробностите са в разделите по-долу; агентите трябва **да започнат само с този блок**.

---

## Следващи стъпки (за агенти — копирайте това)

1. **Спрете** `learn:new:loop`; направете резервно копие на `stage3_brain.js` + `stage3_learned.json` в `versions/`.
2. **`npm run eval`** → запазете базовия лог (baseline log).
3. **Одит на капацитета (преди всяко продължително съвместно обучение):** измерете **дължината на пакетираните токени** (`pack_qa(question, text)`) за **всички** редове от `teachable_lesson_rows()` — докладвайте **медиана, p75, p95** и **% от редовете над 128 токена**. Ако **медианата или повечето редове от тип Teaching/Wikipedia надвишават 128**, третирайте текущата архитектура с контекст от 128 токена като **неподходяща** → **първо Стъпка 7 (по-голям контекст)**, след това съвместно обучение — **не** стартирайте пълно съвместно обучение с лимит 128, очаквайки 80% успеваемост.
4. Реализирайте **`eval_model()`** + **`--eval-file`**, ако липсват; оценката трябва да показва **общ процент на успеваемост и такъв по категории според дължината** (напр. ≤64 / 65–128 / &gt;128 токена). 5. **`--joint-trial`** 500 урока, 10–30 епохи → докладване на стратифициран % на успеваемост → решение от потребителя.
6. **Пълен `--joint`** само върху архитектура, подходяща за корпуса; замяна на активния модел („live brain“) само при успешно преминаване на критериите за приемане (§).
7. Корекция на **`--learn-new`** (по-широк обхват на повторение/replay ~100, задържане на знания, минимален праг за оценка в цикъла) — **предпазен механизъм**, а не основен метод за зареждане на над 3000 записа.
8. **Фаза C:** чат по подразбиране = **текст от съхранената библиотека**; текст от невронната мрежа — **само** при успешна оценка на генерирането **за всяка заявка** (строг флаг за разработка).
9. **Фаза D (продукт):** сравнение = **извличане от библиотеката + потребителски интерфейс с два блока** (стъпки 13, 15). **Стъпка 14 (тегла)** е опционална; **без сравнение** спрямо цели, базирани на **синтетично конкатениране**.

**Правило за корпуса (еднократно):** запазване на всички `*_facts.js` + пълния файл **`taught_facts.js`**; обединяване на редовете по **`id`**; библиотеката съхранява пълния текст на отговора; обучението може да разделя съдържанието на части (chunking) или да разширява контекста.

---

## Основна цел (какво изграждаме)

| Слой | Текущо състояние | Цел |
|-------|--------|--------|
| **Библиотека** | Всички `*_facts.js` + `taught_facts.js` — тук са отговорите за чата | **Без промяна.** Източник на достоверна информация; без изтриване на файлове с факти. |
| **Тегла на модела** | `stage3_brain.js` — ~8% успеваемост при търсене на конкретен факт („needle pass“); загуба на знания при `--learn-new`; **~0,5 млн. параметри на блок**, контекст **128** спрямо **~3,4 хил.** дълги записа | **Joint** (съвместно обучение) върху архитектура, **съобразена с плътността на данните**; **≥80%** успеваемост при търсене на факти **общо**, със **стратифициран** доклад (кратки срещу дълги отговори); коректен файл `stage3_learned.json`. |
| **Изход от чата** | Показва се текст от библиотеката; текст от мрежата — само при `lessonNetworkAnswerComplete` (`deep_model.js`) | **По подразбиране = съхранен `text`.** Мрежата генерира отговор **само** когато оценката на генерацията премине успешно за **съответната заявка** (с фокус върху точността/вярността към данните). |
| **Сравнение / съпоставка** | Механизмът за съпоставяне (matcher) може да върне два урока; чатът може да разграничи конфликти; мрежата рядко съпоставя две теми с висока точност | **Приоритет на библиотеката:** двойно извличане + **два етикетирани блока**; опционално съпоставяне от мрежата **само** при доказана генерация от Фаза C — **без** синтетични, сглобени отговори. |
| **Нови уроци** | `--learn-new` (един идентификатор на изпълнение) | Коригиран механизъм за инсталиране (преиграване + запазване + повторно обучение), така че натрупаните ползи да не се изтриват. |
| **Цели** | Това **не** е уеб езиков модел (LM) с милиарди параметри. Това е **обучаем микро-трансформър**, който трябва да се държи **като езиков модел спрямо вашата база от знания**: гладки отговори, базирани на съхранени факти; статично внедряване (`stage3_brain.js` + страница); запазени механизми за управление (gates). |
| **Извън обхвата (от ROADMAP)** | Чисто невронна система за въпроси и отговори (Q&A) без резервен вариант чрез библиотека; инсталационен архив с размер няколко гигабайта; опит за постигане на паритет със затворени API-та на лаптоп. |

---

## При нулиране на абонамента — започнете оттук

Изпълнете стъпките в посочения ред. **Поставете на пауза** `npm run learn:new:loop` преди Фаза B, освен ако потребителят изрично не желае инсталирането да продължи.

| № | Действие | Условие за завършване |
|---|--------|-----------|
| 1 | Прочетете този файл + MODEL.md („Deep network“) + ROADMAP Фази B–D | Контекстът на агента е зареден |
| 2 | `pgrep -fl "train_stage3|learn-new"` — спрете цикъла коректно; изчакайте `stage3_brain.js` да завърши със `;` | Процесът на обучение не работи |
| 3 | Копирайте `stage3_brain.js`, `stage3_learned.json` → `versions/` (архив с дата) | Наличен е архив |
| 4 | `npm run eval` → запишете лога като **базово ниво (baseline)** | Базовото ниво е записано |
| 5 | Потребителят потвърждава: **запазване на всички файлове с факти**; нулиране на **теглата + записа за инсталация** само след одобрение на обединените данни | Обхватът е съгласуван |
| 6 | **Одит на капацитета** — статистика за пакетирани токени върху **пълния** корпус за обучение (вж. „Следващи стъпки“, §3) | Определяне на съответствие/несъответствие за контекст 128 |
| 7 | **Фаза Б, Стъпка 1** — `eval_model()` + `--eval-file` + нива на успеваемост, **стратифицирани според дължината** | Тестови тегла, подлежащи на оценка |
| 8 | **Фаза Б, Стъпки 2–3** — `--joint-trial` 500 → стратифициран отчет → **първо Стъпка 7**, ако корпусът > 128 | Решение за продължаване/спиране |
| 9 | **Фаза Б, Стъпка 4 или 7→4** — пълно съвместно обучение с **подходящата** архитектура; замяна в реално време само при успешно преминаване на критериите за приемане (§) | Стабилна памет |
| 10 | **Фаза**
<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Svobodno polzvane; bez prodazhba, rebrandirane ili izvlichane na pechalba ot tozi softuer. Vizhte LICENSE. -->

# Rŭkovodstvo za Cursor: dŭlboka nevronna mrezha — stabilna pamet i otgovori tip LM (ezikov model)

Tseleva auditoriya: Cursor AI (ili drug agent za programirane), rabotesht v `nn-tutorial/`.

**Posledna aktualizatsiya:** 6 oktomvri 2026 g.

Pŭrvo prochetete: **[MODEL.md](./MODEL.md)** (operatsii), **[ROADMAP.md](./ROADMAP.md)** (strategiya), **`train_stage3.py`** (modul za obuchenie), **`deep_model.js`** + **`neural_lab.html`** (izvezhdane na rezultati/inferentsiya i marshrutizirane na chata).

Podrobnostite sa v razdelite po-dolu; agentite tryabva **da zapochnat samo s tozi blok**.

---

## Sledvashti stŭpki (za agenti — kopiraĭte tova)

1. **Sprete** `learn:new:loop`; napravete rezervno kopie na `stage3_brain.js` + `stage3_learned.json` v `versions/`.
2. **`npm run eval`** → zapazete bazoviya log (baseline log).
3. **Odit na kapatsiteta (predi vsyako prodŭlzhitelno sŭvmestno obuchenie):** izmerete **dŭlzhinata na paketiranite tokeni** (`pack_qa(question, text)`) za **vsichki** redove ot `teachable_lesson_rows()` — dokladvaĭte **mediana, p75, p95** i **% ot redovete nad 128 tokena**. Ako **medianata ili povecheto redove ot tip Teaching/Wikipedia nadvishavat 128**, tretiraĭte tekushtata arkhitektura s kontekst ot 128 tokena kato **nepodkhodyashta** → **pŭrvo Stŭpka 7 (po-golyam kontekst)**, sled tova sŭvmestno obuchenie — **ne** startiraĭte pŭlno sŭvmestno obuchenie s limit 128, ochakvaĭki 80% uspevaemost.
4. Realiziraĭte **`eval_model()`** + **`--eval-file`**, ako lipsvat; otsenkata tryabva da pokazva **obsht protsent na uspevaemost i takŭv po kategorii spored dŭlzhinata** (napr. ≤64 / 65–128 / &gt;128 tokena). 5. **`--joint-trial`** 500 uroka, 10–30 epokhi → dokladvane na stratifitsiran % na uspevaemost → reshenie ot potrebitelya.
6. **Pŭlen `--joint`** samo vŭrkhu arkhitektura, podkhodyashta za korpusa; zamyana na aktivniya model („live brain“) samo pri uspeshno preminavane na kriteriite za priemane (§).
7. Korektsiya na **`--learn-new`** (po-shirok obkhvat na povtorenie/replay ~100, zadŭrzhane na znaniya, minimalen prag za otsenka v tsikŭla) — **predpazen mekhanizŭm**, a ne osnoven metod za zarezhdane na nad 3000 zapisa.
8. **Faza C:** chat po podrazbirane = **tekst ot sŭkhranenata biblioteka**; tekst ot nevronnata mrezha — **samo** pri uspeshna otsenka na generiraneto **za vsyaka zayavka** (strog flag za razrabotka).
9. **Faza D (produkt):** sravnenie = **izvlichane ot bibliotekata + potrebitelski interfeĭs s dva bloka** (stŭpki 13, 15). **Stŭpka 14 (tegla)** e optsionalna; **bez sravnenie** spryamo tseli, bazirani na **sintetichno konkatenirane**.

**Pravilo za korpusa (ednokratno):** zapazvane na vsichki `*_facts.js` + pŭlniya faĭl **`taught_facts.js`**; obedinyavane na redovete po **`id`**; bibliotekata sŭkhranyava pŭlniya tekst na otgovora; obuchenieto mozhe da razdelya sŭdŭrzhanieto na chasti (chunking) ili da razshiryava konteksta.

---

## Osnovna tsel (kakvo izgrazhdame)

| Sloĭ | Tekushto sŭstoyanie | Tsel |
|-------|--------|--------|
| **Biblioteka** | Vsichki `*_facts.js` + `taught_facts.js` — tuk sa otgovorite za chata | **Bez promyana.** Iztochnik na dostoverna informatsiya; bez iztrivane na faĭlove s fakti. |
| **Tegla na modela** | `stage3_brain.js` — ~8% uspevaemost pri tŭrsene na konkreten fakt („needle pass“); zaguba na znaniya pri `--learn-new`; **~0,5 mln. parametri na blok**, kontekst **128** spryamo **~3,4 khil.** dŭlgi zapisa | **Joint** (sŭvmestno obuchenie) vŭrkhu arkhitektura, **sŭobrazena s plŭtnostta na dannite**; **≥80%** uspevaemost pri tŭrsene na fakti **obshto**, sŭs **stratifitsiran** doklad (kratki sreshtu dŭlgi otgovori); korekten faĭl `stage3_learned.json`. |
| **Izkhod ot chata** | Pokazva se tekst ot bibliotekata; tekst ot mrezhata — samo pri `lessonNetworkAnswerComplete` (`deep_model.js`) | **Po podrazbirane = sŭkhranen `text`.** Mrezhata generira otgovor **samo** kogato otsenkata na generatsiyata premine uspeshno za **sŭotvetnata zayavka** (s fokus vŭrkhu tochnostta/vyarnostta kŭm dannite). |
| **Sravnenie / sŭpostavka** | Mekhanizmŭt za sŭpostavyane (matcher) mozhe da vŭrne dva uroka; chatŭt mozhe da razgranichi konflikti; mrezhata ryadko sŭpostavya dve temi s visoka tochnost | **Prioritet na bibliotekata:** dvoĭno izvlichane + **dva etiketirani bloka**; optsionalno sŭpostavyane ot mrezhata **samo** pri dokazana generatsiya ot Faza C — **bez** sintetichni, sglobeni otgovori. |
| **Novi urotsi** | `--learn-new` (edin identifikator na izpŭlnenie) | Korigiran mekhanizŭm za instalirane (preigravane + zapazvane + povtorno obuchenie), taka che natrupanite polzi da ne se iztrivat. |
| **Tseli** | Tova **ne** e ueb ezikov model (LM) s miliardi parametri. Tova e **obuchaem mikro-transformŭr**, koĭto tryabva da se dŭrzhi **kato ezikov model spryamo vashata baza ot znaniya**: gladki otgovori, bazirani na sŭkhraneni fakti; statichno vnedryavane (`stage3_brain.js` + stranitsa); zapazeni mekhanizmi za upravlenie (gates). |
| **Izvŭn obkhvata (ot ROADMAP)** | Chisto nevronna sistema za vŭprosi i otgovori (Q&A) bez rezerven variant chrez biblioteka; instalatsionen arkhiv s razmer nyakolko gigabaĭta; opit za postigane na paritet sŭs zatvoreni API-ta na laptop. |

---

## Pri nulirane na abonamenta — zapochnete ottuk

Izpŭlnete stŭpkite v posocheniya red. **Postavete na pauza** `npm run learn:new:loop` predi Faza B, osven ako potrebitelyat izrichno ne zhelae instaliraneto da prodŭlzhi.

| № | Deĭstvie | Uslovie za zavŭrshvane |
|---|--------|-----------|
| 1 | Prochetete tozi faĭl + MODEL.md („Deep network“) + ROADMAP Fazi B–D | Kontekstŭt na agenta e zareden |
| 2 | `pgrep -fl "train_stage3|learn-new"` — sprete tsikŭla korektno; izchakaĭte `stage3_brain.js` da zavŭrshi sŭs `;` | Protsesŭt na obuchenie ne raboti |
| 3 | Kopiraĭte `stage3_brain.js`, `stage3_learned.json` → `versions/` (arkhiv s data) | Nalichen e arkhiv |
| 4 | `npm run eval` → zapishete loga kato **bazovo nivo (baseline)** | Bazovoto nivo e zapisano |
| 5 | Potrebitelyat potvŭrzhdava: **zapazvane na vsichki faĭlove s fakti**; nulirane na **teglata + zapisa za instalatsiya** samo sled odobrenie na obedinenite danni | Obkhvatŭt e sŭglasuvan |
| 6 | **Odit na kapatsiteta** — statistika za paketirani tokeni vŭrkhu **pŭlniya** korpus za obuchenie (vzh. „Sledvashti stŭpki“, §3) | Opredelyane na sŭotvet·stvie/nesŭotvet·stvie za kontekst 128 |
| 7 | **Faza B, Stŭpka 1** — `eval_model()` + `--eval-file` + niva na uspevaemost, **stratifitsirani spored dŭlzhinata** | Testovi tegla, podlezhashti na otsenka |
| 8 | **Faza B, Stŭpki 2–3** — `--joint-trial` 500 → stratifitsiran otchet → **pŭrvo Stŭpka 7**, ako korpusŭt > 128 | Reshenie za prodŭlzhavane/spirane |
| 9 | **Faza B, Stŭpka 4 ili 7→4** — pŭlno sŭvmestno obuchenie s **podkhodyashtata** arkhitektura; zamyana v realno vreme samo pri uspeshno preminavane na kriteriite za priemane (§) | Stabilna pamet |
| 10 | **Faza**
Показване на още
Изпращане на отзиви
Използвайте стрелките, за да видите пълния превод.
Натиснете Tab за действия