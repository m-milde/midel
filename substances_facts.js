/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

var SUBSTANCES_LIBRARY = [
  {
    "id": 6801,
    "category": "Liquids",
    "text": "A liquid is a state of matter that has a definite volume but takes the shape of its container. Its particles can move past one another more freely than particles in a solid.",
    "question": "What is a liquid?"
  },
  {
    "id": 6802,
    "category": "Liquids",
    "text": "Water is a transparent chemical substance made of hydrogen and oxygen. It is essential for life and is found in oceans, rivers, lakes, glaciers, groundwater, and living organisms.",
    "question": "What is water?"
  },
  {
    "id": 6803,
    "category": "Liquids",
    "text": "Freshwater is water containing relatively small amounts of dissolved salts. It is found in rivers, lakes, glaciers, groundwater, and some wetlands and is essential for drinking, agriculture, and ecosystems.",
    "question": "What is freshwater?"
  },
  {
    "id": 6804,
    "category": "Liquids",
    "text": "Seawater is water from seas and oceans that contains significant amounts of dissolved salts and minerals. Its average salinity is about 3.5 percent.",
    "question": "What is seawater?"
  },
  {
    "id": 6805,
    "category": "Liquids",
    "text": "Saltwater is water containing dissolved salts. Oceans and seas are the largest natural sources of saltwater, although saltwater can also occur in lakes, groundwater, and other environments.",
    "question": "What is saltwater?"
  },
  {
    "id": 6806,
    "category": "Liquids",
    "text": "Oil is a broad term for liquids made mainly of hydrocarbons or other organic compounds. Different oils are obtained from plants, animals, petroleum, and other natural or industrial sources.",
    "question": "What is oil?"
  },
  {
    "id": 6807,
    "category": "Liquids",
    "text": "Vegetable oil is a liquid fat obtained from plants such as sunflower, olive, soybean, rapeseed, and palm. It is widely used for cooking, food production, cosmetics, and industry.",
    "question": "What is vegetable oil?"
  },
  {
    "id": 6808,
    "category": "Liquids",
    "text": "Olive oil is a vegetable oil produced from olives. It is widely used in cooking and food preparation and is an important part of Mediterranean cuisine.",
    "question": "What is olive oil?"
  },
  {
    "id": 6809,
    "category": "Liquids",
    "text": "Essential oils are concentrated aromatic liquids obtained from plants. They contain volatile compounds responsible for characteristic plant scents and are used in fragrances, cosmetics, flavorings, and some traditional applications.",
    "question": "What are essential oils?"
  },
  {
    "id": 6810,
    "category": "Liquids",
    "text": "Liquid nitrogen is nitrogen in its liquid state at very low temperatures. It is extremely cold and is commonly used for cooling, freezing, scientific research, and food processing.",
    "question": "What is liquid nitrogen?"
  },
  {
    "id": 6811,
    "category": "Liquids",
    "text": "Liquid oxygen is oxygen in its liquid state at very low temperatures. It is used in industry, medicine, scientific research, and as an oxidizer in some rocket systems.",
    "question": "What is liquid oxygen?"
  },
  {
    "id": 6812,
    "category": "Liquids",
    "text": "Mercury is a chemical element and metal that is liquid at room temperature. It was historically used in thermometers, instruments, and industrial applications, although many uses have been reduced because mercury is toxic.",
    "question": "What is mercury?"
  },
  {
    "id": 6813,
    "category": "Liquids",
    "text": "A solution is a uniform mixture in which one or more substances are dissolved in another substance. The dissolved substance is called the solute and the dissolving substance is called the solvent.",
    "question": "What is a solution?"
  },
  {
    "id": 6814,
    "category": "Liquids",
    "text": "A solvent is a substance capable of dissolving another substance to form a solution. Water is one of the most common solvents, but many organic liquids are also used as solvents.",
    "question": "What is a solvent?"
  },
  {
    "id": 6815,
    "category": "Liquids",
    "text": "A solute is a substance dissolved in a solvent to form a solution. Salt dissolved in water is a simple example of a solute and solvent.",
    "question": "What is a solute?"
  },
  {
    "id": 6816,
    "category": "Liquids",
    "text": "An acid is a substance that can donate hydrogen ions in suitable chemical reactions. Acids commonly have a sour taste and can react with bases to form salts and water.",
    "question": "What is an acid?"
  },
  {
    "id": 6817,
    "category": "Liquids",
    "text": "A base is a substance that can accept hydrogen ions or produce hydroxide ions in water. Bases can react with acids in neutralization reactions.",
    "question": "What is a base?"
  },
  {
    "id": 6818,
    "category": "Liquids",
    "text": "An alkali is a base that dissolves in water and produces hydroxide ions. Common alkalis include sodium hydroxide, potassium hydroxide, and aqueous ammonia.",
    "question": "What is an alkali?"
  },
  {
    "id": 6819,
    "category": "Liquids",
    "text": "A neutral solution has a pH close to 7 at standard conditions. Pure water is commonly used as an example of a nearly neutral substance.",
    "question": "What is a neutral solution?"
  },
  {
    "id": 6820,
    "category": "Liquids",
    "text": "pH is a measure of how acidic or alkaline an aqueous solution is. The pH scale commonly ranges from 0 to 14, with lower values being more acidic and higher values more alkaline.",
    "question": "What is pH?"
  },

  {
    "id": 6821,
    "category": "Alcohols",
    "text": "An alcohol is an organic compound containing a hydroxyl group attached to a carbon atom. Alcohols have many uses in fuels, solvents, medicines, industry, and beverages.",
    "question": "What is an alcohol?"
  },
  {
    "id": 6822,
    "category": "Alcohols",
    "text": "Ethanol is a type of alcohol commonly found in alcoholic beverages. It is also used as a solvent, disinfectant, fuel component, and industrial chemical.",
    "question": "What is ethanol?"
  },
  {
    "id": 6823,
    "category": "Alcohols",
    "text": "Methanol is a simple alcohol used mainly as an industrial solvent, fuel, and chemical feedstock. It is highly toxic to humans and can cause severe poisoning if swallowed.",
    "question": "What is methanol?"
  },
  {
    "id": 6824,
    "category": "Alcohols",
    "text": "Isopropyl alcohol, also called isopropanol, is a colorless flammable liquid commonly used as a solvent and cleaning agent. It is also widely used in rubbing alcohol and disinfecting products.",
    "question": "What is isopropyl alcohol?"
  },
  {
    "id": 6825,
    "category": "Alcohols",
    "text": "Glycerol, also called glycerin, is a colorless, viscous liquid with three hydroxyl groups. It is widely used in food, cosmetics, pharmaceuticals, soaps, and other products.",
    "question": "What is glycerol?"
  },
  {
    "id": 6826,
    "category": "Alcohols",
    "text": "Alcoholic beverages are drinks containing ethanol produced through fermentation or distillation. Common examples include beer, wine, cider, spirits, and many mixed drinks.",
    "question": "What are alcoholic beverages?"
  },
  {
    "id": 6827,
    "category": "Alcohols",
    "text": "Beer is an alcoholic beverage made by fermenting grains, usually malted barley, with water, yeast, and hops. Different brewing methods produce many varieties of beer.",
    "question": "What is beer?"
  },
  {
    "id": 6828,
    "category": "Alcohols",
    "text": "Wine is an alcoholic beverage made by fermenting grapes or other fruits. Different grape varieties, fermentation methods, and aging processes produce different types of wine.",
    "question": "What is wine?"
  },
  {
    "id": 6829,
    "category": "Alcohols",
    "text": "Red wine is wine made primarily from dark-colored grape varieties and usually fermented with the grape skins. The skins contribute color, tannins, and other compounds.",
    "question": "What is red wine?"
  },
  {
    "id": 6830,
    "category": "Alcohols",
    "text": "White wine is usually made from white grapes or from dark grapes whose skins are removed before fermentation. It generally has a lighter color than red wine.",
    "question": "What is white wine?"
  },
  {
    "id": 6831,
    "category": "Alcohols",
    "text": "Rosé is a type of wine with a pink or pale red color. It is commonly produced by allowing grape juice limited contact with dark grape skins.",
    "question": "What is rosé wine?"
  },
  {
    "id": 6832,
    "category": "Alcohols",
    "text": "Sparkling wine is wine containing significant dissolved carbon dioxide, which creates bubbles when the bottle or container is opened. Champagne is a famous type of sparkling wine.",
    "question": "What is sparkling wine?"
  },
  {
    "id": 6833,
    "category": "Alcohols",
    "text": "Champagne is a sparkling wine produced in the Champagne region of France under specific production rules. It is commonly made from Chardonnay, Pinot Noir, and Pinot Meunier grapes.",
    "question": "What is Champagne?"
  },
  {
    "id": 6834,
    "category": "Alcohols",
    "text": "Cider is an alcoholic beverage made by fermenting apple juice. Some varieties are sweet, while others are dry or sparkling.",
    "question": "What is cider?"
  },
  {
    "id": 6835,
    "category": "Alcohols",
    "text": "Perry is an alcoholic beverage made by fermenting the juice of pears. It is similar to cider, which is traditionally made from apples.",
    "question": "What is perry?"
  },
  {
    "id": 6836,
    "category": "Alcohols",
    "text": "A spirit is a distilled alcoholic beverage with a relatively high concentration of ethanol. Common spirits include vodka, whisky, rum, gin, brandy, and tequila.",
    "question": "What is a spirit?"
  },
  {
    "id": 6837,
    "category": "Alcohols",
    "text": "Vodka is a distilled alcoholic spirit traditionally associated with Eastern Europe and Russia. It is generally clear and has a relatively neutral flavor.",
    "question": "What is vodka?"
  },
  {
    "id": 6838,
    "category": "Alcohols",
    "text": "Whisky is a distilled alcoholic spirit made from fermented grain mash and usually aged in wooden barrels. Major styles include Scotch whisky, Irish whiskey, bourbon, and Canadian whisky.",
    "question": "What is whisky?"
  },
  {
    "id": 6839,
    "category": "Alcohols",
    "text": "Rum is a distilled alcoholic spirit made from sugarcane products, usually molasses or sugarcane juice. It is strongly associated with the Caribbean and other tropical regions.",
    "question": "What is rum?"
  },
  {
    "id": 6840,
    "category": "Alcohols",
    "text": "Gin is a distilled spirit characterized by the flavor of juniper berries and other botanical ingredients. It is commonly used in cocktails and mixed drinks.",
    "question": "What is gin?"
  },
  {
    "id": 6841,
    "category": "Alcohols",
    "text": "Brandy is a distilled alcoholic beverage made from fermented fruit juice, commonly grapes. Some varieties are aged in wooden barrels to develop their color and flavor.",
    "question": "What is brandy?"
  },
  {
    "id": 6842,
    "category": "Alcohols",
    "text": "Cognac is a type of brandy produced in the Cognac region of France under specific production rules. It is made primarily from white grapes and aged in oak barrels.",
    "question": "What is cognac?"
  },
  {
    "id": 6843,
    "category": "Alcohols",
    "text": "Tequila is a distilled spirit made primarily from the blue agave plant. It is produced mainly in the Mexican state of Jalisco and several surrounding regions.",
    "question": "What is tequila?"
  },
  {
    "id": 6844,
    "category": "Alcohols",
    "text": "Mezcal is a Mexican distilled spirit made from agave plants. Unlike tequila, which is made specifically from blue agave under its production rules, mezcal can be made from several agave species.",
    "question": "What is mezcal?"
  },
  {
    "id": 6845,
    "category": "Alcohols",
    "text": "Liqueur is a sweetened alcoholic beverage flavored with fruits, herbs, spices, nuts, flowers, or other ingredients. Liqueurs are often consumed in small quantities or used in cocktails.",
    "question": "What is a liqueur?"
  },
  {
    "id": 6846,
    "category": "Alcohols",
    "text": "Vermouth is a fortified and aromatized wine flavored with herbs, spices, and other botanical ingredients. It is commonly used in cocktails and can also be served as an aperitif.",
    "question": "What is vermouth?"
  },
  {
    "id": 6847,
    "category": "Alcohols",
    "text": "Fortified wine is wine to which a distilled spirit has been added, increasing its alcohol content. Examples include port, sherry, Madeira, and Marsala.",
    "question": "What is fortified wine?"
  },
  {
    "id": 6848,
    "category": "Alcohols",
    "text": "Port is a fortified wine traditionally produced in Portugal's Douro Valley. It is commonly sweet and is available in several styles, including ruby and tawny port.",
    "question": "What is port wine?"
  },
  {
    "id": 6849,
    "category": "Alcohols",
    "text": "Sherry is a fortified wine associated with the Jerez region of southern Spain. It is produced in several styles ranging from very dry to sweet.",
    "question": "What is sherry?"
  },
  {
    "id": 6850,
    "category": "Alcohols",
    "text": "Sake is a Japanese alcoholic beverage made by fermenting rice with water, yeast, and a mold called koji. It is often described as rice wine, although its production process differs from traditional wine fermentation.",
    "question": "What is sake?"
  },

  {
    "id": 6851,
    "category": "Non-Alcoholic Beverages",
    "text": "A non-alcoholic beverage is a drink containing no alcohol or only a very small amount within a legally defined limit. Examples include water, soft drinks, juices, tea, coffee, and many energy drinks.",
    "question": "What are non-alcoholic beverages?"
  },
  {
    "id": 6852,
    "category": "Non-Alcoholic Beverages",
    "text": "Soft drinks are non-alcoholic beverages that are usually flavored and sweetened or otherwise formulated for drinking. Many are carbonated and may contain water, sugar or sweeteners, acids, and flavorings.",
    "question": "What are soft drinks?"
  },
  {
    "id": 6853,
    "category": "Non-Alcoholic Beverages",
    "text": "Carbonated water is water containing dissolved carbon dioxide gas, which creates bubbles and a characteristic sparkling sensation. It can occur naturally or be produced artificially.",
    "question": "What is carbonated water?"
  },
  {
    "id": 6854,
    "category": "Non-Alcoholic Beverages",
    "text": "Mineral water is water containing naturally occurring minerals and dissolved substances. Natural mineral water comes from protected underground sources and has a characteristic mineral composition.",
    "question": "What is mineral water?"
  },
  {
    "id": 6855,
    "category": "Non-Alcoholic Beverages",
    "text": "Sparkling water is water containing dissolved carbon dioxide that produces bubbles. It can be naturally carbonated or have carbon dioxide added during production.",
    "question": "What is sparkling water?"
  },
  {
    "id": 6856,
    "category": "Non-Alcoholic Beverages",
    "text": "Tea is a beverage made by infusing processed leaves of the Camellia sinensis plant in hot or cold water. Black, green, white, and oolong teas are major types.",
    "question": "What is tea?"
  },
  {
    "id": 6857,
    "category": "Non-Alcoholic Beverages",
    "text": "Black tea is tea made from leaves that undergo substantial oxidation before drying. This gives the leaves a dark color and produces a stronger flavor than many less-oxidized teas.",
    "question": "What is black tea?"
  },
  {
    "id": 6858,
    "category": "Non-Alcoholic Beverages",
    "text": "Green tea is made from Camellia sinensis leaves that are heated soon after harvesting to limit oxidation. It generally has a lighter color and flavor than black tea.",
    "question": "What is green tea?"
  },
  {
    "id": 6859,
    "category": "Non-Alcoholic Beverages",
    "text": "Herbal tea is a beverage made by infusing herbs, flowers, fruits, spices, or other plant materials in water. Unlike traditional tea, it does not normally contain Camellia sinensis leaves.",
    "question": "What is herbal tea?"
  },
  {
    "id": 6860,
    "category": "Non-Alcoholic Beverages",
    "text": "Coffee is a beverage prepared from roasted and ground seeds of coffee plants. It contains caffeine and is one of the world's most widely consumed beverages.",
    "question": "What is coffee?"
  },
  {
    "id": 6861,
    "category": "Non-Alcoholic Beverages",
    "text": "Espresso is a concentrated coffee beverage made by forcing hot water through finely ground coffee under pressure. It forms the base of drinks such as cappuccino and latte.",
    "question": "What is espresso?"
  },
  {
    "id": 6862,
    "category": "Non-Alcoholic Beverages",
    "text": "Cocoa is a drink made using cocoa powder or chocolate combined with water or milk. The term can also refer to the seeds of the cacao tree.",
    "question": "What is cocoa?"
  },
  {
    "id": 6863,
    "category": "Non-Alcoholic Beverages",
    "text": "Fruit juice is a beverage made by extracting or processing the liquid portion of fruits. It contains naturally occurring sugars, water, and various vitamins and plant compounds.",
    "question": "What is fruit juice?"
  },
  {
    "id": 6864,
    "category": "Non-Alcoholic Beverages",
    "text": "Orange juice is a beverage made from oranges. It contains water, natural sugars, vitamin C, and other compounds found in the fruit.",
    "question": "What is orange juice?"
  },
  {
    "id": 6865,
    "category": "Non-Alcoholic Beverages",
    "text": "Lemonade is a drink traditionally made from lemon juice, water, and a sweetener. Recipes vary by region and may include carbonation or other flavors.",
    "question": "What is lemonade?"
  },
  {
    "id": 6866,
    "category": "Non-Alcoholic Beverages",
    "text": "Milk is a nutrient-rich liquid produced by mammals to feed their young. Cow's milk is widely consumed by humans and is used to make products such as cheese, yogurt, and butter.",
    "question": "What is milk?"
  },
  {
    "id": 6867,
    "category": "Non-Alcoholic Beverages",
    "text": "Plant milk is a beverage made from plant-derived ingredients such as soybeans, oats, almonds, rice, or peas. It is commonly used as an alternative to dairy milk.",
    "question": "What is plant milk?"
  },
  {
    "id": 6868,
    "category": "Non-Alcoholic Beverages",
    "text": "An energy drink is a beverage marketed to increase alertness or energy. Many contain caffeine, sugar or sweeteners, and other ingredients such as taurine or vitamins.",
    "question": "What is an energy drink?"
  },
  {
    "id": 6869,
    "category": "Non-Alcoholic Beverages",
    "text": "A sports drink is a beverage formulated to provide water, carbohydrates, and electrolytes during or after physical activity. Its main purpose is to help replace fluids and certain electrolytes.",
    "question": "What is a sports drink?"
  },
  {
    "id": 6870,
    "category": "Non-Alcoholic Beverages",
    "text": "A smoothie is a thick beverage made by blending fruits, vegetables, or other ingredients with a liquid such as water, milk, or plant milk.",
    "question": "What is a smoothie?"
  },

  {
    "id": 6871,
    "category": "Chemical Substances",
    "text": "A chemical substance is a form of matter with a defined chemical composition and characteristic properties. Chemical substances include elements, compounds, and some highly pure mixtures.",
    "question": "What is a chemical substance?"
  },
  {
    "id": 6872,
    "category": "Chemical Substances",
    "text": "An element is a pure chemical substance made of atoms that all have the same number of protons. Elements cannot be chemically broken down into simpler substances.",
    "question": "What is a chemical element?"
  },
  {
    "id": 6873,
    "category": "Chemical Substances",
    "text": "A chemical compound is a substance made from two or more different elements chemically bonded together in fixed proportions. Water and carbon dioxide are common examples.",
    "question": "What is a chemical compound?"
  },
  {
    "id": 6874,
    "category": "Chemical Substances",
    "text": "Oxygen is a chemical element and a colorless gas that makes up about 21 percent of Earth's atmosphere. It is essential for aerobic respiration and supports combustion.",
    "question": "What is oxygen?"
  },
  {
    "id": 6875,
    "category": "Chemical Substances",
    "text": "Hydrogen is the lightest chemical element and the most abundant element in the universe. It is a colorless gas and is an important component of water and many organic compounds.",
    "question": "What is hydrogen?"
  },
  {
    "id": 6876,
    "category": "Chemical Substances",
    "text": "Carbon is a chemical element that forms the basis of organic chemistry. It occurs in living organisms, minerals, fuels, carbon dioxide, and many manufactured materials.",
    "question": "What is carbon?"
  },
  {
    "id": 6877,
    "category": "Chemical Substances",
    "text": "Nitrogen is a chemical element and a colorless gas that makes up about 78 percent of Earth's atmosphere. It is an essential component of proteins and nucleic acids.",
    "question": "What is nitrogen?"
  },
  {
    "id": 6878,
    "category": "Chemical Substances",
    "text": "Carbon dioxide is a colorless gas made of carbon and oxygen. It is produced by respiration, combustion, and other processes and is an important greenhouse gas and part of the carbon cycle.",
    "question": "What is carbon dioxide?"
  },
  {
    "id": 6879,
    "category": "Chemical Substances",
    "text": "Carbon monoxide is a colorless and odorless gas produced mainly by incomplete combustion of carbon-containing fuels. It is toxic because it interferes with the blood's ability to carry oxygen.",
    "question": "What is carbon monoxide?"
  },
  {
    "id": 6880,
    "category": "Chemical Substances",
    "text": "Ozone is a form of oxygen containing three oxygen atoms per molecule. In the upper atmosphere it helps protect life from ultraviolet radiation, while ground-level ozone can be harmful to health and plants.",
    "question": "What is ozone?"
  },
  {
    "id": 6881,
    "category": "Chemical Substances",
    "text": "Hydrogen peroxide is a chemical compound commonly used in disinfecting, bleaching, and industrial processes. It decomposes into water and oxygen under suitable conditions.",
    "question": "What is hydrogen peroxide?"
  },
  {
    "id": 6882,
    "category": "Chemical Substances",
    "text": "Sodium chloride is a chemical compound commonly known as table salt. It is composed of sodium and chlorine and is widely used in food, industry, and chemical production.",
    "question": "What is sodium chloride?"
  },
  {
    "id": 6883,
    "category": "Chemical Substances",
    "text": "Sodium bicarbonate is a chemical compound commonly called baking soda. It is used in cooking, cleaning, fire extinguishers, and various industrial and household applications.",
    "question": "What is sodium bicarbonate?"
  },
  {
    "id": 6884,
    "category": "Chemical Substances",
    "text": "Acetic acid is an organic acid responsible for the characteristic sour taste and smell of vinegar. It is widely used in food production and chemical manufacturing.",
    "question": "What is acetic acid?"
  },
  {
    "id": 6885,
    "category": "Chemical Substances",
    "text": "Ammonia is a colorless gas with a strong odor composed of nitrogen and hydrogen. It is widely used to produce fertilizers and is also used in industrial cleaning and chemical production.",
    "question": "What is ammonia?"
  },
  {
    "id": 6886,
    "category": "Chemical Substances",
    "text": "Sulfuric acid is a highly corrosive mineral acid widely used in industry. It is important in fertilizer production, chemical manufacturing, petroleum processing, and lead-acid batteries.",
    "question": "What is sulfuric acid?"
  },
  {
    "id": 6887,
    "category": "Chemical Substances",
    "text": "Hydrochloric acid is an aqueous solution of hydrogen chloride. It is a strong acid used in chemical processing, metal treatment, cleaning, and laboratory applications.",
    "question": "What is hydrochloric acid?"
  },
  {
    "id": 6888,
    "category": "Chemical Substances",
    "text": "Nitric acid is a strong mineral acid containing nitrogen, hydrogen, and oxygen. It is used in fertilizer production, chemical manufacturing, metal treatment, and explosives manufacturing.",
    "question": "What is nitric acid?"
  },
  {
    "id": 6889,
    "category": "Chemical Substances",
    "text": "Sodium hydroxide is a strong base commonly called caustic soda. It is widely used in soap production, paper manufacturing, chemical processing, and industrial cleaning.",
    "question": "What is sodium hydroxide?"
  },
  {
    "id": 6890,
    "category": "Chemical Substances",
    "text": "Calcium carbonate is a common mineral compound found in limestone, marble, chalk, shells, and many other natural materials. It is used in construction, cement production, paper, and other industries.",
    "question": "What is calcium carbonate?"
  },
  {
    "id": 6891,
    "category": "Chemical Substances",
    "text": "Calcium oxide, commonly called quicklime, is produced by heating limestone. It is widely used in construction, cement production, steelmaking, water treatment, and chemical processes.",
    "question": "What is calcium oxide?"
  },
  {
    "id": 6892,
    "category": "Chemical Substances",
    "text": "Silicon dioxide is a compound made of silicon and oxygen. It is found naturally in quartz, sand, and many rocks and is an important ingredient in glass and ceramics.",
    "question": "What is silicon dioxide?"
  },
  {
    "id": 6893,
    "category": "Chemical Substances",
    "text": "Methane is a colorless, odorless gas and the simplest hydrocarbon. It is the main component of natural gas and is also a powerful greenhouse gas.",
    "question": "What is methane?"
  },
  {
    "id": 6894,
    "category": "Chemical Substances",
    "text": "Propane is a hydrocarbon gas commonly used as a fuel for heating, cooking, vehicles, and industrial processes. It is stored as a liquid under sufficient pressure.",
    "question": "What is propane?"
  },
  {
    "id": 6895,
    "category": "Chemical Substances",
    "text": "Butane is a hydrocarbon gas commonly used as a fuel. It is also used in portable lighters, camping equipment, and some aerosol applications.",
    "question": "What is butane?"
  },
  {
    "id": 6896,
    "category": "Chemical Substances",
    "text": "Acetone is a colorless and highly volatile liquid used as a solvent. It is commonly found in some cleaning products, industrial processes, and nail polish removers.",
    "question": "What is acetone?"
  },
  {
    "id": 6897,
    "category": "Chemical Substances",
    "text": "Ethylene glycol is an organic compound used mainly as a component of antifreeze and coolants. It is toxic if swallowed and requires careful handling.",
    "question": "What is ethylene glycol?"
  },
  {
    "id": 6898,
    "category": "Chemical Substances",
    "text": "Glycerin is another name for glycerol, a colorless, viscous liquid with a sweet taste. It is widely used in cosmetics, food, medicines, soaps, and other products.",
    "question": "What is glycerin?"
  },
  {
    "id": 6899,
    "category": "Chemical Substances",
    "text": "Chlorine is a reactive chemical element that is normally a yellow-green gas. Chlorine compounds are widely used for water disinfection, bleaching, plastics, and chemical production.",
    "question": "What is chlorine?"
  },
  {
    "id": 6900,
    "category": "Chemical Substances",
    "text": "Helium is a very light, chemically inert gas. It is used in balloons, cryogenic systems, scientific equipment, leak detection, and some industrial applications.",
    "question": "What is helium?"
  },
  {
    "id": 6901,
    "category": "Chemical Substances",
    "text": "Hydrogen chloride is a chemical compound consisting of hydrogen and chlorine. When dissolved in water it forms hydrochloric acid.",
    "question": "What is hydrogen chloride?"
  },
  {
    "id": 6902,
    "category": "Chemical Substances",
    "text": "Sulfur is a chemical element that is commonly found as a yellow solid. It is used to produce sulfuric acid, fertilizers, chemicals, and some industrial materials.",
    "question": "What is sulfur?"
  },
  {
    "id": 6903,
    "category": "Chemical Substances",
    "text": "Phosphorus is a chemical element that occurs in several forms and is important for living organisms. Phosphorus compounds are used in fertilizers, detergents, and industrial products.",
    "question": "What is phosphorus?"
  },
  {
    "id": 6904,
    "category": "Chemical Substances",
    "text": "Sodium is a soft, highly reactive metal that reacts strongly with water. Sodium compounds are common in nature and are important in food, industry, chemistry, and biology.",
    "question": "What is sodium?"
  },
  {
    "id": 6905,
    "category": "Chemical Substances",
    "text": "Potassium is a soft, reactive chemical element and an essential mineral for living organisms. Potassium compounds are widely used in fertilizers and other industrial applications.",
    "question": "What is potassium?"
  },
  {
    "id": 6906,
    "category": "Chemical Substances",
    "text": "Calcium is a chemical element and alkaline earth metal that is important in bones, teeth, muscles, and many biological processes. Calcium compounds are also widely used in construction.",
    "question": "What is calcium?"
  },
  {
    "id": 6907,
    "category": "Chemical Substances",
    "text": "Magnesium is a lightweight metal and essential mineral involved in many biological processes. Magnesium alloys are also used in transportation, electronics, and engineering.",
    "question": "What is magnesium?"
  },
  {
    "id": 6908,
    "category": "Chemical Substances",
    "text": "Iron is an essential chemical element and an important industrial metal. It is needed by living organisms for functions such as oxygen transport and is also the main component of steel.",
    "question": "Why is iron important?"
  },
  {
    "id": 6909,
    "category": "Chemical Substances",
    "text": "Copper is an essential trace element for living organisms and an important industrial metal. It is needed for normal biological functions and is widely used because of its excellent conductivity.",
    "question": "Why is copper important?"
  },
  {
    "id": 6910,
    "category": "Chemical Substances",
    "text": "Iodine is a chemical element that is required in small amounts by the human body for production of thyroid hormones. Iodine compounds are also used in medicine and industry.",
    "question": "What is iodine?"
  },
  {
    "id": 6911,
    "category": "Chemical Substances",
    "text": "Caffeine is a naturally occurring stimulant found in coffee, tea, cacao, and several other plants. It acts on the central nervous system and can temporarily increase alertness.",
    "question": "What is caffeine?"
  },
  {
    "id": 6912,
    "category": "Chemical Substances",
    "text": "Glucose is a simple sugar that serves as an important source of energy for living organisms. It is produced by photosynthesis and is also found in many foods.",
    "question": "What is glucose?"
  },
  {
    "id": 6913,
    "category": "Chemical Substances",
    "text": "Fructose is a simple sugar found naturally in fruits, honey, and some vegetables. It is one of the main monosaccharides found in food.",
    "question": "What is fructose?"
  },
  {
    "id": 6914,
    "category": "Chemical Substances",
    "text": "Sucrose is a common sugar made from glucose and fructose. It is naturally present in plants and is the main form of sugar used as table sugar.",
    "question": "What is sucrose?"
  },
  {
    "id": 6915,
    "category": "Chemical Substances",
    "text": "Starch is a carbohydrate made of many glucose units. Plants store energy in the form of starch, which is found in foods such as potatoes, grains, and legumes.",
    "question": "What is starch?"
  },
  {
    "id": 6916,
    "category": "Chemical Substances",
    "text": "Cellulose is a complex carbohydrate made of linked glucose units and is the main structural component of plant cell walls. It is also the main material used to make paper.",
    "question": "What is cellulose?"
  },
  {
    "id": 6917,
    "category": "Chemical Substances",
    "text": "Protein is a biological macromolecule made from chains of amino acids. Proteins perform many functions in living organisms, including building tissues, transporting substances, and catalyzing chemical reactions.",
    "question": "What is a protein?"
  },
  {
    "id": 6918,
    "category": "Chemical Substances",
    "text": "An amino acid is an organic compound that serves as a building block of proteins. Living organisms use different amino acids to construct proteins with specific functions.",
    "question": "What is an amino acid?"
  },
];