/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

var FOOD_LIBRARY = [
  {
    "id": 6921,
    "category": "Food",
    "text": "Food is any substance that provides organisms with nutrients and energy needed for growth, maintenance, and normal body functions.",
    "question": "What is food?"
  },
  {
    "id": 6922,
    "category": "Food",
    "text": "Foods can come from plants, animals, fungi, algae, or microorganisms and can be eaten raw or prepared in many different ways.",
    "question": "Where does food come from?"
  },
  {
    "id": 6923,
    "category": "Food",
    "text": "Plant-based foods include fruits, vegetables, grains, legumes, nuts, seeds, and many foods made from these ingredients.",
    "question": "What are plant-based foods?"
  },
  {
    "id": 6924,
    "category": "Food",
    "text": "Animal-based foods include meat, fish, eggs, milk, and other products obtained from animals.",
    "question": "What are animal-based foods?"
  },
  {
    "id": 6925,
    "category": "Food",
    "text": "Whole foods are foods that are relatively close to their natural form and have undergone little processing, such as fresh fruits, vegetables, grains, nuts, and eggs.",
    "question": "What are whole foods?"
  },
  {
    "id": 6926,
    "category": "Food",
    "text": "Processed foods have been changed from their original form through methods such as cooking, freezing, drying, fermenting, milling, or canning.",
    "question": "What is processed food?"
  },
  {
    "id": 6927,
    "category": "Food",
    "text": "Ultra-processed foods are industrially formulated products that often contain several processed ingredients, additives, flavorings, or substances not normally used in home cooking.",
    "question": "What is ultra-processed food?"
  },
  {
    "id": 6928,
    "category": "Food",
    "text": "Fresh food generally refers to food that has not been preserved for long periods and is often sold soon after harvesting, producing, or preparing.",
    "question": "What is fresh food?"
  },
  {
    "id": 6929,
    "category": "Food",
    "text": "Perishable foods spoil relatively quickly and commonly include fresh meat, fish, dairy products, eggs, and many fruits and vegetables.",
    "question": "What are perishable foods?"
  },
  {
    "id": 6930,
    "category": "Food",
    "text": "Nonperishable foods can be stored for long periods without refrigeration when kept under suitable conditions and include many grains, dried legumes, canned foods, and dried products.",
    "question": "What are nonperishable foods?"
  },

  {
    "id": 6931,
    "category": "Fruits",
    "text": "Fruits are plant structures that usually develop from flowers and contain seeds, although some commonly eaten fruits are seedless varieties.",
    "question": "What are fruits?"
  },
  {
    "id": 6932,
    "category": "Fruits",
    "text": "Apples are edible fruits of the apple tree and are commonly eaten fresh or used in pies, sauces, juices, and other foods.",
    "question": "What is an apple?"
  },
  {
    "id": 6933,
    "category": "Fruits",
    "text": "Bananas are elongated tropical fruits rich in carbohydrates and are commonly eaten fresh or used in desserts, smoothies, and baked foods.",
    "question": "What is a banana?"
  },
  {
    "id": 6934,
    "category": "Fruits",
    "text": "Oranges are citrus fruits known for their juicy segments and sweet or acidic flavor and are commonly eaten fresh or made into juice.",
    "question": "What is an orange?"
  },
  {
    "id": 6935,
    "category": "Fruits",
    "text": "Lemons are citrus fruits with acidic juice that is widely used to flavor food and beverages.",
    "question": "What is a lemon?"
  },
  {
    "id": 6936,
    "category": "Fruits",
    "text": "Limes are small citrus fruits with acidic juice and a distinctive flavor commonly used in drinks, sauces, desserts, and many cuisines.",
    "question": "What is a lime?"
  },
  {
    "id": 6937,
    "category": "Fruits",
    "text": "Grapes are small fruits that grow in clusters on vines and can be eaten fresh or dried into raisins.",
    "question": "What are grapes?"
  },
  {
    "id": 6938,
    "category": "Fruits",
    "text": "Strawberries are red fruits with a sweet flavor and numerous tiny seeds on their outer surface.",
    "question": "What is a strawberry?"
  },
  {
    "id": 6939,
    "category": "Fruits",
    "text": "Blueberries are small blue or purple berries commonly eaten fresh or used in cereals, desserts, sauces, and baked foods.",
    "question": "What are blueberries?"
  },
  {
    "id": 6940,
    "category": "Fruits",
    "text": "Raspberries are small aggregate fruits made of many tiny sections and are commonly eaten fresh or used in desserts and preserves.",
    "question": "What are raspberries?"
  },
  {
    "id": 6941,
    "category": "Fruits",
    "text": "Blackberries are dark-colored aggregate fruits with a sweet and sometimes slightly acidic flavor.",
    "question": "What are blackberries?"
  },
  {
    "id": 6942,
    "category": "Fruits",
    "text": "Cherries are small stone fruits that can be sweet or sour and are eaten fresh or used in desserts, preserves, and drinks.",
    "question": "What are cherries?"
  },
  {
    "id": 6943,
    "category": "Fruits",
    "text": "Peaches are soft stone fruits with sweet flesh and a characteristic fuzzy skin.",
    "question": "What is a peach?"
  },
  {
    "id": 6944,
    "category": "Fruits",
    "text": "Apricots are small orange-colored stone fruits with soft flesh and a sweet, slightly tart flavor.",
    "question": "What is an apricot?"
  },
  {
    "id": 6947,
    "category": "Fruits",
    "text": "Pears are sweet fruits with a soft, juicy texture and a characteristic shape that is wider at the bottom. They can be eaten fresh or used in desserts, salads, preserves, and baked dishes.",
    "question": "What is a pear?"
  },
  {
    "id": 6948,
    "category": "Fruits",
    "text": "Pineapples are tropical fruits with a tough, patterned outer skin and sweet, juicy flesh. They are eaten fresh and are also used in juices, desserts, salads, and cooked dishes.",
    "question": "What is a pineapple?"
  },
  {
    "id": 6949,
    "category": "Fruits",
    "text": "Mangoes are tropical stone fruits with sweet, juicy flesh and a large central seed. They are commonly eaten fresh and used in smoothies, desserts, sauces, salads, and chutneys.",
    "question": "What is a mango?"
  },
  {
    "id": 6950,
    "category": "Fruits",
    "text": "Watermelons are large fruits with a high water content and sweet flesh that is usually red or pink. They are commonly eaten fresh, especially during warm weather, and are used in salads and drinks.",
    "question": "What is a watermelon?"
  },
  {
    "id": 6951,
    "category": "Fruits",
    "text": "Melons are fruits with sweet, juicy flesh and a thick outer rind. Common varieties include cantaloupe and honeydew, which are often eaten fresh or added to fruit salads.",
    "question": "What are melons?"
  },
  {
    "id": 6952,
    "category": "Fruits",
    "text": "Kiwi is a small fruit with brown, fuzzy skin and bright green or yellow flesh containing many tiny edible seeds. It has a sweet and slightly acidic flavor and is commonly eaten fresh.",
    "question": "What is a kiwi?"
  },
  {
    "id": 6953,
    "category": "Fruits",
    "text": "Papayas are tropical fruits with soft orange or yellow flesh and many black seeds in the center. They are usually eaten fresh and can also be used in salads, smoothies, and desserts.",
    "question": "What is a papaya?"
  },
  {
    "id": 6954,
    "category": "Fruits",
    "text": "Guavas are tropical fruits with aromatic flesh that can be white, yellow, pink, or red depending on the variety. They are eaten fresh and are also used for juices, jams, and desserts.",
    "question": "What is a guava?"
  },
  {
    "id": 6955,
    "category": "Fruits",
    "text": "Pomegranates are fruits with a tough outer skin and hundreds of juicy edible seeds called arils. The seeds have a sweet and tart flavor and are commonly eaten fresh or added to salads and desserts.",
    "question": "What is a pomegranate?"
  },
  {
    "id": 6956,
    "category": "Fruits",
    "text": "Figs are soft fruits containing many tiny edible seeds and have a naturally sweet flavor. They can be eaten fresh or dried and are commonly used in desserts, salads, and preserves.",
    "question": "What is a fig?"
  },
  {
    "id": 6957,
    "category": "Fruits",
    "text": "Dates are sweet fruits that grow on date palms and are often dried before being eaten. They are naturally rich in sugars and are commonly used as snacks, desserts, and ingredients in sweet dishes.",
    "question": "What are dates?"
  },
  {
    "id": 6958,
    "category": "Fruits",
    "text": "Coconuts are large tropical fruits with a hard shell, fibrous outer layer, white edible flesh, and coconut water inside. Coconut products are widely used in cooking, baking, drinks, and desserts.",
    "question": "What is a coconut?"
  },
  {
    "id": 6959,
    "category": "Fruits",
    "text": "Avocados are fruits with creamy green flesh surrounding a large central seed. They are relatively high in fat, especially monounsaturated fat, and are commonly used in salads, spreads, sauces, and guacamole.",
    "question": "What is an avocado?"
  },
  {
    "id": 6960,
    "category": "Fruits",
    "text": "Grapefruit is a large citrus fruit with juicy segments and a flavor ranging from sweet to distinctly bitter. It is commonly eaten fresh or used to make juice.",
    "question": "What is grapefruit?"
  },

  {
    "id": 6961,
    "category": "Vegetables",
    "text": "Vegetables are edible parts of plants that are commonly used as food, including roots, stems, leaves, flowers, and immature fruits. They are important sources of vitamins, minerals, fiber, and other nutrients.",
    "question": "What are vegetables?"
  },
  {
    "id": 6962,
    "category": "Vegetables",
    "text": "Carrots are root vegetables with a naturally sweet flavor and are usually orange, although other varieties can be purple, yellow, red, or white. They can be eaten raw or cooked in many dishes.",
    "question": "What is a carrot?"
  },
  {
    "id": 6963,
    "category": "Vegetables",
    "text": "Potatoes are starchy underground tubers of the potato plant and are one of the world's most important food crops. They can be boiled, baked, fried, mashed, roasted, or used in many other dishes.",
    "question": "What is a potato?"
  },
  {
    "id": 6964,
    "category": "Vegetables",
    "text": "Sweet potatoes are edible underground storage roots with naturally sweet flesh. They can have orange, white, yellow, or purple flesh and are commonly baked, boiled, roasted, or mashed.",
    "question": "What is a sweet potato?"
  },
  {
    "id": 6965,
    "category": "Vegetables",
    "text": "Tomatoes are edible fruits that are commonly treated as vegetables in cooking. They can be eaten raw or cooked and are widely used in salads, sauces, soups, and many other dishes.",
    "question": "What is a tomato?"
  },
  {
    "id": 6966,
    "category": "Vegetables",
    "text": "Cucumbers are long, watery fruits that are commonly used as vegetables in cooking. They are usually eaten raw in salads and sandwiches but can also be pickled or cooked.",
    "question": "What is a cucumber?"
  },
  {
    "id": 6967,
    "category": "Vegetables",
    "text": "Onions are bulb vegetables with layered flesh and a strong flavor that becomes sweeter and milder when cooked. They are used as a basic ingredient in countless soups, sauces, stews, salads, and other dishes.",
    "question": "What is an onion?"
  },
  {
    "id": 6968,
    "category": "Vegetables",
    "text": "Garlic is a bulb-forming plant closely related to onions and is valued for its strong aroma and flavor. Individual cloves are used fresh, cooked, dried, or processed into sauces and seasonings.",
    "question": "What is garlic?"
  },
  {
    "id": 6969,
    "category": "Vegetables",
    "text": "Cabbage is a leafy vegetable that forms a compact head of overlapping leaves. It can be eaten raw or cooked and is used in salads, soups, stews, fermented foods, and side dishes.",
    "question": "What is cabbage?"
  },
  {
    "id": 6970,
    "category": "Vegetables",
    "text": "Lettuce is a leafy vegetable commonly eaten raw in salads and sandwiches. Different varieties range from crisp and crunchy to soft and delicate in texture.",
    "question": "What is lettuce?"
  },
  {
    "id": 6971,
    "category": "Vegetables",
    "text": "Spinach is a leafy green vegetable that can be eaten raw or cooked. It is commonly used in salads, soups, sauces, pastries, and many cooked dishes.",
    "question": "What is spinach?"
  },
  {
    "id": 6972,
    "category": "Vegetables",
    "text": "Broccoli is a green vegetable with a thick stem and branching clusters of edible flower buds. It is commonly steamed, boiled, roasted, stir-fried, or eaten raw.",
    "question": "What is broccoli?"
  },
  {
    "id": 6973,
    "category": "Vegetables",
    "text": "Cauliflower is a vegetable with a compact head made of undeveloped flower structures. It is commonly boiled, steamed, roasted, fried, or used as an ingredient in soups and other dishes.",
    "question": "What is cauliflower?"
  },
  {
    "id": 6974,
    "category": "Vegetables",
    "text": "Bell peppers are fruits commonly used as vegetables and are available in colors such as green, red, yellow, and orange. They have a crisp texture and are eaten raw, roasted, grilled, or cooked.",
    "question": "What are bell peppers?"
  },
  {
    "id": 6975,
    "category": "Vegetables",
    "text": "Chili peppers are fruits from plants of the Capsicum genus that contain varying amounts of capsaicin, the compound responsible for their heat. They are used fresh, dried, powdered, or in sauces.",
    "question": "What are chili peppers?"
  },
  {
    "id": 6976,
    "category": "Vegetables",
    "text": "Eggplants are fruits commonly used as vegetables, with smooth skin and soft flesh that becomes tender when cooked. They are widely used in Mediterranean, Middle Eastern, Asian, and other cuisines.",
    "question": "What is an eggplant?"
  },
  {
    "id": 6977,
    "category": "Vegetables",
    "text": "Zucchini is a type of summer squash with tender flesh and edible skin. It can be grilled, fried, baked, steamed, stuffed, or eaten raw.",
    "question": "What is zucchini?"
  },
  {
    "id": 6978,
    "category": "Vegetables",
    "text": "Peas are small edible seeds that grow inside pods on pea plants. They are commonly eaten fresh, frozen, or dried and are used in soups, stews, salads, and side dishes.",
    "question": "What are peas?"
  },
  {
    "id": 6979,
    "category": "Vegetables",
    "text": "Corn is a cereal grain that is commonly eaten as a vegetable when harvested while immature. Its kernels can be boiled, grilled, roasted, canned, or processed into many other foods.",
    "question": "What is corn?"
  },
  {
    "id": 6980,
    "category": "Vegetables",
    "text": "Mushrooms are fungi rather than plants, but they are commonly used as vegetables in cooking. Edible mushrooms have many varieties and can be sautéed, grilled, roasted, boiled, or added to soups and sauces.",
    "question": "What are mushrooms?"
  },

  {
    "id": 6981,
    "category": "Grains and Cereals",
    "text": "Grains are edible seeds of grasses and are major staple foods around the world. Important grains include wheat, rice, corn, barley, oats, rye, millet, and sorghum.",
    "question": "What are grains?"
  },
  {
    "id": 6982,
    "category": "Grains and Cereals",
    "text": "Wheat is one of the world's most widely cultivated cereal grains and is used to make flour, bread, pasta, cereals, and many other foods.",
    "question": "What is wheat?"
  },
  {
    "id": 6983,
    "category": "Grains and Cereals",
    "text": "Rice is a cereal grain that is a major staple food for billions of people, particularly in Asia. It is available in many varieties and can be boiled, steamed, fried, or processed into other foods.",
    "question": "What is rice?"
  },
  {
    "id": 6984,
    "category": "Grains and Cereals",
    "text": "Oats are cereal grains commonly eaten as porridge, oatmeal, breakfast cereals, and baked foods. They contain carbohydrates, protein, fiber, vitamins, and minerals.",
    "question": "What are oats?"
  },
  {
    "id": 6985,
    "category": "Grains and Cereals",
    "text": "Barley is an ancient cereal grain used for food, animal feed, and the production of malt. It can be used in soups, stews, breads, and other foods.",
    "question": "What is barley?"
  },
  {
    "id": 6986,
    "category": "Grains and Cereals",
    "text": "Rye is a cereal grain related to wheat and barley and is commonly used to make bread, crackers, and other baked foods. Rye flour has a distinctive flavor and darker appearance than many wheat flours.",
    "question": "What is rye?"
  },
  {
    "id": 6987,
    "category": "Grains and Cereals",
    "text": "Millet is a group of small-seeded cereal grains that can grow in relatively dry conditions. It is eaten as a cooked grain and can also be ground into flour.",
    "question": "What is millet?"
  },
  {
    "id": 6988,
    "category": "Grains and Cereals",
    "text": "Quinoa is a seed that is commonly prepared and eaten like a grain. It contains protein, carbohydrates, fiber, and minerals and is naturally gluten-free.",
    "question": "What is quinoa?"
  },
  {
    "id": 6989,
    "category": "Grains and Cereals",
    "text": "Cornmeal is a coarse or finely ground flour made from dried corn kernels. It is used to make foods such as cornbread, polenta, tortillas, and other dishes.",
    "question": "What is cornmeal?"
  },
  {
    "id": 6990,
    "category": "Grains and Cereals",
    "text": "Cereal is a food made primarily from processed grains and is often eaten as a breakfast food. Breakfast cereals can be served with milk, yogurt, fruit, or other ingredients.",
    "question": "What is cereal?"
  },

  {
    "id": 6991,
    "category": "Legumes",
    "text": "Legumes are plants in the bean family that produce seeds inside pods. Important edible legumes include beans, lentils, peas, chickpeas, and soybeans.",
    "question": "What are legumes?"
  },
  {
    "id": 6992,
    "category": "Legumes",
    "text": "Beans are edible seeds of various legume plants and are important sources of protein, carbohydrates, fiber, vitamins, and minerals. They can be eaten fresh, dried, canned, or cooked into many dishes.",
    "question": "What are beans?"
  },
  {
    "id": 6993,
    "category": "Legumes",
    "text": "Lentils are small edible seeds from legume plants that cook relatively quickly compared with many dried beans. They are commonly used in soups, stews, salads, and vegetarian dishes.",
    "question": "What are lentils?"
  },
  {
    "id": 6994,
    "category": "Legumes",
    "text": "Chickpeas are round, beige legumes also known as garbanzo beans. They are used in dishes such as hummus, salads, soups, stews, and curries.",
    "question": "What are chickpeas?"
  },
  {
    "id": 6995,
    "category": "Legumes",
    "text": "Soybeans are legumes that are rich in protein and oil and are used to make foods such as tofu, tempeh, soy milk, and soy sauce. They are also widely used as animal feed and in food manufacturing.",
    "question": "What are soybeans?"
  },
  {
    "id": 6996,
    "category": "Nuts and Seeds",
    "text": "Nuts are edible seeds or fruits with a relatively hard outer covering and are generally rich in fats, protein, and minerals. Common culinary nuts include almonds, walnuts, hazelnuts, pistachios, and cashews.",
    "question": "What are nuts?"
  },
  {
    "id": 6997,
    "category": "Nuts and Seeds",
    "text": "Almonds are edible seeds of the almond tree and are commonly eaten raw, roasted, salted, or processed into flour, butter, and milk. They are rich in fat, protein, fiber, and several minerals.",
    "question": "What are almonds?"
  },
  {
    "id": 6998,
    "category": "Nuts and Seeds",
    "text": "Walnuts are edible nuts with a hard shell and a distinctive wrinkled kernel. They are commonly eaten as snacks or added to salads, desserts, breads, and other dishes.",
    "question": "What are walnuts?"
  },
  {
    "id": 6999,
    "category": "Nuts and Seeds",
    "text": "Hazelnuts are round nuts with a brown shell and a rich, slightly sweet flavor. They are widely used in chocolate products, spreads, desserts, baked foods, and snacks.",
    "question": "What are hazelnuts?"
  },
  {
    "id": 7000,
    "category": "Nuts and Seeds",
    "text": "Peanuts are legumes rather than true botanical nuts, but they are commonly treated as nuts in food. They are eaten roasted or boiled and are also used to make peanut butter, oils, sauces, and confectionery.",
    "question": "What are peanuts?"
  },
  {
    "id": 7001,
    "category": "Nuts and Seeds",
    "text": "Cashews are kidney-shaped seeds with a creamy texture and mild flavor. They are commonly eaten roasted or salted and are also used in sauces, desserts, nut butters, and plant-based foods.",
    "question": "What are cashews?"
  },
  {
    "id": 7002,
    "category": "Nuts and Seeds",
    "text": "Pistachios are small seeds enclosed in naturally opening shells and have a distinctive green and purple appearance. They are eaten as snacks and used in desserts, ice cream, sauces, and confectionery.",
    "question": "What are pistachios?"
  },
  {
    "id": 7003,
    "category": "Nuts and Seeds",
    "text": "Sunflower seeds are edible seeds produced by the sunflower plant. They are eaten as snacks and are also used in breads, salads, spreads, and cooking oils.",
    "question": "What are sunflower seeds?"
  },
  {
    "id": 7004,
    "category": "Nuts and Seeds",
    "text": "Sesame seeds are small oil-rich seeds used widely in Asian, Middle Eastern, Mediterranean, and other cuisines. They can be used whole, ground into tahini, or pressed to produce sesame oil.",
    "question": "What are sesame seeds?"
  },
  {
    "id": 7005,
    "category": "Nuts and Seeds",
    "text": "Chia seeds are tiny seeds that can absorb a large amount of liquid and form a gel-like texture. They are commonly added to yogurt, oatmeal, smoothies, puddings, and baked foods.",
    "question": "What are chia seeds?"
  },
  {
    "id": 7006,
    "category": "Nuts and Seeds",
    "text": "Flaxseeds are small brown or golden seeds that contain fiber, fats, and other nutrients. They can be eaten whole or ground and are commonly added to breads, cereals, smoothies, and other foods.",
    "question": "What are flaxseeds?"
  },

  {
    "id": 7007,
    "category": "Meat",
    "text": "Meat is animal tissue used as food and is an important source of protein, fats, vitamins, and minerals. Common meats include beef, pork, lamb, goat, and poultry.",
    "question": "What is meat?"
  },
  {
    "id": 7008,
    "category": "Meat",
    "text": "Beef is meat obtained from cattle and is commonly used in steaks, burgers, stews, roasts, and many other dishes. Different cuts of beef vary considerably in tenderness, fat content, and cooking method.",
    "question": "What is beef?"
  },
  {
    "id": 7009,
    "category": "Meat",
    "text": "Pork is meat from domestic pigs and is eaten in many forms, including fresh cuts, sausages, ham, bacon, and cured products. It can be roasted, grilled, fried, braised, or cooked in stews.",
    "question": "What is pork?"
  },
  {
    "id": 7010,
    "category": "Meat",
    "text": "Lamb is meat from a young sheep, while meat from older sheep is generally called mutton. Lamb is commonly roasted, grilled, stewed, or used in kebabs and other traditional dishes.",
    "question": "What is lamb?"
  },
  {
    "id": 7011,
    "category": "Meat",
    "text": "Goat meat is eaten in many parts of the world and is particularly common in South Asian, Middle Eastern, African, Caribbean, and Mediterranean cuisines. It is often slow-cooked, stewed, grilled, or roasted.",
    "question": "What is goat meat?"
  },
  {
    "id": 7012,
    "category": "Meat",
    "text": "Game meat comes from wild animals that are hunted for food rather than raised as livestock. Examples include venison, wild boar, rabbit, and some wild birds.",
    "question": "What is game meat?"
  },
  {
    "id": 7013,
    "category": "Meat",
    "text": "Processed meat is meat that has been transformed through methods such as salting, curing, smoking, fermentation, or other processing. Examples include ham, bacon, sausages, and some deli meats.",
    "question": "What is processed meat?"
  },
  {
    "id": 7014,
    "category": "Meat",
    "text": "Steak is a relatively thick cut of meat, most commonly beef, that is usually cooked by grilling, pan-frying, or broiling. Different cuts have different levels of tenderness and fat.",
    "question": "What is a steak?"
  },
  {
    "id": 7015,
    "category": "Meat",
    "text": "A hamburger is a dish made from a ground meat patty, traditionally beef, usually served inside a sliced bun with toppings and sauces. Many variations use chicken, pork, vegetables, or plant-based ingredients instead.",
    "question": "What is a hamburger?"
  },
  {
    "id": 7016,
    "category": "Meat",
    "text": "Sausage is a food made from ground meat or other ingredients that are seasoned and usually formed into a casing or similar shape. Sausages can be fresh, cooked, smoked, dried, or fermented.",
    "question": "What is a sausage?"
  },
  {
    "id": 7017,
    "category": "Meat",
    "text": "Bacon is a cured meat traditionally made from pork belly or other pork cuts. It is commonly fried, baked, or grilled and used in breakfasts, sandwiches, salads, and other dishes.",
    "question": "What is bacon?"
  },
  {
    "id": 7018,
    "category": "Meat",
    "text": "Ham is meat from the hind leg of a pig that is commonly cured and sometimes smoked or cooked. It can be eaten cold in sandwiches or served hot as part of a meal.",
    "question": "What is ham?"
  },

  {
    "id": 7019,
    "category": "Poultry",
    "text": "Poultry refers to domesticated birds raised for meat, eggs, or both. Common poultry includes chickens, turkeys, ducks, and geese.",
    "question": "What is poultry?"
  },
  {
    "id": 7020,
    "category": "Poultry",
    "text": "Chicken is the meat of domesticated chickens and is one of the most widely consumed meats in the world. It can be baked, roasted, grilled, fried, boiled, or used in countless dishes.",
    "question": "What is chicken?"
  },
  {
    "id": 7021,
    "category": "Poultry",
    "text": "Turkey is a large domesticated bird commonly raised for meat. Turkey is often roasted for large meals and is also used in sandwiches, burgers, sausages, and other foods.",
    "question": "What is turkey meat?"
  },
  {
    "id": 7022,
    "category": "Poultry",
    "text": "Duck is poultry with relatively rich and fatty meat compared with chicken. It is commonly roasted, braised, grilled, or used in Asian and European dishes.",
    "question": "What is duck meat?"
  },

  {
    "id": 7023,
    "category": "Fish and Seafood",
    "text": "Fish is an important food source containing protein, fats, vitamins, and minerals, with many species also providing omega-3 fatty acids. Fish can be baked, grilled, fried, steamed, smoked, or eaten in other preparations.",
    "question": "What is fish?"
  },
  {
    "id": 7024,
    "category": "Fish and Seafood",
    "text": "Salmon is an oily fish known for its orange to pink flesh and relatively high content of omega-3 fatty acids. It is commonly baked, grilled, smoked, poached, or eaten raw in suitable preparations.",
    "question": "What is salmon?"
  },
  {
    "id": 7025,
    "category": "Fish and Seafood",
    "text": "Tuna is a group of large marine fish commonly eaten fresh or canned. It is widely used in salads, sandwiches, sushi, and many other dishes.",
    "question": "What is tuna?"
  },
  {
    "id": 7026,
    "category": "Fish and Seafood",
    "text": "Cod is a relatively mild-flavored white fish with firm flesh that is widely used as food. It is commonly baked, fried, grilled, poached, or used in fish dishes.",
    "question": "What is cod?"
  },
  {
    "id": 7027,
    "category": "Fish and Seafood",
    "text": "Sardines are small oily fish that are commonly sold fresh, canned, smoked, or preserved in oil or other liquids. They are eaten in many coastal and Mediterranean cuisines.",
    "question": "What are sardines?"
  },
  {
    "id": 7028,
    "category": "Fish and Seafood",
    "text": "Seafood is food obtained from aquatic animals and includes fish, shellfish, crustaceans, and mollusks. Seafood is an important part of many coastal cuisines around the world.",
    "question": "What is seafood?"
  },
  {
    "id": 7029,
    "category": "Fish and Seafood",
    "text": "Shrimp are small crustaceans commonly eaten as seafood and are found in both marine and freshwater environments. They can be boiled, grilled, fried, steamed, or added to many dishes.",
    "question": "What are shrimp?"
  },
  {
    "id": 7030,
    "category": "Fish and Seafood",
    "text": "Crabs are crustaceans with hard shells and claws that are eaten as seafood in many parts of the world. Their meat is commonly boiled, steamed, baked, or used in soups and other dishes.",
    "question": "What are crabs?"
  },
  {
    "id": 7031,
    "category": "Fish and Seafood",
    "text": "Lobsters are large marine crustaceans with hard shells and prominent claws in some species. Their meat is considered a delicacy and is commonly boiled, steamed, baked, or grilled.",
    "question": "What are lobsters?"
  },
  {
    "id": 7032,
    "category": "Fish and Seafood",
    "text": "Mussels are edible marine or freshwater bivalve mollusks enclosed by two shells. They are commonly steamed or cooked in sauces, soups, and seafood dishes.",
    "question": "What are mussels?"
  },
  {
    "id": 7033,
    "category": "Fish and Seafood",
    "text": "Oysters are bivalve mollusks that live in marine environments and are eaten raw or cooked. They are also important in aquaculture and can help filter water in coastal ecosystems.",
    "question": "What are oysters?"
  },
  {
    "id": 7034,
    "category": "Fish and Seafood",
    "text": "Squid are marine mollusks with elongated bodies and tentacles that are commonly eaten as seafood. They can be grilled, fried, braised, or used in dishes such as calamari.",
    "question": "What is squid?"
  },

  {
    "id": 7035,
    "category": "Eggs and Dairy",
    "text": "Eggs are reproductive structures produced by birds and some other animals, and chicken eggs are among the most commonly eaten. They provide protein, fats, vitamins, and minerals and can be prepared in many ways.",
    "question": "What are eggs?"
  },
  {
    "id": 7036,
    "category": "Eggs and Dairy",
    "text": "A chicken egg has several main parts, including the shell, egg white, and yolk. The shell protects the contents, while the white and yolk contain nutrients used by a developing embryo.",
    "question": "What are the parts of an egg?"
  },
  {
    "id": 7037,
    "category": "Eggs and Dairy",
    "text": "Milk is a nutrient-rich liquid produced by female mammals to feed their young. Cow's milk is widely consumed and is also processed into cheese, yogurt, butter, cream, and other foods.",
    "question": "What is milk?"
  },
  {
    "id": 7038,
    "category": "Eggs and Dairy",
    "text": "Cream is the higher-fat portion of milk that rises or is separated during processing. It is used in sauces, soups, desserts, whipped cream, and many other foods.",
    "question": "What is cream?"
  },
  {
    "id": 7039,
    "category": "Eggs and Dairy",
    "text": "Butter is a dairy product made by churning cream until the fat separates from the liquid portion. It is widely used for cooking, baking, spreading, and making sauces.",
    "question": "What is butter?"
  },
  {
    "id": 7040,
    "category": "Eggs and Dairy",
    "text": "Cheese is a dairy food made by coagulating milk and separating the solid curds from the liquid whey, followed by processes that vary by type. There are hundreds of varieties with different textures, flavors, and aging methods.",
    "question": "What is cheese?"
  },
  {
    "id": 7041,
    "category": "Eggs and Dairy",
    "text": "Yogurt is a fermented dairy product made by allowing specific bacteria to ferment milk. It has a thick texture and mildly acidic flavor and can be eaten plain or with fruit, grains, or other ingredients.",
    "question": "What is yogurt?"
  },
  {
    "id": 7042,
    "category": "Eggs and Dairy",
    "text": "Cottage cheese is a fresh cheese made from curds of cow's milk and has a soft, lumpy texture. It is commonly eaten as a snack or used in salads, desserts, and cooked dishes.",
    "question": "What is cottage cheese?"
  },
  {
    "id": 7043,
    "category": "Eggs and Dairy",
    "text": "Mozzarella is a soft, mild cheese traditionally associated with Italian cuisine. It is commonly made from cow's or buffalo's milk and is widely used on pizza, in salads, and in cooked dishes.",
    "question": "What is mozzarella?"
  },
  {
    "id": 7044,
    "category": "Eggs and Dairy",
    "text": "Feta is a brined cheese traditionally associated with Greece and commonly made from sheep's milk or mixtures containing goat's milk. It has a crumbly texture and salty, tangy flavor.",
    "question": "What is feta cheese?"
  },

  {
    "id": 7045,
    "category": "Bread and Bakery",
    "text": "Bread is a baked food usually made from flour and water and often containing yeast or another leavening agent. It is one of the oldest and most widely consumed staple foods.",
    "question": "What is bread?"
  },
  {
    "id": 7046,
    "category": "Bread and Bakery",
    "text": "White bread is made primarily from refined wheat flour in which much of the bran and germ have been removed. It usually has a soft texture and light-colored crumb.",
    "question": "What is white bread?"
  },
  {
    "id": 7047,
    "category": "Bread and Bakery",
    "text": "Whole-wheat bread is made using flour that contains the whole wheat grain, including the bran, germ, and endosperm. It generally contains more fiber and nutrients than bread made from refined flour.",
    "question": "What is whole-wheat bread?"
  },
  {
    "id": 7048,
    "category": "Bread and Bakery",
    "text": "Sourdough bread is made using a fermented starter containing wild yeasts and lactic acid bacteria. Fermentation gives sourdough its characteristic tangy flavor, aroma, and texture.",
    "question": "What is sourdough bread?"
  },
  {
    "id": 7049,
    "category": "Bread and Bakery",
    "text": "A baguette is a long, narrow French bread with a crisp crust and relatively airy interior. It is commonly eaten fresh and used for sandwiches or served alongside meals.",
    "question": "What is a baguette?"
  },
  {
    "id": 7050,
    "category": "Bread and Bakery",
    "text": "A croissant is a buttery, flaky pastry made from laminated dough containing layers of dough and fat. It is traditionally associated with French and Austrian baking traditions.",
    "question": "What is a croissant?"
  },
  {
    "id": 7051,
    "category": "Bread and Bakery",
    "text": "A pastry is a baked food made from dough that commonly contains flour and fat and may also contain sugar, eggs, or other ingredients. Pastries include many different sweet and savory foods.",
    "question": "What is pastry?"
  },
  {
    "id": 7052,
    "category": "Bread and Bakery",
    "text": "A cake is a sweet baked food usually made from flour, sugar, eggs, and fat, although recipes vary widely. Cakes can be flavored, filled, layered, and decorated in many different ways.",
    "question": "What is a cake?"
  },
  {
    "id": 7053,
    "category": "Bread and Bakery",
    "text": "A biscuit is a baked food whose meaning varies by region. In the United States it usually refers to a soft, leavened bread-like food, while in many other countries it commonly means a crisp sweet baked product.",
    "question": "What is a biscuit?"
  },
  {
    "id": 7054,
    "category": "Bread and Bakery",
    "text": "A cookie is a small, usually sweet baked food made from dough or batter. Cookies can contain ingredients such as chocolate, nuts, dried fruit, spices, or oats.",
    "question": "What is a cookie?"
  },

  {
    "id": 7055,
    "category": "Pasta and Noodles",
    "text": "Pasta is a food traditionally made from wheat flour and water, sometimes with eggs, and formed into many different shapes. It is a major part of Italian cuisine and is now eaten worldwide.",
    "question": "What is pasta?"
  },
  {
    "id": 7056,
    "category": "Pasta and Noodles",
    "text": "Spaghetti is a long, thin type of pasta with a cylindrical shape. It is commonly served with tomato sauces, meat sauces, seafood, vegetables, cheese, or olive oil.",
    "question": "What is spaghetti?"
  },
  {
    "id": 7057,
    "category": "Pasta and Noodles",
    "text": "Penne is a short, tube-shaped pasta with diagonally cut ends. Its shape allows it to hold sauces and makes it suitable for baked pasta dishes, salads, and many sauces.",
    "question": "What is penne?"
  },
  {
    "id": 7058,
    "category": "Pasta and Noodles",
    "text": "Lasagna is a baked Italian dish made with layers of flat pasta, sauce, cheese, and often meat or vegetables. The layered structure makes it a substantial and widely recognized pasta dish.",
    "question": "What is lasagna?"
  },
  {
    "id": 7059,
    "category": "Pasta and Noodles",
    "text": "Noodles are elongated strips or strands of dough made from ingredients such as wheat, rice, buckwheat, or other grains. They are important in many Asian and other culinary traditions.",
    "question": "What are noodles?"
  },
  {
    "id": 7060,
    "category": "Pasta and Noodles",
    "text": "Ramen is a Japanese noodle dish consisting of wheat noodles served in a broth with various toppings. Common additions include meat, seafood, eggs, vegetables, and seaweed.",
    "question": "What is ramen?"
  },
  {
    "id": 7061,
    "category": "Pasta and Noodles",
    "text": "Couscous consists of small granules traditionally made from semolina wheat. It is commonly steamed or prepared with hot liquid and served with vegetables, meat, seafood, or sauces.",
    "question": "What is couscous?"
  },

  {
    "id": 7062,
    "category": "Cooking",
    "text": "Cooking is the preparation of food using heat or other techniques to make it safer, more digestible, more flavorful, or easier to eat. Common cooking methods include boiling, frying, baking, roasting, and steaming.",
    "question": "What is cooking?"
  },
  {
    "id": 7063,
    "category": "Cooking",
    "text": "Boiling cooks food in liquid that has reached its boiling point. It is commonly used for pasta, potatoes, vegetables, eggs, grains, and many other foods.",
    "question": "What is boiling?"
  },
  {
    "id": 7064,
    "category": "Cooking",
    "text": "Simmering cooks food in liquid kept just below or around the boiling point, producing gentle bubbles. It is commonly used for soups, sauces, stews, and slowly cooked dishes.",
    "question": "What is simmering?"
  },
  {
    "id": 7065,
    "category": "Cooking",
    "text": "Steaming cooks food using hot water vapor rather than placing the food directly in the water. It is commonly used for vegetables, fish, dumplings, and some grains.",
    "question": "What is steaming?"
  },
  {
    "id": 7066,
    "category": "Cooking",
    "text": "Frying cooks food in hot oil or another fat and can produce a crisp outer surface. Common forms include shallow frying, deep frying, and pan frying.",
    "question": "What is frying?"
  },
  {
    "id": 7067,
    "category": "Cooking",
    "text": "Deep frying cooks food by completely or mostly immersing it in hot oil. The high temperature rapidly forms a crisp outer layer while cooking the inside.",
    "question": "What is deep frying?"
  },
  {
    "id": 7068,
    "category": "Cooking",
    "text": "Grilling cooks food using direct heat, often from gas, charcoal, or an electric heating element. It is commonly used for meat, fish, vegetables, and sandwiches.",
    "question": "What is grilling?"
  },
  {
    "id": 7069,
    "category": "Cooking",
    "text": "Roasting cooks food using dry heat, usually in an oven or over another source of indirect heat. It is commonly used for meat, poultry, vegetables, and nuts.",
    "question": "What is roasting?"
  },
  {
    "id": 7070,
    "category": "Cooking",
    "text": "Baking cooks food using dry heat, usually inside an oven. It is especially important for bread, cakes, pastries, pies, casseroles, and other foods.",
    "question": "What is baking?"
  },
  {
    "id": 7071,
    "category": "Cooking",
    "text": "Sautéing cooks relatively small pieces of food quickly in a small amount of hot fat, usually in a pan. It is commonly used for vegetables, meat, seafood, and aromatics such as onions and garlic.",
    "question": "What is sautéing?"
  },
  {
    "id": 7072,
    "category": "Cooking",
    "text": "Stir-frying is a fast cooking technique in which small pieces of food are continuously or frequently stirred in a hot pan or wok. It is particularly associated with Chinese and other Asian cuisines.",
    "question": "What is stir-frying?"
  },
  {
    "id": 7073,
    "category": "Cooking",
    "text": "Braising combines browning food with slow cooking in a relatively small amount of liquid. It is commonly used for tougher cuts of meat because prolonged cooking can make them tender.",
    "question": "What is braising?"
  },
  {
    "id": 7074,
    "category": "Cooking",
    "text": "Stewing cooks relatively small pieces of food slowly in liquid, usually with vegetables and seasonings. The method is commonly used for meat, legumes, and hearty vegetable dishes.",
    "question": "What is stewing?"
  },
  {
    "id": 7075,
    "category": "Cooking",
    "text": "Poaching cooks delicate food gently in liquid kept below the boiling point. It is commonly used for eggs, fish, poultry, fruit, and other foods that benefit from gentle cooking.",
    "question": "What is poaching?"
  },
  {
    "id": 7076,
    "category": "Cooking",
    "text": "Blanching briefly cooks food in boiling water or steam and then often cools it rapidly. It is commonly used to prepare vegetables, loosen skins, preserve color, or prepare foods for freezing.",
    "question": "What is blanching?"
  },
  {
    "id": 7077,
    "category": "Cooking",
    "text": "Gratin is a cooking method in which food is topped with ingredients such as cheese, breadcrumbs, or butter and baked until a browned crust forms on the surface.",
    "question": "What is a gratin?"
  },
  {
    "id": 7078,
    "category": "Cooking",
    "text": "Marinating means soaking food in a seasoned liquid before cooking. Marinades can add flavor and, depending on their ingredients, may help tenderize certain foods.",
    "question": "What is marinating?"
  },
  {
    "id": 7079,
    "category": "Cooking",
    "text": "Seasoning means adding ingredients such as salt, pepper, herbs, spices, acids, or other flavoring agents to food. Proper seasoning enhances the natural flavors of ingredients.",
    "question": "What is seasoning?"
  },
  {
    "id": 7080,
    "category": "Cooking",
    "text": "A spice is a plant-derived substance used mainly to add flavor, aroma, or color to food. Spices can come from seeds, bark, roots, fruits, flowers, or other plant parts.",
    "question": "What is a spice?"
  },

  {
    "id": 7081,
    "category": "Herbs and Spices",
    "text": "Herbs are aromatic plant leaves or other tender plant parts used to flavor food. Common culinary herbs include basil, parsley, oregano, thyme, rosemary, mint, and dill.",
    "question": "What are herbs?"
  },
  {
    "id": 7082,
    "category": "Herbs and Spices",
    "text": "Basil is an aromatic herb widely used in Mediterranean and Asian cuisines. It is commonly added fresh to salads, sauces, soups, pasta dishes, and pesto.",
    "question": "What is basil?"
  },
  {
    "id": 7083,
    "category": "Herbs and Spices",
    "text": "Parsley is a green herb used fresh or dried to add flavor and color to many foods. It is commonly used in salads, soups, sauces, meat dishes, and as a garnish.",
    "question": "What is parsley?"
  },
  {
    "id": 7084,
    "category": "Herbs and Spices",
    "text": "Oregano is an aromatic herb strongly associated with Mediterranean cuisine. It is commonly used with tomatoes, meats, vegetables, sauces, pizza, and grilled foods.",
    "question": "What is oregano?"
  },
  {
    "id": 7085,
    "category": "Herbs and Spices",
    "text": "Rosemary is a strongly aromatic herb with needle-like leaves. It is commonly used with roasted meat, potatoes, vegetables, breads, and sauces.",
    "question": "What is rosemary?"
  },
  {
    "id": 7086,
    "category": "Herbs and Spices",
    "text": "Thyme is a small aromatic herb used fresh or dried in many cuisines. It is commonly added to soups, stews, sauces, meat, vegetables, and roasted dishes.",
    "question": "What is thyme?"
  },
  {
    "id": 7087,
    "category": "Herbs and Spices",
    "text": "Dill is an aromatic herb with fine green leaves and a distinctive flavor. It is commonly used with fish, potatoes, pickles, yogurt sauces, soups, and salads.",
    "question": "What is dill?"
  },
  {
    "id": 7088,
    "category": "Herbs and Spices",
    "text": "Mint is an aromatic herb with a cool, refreshing flavor. It is used in beverages, desserts, sauces, salads, meat dishes, and many Middle Eastern and Mediterranean foods.",
    "question": "What is mint?"
  },
  {
    "id": 7089,
    "category": "Herbs and Spices",
    "text": "Black pepper is a spice made from dried berries of the black pepper plant. It provides a characteristic pungent flavor and is one of the most widely used seasonings in the world.",
    "question": "What is black pepper?"
  },
  {
    "id": 7090,
    "category": "Herbs and Spices",
    "text": "Paprika is a spice made from dried and ground peppers. Depending on the variety, it can provide mild sweetness, smokiness, or varying degrees of heat and is widely used in European and other cuisines.",
    "question": "What is paprika?"
  },
  {
    "id": 7091,
    "category": "Herbs and Spices",
    "text": "Cinnamon is a spice made from the inner bark of several trees in the genus Cinnamomum. It has a warm, sweet aroma and is used in both sweet and savory foods.",
    "question": "What is cinnamon?"
  },
  {
    "id": 7092,
    "category": "Herbs and Spices",
    "text": "Ginger is a flowering plant whose underground rhizome is widely used as a spice and flavoring. Fresh or dried ginger is used in drinks, desserts, sauces, curries, and many Asian dishes.",
    "question": "What is ginger?"
  },
  {
    "id": 7093,
    "category": "Herbs and Spices",
    "text": "Turmeric is a yellow-orange spice made from the dried and ground rhizome of the turmeric plant. It is widely used in South Asian cooking and gives many dishes their characteristic color.",
    "question": "What is turmeric?"
  },
  {
    "id": 7094,
    "category": "Herbs and Spices",
    "text": "Cumin is a spice made from the dried seeds of the cumin plant. It has a warm, earthy flavor and is commonly used in Middle Eastern, Indian, Mexican, and other cuisines.",
    "question": "What is cumin?"
  },
  {
    "id": 7095,
    "category": "Herbs and Spices",
    "text": "Vanilla is a flavoring obtained from the cured pods of vanilla orchids. It has a sweet, aromatic flavor and is widely used in desserts, baked foods, chocolate, and beverages.",
    "question": "What is vanilla?"
  },

  {
    "id": 7096,
    "category": "Food Ingredients",
    "text": "Salt is a mineral substance composed primarily of sodium chloride and is one of the most common food seasonings. It enhances flavor and is also important in food preservation and processing.",
    "question": "What is salt?"
  },
  {
    "id": 7097,
    "category": "Food Ingredients",
    "text": "Sugar is a group of sweet-tasting carbohydrates found naturally in foods and widely used as a food ingredient. Common added sugars include sucrose, glucose, and fructose.",
    "question": "What is sugar?"
  },
  {
    "id": 7098,
    "category": "Food Ingredients",
    "text": "Honey is a sweet substance produced by bees from flower nectar and stored in honeycombs. It is eaten as a sweetener and used in drinks, desserts, sauces, and baked foods.",
    "question": "What is honey?"
  },
  {
    "id": 7099,
    "category": "Food Ingredients",
    "text": "Flour is a powder made by grinding grains, seeds, nuts, or other plant foods. Wheat flour is the most common type and is widely used in bread, pasta, cakes, and pastries.",
    "question": "What is flour?"
  },
  {
    "id": 7100,
    "category": "Food Ingredients",
    "text": "Yeast is a microorganism used in baking and fermentation. In breadmaking, yeast produces carbon dioxide during fermentation, which helps dough rise.",
    "question": "What is yeast?"
  },
  {
    "id": 7101,
    "category": "Food Ingredients",
    "text": "Baking powder is a chemical leavening agent that releases carbon dioxide when activated by moisture and heat. It helps baked foods such as cakes, muffins, and biscuits rise.",
    "question": "What is baking powder?"
  },
  {
    "id": 7102,
    "category": "Food Ingredients",
    "text": "Vinegar is an acidic liquid produced through fermentation, usually containing acetic acid. It is used for flavoring, pickling, salad dressings, sauces, and food preservation.",
    "question": "What is vinegar?"
  },
  {
    "id": 7103,
    "category": "Food Ingredients",
    "text": "Soy sauce is a dark, salty fermented sauce traditionally made from soybeans and wheat. It is widely used as a seasoning in East Asian and many other cuisines.",
    "question": "What is soy sauce?"
  },
  {
    "id": 7104,
    "category": "Food Ingredients",
    "text": "Olive oil is a vegetable oil obtained from olives and is an important ingredient in Mediterranean cuisine. It is used for cooking, dressings, marinades, sauces, and dipping.",
    "question": "What is olive oil?"
  },
  {
    "id": 7105,
    "category": "Food Ingredients",
    "text": "Vegetable oil is oil obtained from plant sources such as seeds, fruits, or nuts. Common examples include sunflower, soybean, rapeseed, corn, and peanut oils.",
    "question": "What is vegetable oil?"
  },
  {
    "id": 7106,
    "category": "Food Ingredients",
    "text": "Cornstarch is a fine powder made from corn and is commonly used as a thickening agent. It is added to sauces, soups, gravies, desserts, and some fried foods.",
    "question": "What is cornstarch?"
  },
  {
    "id": 7107,
    "category": "Food Ingredients",
    "text": "Gelatin is a protein obtained by processing collagen from animal connective tissues. It is used to give foods such as jellies, marshmallows, and some desserts a firm or gel-like texture.",
    "question": "What is gelatin?"
  },
  {
    "id": 7108,
    "category": "Food Ingredients",
    "text": "Cocoa powder is made from processed and ground cocoa solids after much of the cocoa butter has been removed. It is widely used in chocolate drinks, cakes, cookies, and desserts.",
    "question": "What is cocoa powder?"
  },
  {
    "id": 7109,
    "category": "Food Ingredients",
    "text": "Chocolate is a food made primarily from cocoa beans and commonly combined with sugar and other ingredients. Dark, milk, and white chocolate differ mainly in their ingredients and proportions.",
    "question": "What is chocolate?"
  },
  {
    "id": 7110,
    "category": "Food Ingredients",
    "text": "Dark chocolate generally contains a higher proportion of cocoa solids and less milk than milk chocolate. Its flavor is usually more intense and less sweet.",
    "question": "What is dark chocolate?"
  },
  {
    "id": 7111,
    "category": "Food Ingredients",
    "text": "Milk chocolate contains cocoa solids, sugar, and a significant amount of milk or milk products. It is generally sweeter and creamier than dark chocolate.",
    "question": "What is milk chocolate?"
  },
  {
    "id": 7112,
    "category": "Food Ingredients",
    "text": "White chocolate is made primarily from cocoa butter, sugar, and milk solids and does not contain the cocoa solids found in dark or milk chocolate. It has a sweet, creamy flavor.",
    "question": "What is white chocolate?"
  },

  {
    "id": 7113,
    "category": "Nutrition",
    "text": "Nutrition is the process by which organisms obtain and use nutrients from food. Good nutrition provides the energy and substances needed for growth, repair, movement, and normal body functions.",
    "question": "What is nutrition?"
  },
  {
    "id": 7114,
    "category": "Nutrition",
    "text": "Nutrients are substances in food that the body needs for energy, growth, repair, and normal physiological functions. They include carbohydrates, proteins, fats, vitamins, minerals, and water.",
    "question": "What are nutrients?"
  },
  {
    "id": 7115,
    "category": "Nutrition",
    "text": "Carbohydrates are nutrients made of sugars, starches, and related compounds. They are an important source of energy and are found in foods such as grains, fruits, vegetables, and legumes.",
    "question": "What are carbohydrates?"
  },
  {
    "id": 7116,
    "category": "Nutrition",
    "text": "Protein is a nutrient made of amino acids and is essential for building and repairing tissues. Protein is found in meat, fish, eggs, dairy products, legumes, nuts, seeds, and many other foods.",
    "question": "What is protein?"
  },
  {
    "id": 7117,
    "category": "Nutrition",
    "text": "Dietary fat is a concentrated source of energy and is also important for cell membranes, hormone production, and absorption of certain vitamins. Fats are found in oils, nuts, seeds, dairy products, meat, fish, and many processed foods.",
    "question": "What is dietary fat?"
  },
  {
    "id": 7118,
    "category": "Nutrition",
    "text": "Fiber is a type of carbohydrate that the human digestive system does not fully break down. It is found mainly in plant foods and supports normal bowel function and digestive health.",
    "question": "What is dietary fiber?"
  },
  {
    "id": 7119,
    "category": "Nutrition",
    "text": "Vitamins are organic compounds required by the body in relatively small amounts for normal growth and physiological functions. They are obtained mainly through food, although the body can produce limited amounts of some vitamins.",
    "question": "What are vitamins?"
  },
  {
    "id": 7120,
    "category": "Nutrition",
    "text": "Minerals are inorganic elements that the body needs for functions such as building bones, maintaining fluid balance, transmitting nerve signals, and supporting enzymes. Important dietary minerals include calcium, iron, magnesium, potassium, and zinc.",
    "question": "What are minerals in food?"
  },
  {
    "id": 7121,
    "category": "Nutrition",
    "text": "Calories are units used to express the amount of energy provided by food and beverages. The body uses this energy for basic functions, physical activity, growth, and other processes.",
    "question": "What are calories?"
  },
  {
    "id": 7122,
    "category": "Nutrition",
    "text": "A balanced diet provides a variety of foods and enough essential nutrients and energy to support health. It generally includes appropriate amounts of vegetables, fruits, grains, protein sources, and fats.",
    "question": "What is a balanced diet?"
  },
  {
    "id": 7123,
    "category": "Nutrition",
    "text": "A nutrient-dense food provides significant amounts of vitamins, minerals, protein, fiber, or other useful nutrients relative to its energy content. Examples include many vegetables, fruits, legumes, nuts, seeds, eggs, and fish.",
    "question": "What is a nutrient-dense food?"
  },
  {
    "id": 7124,
    "category": "Nutrition",
    "text": "Essential nutrients are nutrients the body cannot produce in sufficient amounts and therefore must obtain from food or other dietary sources. They include certain amino acids, fatty acids, vitamins, and minerals.",
    "question": "What are essential nutrients?"
  },
  {
    "id": 7125,
    "category": "Nutrition",
    "text": "A macronutrient is a nutrient required by the body in relatively large amounts. The main macronutrients are carbohydrates, proteins, and fats, while water is also required in large quantities.",
    "question": "What is a macronutrient?"
  },
  {
    "id": 7126,
    "category": "Nutrition",
    "text": "A micronutrient is a nutrient needed in relatively small amounts but still essential for normal body functions. Vitamins and minerals are the main groups of micronutrients.",
    "question": "What is a micronutrient?"
  },

  {
    "id": 7127,
    "category": "Eating",
    "text": "Eating is the process of taking food into the mouth, chewing it, swallowing it, and beginning its digestion. It provides the body with energy and nutrients needed for life.",
    "question": "What is eating?"
  },
  {
    "id": 7128,
    "category": "Eating",
    "text": "Hunger is the physical and psychological desire or need to eat that develops when the body requires food. Hunger can be influenced by energy needs, hormones, habits, emotions, and environmental cues.",
    "question": "What is hunger?"
  },
  {
    "id": 7129,
    "category": "Eating",
    "text": "Appetite is the desire or inclination to eat and is influenced by factors such as hunger, food appearance, smell, emotions, habits, social situations, and previous experiences.",
    "question": "What is appetite?"
  },
  {
    "id": 7130,
    "category": "Eating",
    "text": "Satiety is the feeling of fullness that develops during or after eating and helps reduce the desire to continue eating. Different foods can affect satiety differently depending on their protein, fiber, fat, water, and energy content.",
    "question": "What is satiety?"
  },
  {
    "id": 7131,
    "category": "Eating",
    "text": "A meal is an occasion when food is eaten, usually at a particular time of day. Common meals include breakfast, lunch, dinner, and smaller meals or snacks.",
    "question": "What is a meal?"
  },
  {
    "id": 7132,
    "category": "Eating",
    "text": "Breakfast is a meal generally eaten in the morning after the overnight period without food. Common breakfast foods include bread, eggs, cereals, fruit, yogurt, and beverages.",
    "question": "What is breakfast?"
  },
  {
    "id": 7133,
    "category": "Eating",
    "text": "Lunch is a meal usually eaten around the middle of the day. Its size and typical foods vary considerably between cultures and individuals.",
    "question": "What is lunch?"
  },
  {
    "id": 7134,
    "category": "Eating",
    "text": "Dinner is usually the main evening meal in many cultures, although the timing and importance of dinner vary around the world. It can include multiple courses or a single dish.",
    "question": "What is dinner?"
  },
  {
    "id": 7135,
    "category": "Eating",
    "text": "A snack is a relatively small amount of food eaten between regular meals or at another time. Snacks can include fruit, nuts, yogurt, sandwiches, sweets, or many other foods.",
    "question": "What is a snack?"
  },
  {
    "id": 7136,
    "category": "Eating",
    "text": "A portion is the amount of food served or eaten at one time. Portion size can vary greatly depending on the food, meal, culture, restaurant, and individual.",
    "question": "What is a food portion?"
  },
  {
    "id": 7137,
    "category": "Eating",
    "text": "Eating habits are regular patterns of how, when, what, and why a person eats. They can be influenced by culture, family, schedule, preferences, environment, health, and access to food.",
    "question": "What are eating habits?"
  },
  {
    "id": 7138,
    "category": "Eating",
    "text": "A vegetarian diet avoids meat and fish, although different forms of vegetarianism allow different animal-derived foods. Many vegetarians eat vegetables, fruits, grains, legumes, nuts, seeds, eggs, and dairy products.",
    "question": "What is a vegetarian diet?"
  },
  {
    "id": 7139,
    "category": "Eating",
    "text": "A vegan diet excludes foods derived from animals, including meat, fish, eggs, dairy products, and usually other animal-derived ingredients. Vegan diets are based primarily on plant foods.",
    "question": "What is a vegan diet?"
  },
  {
    "id": 7140,
    "category": "Eating",
    "text": "An omnivorous diet includes both plant-based and animal-based foods. Humans can eat a wide variety of foods, although individual diets differ greatly according to culture, preference, health, and availability.",
    "question": "What is an omnivorous diet?"
  },

  {
    "id": 7141,
    "category": "Food Preparation",
    "text": "Food preparation includes the steps taken to make ingredients ready for cooking or eating. Common preparation tasks include washing, peeling, cutting, chopping, slicing, grinding, mixing, and seasoning.",
    "question": "What is food preparation?"
  },
  {
    "id": 7142,
    "category": "Food Preparation",
    "text": "Chopping means cutting food into relatively small pieces, usually with a knife or food processor. The size and shape of the pieces can affect cooking time and texture.",
    "question": "What does chopping mean in cooking?"
  },
  {
    "id": 7143,
    "category": "Food Preparation",
    "text": "Slicing means cutting food into relatively thin pieces, usually with a knife or slicer. Slices can vary in thickness depending on the recipe and desired cooking result.",
    "question": "What does slicing mean in cooking?"
  },
  {
    "id": 7144,
    "category": "Food Preparation",
    "text": "Dicing means cutting food into small, relatively uniform cubes. Uniform pieces are useful because they tend to cook at similar rates.",
    "question": "What does dicing mean in cooking?"
  },
  {
    "id": 7145,
    "category": "Food Preparation",
    "text": "Grating means reducing food into small pieces by rubbing it against a rough surface called a grater. Cheese, vegetables, chocolate, and some spices are commonly grated.",
    "question": "What is grating?"
  },
  {
    "id": 7146,
    "category": "Food Preparation",
    "text": "Kneading is the process of working dough by pressing, folding, and stretching it. It develops gluten in wheat dough and helps produce the desired structure in bread and some other baked foods.",
    "question": "What is kneading?"
  },
  {
    "id": 7147,
    "category": "Food Preparation",
    "text": "Whisking means rapidly mixing ingredients with a whisk or similar tool. It can combine ingredients, incorporate air, or create emulsions depending on the recipe.",
    "question": "What is whisking?"
  },
  {
    "id": 7148,
    "category": "Food Preparation",
    "text": "Blending combines ingredients into a smoother mixture using a blender or similar appliance. It is commonly used to make smoothies, soups, sauces, purees, and drinks.",
    "question": "What is blending?"
  },
  {
    "id": 7149,
    "category": "Food Preparation",
    "text": "Pureeing means processing food until it becomes a smooth or nearly smooth mixture. Fruits, vegetables, legumes, and cooked meats can be pureed for soups, sauces, baby foods, and other dishes.",
    "question": "What is pureeing?"
  },
  {
    "id": 7150,
    "category": "Food Preparation",
    "text": "Fermentation is a biological process in which microorganisms such as yeasts or bacteria transform components of food. Fermentation is used to produce foods such as yogurt, cheese, bread, kimchi, sauerkraut, and some beverages.",
    "question": "What is food fermentation?"
  },

  {
    "id": 7151,
    "category": "Food Preservation",
    "text": "Food preservation consists of methods used to slow spoilage and extend the useful life of food. Common methods include refrigeration, freezing, drying, salting, smoking, fermenting, canning, and pickling.",
    "question": "What is food preservation?"
  },
  {
    "id": 7152,
    "category": "Food Preservation",
    "text": "Refrigeration slows the growth of many microorganisms and slows chemical changes that cause food to spoil. Refrigerators are commonly used to store meat, dairy products, cooked foods, and many fresh ingredients.",
    "question": "How does refrigeration preserve food?"
  },
  {
    "id": 7153,
    "category": "Food Preservation",
    "text": "Freezing preserves food by lowering its temperature enough to stop the growth of most microorganisms and greatly slow chemical reactions. Frozen foods can often remain usable for long periods when properly stored.",
    "question": "How does freezing preserve food?"
  },
  {
    "id": 7154,
    "category": "Food Preservation",
    "text": "Drying preserves food by removing much of its water, making it difficult for many microorganisms to grow. Dried fruits, grains, herbs, meat, and fish are examples of preserved foods.",
    "question": "How does drying preserve food?"
  },
  {
    "id": 7155,
    "category": "Food Preservation",
    "text": "Salting preserves food by increasing the salt concentration around the food and reducing available water for many microorganisms. Salt has been used for centuries to preserve meat, fish, vegetables, and other foods.",
    "question": "How does salting preserve food?"
  },
  {
    "id": 7156,
    "category": "Food Preservation",
    "text": "Smoking exposes food to smoke produced by burning or smoldering materials, often wood. It can add flavor and, depending on the method, contribute to preservation by drying and exposing food to antimicrobial compounds.",
    "question": "How does smoking preserve food?"
  },
  {
    "id": 7157,
    "category": "Food Preservation",
    "text": "Pickling preserves food using an acidic or salty environment, commonly involving vinegar or fermentation. Pickled cucumbers, cabbage, onions, and other vegetables are found in many cuisines.",
    "question": "What is pickling?"
  },
  {
    "id": 7158,
    "category": "Food Preservation",
    "text": "Canning preserves food by sealing it in containers and using heat treatment to destroy or control microorganisms. Properly canned foods can have a long shelf life when stored correctly.",
    "question": "What is canning?"
  },
  {
    "id": 7159,
    "category": "Food Preservation",
    "text": "Jam is a fruit preserve made by cooking fruit with sugar until it reaches a thick consistency. Sugar and heating help preserve the fruit and produce a spreadable food.",
    "question": "What is jam?"
  },
  {
    "id": 7160,
    "category": "Food Preservation",
    "text": "Marmalade is a fruit preserve traditionally made from citrus fruit and usually containing pieces of peel. It has a characteristic sweet and slightly bitter flavor.",
    "question": "What is marmalade?"
  },

  {
    "id": 7161,
    "category": "Food Safety",
    "text": "Food safety involves handling, preparing, storing, and serving food in ways that reduce the risk of foodborne illness. Proper hygiene, temperature control, and prevention of cross-contamination are important parts of food safety.",
    "question": "What is food safety?"
  },
  {
    "id": 7162,
    "category": "Food Safety",
    "text": "Foodborne illness is sickness caused by eating food or drinking beverages contaminated with harmful microorganisms, toxins, chemicals, or other hazardous substances. Symptoms can include nausea, vomiting, diarrhea, abdominal pain, and fever.",
    "question": "What is foodborne illness?"
  },
  {
    "id": 7163,
    "category": "Food Safety",
    "text": "Cross-contamination occurs when harmful microorganisms or other contaminants are transferred from one food, surface, utensil, or person to another. Separating raw and ready-to-eat foods helps reduce this risk.",
    "question": "What is cross-contamination?"
  },
  {
    "id": 7164,
    "category": "Food Safety",
    "text": "Raw food has not been cooked or otherwise heat-treated enough to destroy microorganisms that may be present. Raw meat, poultry, seafood, and eggs can require careful handling to reduce food safety risks.",
    "question": "What is raw food?"
  },
  {
    "id": 7165,
    "category": "Food Safety",
    "text": "Food spoilage is the deterioration of food caused by microorganisms, enzymes, chemical reactions, physical changes, or other factors. Spoiled food may develop unpleasant smells, flavors, textures, colors, or visible growth.",
    "question": "What is food spoilage?"
  },
  {
    "id": 7166,
    "category": "Food Safety",
    "text": "A food expiration or use-by date provides information about how long a product is expected to remain safe or suitable when stored under specified conditions. The exact meaning of food date labels varies by country and product.",
    "question": "What does a food expiration date mean?"
  },
  {
    "id": 7167,
    "category": "Food Safety",
    "text": "Food allergies are immune system reactions to specific proteins in foods. Common food allergens include peanuts, tree nuts, milk, eggs, fish, shellfish, wheat, soy, and sesame.",
    "question": "What is a food allergy?"
  },
  {
    "id": 7168,
    "category": "Food Safety",
    "text": "Food intolerance is difficulty digesting or responding to a particular food or food component without the same immune mechanism involved in a typical food allergy. Lactose intolerance is a common example.",
    "question": "What is food intolerance?"
  },
  {
    "id": 7169,
    "category": "Food Safety",
    "text": "Lactose intolerance occurs when the body does not produce enough lactase, the enzyme needed to digest lactose in milk. It can cause symptoms such as bloating, gas, abdominal discomfort, and diarrhea after consuming lactose.",
    "question": "What is lactose intolerance?"
  },
  {
    "id": 7170,
    "category": "Food Safety",
    "text": "Gluten is a group of proteins found naturally in wheat, barley, rye, and foods made from them. Some people need to avoid gluten because of conditions such as celiac disease or certain forms of gluten sensitivity.",
    "question": "What is gluten?"
  },

  {
    "id": 7171,
    "category": "Food and Culture",
    "text": "Cuisine refers to a style of cooking associated with a particular region, country, culture, or tradition. Cuisines are shaped by local ingredients, history, climate, religion, trade, and cultural practices.",
    "question": "What is cuisine?"
  },
  {
    "id": 7172,
    "category": "Food and Culture",
    "text": "Mediterranean cuisine includes diverse cooking traditions from countries around the Mediterranean Sea. Common ingredients include vegetables, fruits, legumes, grains, olive oil, herbs, fish, seafood, and dairy products.",
    "question": "What is Mediterranean cuisine?"
  },
  {
    "id": 7173,
    "category": "Food and Culture",
    "text": "Italian cuisine is known for foods such as pasta, pizza, risotto, cheeses, breads, vegetables, olive oil, herbs, and many regional specialties. Italian cooking varies considerably between different parts of the country.",
    "question": "What is Italian cuisine?"
  },
  {
    "id": 7174,
    "category": "Food and Culture",
    "text": "French cuisine includes a wide range of regional cooking traditions and is known for techniques involving sauces, pastries, bread, cheese, meat, seafood, and vegetables. It has had a major influence on professional Western cooking.",
    "question": "What is French cuisine?"
  },
  {
    "id": 7175,
    "category": "Food and Culture",
    "text": "Greek cuisine is a Mediterranean culinary tradition featuring ingredients such as olive oil, vegetables, legumes, grains, herbs, seafood, meat, yogurt, and cheese. Feta, olives, salads, grilled foods, and pastries are common examples.",
    "question": "What is Greek cuisine?"
  },
  {
    "id": 7176,
    "category": "Food and Culture",
    "text": "Japanese cuisine includes rice, noodles, seafood, vegetables, soy-based foods, fermented products, and many carefully prepared seasonal ingredients. Sushi, ramen, tempura, and miso soup are internationally well-known Japanese foods.",
    "question": "What is Japanese cuisine?"
  },
  {
    "id": 7177,
    "category": "Food and Culture",
    "text": "Chinese cuisine includes many regional traditions with different ingredients, cooking methods, and flavors. Stir-frying, steaming, braising, noodles, rice, vegetables, and a wide variety of sauces are important elements.",
    "question": "What is Chinese cuisine?"
  },
  {
    "id": 7178,
    "category": "Food and Culture",
    "text": "Indian cuisine is highly diverse and includes regional traditions using grains, legumes, vegetables, dairy products, meat, seafood, herbs, and numerous spices. Curries, breads, rice dishes, and vegetarian foods are especially important.",
    "question": "What is Indian cuisine?"
  },
  {
    "id": 7179,
    "category": "Food and Culture",
    "text": "Mexican cuisine combines indigenous ingredients and traditions with influences introduced after European contact. Common foods include corn, beans, chili peppers, tomatoes, avocados, tortillas, meats, and many regional sauces.",
    "question": "What is Mexican cuisine?"
  },
  {
    "id": 7180,
    "category": "Food and Culture",
    "text": "Bulgarian cuisine is a Balkan culinary tradition featuring vegetables, dairy products, meat, grains, legumes, herbs, and fermented foods. Common dishes include shopska salad, banitsa, tarator, kebapche, and various stews.",
    "question": "What is Bulgarian cuisine?"
  },

  {
    "id": 7181,
    "category": "Meals and Dishes",
    "text": "A salad is a dish usually made from raw or cooked vegetables, fruits, grains, legumes, meat, seafood, or other ingredients. Salads can be served as appetizers, side dishes, or complete meals.",
    "question": "What is a salad?"
  },
  {
    "id": 7182,
    "category": "Meals and Dishes",
    "text": "Soup is a liquid or semi-liquid dish made by cooking ingredients in water, stock, milk, or another liquid. Soups can contain vegetables, meat, fish, grains, legumes, noodles, or many other ingredients.",
    "question": "What is soup?"
  },
  {
    "id": 7183,
    "category": "Meals and Dishes",
    "text": "A stew is a dish in which pieces of meat, vegetables, legumes, or other ingredients are slowly cooked in liquid. Slow cooking allows flavors to develop and can make tougher ingredients tender.",
    "question": "What is a stew?"
  },
  {
    "id": 7184,
    "category": "Meals and Dishes",
    "text": "A sandwich is a food consisting of one or more fillings placed between or inside pieces of bread. Fillings can include meat, cheese, vegetables, eggs, spreads, or many other ingredients.",
    "question": "What is a sandwich?"
  },
  {
    "id": 7185,
    "category": "Meals and Dishes",
    "text": "Pizza is a dish consisting of a flat bread-like dough topped with ingredients and baked, traditionally in a hot oven. Common toppings include tomato sauce, cheese, vegetables, meat, and seafood.",
    "question": "What is pizza?"
  },
  {
    "id": 7186,
    "category": "Meals and Dishes",
    "text": "A taco is a Mexican dish consisting of a tortilla folded or wrapped around a filling. Fillings can include meat, beans, vegetables, cheese, seafood, and sauces.",
    "question": "What is a taco?"
  },
  {
    "id": 7187,
    "category": "Meals and Dishes",
    "text": "A burrito is a Mexican and Mexican-American dish made by wrapping a flour tortilla around a filling. Common fillings include beans, rice, meat, cheese, vegetables, and sauces.",
    "question": "What is a burrito?"
  },
  {
    "id": 7188,
    "category": "Meals and Dishes",
    "text": "Hummus is a creamy Middle Eastern and Mediterranean spread traditionally made from chickpeas, tahini, lemon juice, garlic, and olive oil. It is commonly served as a dip, spread, or side dish.",
    "question": "What is hummus?"
  },
  {
    "id": 7189,
    "category": "Meals and Dishes",
    "text": "Guacamole is a Mexican avocado-based preparation traditionally made with mashed avocado and ingredients such as lime, onion, chili, tomato, and cilantro. It is commonly served as a dip, sauce, or accompaniment.",
    "question": "What is guacamole?"
  },
  {
    "id": 7190,
    "category": "Meals and Dishes",
    "text": "Pancakes are flat cakes made from a batter that is usually cooked on a hot pan or griddle. They can be served with sweet toppings such as fruit and syrup or with savory ingredients.",
    "question": "What are pancakes?"
  },
  {
    "id": 7191,
    "category": "Meals and Dishes",
    "text": "An omelet is a dish made primarily from beaten eggs cooked in a pan and often folded around a filling. Common fillings include cheese, vegetables, herbs, meat, and mushrooms.",
    "question": "What is an omelet?"
  },
  {
    "id": 7192,
    "category": "Meals and Dishes",
    "text": "A stew-like curry is a dish prepared with a sauce or gravy containing ingredients such as vegetables, meat, fish, legumes, and spices. Curries are found in many cuisines, especially across South and Southeast Asia.",
    "question": "What is curry?"
  },
  {
    "id": 7193,
    "category": "Meals and Dishes",
    "text": "Risotto is an Italian rice dish cooked gradually with liquid until the rice becomes creamy while retaining a firm center. It can contain vegetables, mushrooms, seafood, meat, cheese, or other ingredients.",
    "question": "What is risotto?"
  },
  {
    "id": 7194,
    "category": "Meals and Dishes",
    "text": "Paella is a Spanish rice dish traditionally associated with Valencia. It can contain ingredients such as seafood, chicken, rabbit, vegetables, saffron, and other regional ingredients.",
    "question": "What is paella?"
  },
  {
    "id": 7195,
    "category": "Meals and Dishes",
    "text": "Sushi is a Japanese food based on vinegared rice combined with ingredients such as raw or cooked seafood, vegetables, and other fillings. Sushi comes in several forms, including rolls, hand-formed pieces, and pressed varieties.",
    "question": "What is sushi?"
  },
  {
    "id": 7196,
    "category": "Meals and Dishes",
    "text": "Tempura is a Japanese cooking style in which seafood or vegetables are coated in a light batter and quickly deep-fried. The result is typically characterized by a delicate, crisp coating.",
    "question": "What is tempura?"
  },
  {
    "id": 7197,
    "category": "Meals and Dishes",
    "text": "Falafel is a Middle Eastern food made from ground chickpeas, fava beans, or both, mixed with herbs and spices and usually fried. It is commonly served in pita bread, salads, or as part of a larger meal.",
    "question": "What is falafel?"
  },
  {
    "id": 7198,
    "category": "Meals and Dishes",
    "text": "Shakshuka is a dish of eggs poached in a sauce commonly made from tomatoes, peppers, onions, and spices. It is especially associated with North African and Middle Eastern cuisines.",
    "question": "What is shakshuka?"
  },
  {
    "id": 7199,
    "category": "Meals and Dishes",
    "text": "Banitsa is a traditional Bulgarian pastry made with layers of thin pastry and a filling commonly containing eggs and white brined cheese. Different regional versions can include additional ingredients such as spinach or pumpkin.",
    "question": "What is banitsa?"
  },
  {
    "id": 7200,
    "category": "Meals and Dishes",
    "text": "Shopska salad is a Bulgarian salad traditionally made with tomatoes, cucumbers, peppers, onions, and grated white brined cheese. It is commonly served as an appetizer or side dish.",
    "question": "What is Shopska salad?"
  },

  {
    "id": 7201,
    "category": "Food Texture and Flavor",
    "text": "Taste is the sensory perception produced when substances in food interact with taste receptors in the mouth. The five commonly recognized basic tastes are sweet, sour, salty, bitter, and umami.",
    "question": "What is taste?"
  },
  {
    "id": 7202,
    "category": "Food Texture and Flavor",
    "text": "Umami is a savory taste associated with substances such as glutamate and certain nucleotides. It is commonly found in foods such as meat, mushrooms, aged cheese, tomatoes, and fermented products.",
    "question": "What is umami?"
  },
  {
    "id": 7203,
    "category": "Food Texture and Flavor",
    "text": "Flavor is the overall sensory experience of food and includes taste, smell, texture, temperature, and other sensations. Much of what people describe as flavor comes from the sense of smell.",
    "question": "What is flavor?"
  },
  {
    "id": 7204,
    "category": "Food Texture and Flavor",
    "text": "Texture describes how food feels in the mouth, such as crunchy, creamy, chewy, soft, crisp, or smooth. Texture is an important part of the eating experience.",
    "question": "What is food texture?"
  },
  {
    "id": 7205,
    "category": "Food Texture and Flavor",
    "text": "Crispy food has a firm, brittle, or crunchy surface that breaks easily when bitten. Frying, baking, roasting, and dehydration can create crispy textures.",
    "question": "What does crispy mean when describing food?"
  },
  {
    "id": 7206,
    "category": "Food Texture and Flavor",
    "text": "Creamy food has a smooth, rich texture that can result from ingredients such as dairy, fats, pureed vegetables, or blended foods. Creaminess is common in sauces, soups, desserts, and dairy products.",
    "question": "What does creamy mean when describing food?"
  },
  {
    "id": 7207,
    "category": "Food Texture and Flavor",
    "text": "Tender food is relatively easy to cut or chew and usually has a soft or delicate texture. Proper cooking can make certain meats and vegetables more tender.",
    "question": "What does tender mean when describing food?"
  },
  {
    "id": 7208,
    "category": "Food Texture and Flavor",
    "text": "Spicy food produces a sensation of heat or burning, usually because of compounds such as capsaicin in chili peppers. Spiciness is technically a chemical pain or heat sensation rather than one of the five basic tastes.",
    "question": "What makes food spicy?"
  },
  {
    "id": 7209,
    "category": "Food Texture and Flavor",
    "text": "Sweetness is a basic taste commonly produced by sugars and some artificial or natural sweeteners. Sweet flavors are common in fruits, desserts, beverages, and many processed foods.",
    "question": "What makes food taste sweet?"
  },
  {
    "id": 7210,
    "category": "Food Texture and Flavor",
    "text": "Sourness is a basic taste associated mainly with acids in food. Citrus fruits, vinegar, yogurt, and fermented foods commonly have a sour flavor.",
    "question": "What makes food taste sour?"
  },
  {
    "id": 7211,
    "category": "Food Texture and Flavor",
    "text": "Bitterness is one of the basic tastes and is produced by many different chemical compounds. Bitter flavors occur naturally in foods such as coffee, cocoa, certain vegetables, and some herbs.",
    "question": "What makes food taste bitter?"
  },
  {
    "id": 7212,
    "category": "Food Texture and Flavor",
    "text": "Saltiness is a basic taste primarily associated with sodium ions. Adding salt to food can enhance other flavors as well as provide a distinct salty taste.",
    "question": "What makes food taste salty?"
  },

  {
    "id": 7213,
    "category": "Food and Drinks",
    "text": "A smoothie is a thick drink made by blending ingredients such as fruit, vegetables, yogurt, milk, plant-based beverages, nuts, seeds, or other foods. Smoothies can vary greatly in flavor and nutritional content.",
    "question": "What is a smoothie?"
  },
  {
    "id": 7214,
    "category": "Food and Drinks",
    "text": "A milkshake is a cold, thick beverage traditionally made by blending milk with ice cream and flavorings. Common flavors include vanilla, chocolate, and strawberry.",
    "question": "What is a milkshake?"
  },
  {
    "id": 7215,
    "category": "Food and Drinks",
    "text": "Hot chocolate is a warm beverage made from milk or another liquid combined with cocoa or chocolate and usually a sweetener. It is commonly served as a dessert-like drink.",
    "question": "What is hot chocolate?"
  },
  {
    "id": 7216,
    "category": "Food and Drinks",
    "text": "Fruit juice is a beverage made by extracting liquid from fruits, although commercial products may be processed or blended in different ways. Juice naturally contains sugars and varying amounts of vitamins and other nutrients.",
    "question": "What is fruit juice?"
  },
  {
    "id": 7217,
    "category": "Food and Drinks",
    "text": "A soft drink is a non-alcoholic beverage that may be carbonated or still and can contain water, sweeteners, flavorings, acids, and other ingredients. Carbonated soft drinks are often called soda or pop.",
    "question": "What is a soft drink?"
  },
  {
    "id": 7218,
    "category": "Food and Drinks",
    "text": "Tea is a beverage made by infusing processed leaves of the tea plant in hot or cold water. Different processing methods produce varieties such as green, black, white, and oolong tea.",
    "question": "What is tea?"
  },
  {
    "id": 7219,
    "category": "Food and Drinks",
    "text": "Coffee is a beverage made by extracting compounds from roasted and ground coffee beans with water. It contains caffeine and can be prepared using many methods, including espresso, filter brewing, and French press.",
    "question": "What is coffee?"
  },
  {
    "id": 7220,
    "category": "Food and Drinks",
    "text": "Espresso is a concentrated coffee beverage made by forcing hot water through finely ground coffee under pressure. It forms the base of drinks such as cappuccino, latte, and macchiato.",
    "question": "What is espresso?"
  },

  {
    "id": 7221,
    "category": "Food Science",
    "text": "The Maillard reaction is a chemical reaction between certain sugars and amino compounds that occurs during heating. It produces many of the brown colors and complex flavors found in roasted, baked, fried, and grilled foods.",
    "question": "What is the Maillard reaction?"
  },
  {
    "id": 7222,
    "category": "Food Science",
    "text": "Caramelization is the thermal breakdown of sugars that occurs when they are heated to sufficiently high temperatures. It produces brown color and characteristic sweet, toasted, and complex flavors.",
    "question": "What is caramelization?"
  },
  {
    "id": 7223,
    "category": "Food Science",
    "text": "An emulsion is a mixture of two liquids that normally do not mix, such as oil and water, where one is dispersed as tiny droplets in the other. Mayonnaise and some salad dressings are examples of food emulsions.",
    "question": "What is an emulsion in food?"
  },
  {
    "id": 7224,
    "category": "Food Science",
    "text": "Gluten is formed when certain proteins in wheat and related grains interact with water and mechanical mixing. It gives many wheat-based doughs elasticity and helps bread maintain its structure.",
    "question": "Why is gluten important in bread?"
  },
  {
    "id": 7225,
    "category": "Food Science",
    "text": "Leavening is the process of increasing the volume of dough or batter by producing or incorporating gas. Yeast, baking powder, baking soda, and whipped air can all contribute to leavening.",
    "question": "What is leavening?"
  },
  {
    "id": 7226,
    "category": "Food Science",
    "text": "Food additives are substances intentionally added to food for purposes such as preserving it, improving texture, maintaining color, enhancing flavor, or controlling acidity. Their use is regulated differently in different countries.",
    "question": "What are food additives?"
  },
  {
    "id": 7227,
    "category": "Food Science",
    "text": "A preservative is a substance added to food to slow spoilage caused by microorganisms, oxidation, or other chemical changes. Preservatives can help extend shelf life and maintain food quality.",
    "question": "What is a food preservative?"
  },
  {
    "id": 7228,
    "category": "Food Science",
    "text": "An antioxidant is a substance that can slow certain oxidation reactions. In food, antioxidants can help protect fats and other components from deterioration and are also naturally present in many fruits and vegetables.",
    "question": "What is an antioxidant?"
  },
  {
    "id": 7229,
    "category": "Food Science",
    "text": "Probiotics are living microorganisms that, when consumed in adequate amounts, can provide health benefits in specific circumstances. They are found in some fermented foods and are also available in certain food products and supplements.",
    "question": "What are probiotics?"
  },
  {
    "id": 7230,
    "category": "Food Science",
    "text": "Prebiotics are substances, often certain types of dietary fiber, that can be used by beneficial microorganisms in the digestive tract. Foods containing prebiotic fibers include onions, garlic, legumes, oats, and some fruits and vegetables.",
    "question": "What are prebiotics?"
  },

  {
    "id": 7231,
    "category": "Food Storage",
    "text": "A pantry is a storage area used for foods that generally do not require refrigeration. Common pantry foods include grains, canned goods, pasta, flour, spices, oils, and dried legumes.",
    "question": "What is a pantry?"
  },
  {
    "id": 7232,
    "category": "Food Storage",
    "text": "A refrigerator is an appliance that keeps food at a low temperature to slow microbial growth and other processes that cause spoilage. Different foods require different storage conditions.",
    "question": "What is a refrigerator used for?"
  },
  {
    "id": 7233,
    "category": "Food Storage",
    "text": "A freezer is an appliance or compartment that keeps food below the freezing point of water. Freezing slows microbial growth and chemical changes, allowing many foods to be stored for long periods.",
    "question": "What is a freezer used for?"
  },
  {
    "id": 7234,
    "category": "Food Storage",
    "text": "A food container is a vessel used to store, transport, protect, or serve food. Containers can be made from materials such as glass, plastic, metal, paper, or ceramic.",
    "question": "What is a food container?"
  },
  {
    "id": 7235,
    "category": "Food Storage",
    "text": "An airtight container is designed to prevent or greatly reduce the movement of air between the inside and outside. It can help protect food from moisture, oxidation, odors, and some forms of contamination.",
    "question": "What is an airtight container?"
  },
  {
    "id": 7236,
    "category": "Food Storage",
    "text": "Leftovers are food remaining after a meal that may be stored and eaten later. They should be handled, cooled, stored, and reheated safely to reduce the risk of foodborne illness.",
    "question": "What are leftovers?"
  },
  {
    "id": 7237,
    "category": "Food Storage",
    "text": "A best-before date generally indicates the period during which a food is expected to retain its intended quality when properly stored. It does not always mean that the food becomes unsafe immediately afterward.",
    "question": "What is a best-before date?"
  },
  {
    "id": 7238,
    "category": "Food Storage",
    "text": "Freezer burn occurs when frozen food loses moisture from its surface, causing dry, discolored patches. It usually affects food quality rather than making the food inherently unsafe.",
    "question": "What is freezer burn?"
  },
  {
    "id": 7239,
    "category": "Food Storage",
    "text": "A food label provides information about a packaged food, such as its ingredients, nutritional content, weight, storage instructions, and relevant dates. Labels help consumers understand what a product contains.",
    "question": "What is a food label?"
  },
  {
    "id": 7240,
    "category": "Food Storage",
    "text": "An ingredient list shows the substances used to make a packaged food, generally arranged according to the rules of the country where the product is sold. It helps consumers identify what is present in the product.",
    "question": "What is an ingredient list?"
  },

  {
    "id": 7241,
    "category": "Food Service",
    "text": "A restaurant is a business where prepared food and drinks are served to customers. Restaurants range from small local establishments to large international chains and can specialize in many different cuisines.",
    "question": "What is a restaurant?"
  },
  {
    "id": 7242,
    "category": "Food Service",
    "text": "A menu is a list of foods and beverages available at a restaurant or other food service establishment. It may include descriptions, prices, ingredients, portion information, and dietary details.",
    "question": "What is a menu?"
  },
  {
    "id": 7243,
    "category": "Food Service",
    "text": "An appetizer is a relatively small dish served before or at the beginning of a meal. Appetizers can include salads, soups, dips, small portions of meat, seafood, or other foods.",
    "question": "What is an appetizer?"
  },
  {
    "id": 7244,
    "category": "Food Service",
    "text": "A main course is the principal dish of a meal and is usually more substantial than an appetizer or side dish. It can contain meat, fish, vegetables, grains, pasta, legumes, or other ingredients.",
    "question": "What is a main course?"
  },
  {
    "id": 7245,
    "category": "Food Service",
    "text": "A side dish is a smaller dish served alongside the main course. Common side dishes include vegetables, potatoes, rice, salads, bread, and legumes.",
    "question": "What is a side dish?"
  },
  {
    "id": 7246,
    "category": "Food Service",
    "text": "A dessert is a sweet or sometimes fruit-based course usually served at the end of a meal. Examples include cakes, ice cream, pastries, fruit, puddings, and chocolate-based foods.",
    "question": "What is dessert?"
  },
  {
    "id": 7247,
    "category": "Food Service",
    "text": "A buffet is a style of serving food in which dishes are arranged for people to choose and serve themselves. Buffets can offer many different foods and are common at hotels, events, and restaurants.",
    "question": "What is a buffet?"
  },
  {
    "id": 7248,
    "category": "Food Service",
    "text": "Street food is food prepared and sold in public places, often from stalls, carts, trucks, or small stands. Street food is an important part of many local food cultures around the world.",
    "question": "What is street food?"
  },
  {
    "id": 7249,
    "category": "Food Service",
    "text": "Fast food is food designed to be prepared and served quickly, often through standardized cooking and service systems. Common examples include burgers, fried chicken, pizza, sandwiches, and fries.",
    "question": "What is fast food?"
  },
  {
    "id": 7250,
    "category": "Food Service",
    "text": "Takeout is prepared food purchased from a restaurant or food establishment to be eaten somewhere else. It may be collected by the customer or delivered to another location.",
    "question": "What is takeout food?"
  },
  {
    "id": 7251,
    "category": "Meals and Dishes",
    "text": "A cheeseburger is a hamburger topped with cheese, usually served in a sliced bun with ingredients such as lettuce, tomato, onion, pickles, ketchup, mustard, or mayonnaise. Cheddar, American cheese, Swiss cheese, and other varieties can be used.",
    "question": "What is a cheeseburger?"
  },
  {
    "id": 7255,
    "category": "Meals and Dishes",
    "text": "Meatballs are small portions of ground meat shaped into balls and cooked by frying, baking, simmering, or another method. They may contain ingredients such as onion, garlic, herbs, breadcrumbs, rice, or eggs.",
    "question": "What are meatballs?"
  },
  {
    "id": 7256,
    "category": "Meals and Dishes",
    "text": "Meatloaf is a baked dish made from ground meat mixed with ingredients such as breadcrumbs, eggs, onions, and seasonings. The mixture is shaped into a loaf and baked until cooked.",
    "question": "What is meatloaf?"
  },
  {
    "id": 7257,
    "category": "Meals and Dishes",
    "text": "Kebab is a broad group of dishes made from meat that is cooked, often on a grill or skewer. Different countries prepare kebabs in different ways using various meats, marinades, spices, and vegetables.",
    "question": "What is kebab?"
  },
  {
    "id": 7258,
    "category": "Meals and Dishes",
    "text": "Doner kebab is a dish made from seasoned meat cooked on a vertical rotating spit. Thin slices of the cooked meat are commonly served in flatbread, pita, or a wrap with vegetables and sauces.",
    "question": "What is doner kebab?"
  },
  {
    "id": 7259,
    "category": "Meals and Dishes",
    "text": "Gyros is a Greek dish made from meat cooked on a vertical rotating spit and sliced into thin pieces. It is commonly served in pita with vegetables, tzatziki, and other ingredients.",
    "question": "What is gyros?"
  },
  {
    "id": 7260,
    "category": "Meals and Dishes",
    "text": "Fish and chips is a popular dish consisting of battered or breaded fried fish served with fried potatoes. It originated in Britain and became one of the country's best-known traditional meals.",
    "question": "What is fish and chips?"
  },
  {
    "id": 7261,
    "category": "Meals and Dishes",
    "text": "Chicken nuggets are small pieces of chicken that are coated with breading or batter and usually fried or baked. They are commonly served with dipping sauces.",
    "question": "What are chicken nuggets?"
  },
  {
    "id": 7262,
    "category": "Meals and Dishes",
    "text": "Chicken wings are sections of chicken wings that are commonly baked, grilled, or fried. They are often coated with sauces or seasonings and served as a snack or appetizer.",
    "question": "What are chicken wings?"
  },
  {
    "id": 7263,
    "category": "Meals and Dishes",
    "text": "Nachos are tortilla chips covered with ingredients such as melted cheese, beans, meat, jalapeños, salsa, or sour cream. They are commonly served as a snack, appetizer, or shared dish.",
    "question": "What are nachos?"
  },
  {
    "id": 7264,
    "category": "Meals and Dishes",
    "text": "A quesadilla is a Mexican dish made from a tortilla filled with cheese and often other ingredients such as meat or vegetables. It is heated until the tortilla is warm and the cheese melts.",
    "question": "What is a quesadilla?"
  },
  {
    "id": 7265,
    "category": "Meals and Dishes",
    "text": "An enchilada is a Mexican dish consisting of a tortilla wrapped around a filling and covered with a savory sauce. Fillings can include meat, cheese, beans, or vegetables.",
    "question": "What is an enchilada?"
  },
  {
    "id": 7266,
    "category": "Meals and Dishes",
    "text": "Chili con carne is a spicy stew made primarily from meat, chili peppers, tomatoes, and seasonings. Beans are commonly included in many versions, although recipes vary by region.",
    "question": "What is chili con carne?"
  },
  {
    "id": 7267,
    "category": "Meals and Dishes",
    "text": "Moussaka is a baked dish found in several Mediterranean and Middle Eastern cuisines. A well-known Greek version contains layers of eggplant, minced meat, and a creamy béchamel sauce.",
    "question": "What is moussaka?"
  },
  {
    "id": 7268,
    "category": "Meals and Dishes",
    "text": "Goulash is a traditional Hungarian dish usually made with meat, onions, paprika, and other seasonings. It can be prepared as a thick stew or a soup depending on the recipe.",
    "question": "What is goulash?"
  },
  {
    "id": 7269,
    "category": "Meals and Dishes",
    "text": "Shepherd's pie is a baked dish made with minced lamb covered with mashed potatoes. A similar dish made with beef is commonly called cottage pie.",
    "question": "What is shepherd's pie?"
  },
  {
    "id": 7270,
    "category": "Meals and Dishes",
    "text": "Dumplings are pieces of dough or dough-like mixtures that are cooked by boiling, steaming, baking, or frying. Many cuisines have their own forms of dumplings with different fillings and shapes.",
    "question": "What are dumplings?"
  },
  {
    "id": 7271,
    "category": "Meals and Dishes",
    "text": "Pierogi are filled dumplings associated especially with Polish cuisine. They are commonly filled with potatoes, cheese, meat, cabbage, mushrooms, or fruit and can be boiled and sometimes fried.",
    "question": "What are pierogi?"
  },
  {
    "id": 7272,
    "category": "Meals and Dishes",
    "text": "Ravioli are small pieces of pasta filled with ingredients such as cheese, meat, vegetables, or herbs. They are usually boiled and served with a sauce.",
    "question": "What are ravioli?"
  },
  {
    "id": 7273,
    "category": "Meals and Dishes",
    "text": "Gnocchi are small dumplings traditionally made mainly from potatoes, flour, and sometimes eggs. They are cooked in boiling water and commonly served with sauces.",
    "question": "What are gnocchi?"
  },
  {
    "id": 7274,
    "category": "Meals and Dishes",
    "text": "Macaroni and cheese is a dish made from cooked macaroni pasta combined with a cheese-based sauce. It is especially popular in the United States and other English-speaking countries.",
    "question": "What is macaroni and cheese?"
  },
  {
    "id": 7275,
    "category": "Meals and Dishes",
    "text": "Fried rice is a dish made by stir-frying cooked rice with ingredients such as vegetables, eggs, meat, seafood, or soy sauce. It is common in many Asian cuisines.",
    "question": "What is fried rice?"
  },
  {
    "id": 7276,
    "category": "Meals and Dishes",
    "text": "Pilaf is a rice dish in which rice is cooked with broth or stock and often combined with meat, vegetables, spices, or nuts. It is prepared in many regions of Europe, Asia, and the Middle East.",
    "question": "What is pilaf?"
  },
  {
    "id": 7277,
    "category": "Meals and Dishes",
    "text": "Poke is a Hawaiian dish traditionally made from diced raw fish, especially tuna, combined with seasonings and other ingredients. Modern versions often include rice, vegetables, seaweed, and sauces.",
    "question": "What is poke?"
  },
  {
    "id": 7278,
    "category": "Meals and Dishes",
    "text": "Ceviche is a dish in which raw fish or seafood is marinated in acidic juice, commonly lime or lemon juice. It is often combined with onions, chili peppers, herbs, and other fresh ingredients.",
    "question": "What is ceviche?"
  },
  {
    "id": 7279,
    "category": "Meals and Dishes",
    "text": "Paella is a Spanish rice dish traditionally associated with Valencia. It can contain ingredients such as vegetables, chicken, rabbit, seafood, saffron, and other seasonings.",
    "question": "What is paella?"
  },
  {
    "id": 7280,
    "category": "Meals and Dishes",
    "text": "Tiramisu is an Italian dessert made with coffee-soaked ladyfingers layered with a mixture containing mascarpone cheese. It is commonly dusted with cocoa powder before serving.",
    "question": "What is tiramisu?"
  },
  {
    "id": 7281,
    "category": "Snacks and Sweets",
    "text": "Popcorn is a snack made by heating dried corn kernels until the moisture inside turns into steam and causes the kernels to burst. It can be seasoned with salt, butter, sugar, caramel, or other flavors.",
    "question": "What is popcorn?"
  },
  {
    "id": 7282,
    "category": "Snacks and Sweets",
    "text": "Potato chips, also called crisps in some countries, are thin slices of potato that are usually fried or baked until crisp. They are commonly flavored with salt, spices, cheese, or other seasonings.",
    "question": "What are potato chips?"
  },
  {
    "id": 7283,
    "category": "Snacks and Sweets",
    "text": "Crackers are thin, crisp baked foods usually made from flour and other ingredients. They are commonly eaten as snacks or served with cheese, spreads, dips, or soups.",
    "question": "What are crackers?"
  },
  {
    "id": 7284,
    "category": "Snacks and Sweets",
    "text": "Pretzels are baked snacks made from dough that is commonly shaped into a distinctive twisted form. They can be soft or hard and are often sprinkled with coarse salt.",
    "question": "What are pretzels?"
  },
  {
    "id": 7285,
    "category": "Snacks and Sweets",
    "text": "A granola bar is a compact snack made from ingredients such as oats, nuts, seeds, dried fruit, and sweeteners. Some varieties also contain chocolate or other flavorings.",
    "question": "What is a granola bar?"
  },
  {
    "id": 7286,
    "category": "Snacks and Sweets",
    "text": "Candy is a sweet food made mainly from sugar or other sweeteners and often flavored or colored. It includes many types such as hard candy, gummies, caramels, and chewy sweets.",
    "question": "What is candy?"
  },
  {
    "id": 7287,
    "category": "Snacks and Sweets",
    "text": "Gummy candy is a chewy sweet made from sugar, flavorings, and gelling agents such as gelatin or pectin. It is commonly produced in many shapes, colors, and fruit flavors.",
    "question": "What is gummy candy?"
  },
  {
    "id": 7288,
    "category": "Snacks and Sweets",
    "text": "Caramel is made by heating sugar until it melts and develops a characteristic golden-brown color and rich flavor. It is used in candies, sauces, desserts, and many other foods.",
    "question": "What is caramel?"
  },
  {
    "id": 7289,
    "category": "Snacks and Sweets",
    "text": "Toffee is a confection made by heating sugar and butter together, sometimes with additional ingredients such as cream or nuts. It becomes firm or chewy depending on how it is prepared.",
    "question": "What is toffee?"
  },
  {
    "id": 7290,
    "category": "Snacks and Sweets",
    "text": "Fudge is a soft confection usually made from sugar, butter, and milk or cream. Chocolate is a common flavor, but fudge can also be made with nuts, vanilla, peanut butter, or other ingredients.",
    "question": "What is fudge?"
  },
  {
    "id": 7291,
    "category": "Snacks and Sweets",
    "text": "A marshmallow is a soft, sweet confection traditionally made with sugar, water, and gelatin or another setting ingredient. Modern marshmallows are commonly eaten on their own or toasted.",
    "question": "What is a marshmallow?"
  },
  {
    "id": 7292,
    "category": "Snacks and Sweets",
    "text": "Ice cream is a frozen dessert made from a mixture that commonly contains milk or cream, sugar, and flavorings. It can be made in many flavors and often contains ingredients such as fruit, nuts, or chocolate.",
    "question": "What is ice cream?"
  },
  {
    "id": 7293,
    "category": "Snacks and Sweets",
    "text": "Gelato is an Italian-style frozen dessert similar to ice cream but traditionally made with a higher proportion of milk and less cream. It is usually served slightly warmer and denser than conventional ice cream.",
    "question": "What is gelato?"
  },
  {
    "id": 7294,
    "category": "Snacks and Sweets",
    "text": "Sorbet is a frozen dessert made primarily from fruit juice or purée, water, and sugar. Unlike traditional ice cream, it normally contains no dairy.",
    "question": "What is sorbet?"
  },
  {
    "id": 7295,
    "category": "Snacks and Sweets",
    "text": "Pudding is a soft dessert that can be made from milk, sugar, eggs, starch, or other ingredients. It can have flavors such as chocolate, vanilla, caramel, or fruit.",
    "question": "What is pudding?"
  },
  {
    "id": 7296,
    "category": "Snacks and Sweets",
    "text": "Custard is a creamy food made primarily from milk or cream and eggs or egg yolks. It can be served as a dessert, used as a filling, or incorporated into other dishes.",
    "question": "What is custard?"
  },
  {
    "id": 7297,
    "category": "Snacks and Sweets",
    "text": "A brownie is a baked chocolate dessert with a dense, soft texture. Brownies are usually made from flour, butter, sugar, eggs, and cocoa or chocolate.",
    "question": "What is a brownie?"
  },
  {
    "id": 7298,
    "category": "Snacks and Sweets",
    "text": "A doughnut is a fried or baked ring-shaped or filled pastry made from dough. Doughnuts can be covered with sugar, glaze, chocolate, icing, or other toppings.",
    "question": "What is a doughnut?"
  },
  {
    "id": 7299,
    "category": "Snacks and Sweets",
    "text": "A muffin is a small baked food made from a batter containing ingredients such as flour, eggs, milk, and a raising agent. Muffins can be sweet or savory and may contain fruit, chocolate, nuts, or cheese.",
    "question": "What is a muffin?"
  },
  {
    "id": 7300,
    "category": "Snacks and Sweets",
    "text": "A waffle is a baked food made from a batter cooked between two patterned plates. Waffles are commonly served with fruit, syrup, whipped cream, chocolate, or other toppings.",
    "question": "What is a waffle?"
  },
  {
    "id": 7301,
    "category": "Snacks and Sweets",
    "text": "A crepe is a very thin pancake made from a simple batter of flour, eggs, milk, and other ingredients. Crepes can be filled with sweet ingredients or savory foods.",
    "question": "What is a crepe?"
  },
  {
    "id": 7302,
    "category": "Snacks and Sweets",
    "text": "Baklava is a sweet pastry made from layers of thin dough, chopped nuts, and syrup or honey. It is especially associated with cuisines of the Middle East, Balkans, and eastern Mediterranean.",
    "question": "What is baklava?"
  },
  {
    "id": 7303,
    "category": "Condiments and Sauces",
    "text": "Ketchup is a thick, sweet, and tangy sauce made primarily from tomatoes, vinegar, sugar, salt, and seasonings. It is commonly served with burgers, fries, sandwiches, and other foods.",
    "question": "What is ketchup?"
  },
  {
    "id": 7304,
    "category": "Condiments and Sauces",
    "text": "Mayonnaise is a thick sauce made by emulsifying oil with egg yolk and an acidic ingredient such as vinegar or lemon juice. It is commonly used in sandwiches, salads, and sauces.",
    "question": "What is mayonnaise?"
  },
  {
    "id": 7305,
    "category": "Condiments and Sauces",
    "text": "Mustard is a condiment made from ground mustard seeds combined with liquids and seasonings. It can range from mild and slightly sweet to very hot and spicy.",
    "question": "What is mustard?"
  },
  {
    "id": 7306,
    "category": "Condiments and Sauces",
    "text": "Hot sauce is a condiment made primarily from chili peppers combined with ingredients such as vinegar, salt, or other seasonings. Its heat and flavor vary depending on the peppers and recipe used.",
    "question": "What is hot sauce?"
  },
  {
    "id": 7307,
    "category": "Condiments and Sauces",
    "text": "Barbecue sauce is a savory and often sweet sauce used with grilled or smoked foods. Common ingredients include tomatoes, vinegar, sugar, spices, and seasonings.",
    "question": "What is barbecue sauce?"
  },
  {
    "id": 7308,
    "category": "Condiments and Sauces",
    "text": "Pesto is an Italian sauce traditionally made from basil, pine nuts, garlic, hard cheese, and olive oil. It is commonly served with pasta but can also be used in sandwiches and other dishes.",
    "question": "What is pesto?"
  },
  {
    "id": 7309,
    "category": "Condiments and Sauces",
    "text": "Tahini is a thick paste made from ground sesame seeds. It is widely used in Middle Eastern and Mediterranean cooking and is an important ingredient in foods such as hummus.",
    "question": "What is tahini?"
  },
  {
    "id": 7310,
    "category": "Condiments and Sauces",
    "text": "Salsa is a sauce commonly made from tomatoes, onions, chili peppers, herbs, and other ingredients. It is strongly associated with Mexican cuisine and is often served with tortilla chips or used in cooked dishes.",
    "question": "What is salsa?"
  },
  {
    "id": 7311,
    "category": "Condiments and Sauces",
    "text": "Aioli is a creamy sauce traditionally made by emulsifying garlic with olive oil. Modern versions often contain egg yolk and are commonly served with seafood, vegetables, potatoes, or sandwiches.",
    "question": "What is aioli?"
  },
  {
    "id": 7312,
    "category": "Condiments and Sauces",
    "text": "Gravy is a savory sauce commonly made from meat juices, stock, and a thickening ingredient such as flour or starch. It is often served with meat, potatoes, and other cooked foods.",
    "question": "What is gravy?"
  },
  {
    "id": 7313,
    "category": "Condiments and Sauces",
    "text": "Béchamel is a classic French white sauce made from milk thickened with butter and flour. It is used in dishes such as lasagna, gratins, and other baked foods.",
    "question": "What is béchamel sauce?"
  },
  {
    "id": 7314,
    "category": "Condiments and Sauces",
    "text": "Hollandaise is a rich sauce made by emulsifying egg yolks with melted butter and an acidic ingredient such as lemon juice. It is commonly served with eggs, vegetables, and fish.",
    "question": "What is hollandaise sauce?"
  },
  {
    "id": 7315,
    "category": "Condiments and Sauces",
    "text": "Tzatziki is a Greek sauce or dip made primarily from yogurt, cucumber, garlic, herbs, and sometimes lemon juice or olive oil. It is commonly served with grilled meat, bread, and vegetables.",
    "question": "What is tzatziki?"
  },
  {
    "id": 7316,
    "category": "Dairy and Alternatives",
    "text": "Sour cream is a fermented dairy product made by adding lactic acid bacteria to cream. It has a thick texture and mildly tangy flavor and is used in sauces, dips, soups, and other dishes.",
    "question": "What is sour cream?"
  },
  {
    "id": 7317,
    "category": "Dairy and Alternatives",
    "text": "Cream cheese is a soft, mild cheese made from milk and cream. It is commonly spread on bread and bagels and is also widely used in cheesecakes and other desserts.",
    "question": "What is cream cheese?"
  },
  {
    "id": 7318,
    "category": "Dairy and Alternatives",
    "text": "Ricotta is a soft Italian dairy product with a mild flavor and creamy texture. It is commonly used in pasta fillings, lasagna, desserts, and spreads.",
    "question": "What is ricotta?"
  },
  {
    "id": 7319,
    "category": "Dairy and Alternatives",
    "text": "Parmesan is a hard Italian cheese with a strong, savory flavor. It is commonly grated over pasta, risotto, soups, salads, and other dishes.",
    "question": "What is Parmesan cheese?"
  },
  {
    "id": 7320,
    "category": "Dairy and Alternatives",
    "text": "Cheddar is a firm cheese that originated in England. It ranges from mild to sharp in flavor and is commonly used in sandwiches, burgers, sauces, and cooked dishes.",
    "question": "What is cheddar cheese?"
  },
  {
    "id": 7321,
    "category": "Dairy and Alternatives",
    "text": "Brie is a soft-ripened French cheese with a pale interior and a soft edible rind. It has a creamy texture and a mild flavor that becomes stronger as it matures.",
    "question": "What is Brie cheese?"
  },
  {
    "id": 7322,
    "category": "Dairy and Alternatives",
    "text": "Camembert is a soft-ripened French cheese with a white edible rind and creamy interior. It has a mild flavor when young and becomes stronger as it matures.",
    "question": "What is Camembert?"
  },
  {
    "id": 7323,
    "category": "Dairy and Alternatives",
    "text": "Blue cheese is a group of cheeses containing cultures of specific molds that create blue or green veins. These cheeses typically have a strong flavor and distinctive aroma.",
    "question": "What is blue cheese?"
  },
  {
    "id": 7324,
    "category": "Dairy and Alternatives",
    "text": "Goat cheese is cheese made from goat's milk. It can have a soft, creamy texture or be made into firmer varieties and often has a distinctive tangy flavor.",
    "question": "What is goat cheese?"
  },
  {
    "id": 7325,
    "category": "Dairy and Alternatives",
    "text": "Soy milk is a plant-based beverage made by soaking and grinding soybeans and mixing the resulting material with water. It is commonly used as an alternative to cow's milk.",
    "question": "What is soy milk?"
  },
  {
    "id": 7326,
    "category": "Dairy and Alternatives",
    "text": "Almond milk is a plant-based beverage made from almonds and water. Commercial versions may contain added vitamins, minerals, sweeteners, flavors, or stabilizers.",
    "question": "What is almond milk?"
  },
  {
    "id": 7327,
    "category": "Dairy and Alternatives",
    "text": "Tofu is a food made by coagulating soy milk and pressing the resulting curds into blocks. It is an important source of plant protein and is widely used in Asian cuisines.",
    "question": "What is tofu?"
  },
  {
    "id": 7328,
    "category": "Dairy and Alternatives",
    "text": "Tempeh is a fermented food made from soybeans that are bound together into a firm cake. It has a nutty flavor and is commonly used as a source of plant protein.",
    "question": "What is tempeh?"
  },
  {
    "id": 7329,
    "category": "Oils and Fats",
    "text": "Ghee is a type of clarified butter in which water and most milk solids have been removed. It has a rich flavor and is widely used in South Asian and Middle Eastern cooking.",
    "question": "What is ghee?"
  },
  {
    "id": 7330,
    "category": "Oils and Fats",
    "text": "Margarine is a spread or cooking fat made primarily from vegetable oils or other fats. It is commonly used as an alternative to butter in cooking and baking.",
    "question": "What is margarine?"
  },
  {
    "id": 7331,
    "category": "Oils and Fats",
    "text": "Lard is a cooking fat made from rendered pig fat. It has traditionally been used for frying, baking, pastry making, and other forms of cooking.",
    "question": "What is lard?"
  },
  {
    "id": 7332,
    "category": "Food Preparation",
    "text": "Peeling is the process of removing the outer skin or rind from a food such as a potato, carrot, apple, or citrus fruit. It can be done with a knife or vegetable peeler.",
    "question": "What does peeling food mean?"
  },
  {
    "id": 7333,
    "category": "Food Preparation",
    "text": "Mincing means cutting food into extremely small pieces. Meat, garlic, onions, herbs, and other ingredients can be minced to distribute their flavor throughout a dish.",
    "question": "What does mincing mean in cooking?"
  },
  {
    "id": 7334,
    "category": "Food Preparation",
    "text": "Crushing means pressing or breaking an ingredient into smaller pieces or a paste. Garlic, spices, nuts, and some fruits and vegetables are commonly crushed during food preparation.",
    "question": "What does crushing mean in cooking?"
  },
  {
    "id": 7335,
    "category": "Food Preparation",
    "text": "Searing is a cooking technique that exposes the surface of food to high heat for a short time. It creates browning and develops additional flavor on foods such as meat and vegetables.",
    "question": "What is searing?"
  },
  {
    "id": 7336,
    "category": "Food Preparation",
    "text": "Charring means cooking the surface of food at high heat until it becomes heavily browned or partially blackened. It can add a smoky flavor and is often used with vegetables and meat.",
    "question": "What is charring?"
  },
  {
    "id": 7337,
    "category": "Food Preparation",
    "text": "Deglazing is a cooking technique in which liquid is added to a hot pan to loosen browned food particles from its surface. The resulting liquid can be used as the base for a sauce or gravy.",
    "question": "What is deglazing?"
  },
  {
    "id": 7338,
    "category": "Food Preparation",
    "text": "Reducing a sauce means simmering it so that some of its water evaporates. This concentrates its flavor and often makes the sauce thicker.",
    "question": "What does reducing a sauce mean?"
  },
  {
    "id": 7339,
    "category": "Food Preparation",
    "text": "Proofing is a stage in bread making during which yeast dough is allowed to rest and rise. The yeast produces carbon dioxide, causing the dough to increase in volume.",
    "question": "What is proofing dough?"
  },
  {
    "id": 7340,
    "category": "Food Preparation",
    "text": "Resting dough means allowing prepared dough to sit for a period of time before it is shaped or baked. Resting can allow gluten to relax and ingredients to become more evenly distributed.",
    "question": "Why is dough rested?"
  },
  {
    "id": 7341,
    "category": "Kitchen Equipment",
    "text": "A chef's knife is a general-purpose kitchen knife used for tasks such as chopping, slicing, and dicing. Its broad blade and pointed tip make it one of the most versatile kitchen tools.",
    "question": "What is a chef's knife?"
  },
  {
    "id": 7342,
    "category": "Kitchen Equipment",
    "text": "A cutting board is a flat surface used for cutting and preparing food. It protects kitchen counters and provides a stable surface for using knives.",
    "question": "What is a cutting board?"
  },
  {
    "id": 7343,
    "category": "Kitchen Equipment",
    "text": "A frying pan is a shallow cooking vessel with a handle used for frying, sautéing, searing, and other cooking methods. It is commonly made from materials such as stainless steel, aluminum, cast iron, or coated metal.",
    "question": "What is a frying pan?"
  },
  {
    "id": 7344,
    "category": "Kitchen Equipment",
    "text": "A saucepan is a relatively deep cooking pan with a handle, usually designed for preparing sauces, soups, grains, and other foods. It commonly has a lid.",
    "question": "What is a saucepan?"
  },
  {
    "id": 7345,
    "category": "Kitchen Equipment",
    "text": "A wok is a deep, rounded cooking pan traditionally associated with Chinese cuisine. Its shape makes it useful for stir-frying, steaming, deep-frying, and other cooking methods.",
    "question": "What is a wok?"
  },
  {
    "id": 7346,
    "category": "Kitchen Equipment",
    "text": "A blender is an electric kitchen appliance used to combine, mix, or puree ingredients. It is commonly used for smoothies, soups, sauces, and other liquid or semi-liquid foods.",
    "question": "What is a blender?"
  },
  {
    "id": 7347,
    "category": "Kitchen Equipment",
    "text": "A food processor is an electric kitchen appliance that can chop, slice, grate, mix, knead, or puree food using interchangeable blades and discs. It is useful for preparing ingredients quickly.",
    "question": "What is a food processor?"
  },
  {
    "id": 7348,
    "category": "Kitchen Equipment",
    "text": "A colander is a bowl-shaped kitchen tool with holes that allow liquid to drain while retaining solid food. It is commonly used for pasta, rice, vegetables, and washed produce.",
    "question": "What is a colander?"
  },
  {
    "id": 7349,
    "category": "Kitchen Equipment",
    "text": "A kitchen sieve is a mesh or perforated tool used to separate fine particles from larger ones. It can be used to sift flour, strain sauces, or remove lumps from ingredients.",
    "question": "What is a kitchen sieve?"
  },
  {
    "id": 7350,
    "category": "Kitchen Equipment",
    "text": "A food thermometer is a device used to measure the internal temperature of food. It is particularly useful for checking whether meat, poultry, and other foods have reached a safe cooking temperature.",
    "question": "What is a food thermometer?"
  },
  {
    "id": 7351,
    "category": "Food Terminology",
    "text": "An ingredient is any food or substance used to make a dish or recipe. A recipe normally lists the ingredients needed and explains how they should be combined and prepared.",
    "question": "What is an ingredient?"
  },
  {
    "id": 7352,
    "category": "Food Terminology",
    "text": "A recipe is a set of instructions explaining how to prepare a particular food or dish. It normally includes ingredients, quantities, preparation steps, and cooking instructions.",
    "question": "What is a recipe?"
  },
  {
    "id": 7353,
    "category": "Food Terminology",
    "text": "A garnish is a small amount of food added to a finished dish to improve its appearance, flavor, or texture. Common garnishes include herbs, sauces, grated cheese, nuts, and fruit.",
    "question": "What is a garnish?"
  },
  {
    "id": 7354,
    "category": "Food Terminology",
    "text": "A topping is an ingredient or mixture placed on top of another food. Examples include cheese on pizza, fruit on yogurt, and syrup on pancakes.",
    "question": "What is a food topping?"
  },
  {
    "id": 7355,
    "category": "Food Terminology",
    "text": "A filling is a food mixture placed inside another food before or during preparation. Examples include meat in dumplings, cheese in ravioli, and fruit in pastries.",
    "question": "What is a food filling?"
  },
  {
    "id": 7356,
    "category": "Food Terminology",
    "text": "Batter is a relatively liquid mixture used to make foods such as pancakes, cakes, waffles, and some fried foods. It commonly contains flour, liquid, and other ingredients such as eggs or a raising agent.",
    "question": "What is batter?"
  },
  {
    "id": 7357,
    "category": "Food Terminology",
    "text": "Dough is a mixture of flour and liquid that can also contain ingredients such as yeast, eggs, salt, sugar, or fat. Dough is used to make foods including bread, pasta, pizza, and pastries.",
    "question": "What is dough?"
  },
  {
    "id": 7358,
    "category": "Food Terminology",
    "text": "Stock is a flavorful liquid made by simmering ingredients such as bones, meat, vegetables, or fish in water. It is commonly used as a base for soups, sauces, stews, and other dishes.",
    "question": "What is stock?"
  },
  {
    "id": 7359,
    "category": "Food Terminology",
    "text": "Broth is a savory liquid made by cooking meat, vegetables, bones, or other ingredients in water. It can be consumed as a soup or used as a base for other dishes.",
    "question": "What is broth?"
  },
  {
    "id": 7360,
    "category": "Food Terminology",
    "text": "A dip is a thick or semi-thick food into which other foods are dipped before eating. Common examples include hummus, salsa, guacamole, tzatziki, and cheese dips.",
    "question": "What is a dip?"
  },
  {
    "id": 7361,
    "category": "Food Terminology",
    "text": "A spread is a soft or semi-soft food designed to be spread over another food such as bread or crackers. Examples include butter, cream cheese, peanut butter, and jam.",
    "question": "What is a food spread?"
  },
  {
    "id": 7362,
    "category": "Food Terminology",
    "text": "A relish is a condiment made from chopped vegetables, fruits, or other ingredients that are usually cooked or preserved in a seasoned mixture. It is often used to add flavor to meat, sandwiches, and other foods.",
    "question": "What is relish?"
  },
  {
    "id": 7363,
    "category": "Nutrition",
    "text": "Added sugar is sugar or another caloric sweetener added to food or drinks during processing, preparation, or serving. It is different from sugars that naturally occur in foods such as fruit and milk.",
    "question": "What is added sugar?"
  },
  {
    "id": 7364,
    "category": "Nutrition",
    "text": "Saturated fat is a type of dietary fat in which the fatty acid chains contain no carbon-carbon double bonds. It occurs naturally in foods such as butter, cheese, fatty meat, and some plant oils.",
    "question": "What is saturated fat?"
  },
  {
    "id": 7365,
    "category": "Nutrition",
    "text": "Unsaturated fat is a type of dietary fat containing one or more carbon-carbon double bonds. Monounsaturated and polyunsaturated fats are the two main types of unsaturated fat.",
    "question": "What is unsaturated fat?"
  },
  {
    "id": 7366,
    "category": "Nutrition",
    "text": "Trans fat is a type of unsaturated fat that can occur naturally in small amounts or be produced during some industrial food-processing methods. High intake of industrial trans fat is associated with increased cardiovascular risk.",
    "question": "What is trans fat?"
  },
  {
    "id": 7367,
    "category": "Nutrition",
    "text": "Sodium is a mineral and electrolyte found naturally in many foods and commonly added to food as salt. The body needs sodium for functions such as nerve signaling and fluid balance, but excessive intake can be harmful.",
    "question": "What is sodium in food?"
  },
  {
    "id": 7368,
    "category": "Nutrition",
    "text": "Cholesterol is a waxy substance needed by the body to build cell membranes and produce certain hormones. It is found in animal-based foods and is also produced naturally by the body.",
    "question": "What is cholesterol?"
  },
  {
    "id": 7369,
    "category": "Nutrition",
    "text": "Hydration is the process of maintaining an adequate amount of water in the body. Water is essential for temperature regulation, circulation, digestion, and many other biological functions.",
    "question": "Why is hydration important?"
  },
  {
    "id": 7370,
    "category": "Nutrition",
    "text": "The glycemic index is a measure used to classify carbohydrate-containing foods according to how quickly they tend to raise blood glucose levels compared with a reference food. Foods are generally described as having low, medium, or high glycemic index values.",
    "question": "What is the glycemic index?"
  },
  {
    "id": 7371,
    "category": "Nutrition",
    "text": "Electrolytes are minerals that carry an electrical charge when dissolved in body fluids. Important electrolytes include sodium, potassium, calcium, magnesium, chloride, phosphate, and bicarbonate.",
    "question": "What are electrolytes?"
  },
  {
    "id": 7372,
    "category": "Nutrition",
    "text": "Omega-3 fatty acids are a group of polyunsaturated fats that play important roles in the body. They are found in foods such as fatty fish, flaxseed, chia seeds, walnuts, and some plant oils.",
    "question": "What are omega-3 fatty acids?"
  },
  {
    "id": 7373,
    "category": "Food Safety",
    "text": "Safe food thawing means defrosting frozen food in a way that limits the growth of harmful microorganisms. Common safe methods include thawing food in a refrigerator, in cold water, or using a microwave when the food will be cooked immediately.",
    "question": "How should frozen food be safely thawed?"
  },
  {
    "id": 7374,
    "category": "Food Safety",
    "text": "Food poisoning is an illness caused by eating food or drinking beverages contaminated with harmful microorganisms, toxins, chemicals, or other hazardous substances. Symptoms commonly include nausea, vomiting, diarrhea, abdominal pain, and fever.",
    "question": "What is food poisoning?"
  },
  {
    "id": 7375,
    "category": "Food Safety",
    "text": "Salmonella is a group of bacteria that can cause gastrointestinal illness when people consume contaminated food or water. Foods such as undercooked eggs, poultry, and contaminated produce can sometimes carry Salmonella.",
    "question": "What is Salmonella?"
  },
  {
    "id": 7376,
    "category": "Food Safety",
    "text": "Listeria is a group of bacteria that includes Listeria monocytogenes, which can cause the foodborne illness listeriosis. The bacteria can survive and grow under refrigeration, making proper food handling particularly important.",
    "question": "What is Listeria?"
  },
  {
    "id": 7377,
    "category": "Food Safety",
    "text": "E. coli is a group of bacteria that normally live in the intestines of humans and many animals. Some strains can cause serious foodborne illness and may be transmitted through contaminated food or water.",
    "question": "What is E. coli?"
  },
  {
    "id": 7378,
    "category": "Food Safety",
    "text": "Norovirus is a highly contagious virus that can cause vomiting, diarrhea, stomach pain, and other gastrointestinal symptoms. It can spread through contaminated food, water, surfaces, and close contact with infected people.",
    "question": "What is norovirus?"
  },
  {
    "id": 7379,
    "category": "World Cuisine",
    "text": "Thai cuisine is known for balancing flavors such as sweet, sour, salty, bitter, and spicy. Common ingredients include rice, noodles, chili peppers, herbs, coconut milk, fish sauce, lime, and vegetables.",
    "question": "What is Thai cuisine?"
  },
  {
    "id": 7380,
    "category": "World Cuisine",
    "text": "Vietnamese cuisine commonly uses fresh herbs, vegetables, rice, noodles, seafood, meat, and flavorful sauces. Well-known Vietnamese dishes include pho, banh mi, and fresh spring rolls.",
    "question": "What is Vietnamese cuisine?"
  },
  {
    "id": 7381,
    "category": "World Cuisine",
    "text": "Korean cuisine includes a wide variety of rice, noodle, meat, seafood, vegetable, and fermented dishes. Kimchi, bibimbap, bulgogi, and Korean barbecue are internationally well-known examples.",
    "question": "What is Korean cuisine?"
  },
  {
    "id": 7382,
    "category": "World Cuisine",
    "text": "Middle Eastern cuisine includes foods from a large region with diverse culinary traditions. Common ingredients include chickpeas, lentils, lamb, rice, sesame, olive oil, herbs, spices, yogurt, and vegetables.",
    "question": "What is Middle Eastern cuisine?"
  },
  {
    "id": 7383,
    "category": "World Cuisine",
    "text": "Balkan cuisine refers to the diverse food traditions of the Balkan Peninsula. It commonly includes grilled meats, vegetables, dairy products, bread, pastries, soups, stews, and dishes influenced by neighboring Mediterranean, Central European, and Middle Eastern cuisines.",
    "question": "What is Balkan cuisine?"
  },
  {
    "id": 7384,
    "category": "Food Origins",
    "text": "Cocoa comes from the seeds of the cacao tree. The seeds are processed to produce cocoa powder, cocoa butter, and chocolate.",
    "question": "Where does cocoa come from?"
  },
  {
    "id": 7385,
    "category": "Food Origins",
    "text": "Coffee beans are the seeds found inside the fruits of coffee plants. The beans are harvested, processed, roasted, and ground before being brewed into coffee.",
    "question": "Where do coffee beans come from?"
  },
  {
    "id": 7386,
    "category": "Food Origins",
    "text": "Tea is traditionally made by infusing processed leaves of the Camellia sinensis plant in hot water. Black, green, white, and oolong teas are produced using different processing methods.",
    "question": "Where does tea come from?"
  },
  {
    "id": 7387,
    "category": "Food Origins",
    "text": "Saffron is a spice obtained from the dried red stigmas of the Crocus sativus flower. It is highly valued for its distinctive color, aroma, and flavor and is used in small quantities.",
    "question": "What is saffron?"
  },
  {
    "id": 7388,
    "category": "Food Origins",
    "text": "Vanilla comes from the cured fruit of vanilla orchids. The pods contain aromatic compounds that give vanilla its characteristic sweet and floral flavor.",
    "question": "Where does vanilla come from?"
  },
  {
    "id": 7389,
    "category": "Meals and Dishes",
    "text": "French fries are strips of potato that are usually deep-fried until they become crisp on the outside and soft inside. They are commonly served as a side dish with burgers, sandwiches, and other meals.","question": "What are French fries"
  },
  {
    "id": 7390,
    "category": "Meals and Dishes",
    "text": "A hot dog is a cooked sausage served inside a partially sliced bun. It is commonly topped with ingredients such as mustard, ketchup, onions, relish, or sauerkraut. The term hot dog can also refer to the sausage itself.","question": "What is hot dog?"},
];