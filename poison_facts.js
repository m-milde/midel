/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

var POISON_LIBRARY = [
    {
      "id": 8255,
      "category": "Poison",
      "text": "A poison is a substance that can cause injury, illness, or death when it enters a living organism in a sufficient amount. Poisons can be natural or manufactured.",
      "question": "What is a poison?"
    },
    {
      "id": 8256,
      "category": "Poison",
      "text": "A toxin is a poisonous substance produced by a living organism, such as a bacterium, plant, fungus, or animal. Toxins can harm the body by damaging cells, disrupting normal biological processes, or interfering with the nervous system. Some toxins can cause illness or death even in very small amounts, while others cause harm only at higher doses.",
      "question": "What is a toxin?"
    },
    {
      "id": 8257,
      "category": "Poison",
      "text": "Toxicity describes how harmful a substance can be to a living organism. The effect depends on factors such as the substance, amount, route of exposure, and characteristics of the organism.",
      "question": "What does toxicity mean?"
    },
    {
      "id": 8258,
      "category": "Poison",
      "text": "Toxicology is the scientific study of poisons, toxins, harmful chemicals, and their effects on living organisms. It also examines how toxic substances are detected and treated.",
      "question": "What is toxicology?"
    },
    {
      "id": 8259,
      "category": "Poison",
      "text": "A toxicologist is a scientist or medical professional who studies the effects of potentially harmful substances on living organisms. Toxicologists work in medicine, research, environmental science, and law enforcement.",
      "question": "What does a toxicologist do?"
    },
    {
      "id": 8260,
      "category": "Poison",
      "text": "The dose is the amount of a substance that enters an organism. In toxicology, the relationship between dose and biological effect is fundamental because many substances become harmful only above certain exposure levels.",
      "question": "Why is dose important in toxicology?"
    },
    {
      "id": 8261,
      "category": "Poison",
      "text": "The principle that the dose makes the poison means that the harmfulness of a substance depends strongly on the amount involved. Even substances that are normally useful can become harmful at excessive levels.",
      "question": "What does the phrase 'the dose makes the poison' mean?"
    },
    {
      "id": 8262,
      "category": "Poison",
      "text": "Acute poisoning develops over a relatively short period after exposure to a harmful substance. Symptoms can appear quickly or may be delayed depending on the poison and exposure.",
      "question": "What is acute poisoning?"
    },
    {
      "id": 8263,
      "category": "Poison",
      "text": "Chronic poisoning results from repeated or prolonged exposure to a harmful substance. Its effects may develop gradually and can involve organs such as the liver, kidneys, lungs, or nervous system.",
      "question": "What is chronic poisoning?"
    },
    {
      "id": 8264,
      "category": "Poison",
      "text": "Systemic toxicity occurs when a substance enters the body and affects organs or tissues beyond the original point of contact. The substance may reach other parts of the body through the bloodstream.",
      "question": "What is systemic toxicity?"
    },
    {
      "id": 8265,
      "category": "Poison",
      "text": "Local toxicity occurs when a harmful substance damages the tissues at the point where exposure occurs. Skin irritation and chemical burns are examples of local effects.",
      "question": "What is local toxicity?"
    },
    {
      "id": 8266,
      "category": "Poison",
      "text": "Poisons can enter the body through several routes, including swallowing, breathing, skin contact, and injection. The route of exposure can influence how quickly and severely a substance acts.",
      "question": "How can poison enter the body?"
    },
    {
      "id": 8267,
      "category": "Poison",
      "text": "Inhalation poisoning occurs when a harmful substance is breathed into the respiratory system. Toxic gases, vapors, fumes, and airborne particles can cause this type of exposure.",
      "question": "What is poisoning by inhalation?"
    },
    {
      "id": 8268,
      "category": "Poison",
      "text": "Ingestion poisoning occurs when a harmful substance is swallowed. The substance may then be absorbed through the digestive system and distributed through the body.",
      "question": "What is poisoning by ingestion?"
    },
    {
      "id": 8269,
      "category": "Poison",
      "text": "Dermal exposure occurs when a potentially harmful substance contacts the skin. Some substances can damage the skin directly, while others can pass through the skin and enter the body.",
      "question": "What is dermal exposure to a poison?"
    },
    {
      "id": 8270,
      "category": "Poison",
      "text": "Poisoning can also occur through the eyes when a harmful chemical comes into contact with ocular tissues. Some exposures can cause severe irritation or tissue damage.",
      "question": "Can poison enter the body through the eyes?"
    },
    {
      "id": 8271,
      "category": "Poison",
      "text": "A poison's route of exposure can influence its effects because different tissues absorb substances at different rates. The same chemical can behave differently depending on how exposure occurs.",
      "question": "Why does the route of exposure matter in poisoning?"
    },
    {
      "id": 8272,
      "category": "Poison",
      "text": "Poisoning symptoms depend on the substance and exposure. Possible signs include nausea, vomiting, confusion, difficulty breathing, abnormal heart rhythms, seizures, or loss of consciousness.",
      "question": "What are common symptoms of poisoning?"
    },
    {
      "id": 8273,
      "category": "Poison",
      "text": "Some poisonings produce delayed symptoms, meaning a person may initially appear well before serious effects develop. This is one reason suspected poisoning should be treated as a medical concern.",
      "question": "Can poisoning symptoms be delayed?"
    },
    {
      "id": 8274,
      "category": "Poison",
      "text": "The nervous system is particularly vulnerable to some poisons. Certain toxic substances can interfere with nerve signaling, causing weakness, confusion, seizures, paralysis, or other neurological effects.",
      "question": "How can poisons affect the nervous system?"
    },
    {
      "id": 8275,
      "category": "Poison",
      "text": "Some poisons interfere with the cardiovascular system and can affect heart rate, blood pressure, or heart rhythm. Severe cardiovascular toxicity can become life-threatening.",
      "question": "How can poisons affect the heart?"
    },
    {
      "id": 8276,
      "category": "Poison",
      "text": "Some toxic substances damage the liver because the liver processes many chemicals absorbed by the body. Severe toxic injury can impair liver function.",
      "question": "How can poisons affect the liver?"
    },
    {
      "id": 8277,
      "category": "Poison",
      "text": "The kidneys filter blood and remove many waste products from the body. Some toxic substances can damage kidney tissue and interfere with this important function.",
      "question": "How can poisons affect the kidneys?"
    },
    {
      "id": 8278,
      "category": "Poison",
      "text": "Some poisons damage the respiratory system by irritating lung tissue or interfering with oxygen exchange. Severe respiratory poisoning can lead to breathing failure.",
      "question": "How can poisons affect the lungs?"
    },
    {
      "id": 8279,
      "category": "Poison",
      "text": "Some toxic substances damage blood cells or interfere with the body's ability to transport oxygen. These effects can cause weakness, confusion, or serious organ damage.",
      "question": "How can poisons affect the blood?"
    },
    {
      "id": 8280,
      "category": "Poison",
      "text": "A neurotoxin is a substance that can damage or disrupt the nervous system. Neurotoxins may interfere with nerve signals or injure nerve cells.",
      "question": "What is a neurotoxin?"
    },
    {
      "id": 8281,
      "category": "Poison",
      "text": "A hepatotoxin is a substance that can damage the liver. Toxic exposure to certain chemicals, drugs, and natural substances can cause liver injury.",
      "question": "What is a hepatotoxin?"
    },
    {
      "id": 8282,
      "category": "Poison",
      "text": "A nephrotoxin is a substance that can damage the kidneys. Kidney toxicity can interfere with filtration and the regulation of fluids and minerals.",
      "question": "What is a nephrotoxin?"
    },
    {
      "id": 8283,
      "category": "Poison",
      "text": "A cardiotoxin is a substance that can damage the heart or interfere with cardiovascular function. Certain natural toxins and chemicals can have cardiotoxic effects.",
      "question": "What is a cardiotoxin?"
    },
    {
      "id": 8284,
      "category": "Poison",
      "text": "A cytotoxin is a substance that damages or kills cells. Cytotoxic effects can occur when a substance disrupts essential cellular structures or processes.",
      "question": "What is a cytotoxin?"
    },
    {
      "id": 8285,
      "category": "Poison",
      "text": "A carcinogen is a substance, radiation source, or other agent capable of increasing the risk of cancer. Some carcinogens act by damaging DNA or altering cellular regulation.",
      "question": "What is a carcinogen?"
    },
    {
      "id": 8286,
      "category": "Poison",
      "text": "A mutagen is an agent that can cause changes in genetic material. Some mutagens can increase the risk of mutations that affect cells or future generations.",
      "question": "What is a mutagen?"
    },
    {
      "id": 8287,
      "category": "Poison",
      "text": "A teratogen is an agent that can interfere with embryonic or fetal development and potentially cause developmental abnormalities. Effects depend on the substance, exposure, and stage of development.",
      "question": "What is a teratogen?"
    },
    {
      "id": 8288,
      "category": "Poison",
      "text": "A venom is a toxic substance produced by an animal and delivered into another organism through a specialized mechanism such as a bite, sting, or spine.",
      "question": "What is venom?"
    },
    {
      "id": 8289,
      "category": "Poison",
      "text": "A poison differs from venom mainly in how it is delivered. Venom is actively injected or introduced by an animal, while a poison generally causes harm when it is absorbed, swallowed, inhaled, or otherwise taken into the body.",
      "question": "What is the difference between poison and venom?"
    },
    {
      "id": 8290,
      "category": "Poison",
      "text": "A poisonous animal contains or produces harmful substances that can cause illness when another organism contacts or consumes them. A venomous animal actively delivers its toxin.",
      "question": "What is the difference between a poisonous and a venomous animal?"
    },
    {
      "id": 8291,
      "category": "Poison",
      "text": "Snake venom can contain many different biologically active substances. Depending on the species, venom may affect nerves, blood clotting, muscles, or tissues.",
      "question": "What does snake venom do?"
    },
    {
      "id": 8292,
      "category": "Poison",
      "text": "Neurotoxic snake venom primarily affects the nervous system and can interfere with communication between nerves and muscles. Some severe cases can impair breathing.",
      "question": "What is neurotoxic snake venom?"
    },
    {
      "id": 8293,
      "category": "Poison",
      "text": "Hemotoxic or hemotoxic-acting snake venoms can affect blood, blood vessels, and tissues. Their effects can include abnormal bleeding or damage to surrounding tissue.",
      "question": "What is hemotoxic snake venom?"
    },
    {
      "id": 8294,
      "category": "Poison",
      "text": "Cytotoxic venom can cause direct damage to cells and tissues around the site of a bite. Some snake venoms contain components with significant local tissue-damaging effects.",
      "question": "What is cytotoxic venom?"
    },
    {
      "id": 8295,
      "category": "Poison",
      "text": "Antivenom is a biological medicine containing antibodies or antibody-derived components that can neutralize specific venom toxins. It is used under medical supervision for appropriate venomous bites and stings.",
      "question": "What is antivenom?"
    },
    {
      "id": 8296,
      "category": "Poison",
      "text": "Botulinum toxin is a powerful neurotoxin produced by certain bacteria of the genus Clostridium. It interferes with nerve signals that control muscles and has both medical uses and serious toxic effects.",
      "question": "What is botulinum toxin?"
    },
    {
      "id": 8297,
      "category": "Poison",
      "text": "Tetanus toxin is produced by the bacterium Clostridium tetani. It affects the nervous system and can cause severe muscle stiffness and spasms.",
      "question": "What is tetanus toxin?"
    },
    {
      "id": 8298,
      "category": "Poison",
      "text": "Diphtheria toxin is produced by certain strains of Corynebacterium diphtheriae. It damages cells by interfering with protein production and contributes to the serious effects of diphtheria.",
      "question": "What is diphtheria toxin?"
    },
    {
      "id": 8299,
      "category": "Poison",
      "text": "Ricin is a highly toxic protein naturally found in the seeds of the castor bean plant. It interferes with protein production inside cells and can cause severe poisoning.",
      "question": "What is ricin?"
    },
    {
      "id": 8300,
      "category": "Poison",
      "text": "Botulinum toxin and ricin are both extremely toxic substances, but they affect cells in different ways. Botulinum toxin disrupts nerve signaling, while ricin interferes with cellular protein production.",
      "question": "How are botulinum toxin and ricin different?"
    },
    {
      "id": 8301,
      "category": "Poison",
      "text": "Cyanide refers to a group of chemical compounds containing the cyanide group. Some cyanide compounds can interfere with cellular respiration and prevent cells from using oxygen effectively.",
      "question": "What is cyanide?"
    },
    {
      "id": 8302,
      "category": "Poison",
      "text": "Carbon monoxide is a colorless and odorless gas produced by incomplete combustion of carbon-containing fuels. It can interfere with the blood's ability to transport oxygen.",
      "question": "What is carbon monoxide poisoning?"
    },
    {
      "id": 8303,
      "category": "Poison",
      "text": "Carbon monoxide poisoning can occur when the gas accumulates in enclosed or poorly ventilated spaces. Common sources include malfunctioning fuel-burning appliances, engines, and fires.",
      "question": "Where does carbon monoxide poisoning come from?"
    },
    {
      "id": 8304,
      "category": "Poison",
      "text": "Carbon monoxide is particularly dangerous because it cannot normally be detected by human smell or sight. Carbon monoxide detectors can provide an important warning in buildings.",
      "question": "Why is carbon monoxide especially dangerous?"
    },
    {
      "id": 8305,
      "category": "Poison",
      "text": "Lead is a toxic metal that can damage the nervous system and other organs. Children are particularly vulnerable to the effects of lead exposure.",
      "question": "Why is lead poisonous?"
    },
    {
      "id": 8306,
      "category": "Poison",
      "text": "Mercury is a toxic metal that exists in several chemical forms. Exposure to certain forms of mercury can damage the nervous system, kidneys, and other organs.",
      "question": "Why is mercury toxic?"
    },
    {
      "id": 8307,
      "category": "Poison",
      "text": "Arsenic is a naturally occurring element that can form toxic compounds. Long-term exposure to inorganic arsenic is associated with several serious health effects, including increased cancer risk.",
      "question": "What is arsenic poisoning?"
    },
    {
      "id": 8308,
      "category": "Poison",
      "text": "Thallium is a toxic metal that can affect the nervous system, digestive system, and other organs. Historically, some thallium compounds were used in poisons and pesticides.",
      "question": "What is thallium poisoning?"
    },
    {
      "id": 8309,
      "category": "Poison",
      "text": "Methanol is a toxic type of alcohol that can cause serious poisoning when ingested. Its metabolism can produce substances that damage the nervous system and eyes. ",
      "question": "Why is methanol poisonous?"
    },
    {
      "id": 8310,
      "category": "Poison",
      "text": "Ethylene glycol is a toxic chemical historically used in some antifreeze products. Ingestion can cause severe metabolic disturbances and damage to the kidneys. ",
      "question": "Why is ethylene glycol dangerous?"
    },
    {
      "id": 8311,
      "category": "Poison",
      "text": "Poisoning from household chemicals can occur through accidental ingestion, inhalation, skin contact, or other exposure. Many household products are safe when used according to their labels but can be dangerous when misused.",
      "question": "Can household chemicals cause poisoning?"
    },
    {
      "id": 8312,
      "category": "Poison",
      "text": "Cleaning products can contain substances that irritate or damage the skin, eyes, lungs, or digestive system. Safe storage and following product instructions reduce the risk of exposure.",
      "question": "Can cleaning products be poisonous?"
    },
    {
      "id": 8313,
      "category": "Poison",
      "text": "Mixing certain household cleaning chemicals can produce dangerous gases or other hazardous reactions. Cleaning products should be used only as directed and should not be combined unless the manufacturer specifically permits it.",
      "question": "Why can mixing cleaning products be dangerous?"
    },
    {
      "id": 8314,
      "category": "Poison",
      "text": "Pesticides are substances used to control insects, weeds, fungi, rodents, or other organisms considered harmful. Some pesticides can also harm humans, animals, and ecosystems if exposure is excessive. ",
      "question": "What are pesticides?"
    },
    {
      "id": 8315,
      "category": "Poison",
      "text": "Pesticide poisoning can occur when a person is exposed to a pesticide through swallowing, breathing, skin contact, or other routes. Risk depends on the specific chemical and amount of exposure. Some pesticides are so poisonous that they can kill you if you eat just one leaf. Some pesticides are so poisonous that they can kill you if you eat just one leaf.",
      "question": "What is pesticide poisoning?"
    },
    {
      "id": 8316,
      "category": "Poison",
      "text": "Organophosphate compounds include many pesticides that affect an enzyme involved in nerve signaling. Significant exposure can produce serious neurological and respiratory effects.",
      "question": "What are organophosphate pesticides?"
    },
    {
      "id": 8317,
      "category": "Poison",
      "text": "Certain naturally occurring plant chemicals can be toxic to humans. Examples include alkaloids, glycosides, and proteins that interfere with biological processes. Some plants are so poisonous that they can kill you if you eat just one leaf. Some plants are so poisonous that they can kill you if you eat just one leaf.",
      "question": "Can plants contain poisons?"
    },
    {
      "id": 8318,
      "category": "Poison",
      "text": "Poison hemlock is a highly toxic plant containing several alkaloids that affect the nervous system. Accidental ingestion can cause severe poisoning.",
      "question": "What is poison hemlock?"
    },
    {
      "id": 8319,
      "category": "Poison",
      "text": "Deadly nightshade, also known as Atropa belladonna, is a poisonous plant containing tropane alkaloids. These compounds can affect the nervous system and produce serious poisoning.",
      "question": "What is deadly nightshade?"
    },
    {
      "id": 8320,
      "category": "Poison",
      "text": "Foxglove is a group of plants containing cardiac glycosides. These substances can strongly affect the heart and can cause serious poisoning when consumed inappropriately.",
      "question": "Why is foxglove poisonous?"
    },
    {
      "id": 8321,
      "category": "Poison",
      "text": "Oleander is an ornamental plant containing cardiac glycosides that can affect the heart. All parts of the plant can be toxic if ingested. The oleander plant is so poisonous that it can kill you if you eat just one leaf. The oleander plant is so poisonous that it can kill you if you eat just one leaf.",
      "question": "Why is oleander poisonous?"
    },
    {
      "id": 8322,
      "category": "Poison",
      "text": "Yew plants contain toxic compounds that can affect the heart and nervous system. Different parts of yew contain varying concentrations of these compounds. The yew tree is a very old tree, and is often found in ancient forests. The yew tree is so poisonous that it can kill you if you eat just one leaf. The yew tree is so poisonous that it can kill you if you eat just one leaf.",
      "question": "Why is yew poisonous?"
    },
    {
      "id": 8323,
      "category": "Poison",
      "text": "Amanita phalloides, commonly called the death cap mushroom, contains amatoxins that can cause severe liver damage. It is responsible for many serious mushroom poisonings. The death cap mushroom is found in the wild, and is often mistaken for the more common agaric mushroom. The death cap mushroom is so poisonous that it can kill you if you eat just one.",
      "question": "What is the death cap mushroom?"
    },
    {
      "id": 8324,
      "category": "Poison",
      "text": "Amatoxins are toxic compounds found in several mushroom species, particularly some Amanita species. They interfere with essential cellular processes and can cause severe organ damage.",
      "question": "What are amatoxins?"
    },
    {
      "id": 8325,
      "category": "Poison",
      "text": "Mushroom poisoning can occur when a toxic species is mistaken for an edible species. Identification based only on appearance can be unreliable, so unknown wild mushrooms should not be eaten. Some mushrooms are so poisonous that they can kill you if you eat just one. The most poisonous mushroom is the death cap mushroom, which contains amatoxins. ",
      "question": "How does mushroom poisoning happen?"
    },
    {
      "id": 8326,
      "category": "Poison",
      "text": "Pufferfish can contain tetrodotoxin, a powerful neurotoxin found mainly in certain tissues. The toxin can interfere with nerve signaling and cause paralysis. ",
      "question": "Why can pufferfish be poisonous?"
    },
    {
      "id": 8327,
      "category": "Poison",
      "text": "Tetrodotoxin is a potent neurotoxin that blocks voltage-gated sodium channels in nerve and muscle cells. This can prevent normal electrical signaling. Tetrodotoxin is found in the pufferfish, and is one of the most poisonous substances known to humans.",
      "question": "What is tetrodotoxin?"
    },
    {
      "id": 8328,
      "category": "Poison",
      "text": "Certain marine organisms can produce toxins that accumulate in seafood. Some shellfish poisoning syndromes occur when people consume shellfish that have fed on toxic algae.",
      "question": "How can seafood cause poisoning from natural toxins?"
    },
    {
      "id": 8329,
      "category": "Poison",
      "text": "Harmful algal blooms occur when certain algae or cyanobacteria grow rapidly and produce environmental problems. Some blooms produce toxins that can affect fish, shellfish, wildlife, and humans.",
      "question": "What is a harmful algal bloom?"
    },
    {
      "id": 8330,
      "category": "Poison",
      "text": "Mycotoxins are toxic substances produced by certain fungi. They can contaminate food crops and animal feed under suitable environmental conditions.",
      "question": "What are mycotoxins?"
    },
    {
      "id": 8331,
      "category": "Poison",
      "text": "Aflatoxins are mycotoxins produced by certain fungi that can grow on crops and food products. Long-term exposure to some aflatoxins is associated with liver cancer.",
      "question": "What are aflatoxins?"
    },
    {
      "id": 8332,
      "category": "Poison",
      "text": "Food poisoning is illness caused by eating or drinking contaminated food or beverages. Causes include bacteria, viruses, parasites, toxins, and harmful chemicals.",
      "question": "What is food poisoning?"
    },
    {
      "id": 8333,
      "category": "Poison",
      "text": "Food poisoning can result from biological toxins produced by microorganisms or naturally present in foods. It can also result from chemical contamination.",
      "question": "Can food poisoning be caused by toxins?"
    },
    {
      "id": 8334,
      "category": "Poison",
      "text": "Botulism is a serious illness caused by botulinum neurotoxins. It can cause muscle weakness and paralysis and may interfere with breathing.",
      "question": "What is botulism?"
    },
    {
      "id": 8335,
      "category": "Poison",
      "text": "Botulism can occur through several mechanisms, including consuming food containing botulinum toxin or infection-related toxin production. Different forms of botulism have different routes of development.",
      "question": "How can botulism occur?"
    },
    {
      "id": 8336,
      "category": "Poison",
      "text": "The human body has several defense mechanisms against toxic substances, including the liver's metabolism of chemicals, kidney filtration, protective barriers, and immune responses to some biological threats.",
      "question": "How does the body defend itself against poisons?"
    },
    {
      "id": 8337,
      "category": "Poison",
      "text": "The liver plays a major role in chemical metabolism. Enzymes in liver cells can transform many substances into forms that can be eliminated from the body.",
      "question": "Why is the liver important in detoxification?"
    },
    {
      "id": 8338,
      "category": "Poison",
      "text": "The kidneys help remove many water-soluble substances and their metabolic products from the bloodstream. Kidney function therefore plays an important role in eliminating some toxic compounds.",
      "question": "How do the kidneys help remove toxins?"
    },
    {
      "id": 8339,
      "category": "Poison",
      "text": "The blood-brain barrier limits the movement of many substances from the bloodstream into brain tissue. However, some toxic substances can cross it and affect the nervous system.",
      "question": "What is the blood-brain barrier and how does it relate to poisons?"
    },
    {
      "id": 8340,
      "category": "Poison",
      "text": "An antidote is a treatment that counteracts a specific poison or toxic effect. Not every poison has a specific antidote, and treatment depends on the substance and circumstances.",
      "question": "What is an antidote?"
    },
    {
      "id": 8341,
      "category": "Poison",
      "text": "Activated charcoal can be used in some cases of poisoning because it can bind certain substances in the digestive tract. Its use depends on the poison and must be determined by medical professionals.",
      "question": "What is activated charcoal used for in poisoning?"
    },
    {
      "id": 8342,
      "category": "Poison",
      "text": "Poison control centers provide expert advice about suspected poison exposures. They help identify risks and recommend appropriate medical action.",
      "question": "What does a poison control center do?"
    },
    {
      "id": 8343,
      "category": "Poison",
      "text": "Suspected serious poisoning is a medical emergency. Emergency services or a poison control center should be contacted promptly rather than relying on home remedies.",
      "question": "What should someone do if poisoning is suspected?"
    },
    {
      "id": 8344,
      "category": "Poison",
      "text": "Inducing vomiting after a suspected poisoning is not generally recommended unless specifically directed by an appropriate medical professional. Vomiting can sometimes cause additional injury or re-expose tissues to the substance.",
      "question": "Should you make someone vomit after poisoning?"
    },
    {
      "id": 8345,
      "category": "Poison",
      "text": "Poison prevention includes storing hazardous substances in their original labeled containers and keeping them away from children and animals. Proper labeling reduces the chance of accidental exposure.",
      "question": "How can poisoning accidents be prevented at home?"
    },
    {
      "id": 8346,
      "category": "Poison",
      "text": "Medications can cause poisoning when taken incorrectly, accidentally swallowed, or combined inappropriately. Medicines should be stored securely and used according to professional or package instructions.",
      "question": "Can medicines cause poisoning?"
    },
    {
      "id": 8347,
      "category": "Poison",
      "text": "Children are particularly vulnerable to accidental poisoning because they explore their environment by touching and sometimes putting objects into their mouths. Secure storage of medicines and chemicals is therefore important.",
      "question": "Why are children at higher risk of accidental poisoning?"
    },
    {
      "id": 8348,
      "category": "Poison",
      "text": "Pets can also be poisoned by household chemicals, medicines, foods, plants, and other substances that are safe or less harmful to humans. Veterinary advice is important after suspected animal poisoning.",
      "question": "Can household substances poison pets?"
    },
    {
      "id": 8349,
      "category": "Poison",
      "text": "Environmental poisoning occurs when pollutants or toxic substances contaminate air, water, soil, or food and harm organisms. Industrial activity, agriculture, mining, and waste can contribute to environmental contamination.",
      "question": "What is environmental poisoning?"
    },
    {
      "id": 8350,
      "category": "Poison",
      "text": "Bioaccumulation occurs when a substance builds up in an organism faster than it can be eliminated. Persistent pollutants can accumulate in organisms over time.",
      "question": "What is bioaccumulation?"
    },
    {
      "id": 8351,
      "category": "Poison",
      "text": "Biomagnification occurs when concentrations of certain persistent substances increase at higher levels of a food chain. Predators can therefore accumulate greater concentrations than organisms lower in the chain.",
      "question": "What is biomagnification?"
    },
    {
      "id": 8352,
      "category": "Poison",
      "text": "Persistent organic pollutants are chemicals that can remain in the environment for long periods and may accumulate in living organisms. Some can travel long distances through environmental processes.",
      "question": "What are persistent organic pollutants?"
    },
    {
      "id": 8353,
      "category": "Poison",
      "text": "The Minamata disease disaster was a major example of industrial mercury pollution. Industrial wastewater contaminated the environment with methylmercury, causing severe neurological illness among exposed people.",
      "question": "What was the Minamata disease disaster?"
    },
    {
      "id": 8354,
      "category": "Poison",
      "text": "The Bhopal disaster occurred in India in 1984 when a large release of toxic gas from an industrial facility caused widespread deaths, injuries, and long-term health effects.",
      "question": "What was the Bhopal disaster?"
    },
];