/*
- Copyright (c) 2026 M.Milde <m.milde@gmail.com>
- Free use; no sale, rebrand, or profit from this software.
- See LICENSE.
 */

var TREATMENT_LIBRARY = [
  {
    "id": 14859,
    "category": "Treatment",
    "text": "Chamomile is a flowering herb traditionally used to promote relaxation and relieve mild digestive discomfort. To prepare tea, pour 250 ml of hot water over 1–2 teaspoons of dried chamomile flowers, cover, and steep for 5–10 minutes before straining. Drink one cup when desired. Chamomile can cause allergic reactions in people sensitive to ragweed and related plants, and it may interact with certain medicines.",
    "question": "How do you use chamomile?"
  },
  {
    "id": 14860,
    "category": "Treatment",
    "text": "Peppermint is an aromatic herb commonly used to relieve digestive discomfort, bloating, and gas. To make tea, steep 1–2 teaspoons of dried peppermint leaves in 250 ml of hot water for 5–10 minutes, then strain. Peppermint tea may help mild digestive symptoms, but peppermint can worsen acid reflux and heartburn. People with frequent reflux should use it cautiously.",
    "question": "How do you use peppermint?"
  },
  {
    "id": 14861,
    "category": "Treatment",
    "text": "Ginger is a root commonly used to relieve nausea and add flavor to food and drinks. To make ginger tea, slice 2–4 thin pieces of fresh ginger, simmer them in 250 ml of water for about 5–10 minutes, and strain. Ginger may help with some types of nausea, including pregnancy-related nausea, but pregnant people should consult a healthcare professional about appropriate use. Large amounts may cause heartburn or stomach irritation and may interact with blood-thinning medicines.",
    "question": "How do you use ginger?"
  },
  {
    "id": 14862,
    "category": "Treatment",
    "text": "Lemon balm is a fragrant herb traditionally used to promote relaxation and relieve mild digestive discomfort. Make tea by steeping 1–2 teaspoons of dried leaves in 250 ml of hot water for 5–10 minutes, then strain. Some small studies suggest that lemon balm may help with stress or sleep, but the evidence remains limited. It should not replace treatment for persistent anxiety or insomnia.",
    "question": "How do you use lemon balm?"
  },
  {
    "id": 14863,
    "category": "Treatment",
    "text": "Thyme is a culinary herb traditionally used to soothe coughs and throat irritation. To prepare tea, steep 1–2 teaspoons of fresh or dried thyme leaves in 250 ml of hot water for 5–10 minutes, then strain. Drink it warm if it feels soothing. Evidence for thyme tea as a cough treatment is limited, and persistent cough, breathing difficulty, chest pain, or coughing up blood requires medical assessment.",
    "question": "How do you use thyme for a cough?"
  },
  {
    "id": 14864,
    "category": "Treatment",
    "text": "Sage is an aromatic herb used in cooking and traditionally used to soothe mild throat and mouth irritation. A mild tea can be prepared by steeping 1 teaspoon of dried sage leaves in 250 ml of hot water for 5–10 minutes. Let it cool before using it as a mouth rinse, and spit it out rather than swallowing it if using it for local mouth care. Avoid concentrated sage essential oil and medicinally large amounts because some sage species contain thujone, which can be toxic.",
    "question": "How do you use sage for a sore throat?"
  },
  {
    "id": 14865,
    "category": "Treatment",
    "text": "Echinacea is a flowering plant commonly sold as a herbal supplement for colds. Some studies suggest that certain preparations may slightly reduce the chance or duration of a cold, but results are inconsistent. Products differ in species, plant parts, and concentration, so there is no single preparation or dose that applies to all products. People with allergies to daisy-family plants or autoimmune conditions should consult a healthcare professional before using it.",
    "question": "What is echinacea used for?"
  },
  {
    "id": 14866,
    "category": "Treatment",
    "text": "Elderflower is traditionally used in warm drinks for symptoms associated with colds. To make tea, steep 1–2 teaspoons of dried elderflowers in 250 ml of hot water for 5–10 minutes and strain. Evidence that elderflower treats colds is limited. Do not confuse elderflowers with raw elderberries or other parts of the plant, as raw or unripe elderberries and certain plant parts can be toxic.",
    "question": "How do you use elderflower?"
  },
  {
    "id": 14867,
    "category": "Treatment",
    "text": "Rosehip is the fruit of certain rose plants and is used to make herbal tea rich in vitamin C and other plant compounds. To prepare tea, use commercially prepared dried rosehips according to the package instructions, steep them in hot water, and strain carefully to remove irritating hairs or particles. The vitamin C content varies with processing and storage. Rosehip tea can be enjoyed as a beverage but should not be relied on to treat an illness.",
    "question": "How do you use rosehip?"
  },
  {
    "id": 14868,
    "category": "Treatment",
    "text": "Nettle leaves are used as a food and herbal tea and contain minerals and other plant compounds. To make tea, steep 1–2 teaspoons of dried nettle leaves in 250 ml of hot water for 5–10 minutes and strain. Only use correctly identified, properly processed nettle products; fresh stinging nettles can irritate the skin. Nettle preparations may affect blood pressure, blood sugar, or fluid balance and can interact with medicines, so people taking regular medication should seek professional advice.",
    "question": "How do you use nettle leaves?"
  },
  {
    "id": 14869,
    "category": "Treatment",
    "text": "Dandelion leaves and roots are traditionally used in food and herbal drinks. Young leaves can be washed and added to salads, while commercially prepared root products can be brewed according to their labels. Dandelion is sometimes promoted for digestion or fluid balance, but strong evidence for medicinal benefits is limited. People with gallbladder or bile-duct problems, allergies to related plants, or relevant medication use should consult a healthcare professional before medicinal use.",
    "question": "What is dandelion used for?"
  },
  {
    "id": 14870,
    "category": "Treatment",
    "text": "Lavender is a fragrant plant used in aromatherapy and traditional relaxation practices. Its scent can be enjoyed from a sachet or by using a diffuser according to the manufacturer's instructions. Some oral lavender oil preparations have been studied for anxiety, but these products are specially formulated and are not interchangeable with essential oils. Never swallow ordinary lavender essential oil, and stop using it if it causes irritation or breathing symptoms.",
    "question": "How do you use lavender for relaxation?"
  },
  {
    "id": 14871,
    "category": "Treatment",
    "text": "Valerian root is a herbal product traditionally used for sleep problems and relaxation. It is available as tea, capsules, and extracts, but evidence of benefit for insomnia is inconsistent. Follow the instructions for a specific regulated product rather than combining different preparations. Valerian can cause drowsiness and should not be combined with alcohol, sleeping pills, or other sedatives without medical advice.",
    "question": "What is valerian root used for?"
  },
  {
    "id": 14872,
    "category": "Treatment",
    "text": "Passionflower is a climbing plant whose aerial parts are used in some herbal products for relaxation and sleep. It is available as tea or standardized supplements, but research supporting its effectiveness remains limited. Use only products with clear preparation and dosing instructions. It may cause drowsiness and should not be combined with sedatives without professional advice; it should be avoided during pregnancy unless a qualified clinician advises otherwise.",
    "question": "How do you use passionflower?"
  },
  {
    "id": 14873,
    "category": "Treatment",
    "text": "Turmeric is a yellow spice containing curcumin, a compound studied for its anti-inflammatory properties. It can be added to soups, rice, vegetables, or warm milk as part of an ordinary diet. Culinary turmeric is not equivalent to concentrated curcumin supplements, which can cause side effects and interact with medicines. High-dose supplements may increase the risk of bleeding or gallbladder problems, and some concentrated products have been associated with liver injury.",
    "question": "How do you use turmeric?"
  },
  {
    "id": 14874,
    "category": "Treatment",
    "text": "Garlic is a food and traditional remedy containing sulfur compounds. It can be chopped or crushed and added to cooked meals, sauces, or dressings. Some research suggests that garlic supplements may modestly affect blood pressure or cholesterol, but garlic is not a replacement for prescribed treatment. Concentrated supplements can increase bleeding risk and may interact with anticoagulants or medicines used before surgery.",
    "question": "How do you use garlic for health?"
  },
  {
    "id": 14875,
    "category": "Treatment",
    "text": "Cinnamon is a spice used in food and traditional remedies for digestive complaints. Add a small amount to oatmeal, fruit, tea, or other dishes for flavor. Evidence that cinnamon reliably controls blood sugar or treats disease is insufficient, so it should not replace diabetes medication. Regular large amounts of cassia cinnamon may expose the liver to excessive coumarin, making culinary quantities safer than concentrated medicinal use.",
    "question": "How do you use cinnamon?"
  },
  {
    "id": 14876,
    "category": "Treatment",
    "text": "Fennel seeds are used as a culinary spice and traditional remedy for gas and bloating. Lightly crush about 1 teaspoon of food-grade fennel seeds, steep them in 250 ml of hot water for 5–10 minutes, and strain. The tea may feel soothing, although strong clinical evidence is limited. People with allergies to celery, carrot, or related plants should be cautious, and medicinal amounts should be avoided during pregnancy unless a healthcare professional approves them.",
    "question": "How do you use fennel seeds for bloating?"
  },
  {
    "id": 14877,
    "category": "Treatment",
    "text": "Anise seeds are used to flavor food and prepare a traditional drink for mild digestive discomfort. Crush 1 teaspoon of food-grade anise seeds, pour over 250 ml of hot water, steep for 5–10 minutes, and strain. Evidence for treating digestive symptoms is limited. Use correctly identified food-grade anise, not star anise of uncertain origin, because some toxic star anise species can cause serious poisoning.",
    "question": "How do you use anise seeds?"
  },
  {
    "id": 14878,
    "category": "Treatment",
    "text": "Caraway seeds are an aromatic spice traditionally used for gas and indigestion. Lightly crush 1 teaspoon of the seeds and steep them in 250 ml of hot water for 5–10 minutes before straining. The drink may provide mild comfort, but clinical evidence is limited. Caraway is generally used in small culinary quantities; concentrated oils and supplements require greater caution, especially during pregnancy or when taking medication.",
    "question": "How do you use caraway seeds?"
  },
  {
    "id": 14879,
    "category": "Treatment",
    "text": "Coriander seeds are a culinary spice traditionally used to flavor food and digestive drinks. Crush 1 teaspoon of food-grade seeds, steep them in 250 ml of hot water for 5–10 minutes, and strain. Coriander can be included in a balanced diet, but evidence that coriander tea treats disease is limited. People with a known coriander allergy should avoid it, and medicinal preparations should not replace medical care.",
    "question": "How do you use coriander seeds?"
  },
  {
    "id": 14880,
    "category": "Treatment",
    "text": "Basil is an aromatic culinary herb that provides flavor and plant compounds. Add fresh leaves to salads, sauces, soups, or cooked vegetables, or steep a few clean leaves in hot water to make a mild herbal drink. Basil is best regarded as a food rather than a proven treatment for disease. Avoid swallowing concentrated basil essential oil, and consult a healthcare professional before using high-dose extracts, especially during pregnancy or when taking medication.",
    "question": "How do you use basil?"
  },
  {
    "id": 14881,
    "category": "Treatment",
    "text": "Oregano is a culinary herb with aromatic compounds that show antimicrobial activity in laboratory studies. Fresh or dried oregano can be added to sauces, soups, vegetables, and meat dishes. These laboratory findings do not prove that oregano treats infections inside the human body. Oregano essential oil is highly concentrated and can irritate the skin, mouth, and stomach, so it should not be swallowed as a home remedy.",
    "question": "What is oregano used for?"
  },
  {
    "id": 14882,
    "category": "Treatment",
    "text": "Rosemary is an aromatic herb used in cooking and traditional herbal preparations. Add fresh or dried leaves to roasted vegetables, potatoes, soups, or meat dishes. Rosemary contains antioxidant compounds, but ordinary culinary use should not be confused with a proven medical treatment. Avoid swallowing concentrated rosemary essential oil, and seek professional advice before taking medicinal extracts during pregnancy or while using regular medication.",
    "question": "How do you use rosemary?"
  },
  {
    "id": 14883,
    "category": "Treatment",
    "text": "Parsley is a culinary herb that supplies vitamin K, vitamin C, and other nutrients. Wash the leaves thoroughly and add them to salads, soups, sauces, or cooked dishes. Eating parsley in normal food quantities is different from taking concentrated extracts or large amounts of parsley oil. Because vitamin K affects blood clotting, people taking warfarin should keep their parsley intake reasonably consistent and discuss major dietary changes with their clinician.",
    "question": "What are the benefits of parsley?"
  },
  {
    "id": 14884,
    "category": "Treatment",
    "text": "Dill is a culinary herb whose leaves and seeds are used to flavor food. Add fresh dill to salads, potatoes, fish, yogurt sauces, or soups, or use a small amount of the seeds in cooking. Dill is a useful flavoring herb, but strong evidence that it treats specific diseases is lacking. Use ordinary food quantities rather than concentrated extracts unless a qualified healthcare professional recommends otherwise.",
    "question": "How do you use dill?"
  },
  {
    "id": 14885,
    "category": "Treatment",
    "text": "Marjoram is an aromatic herb used in Mediterranean cooking and traditional herbal drinks. Add fresh or dried leaves to soups, beans, vegetables, or meat dishes. A mild tea can be made by steeping 1 teaspoon of dried marjoram in 250 ml of hot water for about 5–10 minutes. Evidence for medicinal effects is limited, and concentrated preparations should be avoided during pregnancy unless advised by a healthcare professional.",
    "question": "How do you use marjoram?"
  },
  {
    "id": 14886,
    "category": "Treatment",
    "text": "Bay leaves are aromatic leaves used to flavor soups, stews, and sauces. Add one or two whole dried leaves during cooking and remove them before serving because they remain stiff and can cause choking or injury if swallowed whole. Bay leaves are mainly a culinary ingredient rather than an established medical treatment. Do not swallow concentrated bay-leaf essential oil as a home remedy.",
    "question": "How do you use bay leaves?"
  },
  {
    "id": 14887,
    "category": "Treatment",
    "text": "Lemongrass is a fragrant grass used in cooking and herbal tea. To prepare tea, cut a clean stalk into pieces, simmer it in water for about 5–10 minutes, and strain before drinking. Lemongrass tea is commonly enjoyed as a beverage, but strong evidence for treating illness is limited. Avoid concentrated lemongrass oil by mouth, and seek professional advice before medicinal use during pregnancy or while taking medication.",
    "question": "How do you use lemongrass?"
  },
  {
    "id": 14888,
    "category": "Treatment",
    "text": "Hibiscus flowers are used to make a tart, red herbal drink. Steep about 1–2 teaspoons of dried food-grade hibiscus calyces in 250 ml of hot water for 5–10 minutes, then strain. Some studies suggest hibiscus tea may modestly lower blood pressure, but it does not replace prescribed treatment. People with low blood pressure or those taking blood-pressure medicines should consult a healthcare professional before drinking it regularly in medicinal amounts.",
    "question": "How do you use hibiscus tea?"
  },
  {
    "id": 14889,
    "category": "Treatment",
    "text": "Green tea is made from the leaves of Camellia sinensis and contains antioxidants and caffeine. Brew the leaves or a tea bag in hot water following the product instructions, often using water below boiling to reduce bitterness. Drinking green tea can be part of a balanced diet, but concentrated green tea extracts have been linked to liver injury. People sensitive to caffeine may experience anxiety, palpitations, or sleep problems.",
    "question": "What is green tea good for?"
  },
  {
    "id": 14890,
    "category": "Treatment",
    "text": "Black tea is made from fully oxidized leaves of Camellia sinensis and contains caffeine and polyphenols. Steep a tea bag or loose leaves in hot water for the time recommended on the package, then remove the leaves or bag. It can be enjoyed as a beverage, but it is not a treatment for a specific disease. Caffeine may disturb sleep or worsen palpitations, and tea can reduce iron absorption when consumed with iron-rich meals.",
    "question": "How do you use black tea?"
  },
  {
    "id": 14891,
    "category": "Treatment",
    "text": "White tea is made from young leaves or buds of Camellia sinensis and contains polyphenols and varying amounts of caffeine. Prepare it with hot water according to the product instructions, allowing it to steep for several minutes. It can be a pleasant alternative to other caffeinated drinks, but there is insufficient evidence that it prevents or cures disease. People sensitive to caffeine should limit their intake, particularly later in the day.",
    "question": "What is white tea used for?"
  },
  {
    "id": 14892,
    "category": "Treatment",
    "text": "Rooibos is a naturally caffeine-free herbal infusion made from a South African shrub. Add a tea bag or loose rooibos to hot water and steep for about 5–10 minutes, following the product instructions. It provides a warm drink without the caffeine found in traditional black and green tea. Although it contains antioxidant compounds, evidence that rooibos prevents or treats disease in humans is limited.",
    "question": "How do you use rooibos tea?"
  },
  {
    "id": 14893,
    "category": "Treatment",
    "text": "Linden flowers are traditionally used to make a calming herbal tea and are associated with relief of mild cold symptoms. Steep 1–2 teaspoons of dried flowers in 250 ml of hot water for 5–10 minutes, then strain. The tea can be enjoyed warm, but strong clinical evidence for its medicinal effects is lacking. People with heart conditions or those taking regular medication should ask a healthcare professional before frequent medicinal use.",
    "question": "How do you use linden flowers?"
  },
  {
    "id": 14894,
    "category": "Treatment",
    "text": "Plantain leaf, from certain Plantago species, has a history of traditional use for minor skin irritation and throat discomfort. A commercially prepared tea or topical product should be used according to its label. Some products are marketed for coughs, but reliable evidence of benefit is limited. Do not apply unclean wild leaves to open wounds, and seek medical care for spreading redness, severe pain, fever, or signs of infection.",
    "question": "What is plantain leaf used for?"
  },
  {
    "id": 14895,
    "category": "Treatment",
    "text": "Marshmallow root contains mucilage, a substance that becomes slippery when mixed with water and may soothe irritated tissues. Herbal preparations are sold as teas, cold-water infusions, and other products, so follow the specific product instructions. Marshmallow root may slow the absorption of medicines taken by mouth; separating it from other medicines by several hours and asking a pharmacist is prudent. Evidence for treating coughs or digestive disorders remains limited.",
    "question": "How do you use marshmallow root?"
  },
  {
    "id": 14896,
    "category": "Treatment",
    "text": "Mullein leaf is traditionally used in herbal preparations for coughs and throat irritation. Commercial mullein tea can be prepared according to its label, and it should be strained carefully through a fine filter to remove irritating plant hairs. Evidence that mullein treats respiratory illness is limited. It should not delay medical assessment for persistent cough, wheezing, fever, chest pain, or breathing difficulty.",
    "question": "How do you use mullein?"
  },
  {
    "id": 14897,
    "category": "Treatment",
    "text": "Licorice root is traditionally used for throat and digestive complaints and has a naturally sweet flavor. It is sold as tea, lozenges, and extracts, but these products differ greatly in strength. Glycyrrhizin in ordinary licorice root can raise blood pressure, lower potassium, and cause dangerous heart-rhythm problems, especially with frequent or high-dose use. People with hypertension, heart or kidney disease, or those taking diuretics should avoid medicinal licorice unless a clinician specifically approves it; it should also be avoided during pregnancy.",
    "question": "What is licorice root used for?"
  },
  {
    "id": 14898,
    "category": "Treatment",
    "text": "Slippery elm bark contains mucilage that becomes gel-like when mixed with water. Commercial products are used traditionally to soothe temporary throat or digestive irritation and should be prepared according to their labels. Scientific evidence for these uses is limited. Slippery elm may interfere with the absorption of oral medicines, so ask a pharmacist how far apart to take them.",
    "question": "How do you use slippery elm?"
  },
  {
    "id": 14899,
    "category": "Treatment",
    "text": "Psyllium husk is a plant-derived soluble fiber used to relieve constipation and support regular bowel movements. Mix the labeled dose into a full glass of water, stir, and drink immediately, then drink additional water if advised by the product instructions. Never swallow psyllium dry because it can swell and cause choking or blockage. People with difficulty swallowing, severe abdominal pain, vomiting, or suspected bowel obstruction should not use it without medical assessment.",
    "question": "How do you use psyllium husk?"
  },
  {
    "id": 14900,
    "category": "Treatment",
    "text": "Senna leaves and pods contain compounds that stimulate bowel movements and are used in certain laxative products for short-term constipation. Use only a standardized product and follow its label or a healthcare professional's instructions; homemade senna tea can have unpredictable strength. Senna may cause cramps, diarrhea, dehydration, and electrolyte disturbances if overused. It is not suitable for long-term self-treatment, and severe abdominal pain or suspected bowel obstruction requires medical assessment.",
    "question": "How do you use senna for constipation?"
  },
  {
    "id": 14901,
    "category": "Treatment",
    "text": "Aloe vera gel from the inner leaf is used in some skin-care products to moisturize the skin and soothe minor irritation. Choose a clean, commercially prepared product and apply a small amount to intact skin first to check for irritation. Evidence for healing burns and wounds is mixed, and aloe should not replace appropriate burn care. Do not apply it to deep wounds or serious burns, and do not swallow aloe latex because it can cause severe diarrhea and dangerous electrolyte loss.",
    "question": "How do you use aloe vera gel?"
  },
  {
    "id": 14902,
    "category": "Treatment",
    "text": "Calendula is a flowering plant used in some creams and ointments for minor skin irritation. Apply a commercially prepared product to clean, intact skin according to its label and stop if redness, itching, or swelling develops. Evidence supporting calendula for wound healing is limited, and it should not replace medical care for serious wounds. People allergic to marigolds, daisies, or related plants may react to calendula.",
    "question": "How do you use calendula?"
  },
  {
    "id": 14903,
    "category": "Treatment",
    "text": "Comfrey is a plant historically used in topical products for bruises and minor sprains. Some preparations may be absorbed through the skin, and comfrey contains pyrrolizidine alkaloids that can cause severe liver injury. Do not consume comfrey tea, capsules, or homemade extracts, and never apply comfrey to broken skin. If considering a topical product, use only a regulated preparation with controlled alkaloid content for a short period and seek professional advice first.",
    "question": "How do you use comfrey safely?"
  },
  {
    "id": 14904,
    "category": "Treatment",
    "text": "Arnica is a flowering plant used in some topical gels and creams for bruises and muscle soreness. Apply only a product labeled for external use and follow its instructions, avoiding broken skin, eyes, and mucous membranes. Evidence of benefit varies by preparation, and arnica can cause skin irritation or allergic reactions. Never swallow arnica or make homemade oral remedies from the plant because ingestion can be toxic.",
    "question": "How do you use arnica?"
  },
  {
    "id": 14905,
    "category": "Treatment",
    "text": "Tea tree oil is an essential oil commonly used in formulated skin products for acne and certain minor skin problems. Choose a product designed for the intended use and follow its label; undiluted oil can irritate or burn the skin. Tea tree oil must never be swallowed because it is toxic when ingested and can cause confusion, poor coordination, and serious illness. Stop use if irritation develops, and seek medical care for spreading or severe skin infections.",
    "question": "How do you use tea tree oil?"
  },
  {
    "id": 14906,
    "category": "Treatment",
    "text": "Calendula, chamomile, and other plant ingredients are sometimes combined in herbal skin creams for minor irritation. The safety and usefulness of a cream depend on its ingredients, concentration, and intended use. Choose a clearly labeled product, test a small amount on intact skin, and stop if irritation develops. Do not use herbal creams to treat deep wounds, serious burns, or rapidly spreading skin infections without medical care.",
    "question": "How do you use herbal creams for skin irritation?"
  },
  {
    "id": 14907,
    "category": "Treatment",
    "text": "A warm compress made with clean water can soothe some minor muscle aches and stiffness. Soak a clean cloth in comfortably warm water, wring it out, and place it on the area for about 10–15 minutes, checking the skin regularly. Do not use water hot enough to burn, and avoid heat on areas with reduced sensation or poor circulation. Herbal infusions are not necessary, and a compress should not delay assessment of severe pain, major swelling, or a suspected fracture.",
    "question": "How do you use a warm herbal compress?"
  },
  {
    "id": 14908,
    "category": "Treatment",
    "text": "An herbal steam inhalation involves breathing warm, moist air, sometimes scented with herbs. There is little evidence that adding herbs improves cold symptoms, and leaning over bowls of boiling water can cause serious burns. A warm shower or a clean humidifier used according to its instructions is a safer way to add moisture to the air. Do not inhale concentrated essential oils, especially if they trigger asthma, wheezing, or irritation.",
    "question": "How do you use herbal steam inhalation safely?"
  },
    {
    "id": 14909,
    "category": "Treatment",
    "text": "Oat straw is made from the green stems and leaves of the oat plant and is traditionally used in herbal teas for relaxation. To prepare tea, steep a commercially prepared product in hot water according to its label. Scientific evidence that oat straw improves sleep or reduces anxiety is limited. People with celiac disease should choose products certified gluten-free because oat products can be contaminated with wheat, barley, or rye.",
    "question": "What is oat straw used for?"
  },
  {
    "id": 14910,
    "category": "Treatment",
    "text": "Skullcap is the common name for several plants used in traditional herbal medicine, sometimes for relaxation and sleep. Products vary by species and preparation, so the exact plant must be identified before use. Evidence supporting its medicinal effects is limited, and some supplements have been associated with liver injury or contamination. Do not use unidentified skullcap plants or combine concentrated products with sedatives without professional advice.",
    "question": "What is skullcap used for?"
  },
  {
    "id": 14911,
    "category": "Treatment",
    "text": "California poppy is a flowering plant traditionally used in herbal preparations for relaxation and sleep. It is available in some commercial teas and supplements, but reliable evidence of effectiveness is limited. Its safety during pregnancy, breastfeeding, and childhood is not well established. Avoid combining it with alcohol, sleeping pills, or other sedating substances without medical advice.",
    "question": "What is California poppy used for?"
  },
  {
    "id": 14912,
    "category": "Treatment",
    "text": "Hops are the flowers of a climbing plant used mainly in brewing and also in some herbal sleep products. Dried hops may be included in commercially prepared teas or combined with other herbs according to product instructions. Evidence that hops alone improve sleep is limited. Hops can cause drowsiness, so avoid combining medicinal preparations with alcohol or sedatives without professional advice.",
    "question": "How do you use hops for sleep?"
  },
  {
    "id": 14913,
    "category": "Treatment",
    "text": "Gotu kola is a plant used in traditional Asian medicine for skin health, circulation, and other complaints. It is sold as capsules, teas, and topical products, but evidence for most claimed benefits is insufficient. Oral supplements have been associated with rare cases of liver injury. People with liver disease or those taking medicines that affect the liver should avoid self-treatment and consult a healthcare professional.",
    "question": "What is gotu kola used for?"
  },
  {
    "id": 14914,
    "category": "Treatment",
    "text": "Ginkgo biloba is a tree whose leaves are processed into standardized supplements, often marketed for memory and circulation. Some studies have examined specific extracts, but evidence does not support using ginkgo as a general cure for memory problems or dementia. Ginkgo may increase bleeding risk and interact with anticoagulants and antiplatelet medicines. Do not eat ginkgo seeds, which can be poisonous, and consult a clinician before taking leaf extracts.",
    "question": "What is ginkgo biloba used for?"
  },
  {
    "id": 14915,
    "category": "Treatment",
    "text": "Ginseng is a root used in traditional medicine and sold in teas, powders, and supplements. Some research suggests that particular preparations may have small effects on fatigue, but results vary and evidence for many claimed benefits is uncertain. Follow the instructions for a standardized product rather than preparing concentrated homemade extracts. Ginseng can cause insomnia and may affect blood sugar or interact with medicines, including warfarin.",
    "question": "How do you use ginseng?"
  },
  {
    "id": 14916,
    "category": "Treatment",
    "text": "Ashwagandha is a plant used in traditional Ayurvedic medicine and sold mainly as root powder and standardized extracts. Some small studies suggest that certain preparations may help with stress or sleep, but the evidence is limited and products differ considerably. Ashwagandha has been linked to rare liver injury and may affect thyroid function or interact with sedatives and immune-suppressing medicines. Avoid it during pregnancy and consult a healthcare professional before using it if you have a thyroid, liver, or autoimmune condition.",
    "question": "What is ashwagandha used for?"
  },
  {
    "id": 14917,
    "category": "Treatment",
    "text": "Rhodiola is a plant traditionally used in parts of Europe and Asia to help people cope with fatigue and stress. Its root is sold in capsules, extracts, and some herbal blends. Evidence of benefit is limited, and products may differ in concentration and quality. Rhodiola can cause dizziness, dry mouth, or sleep disturbances and may interact with medicines, so people with bipolar disorder or those taking psychiatric medication should seek professional advice before using it.",
    "question": "What is rhodiola used for?"
  },
  {
    "id": 14918,
    "category": "Treatment",
    "text": "Schisandra is a climbing plant whose berries are used in traditional East Asian medicine and food preparations. The berries are sold dried or in commercial powders and extracts, which should be used according to their labels. Research into possible effects on fatigue and liver health is limited, and claims of protection against liver disease are not established treatments. Schisandra can affect how the body processes certain medicines, so consult a pharmacist before taking it with prescription drugs.",
    "question": "What is schisandra used for?"
  },
  {
    "id": 14919,
    "category": "Treatment",
    "text": "Astragalus is a root used in traditional Chinese medicine and sold as tea, powder, and supplement extracts. It is traditionally taken to support general wellness, but strong evidence that it prevents infections or treats serious illness is lacking. Its effects on the immune system may make it unsuitable for people taking immunosuppressive medicines. People with autoimmune conditions, transplant recipients, and pregnant individuals should consult a healthcare professional before using it.",
    "question": "What is astragalus root used for?"
  },
  {
    "id": 14920,
    "category": "Treatment",
    "text": "Andrographis is a bitter herb traditionally used in South Asian medicine for respiratory and digestive complaints. Some studies have examined specific extracts for cold symptoms, but the evidence is not conclusive and products vary. It can cause digestive upset and allergic reactions and may interact with blood pressure, blood sugar, or blood-thinning medicines. Avoid using it during pregnancy, and seek medical advice before giving it to children.",
    "question": "What is andrographis used for?"
  },
  {
    "id": 14921,
    "category": "Treatment",
    "text": "Holy basil, also called tulsi, is an aromatic plant used in cooking and traditional Ayurvedic medicine. Its leaves can be steeped in hot water to make tea, following the instructions for a commercially prepared product. Small studies have investigated stress and blood sugar, but more reliable research is needed to establish benefits. Concentrated products may affect blood sugar or blood clotting and should be discussed with a healthcare professional before use with medication.",
    "question": "How do you use holy basil?"
  },
  {
    "id": 14922,
    "category": "Treatment",
    "text": "Fenugreek is a plant whose seeds are used as a spice and traditional herbal remedy. The seeds can be soaked or cooked in food, while commercial supplements should be used according to their labels. Research on blood sugar and milk production during breastfeeding is mixed, so fenugreek should not replace diabetes treatment or professional lactation support. It can cause digestive upset, allergic reactions, and low blood sugar, and medicinal amounts should be avoided during pregnancy.",
    "question": "How do you use fenugreek seeds?"
  },
  {
    "id": 14923,
    "category": "Treatment",
    "text": "Black cumin, also known as Nigella sativa, is a seed used as a spice and in traditional remedies. The seeds can be added to food, while oils and supplements have been studied for possible effects on inflammation and blood sugar. Evidence is not strong enough to treat chronic diseases with black cumin. Concentrated products may cause allergies or interact with medicines, so people taking regular medication should consult a healthcare professional.",
    "question": "What is black cumin used for?"
  },
  {
    "id": 14924,
    "category": "Treatment",
    "text": "Milk thistle is a plant whose seeds contain silymarin, a mixture of compounds studied for possible liver-related effects. It is sold mainly as standardized capsules, tablets, and extracts, which should be used according to their labels. Evidence that milk thistle treats liver disease is inconsistent, and it cannot reverse liver damage or replace medical treatment. People with liver conditions should discuss supplements with their clinician, and those allergic to daisy-family plants should be cautious.",
    "question": "What is milk thistle used for?"
  },
  {
    "id": 14925,
    "category": "Treatment",
    "text": "Artichoke leaf extract is made from the leaves of the globe artichoke and is marketed for digestive discomfort and cholesterol management. Use only a clearly labeled commercial preparation and follow its instructions. Some studies suggest possible benefits for indigestion or cholesterol, but the evidence remains limited. People with gallstones, bile-duct obstruction, or allergies to daisy-family plants should consult a healthcare professional before using it.",
    "question": "What is artichoke leaf used for?"
  },
  {
    "id": 14926,
    "category": "Treatment",
    "text": "Barberry is a shrub whose roots, bark, and berries have different traditional uses. Some extracts contain berberine, a compound studied for metabolic effects, but the strength and safety of products vary. Berberine can cause digestive side effects and interact with many medicines, and it is not suitable for infants or during pregnancy and breastfeeding. Do not make homemade medicinal extracts from unidentified barberry plants or use them to replace prescribed treatment.",
    "question": "What is barberry used for?"
  },
  {
    "id": 14927,
    "category": "Treatment",
    "text": "Berberine is a plant compound found in several species, including certain barberry plants. It is sold as a concentrated supplement and has been studied for blood sugar and cholesterol, but the evidence and product quality vary. It can interact with prescription medicines and cause diarrhea, constipation, or abdominal discomfort. It should not be used during pregnancy or breastfeeding, or given to infants, and people with diabetes should not take it without medical supervision.",
    "question": "What is berberine used for?"
  },
  {
    "id": 14928,
    "category": "Treatment",
    "text": "Gymnema is a climbing plant traditionally used in India and sold in capsules, teas, and extracts. It has been studied for possible effects on blood sugar and the perception of sweetness, but the evidence is limited. Gymnema may lower blood sugar and could cause hypoglycemia when combined with diabetes medication. People with diabetes should consult their clinician before using it and should never replace prescribed medicine with this herb.",
    "question": "What is gymnema used for?"
  },
  {
    "id": 14929,
    "category": "Treatment",
    "text": "Bitter melon is a fruit used as a vegetable and traditional remedy, especially in Asian cuisines. It can be washed, prepared, and cooked as food, but supplements and concentrated extracts are much less predictable. Research on blood sugar control is inconclusive, and bitter melon can cause low blood sugar when combined with diabetes medication. Avoid medicinal use during pregnancy and seek professional advice before using it to manage any medical condition.",
    "question": "How do you use bitter melon?"
  },
  {
    "id": 14930,
    "category": "Treatment",
    "text": "Ceylon cinnamon is a spice used to flavor food and drinks and generally contains less coumarin than cassia cinnamon. Sprinkle a small amount into oatmeal, fruit, or other dishes rather than taking large concentrated doses. Evidence that cinnamon treats diabetes or other diseases remains insufficient. Even with Ceylon cinnamon, people taking medication should discuss concentrated supplements with a healthcare professional.",
    "question": "What is Ceylon cinnamon used for?"
  },
  {
    "id": 14931,
    "category": "Treatment",
    "text": "Cloves are dried flower buds used as a spice and traditional remedy for tooth discomfort. They can be added to food or used to flavor warm drinks, but clove oil is highly concentrated and can damage tissues or cause poisoning if swallowed. Clove oil should not be applied undiluted to gums or teeth, particularly in children. Persistent toothache, facial swelling, fever, or difficulty swallowing requires prompt dental or medical care.",
    "question": "How do you use cloves for toothache?"
  },
  {
    "id": 14932,
    "category": "Treatment",
    "text": "Cumin seeds are an aromatic spice used in many cuisines and traditional digestive preparations. Lightly toast the seeds to bring out their flavor, or steep 1 teaspoon of food-grade seeds in 250 ml of hot water for 5–10 minutes and strain. Cumin water is a traditional drink, but evidence that it treats bloating or other illnesses is limited. Use culinary quantities and seek professional advice before taking concentrated supplements alongside medication.",
    "question": "How do you use cumin seeds?"
  },
  {
    "id": 14933,
    "category": "Treatment",
    "text": "Cardamom is an aromatic spice used in cooking and traditional digestive drinks. Lightly crush one or two pods and steep them in a cup of hot water for several minutes, or add the seeds to food. Cardamom provides flavor, but strong clinical evidence for treating digestive disorders or other illnesses is lacking. Avoid swallowing concentrated essential oil and use ordinary culinary amounts unless a healthcare professional advises otherwise.",
    "question": "How do you use cardamom?"
  },
  {
    "id": 14934,
    "category": "Treatment",
    "text": "Saffron is a spice made from the stigmas of Crocus sativus and is used in food and traditional remedies. Add a small culinary pinch to rice, soups, or warm milk to provide color and flavor. Some studies have explored saffron extracts for mood and other conditions, but more evidence is needed before treating it as medicine. High doses can be toxic, and medicinal amounts should be avoided during pregnancy unless a qualified clinician specifically advises otherwise.",
    "question": "What is saffron used for?"
  },
  {
    "id": 14935,
    "category": "Treatment",
    "text": "Cardamom, ginger, and cinnamon are sometimes combined in warm drinks for flavor and a feeling of digestive comfort. Add small culinary quantities to hot water or tea and strain if desired. Such drinks can be pleasant, but there is no strong evidence that this combination detoxifies the body or cures illness. People with reflux should be cautious with spicy ingredients, and concentrated supplements may interact with medicines.",
    "question": "How do you make herbal tea for digestion?"
  },
  {
    "id": 14936,
    "category": "Treatment",
    "text": "Slippery elm and marshmallow root are mucilage-rich plants traditionally used to soothe temporary throat irritation. Commercial products may be prepared as tea, powder, or lozenges according to their labels. Their soothing effects are plausible, but evidence for treating coughs or digestive diseases is limited. Both may affect the absorption of oral medicines, so ask a pharmacist about appropriate spacing and seek care for severe or persistent symptoms.",
    "question": "Which herbs can soothe an irritated throat?"
  },
  {
    "id": 14937,
    "category": "Treatment",
    "text": "Eucalyptus leaves are aromatic and are used in some commercial products for the sensation of easier breathing. Eucalyptus tea and inhaled preparations have not been shown to cure respiratory infections, and the concentrated essential oil is poisonous if swallowed. Do not drink eucalyptus oil or apply it inside the nose. Use products only as labeled, keep them away from children, and seek urgent care for breathing difficulty.",
    "question": "How do you use eucalyptus safely?"
  },
  {
    "id": 14938,
    "category": "Treatment",
    "text": "Peppermint essential oil is a concentrated preparation sometimes used in enteric-coated capsules for irritable bowel syndrome. Research suggests that certain formulations may reduce abdominal pain and bloating in some adults. These capsules are not equivalent to peppermint tea or ordinary essential oil, and the product instructions should be followed carefully. Peppermint can worsen reflux, and concentrated oil should never be swallowed unless it is part of a product specifically designed for oral use.",
    "question": "How do you use peppermint oil for digestion?"
  },
  {
    "id": 14939,
    "category": "Treatment",
    "text": "Ginger is traditionally used to help relieve nausea, including some nausea associated with travel. It can be consumed as food, tea, or a standardized product, following the product instructions. Evidence of benefit varies according to the cause of nausea, and ginger may cause heartburn or stomach discomfort. Severe or persistent vomiting, dehydration, blood in vomit, or intense abdominal pain requires medical assessment.",
    "question": "How do you use ginger for nausea?"
  },
  {
    "id": 14940,
    "category": "Treatment",
    "text": "Chamomile tea is often used as a relaxing evening drink. Steep 1–2 teaspoons of dried chamomile flowers in 250 ml of hot water for 5–10 minutes, then strain and allow it to cool to a comfortable temperature. It may help some people feel relaxed, but evidence that it treats insomnia is limited. Avoid it if you have a known allergy to chamomile or related plants, and consult a clinician if sleep problems persist.",
    "question": "How do you use chamomile for sleep?"
  },
  {
    "id": 14941,
    "category": "Treatment",
    "text": "Lemon balm and chamomile are sometimes combined in herbal teas intended for relaxation. Steep a commercially prepared blend according to its instructions, usually for several minutes, and drink it as a beverage. Research on these herbs for sleep and anxiety is limited, and a tea should not replace treatment for persistent symptoms. Check for allergies and ask a healthcare professional before using concentrated products with sedatives or other medication.",
    "question": "How do you make a calming herbal tea?"
  },
  {
    "id": 14942,
    "category": "Treatment",
    "text": "Ginger and lemon are commonly combined in a warm drink for flavor and throat comfort. Simmer a few slices of fresh ginger in water for 5–10 minutes, allow it to cool slightly, and add lemon juice to taste. The drink can provide fluids and may feel soothing, but it does not cure viral infections. Ginger can aggravate heartburn, and persistent fever, difficulty breathing, or severe throat pain requires medical advice.",
    "question": "How do you make ginger and lemon tea?"
  },
  {
    "id": 14943,
    "category": "Treatment",
    "text": "Thyme tea is a traditional home drink for mild cough and throat irritation. Steep 1–2 teaspoons of clean fresh or dried thyme leaves in 250 ml of hot water for 5–10 minutes, then strain. Drink it warm if it feels soothing, but evidence of a meaningful medicinal effect is limited. Seek medical assessment if a cough lasts several weeks or is accompanied by breathing difficulty, chest pain, high fever, or blood.",
    "question": "How do you make thyme tea for a cough?"
  },
  {
    "id": 14944,
    "category": "Treatment",
    "text": "Honey is a natural food that may help soothe a cough, particularly at night in children older than one year and in adults. A small spoonful can be taken alone or mixed into a warm drink that is not too hot. Honey must never be given to babies under 12 months because it can cause infant botulism. It can also raise blood sugar, and it should not delay medical assessment when symptoms are severe.",
    "question": "How do you use honey for a cough?"
  },
  {
    "id": 14945,
    "category": "Treatment",
    "text": "Marshmallow root is a traditional herbal ingredient used for temporary throat irritation and dry cough. Commercial teas, syrups, and lozenges should be used according to their labels because preparation strengths differ. Evidence supporting its effectiveness is limited, and it should not be used to treat breathing difficulty or a serious respiratory illness. It may delay the absorption of oral medicines, so ask a pharmacist about spacing doses.",
    "question": "How do you use marshmallow root for a cough?"
  },
  {
    "id": 14946,
    "category": "Treatment",
    "text": "Elderberry is the fruit of certain elder plants and is commonly sold as cooked syrup, juice, or standardized supplements. Some preliminary studies have investigated elderberry for cold and flu symptoms, but the evidence remains uncertain. Raw or unripe elderberries and other parts of the plant can contain toxic compounds and may cause nausea, vomiting, or diarrhea. Use only properly processed commercial products, and never substitute elderberry for recommended medical care or vaccination.",
    "question": "What is elderberry used for?"
  },
  {
    "id": 14947,
    "category": "Treatment",
    "text": "Garlic has traditionally been used as food and as a home remedy for colds. Chopped garlic can be added to soups, sauces, and other meals, but there is insufficient evidence that it reliably prevents or cures a cold. Do not insert garlic into the nose or rub raw garlic onto the skin, as it can cause irritation and chemical burns. Concentrated supplements may increase bleeding risk and interact with medication.",
    "question": "Does garlic help with colds?"
  },
  {
    "id": 14948,
    "category": "Treatment",
    "text": "Salt water can be used as a simple gargle to soothe a mildly sore throat. Dissolve about half a teaspoon of salt in a glass of warm water, gargle, and spit it out without swallowing. It may provide temporary comfort but does not cure the infection causing the soreness. Seek medical advice for difficulty breathing or swallowing, dehydration, severe symptoms, or a persistent sore throat.",
    "question": "How do you use salt water for a sore throat?"
  },
  {
    "id": 14949,
    "category": "Treatment",
    "text": "A saline nasal rinse can help clear mucus and allergens from the nose. Use a sterile saline product or prepare the rinse with distilled, sterile, or previously boiled and cooled water, following a reliable recipe and clean equipment. Never use untreated tap water for nasal irrigation because rare but dangerous infections can occur. Stop if the rinse causes significant pain or bleeding, and seek advice if symptoms persist.",
    "question": "How do you use a saline nasal rinse?"
  },
  {
    "id": 14950,
    "category": "Treatment",
    "text": "Aloe vera gel is used in some skin products to moisturize dry skin and soothe mild irritation. Apply a small amount of a commercially prepared gel to intact skin and stop if it causes itching, redness, or swelling. Evidence for treating burns or wounds varies, and aloe should not replace appropriate medical care. Avoid applying cosmetic gel to deep wounds or serious burns, and never swallow aloe latex as a home remedy.",
    "question": "How do you use aloe vera for dry skin?"
  },
  {
    "id": 14951,
    "category": "Treatment",
    "text": "Oatmeal is a food ingredient used in some skin-care products to relieve dry, itchy skin. Colloidal oatmeal products contain finely ground oats and can be added to a lukewarm bath or applied according to their labels. Avoid very hot water, which can worsen dryness, and gently pat the skin dry afterward. Stop using the product if a reaction occurs, and seek medical advice for severe, infected, or persistent skin problems.",
    "question": "How do you use oatmeal for itchy skin?"
  },
  {
    "id": 14952,
    "category": "Treatment",
    "text": "Aloe vera and calendula appear in many commercially prepared skin-care products for moisturizing and soothing minor irritation. Apply a product designed for the intended use to clean, intact skin and follow its label. Evidence for treating significant wounds or burns is limited, and these products can cause allergic reactions. Do not use them instead of medical care for deep wounds, spreading infection, or serious burns.",
    "question": "Which herbs are used for skin irritation?"
  },
  {
    "id": 14953,
    "category": "Treatment",
    "text": "Witch hazel is a shrub whose bark and leaves are used in certain topical skin products. Commercial preparations are sometimes applied to intact skin for temporary soothing, but evidence for treating hemorrhoids or other skin conditions is limited. Follow the product label and stop using it if dryness, burning, or irritation develops. Do not ingest witch hazel products, and seek medical advice for persistent bleeding, severe pain, or worsening symptoms.",
    "question": "How do you use witch hazel?"
  },
  {
    "id": 14954,
    "category": "Treatment",
    "text": "Evening primrose oil is extracted from the seeds of a flowering plant and sold as a supplement for skin and hormonal complaints. Studies have not established reliable benefits for most conditions it is marketed to treat. Products should not be used as a substitute for medical treatment, and the oil may cause digestive side effects. People with seizure disorders or those taking medicines that affect bleeding should consult a healthcare professional before using it.",
    "question": "What is evening primrose oil used for?"
  },
  {
    "id": 14955,
    "category": "Treatment",
    "text": "Borage oil is made from the seeds of the borage plant and contains gamma-linolenic acid, a type of fatty acid. It is sold as a supplement for skin and inflammatory conditions, but evidence of benefit is limited. Some borage products may contain liver-toxic pyrrolizidine alkaloids, so only products certified to be free of these compounds should be considered. Avoid borage oil during pregnancy and consult a healthcare professional before use, especially with liver disease or regular medication.",
    "question": "What is borage oil used for?"
  },
  {
    "id": 14956,
    "category": "Treatment",
    "text": "Rosemary oil is an essential oil used in fragrances and some formulated hair-care products. For scalp use, choose a product specifically intended for that purpose and follow its instructions rather than applying concentrated oil directly. Evidence that rosemary oil improves hair growth is limited, and it can cause irritation or allergic reactions. Keep it away from the eyes, do not swallow it, and discontinue use if the scalp becomes inflamed.",
    "question": "How do you use rosemary oil for hair?"
  },
  {
    "id": 14957,
    "category": "Treatment",
    "text": "Peppermint oil is sometimes included in commercial topical products for a cooling sensation on sore muscles. Use only a product formulated for skin and follow the label, avoiding broken skin, eyes, and mucous membranes. Concentrated peppermint oil can irritate or burn the skin and should not be applied undiluted. It must never be swallowed as an ordinary essential oil, and it should be kept away from young children's faces and airways.",
    "question": "How do you use peppermint oil for muscle pain?"
  },
  {
    "id": 14958,
    "category": "Treatment",
    "text": "Arnica gel is a topical herbal product marketed for bruises and muscle soreness. Apply it only to intact skin and follow the manufacturer's directions, avoiding the eyes and mouth. Evidence of benefit varies, and arnica may cause allergic skin reactions. Never swallow arnica or apply it to open wounds, and seek medical assessment for severe pain, major swelling, or a suspected fracture.",
    "question": "How do you use arnica gel?"
  },
    {
    "id": 14959,
    "category": "Treatment",
    "text": "Yarrow is a flowering herb traditionally used for minor digestive complaints and in topical preparations. It is available as dried herb, tea, and commercial skin products, which should be used according to their labels. Scientific evidence for most traditional uses is limited. Yarrow may cause allergic reactions in people sensitive to daisy-family plants, and medicinal use should be avoided during pregnancy unless a qualified healthcare professional advises otherwise.",
    "question": "What is yarrow used for?"
  },
  {
    "id": 14960,
    "category": "Treatment",
    "text": "Agrimony is a flowering plant traditionally used in herbal teas for mild digestive complaints and throat discomfort. A commercial tea can be prepared according to its package instructions, but reliable evidence of medicinal benefits is limited. Agrimony contains tannins that may cause stomach irritation in some people. Consult a healthcare professional before using it medicinally, especially if you take regular medication or have a chronic condition.",
    "question": "What is agrimony used for?"
  },
  {
    "id": 14961,
    "category": "Treatment",
    "text": "Meadowsweet is a flowering herb traditionally used for minor aches and digestive discomfort. It contains salicylate-related compounds, which are chemically related to substances found in aspirin. Evidence supporting its effectiveness is limited, and it may be unsuitable for people allergic to aspirin, those with stomach ulcers, or people taking blood-thinning medicines. Avoid medicinal use during pregnancy and consult a healthcare professional before taking it for pain.",
    "question": "What is meadowsweet used for?"
  },
  {
    "id": 14962,
    "category": "Treatment",
    "text": "White willow bark is used in some herbal products for pain because it contains salicin, a compound related to aspirin. Commercial extracts vary in strength and should only be used according to their labels and professional advice. It can cause stomach irritation and increase bleeding risk. Avoid it in children and teenagers with viral illnesses, during pregnancy, or if you have an aspirin allergy, stomach ulcers, kidney disease, or take anticoagulants.",
    "question": "What is white willow bark used for?"
  },
  {
    "id": 14963,
    "category": "Treatment",
    "text": "Devil's claw is a plant native to southern Africa whose root is used in some supplements for joint and back pain. Some studies suggest possible benefits for certain types of lower back pain, but evidence is limited and products differ. It can cause digestive upset and may interact with medicines. People with stomach or duodenal ulcers, gallstones, or heart conditions should consult a healthcare professional before using it.",
    "question": "What is devil's claw used for?"
  },
  {
    "id": 14964,
    "category": "Treatment",
    "text": "Boswellia is a resin obtained from trees in the Boswellia genus and is sold as an herbal supplement for joint discomfort. Certain extracts have been studied for osteoarthritis, but the evidence is not conclusive and products vary. Follow the instructions for a standardized product rather than using raw resin as a treatment. Possible side effects include digestive discomfort, and people taking medication should consult a healthcare professional before use.",
    "question": "What is boswellia used for?"
  },
  {
    "id": 14965,
    "category": "Treatment",
    "text": "Devil's claw and boswellia are sometimes marketed for joint discomfort, but they are different plants with different chemical compounds. Both are available as commercial supplements, and neither has been proven to cure arthritis. Product quality and strength vary, and both can cause side effects or interact with medicines. People with chronic joint pain should seek an accurate diagnosis and discuss supplements with a healthcare professional.",
    "question": "What is the difference between boswellia and devil's claw?"
  },
  {
    "id": 14966,
    "category": "Treatment",
    "text": "Turmeric contains curcumin, a plant compound studied for its possible anti-inflammatory effects. Use turmeric as a spice in soups, vegetables, rice, or other meals, or consider a commercial supplement only after professional advice. Evidence for supplements in some joint conditions is promising but still limited, and products differ in absorption and concentration. High-dose supplements may cause digestive problems, interact with medicines, and increase risks for people with gallbladder disease.",
    "question": "How do you use turmeric for joint pain?"
  },
  {
    "id": 14967,
    "category": "Treatment",
    "text": "Ginger contains compounds that may influence inflammation and can be included in a balanced diet. Add fresh grated ginger to meals or prepare tea by simmering a few slices in water for 5–10 minutes. Research on ginger for arthritis and other chronic pain conditions is limited, so it should not replace established treatment. Ginger may cause heartburn or stomach irritation, especially in larger amounts.",
    "question": "How do you use ginger for inflammation?"
  },
  {
    "id": 14968,
    "category": "Treatment",
    "text": "Capsaicin is a compound found in chili peppers and is used in some topical creams for localized nerve or joint pain. Apply only a commercially prepared product according to its label and wash your hands afterward, avoiding the eyes, mouth, and broken skin. It can cause a temporary burning sensation, especially during the first applications. Do not apply it with heating pads or immediately before hot showers, and seek medical advice if severe irritation occurs.",
    "question": "How do you use capsaicin cream for pain?"
  },
  {
    "id": 14969,
    "category": "Treatment",
    "text": "White dead-nettle is a flowering plant sometimes used in traditional herbal teas and topical preparations. Correct plant identification is essential because common names can refer to different species. Evidence for its medicinal effects is insufficient, so it should not be relied on to treat illness. Use only correctly identified, clean, commercially prepared products and consult a healthcare professional before medicinal use.",
    "question": "What is white dead-nettle used for?"
  },
  {
    "id": 14970,
    "category": "Treatment",
    "text": "Chickweed is a small edible plant traditionally used in food and some topical preparations for itchy skin. Commercial skin products can be applied according to their labels, but strong clinical evidence for benefit is lacking. Do not place homemade plant mixtures on open wounds because they may introduce dirt or microorganisms. People with persistent rashes, spreading redness, or signs of infection should seek medical advice.",
    "question": "What is chickweed used for?"
  },
  {
    "id": 14971,
    "category": "Treatment",
    "text": "Self-heal, also called Prunella vulgaris, is a flowering plant used in traditional herbal medicine. It appears in some teas and topical products, but reliable evidence for treating infections or other diseases is limited. Commercial products should be used only according to their instructions, and wild plants must be correctly identified. Do not use self-heal instead of medical treatment for serious infections, unexplained fever, or worsening symptoms.",
    "question": "What is self-heal herb used for?"
  },
  {
    "id": 14972,
    "category": "Treatment",
    "text": "Mugwort is a group of aromatic plants traditionally used in cooking and herbal practices. Because species and preparations vary, its safety cannot be assumed from the common name alone. Mugwort can cause allergic reactions and may contain compounds that are harmful in concentrated or excessive amounts. Avoid ingesting mugwort essential oil, and avoid medicinal use during pregnancy because some preparations may stimulate uterine activity.",
    "question": "What is mugwort used for?"
  },
  {
    "id": 14973,
    "category": "Treatment",
    "text": "Wormwood is an aromatic plant historically used in some traditional digestive preparations. It contains thujone in varying amounts, and concentrated preparations can be toxic, particularly when taken in excessive quantities. Wormwood should not be used as an improvised home remedy or consumed as essential oil. Avoid medicinal use during pregnancy and breastfeeding, and consult a healthcare professional before considering any commercial preparation.",
    "question": "What is wormwood used for?"
  },
  {
    "id": 14974,
    "category": "Treatment",
    "text": "Rue is a strongly scented plant historically used in traditional medicine, but its safety profile is poor. The plant and its concentrated preparations can cause poisoning, and contact with its sap followed by sunlight can cause severe skin reactions. Rue should not be consumed as tea or used as a home treatment. It is particularly dangerous during pregnancy and should not be used medicinally without appropriate specialist guidance.",
    "question": "Is rue safe to use as an herbal remedy?"
  },
  {
    "id": 14975,
    "category": "Treatment",
    "text": "Comfrey is a plant historically used in topical preparations for bruises and minor muscle discomfort. It contains pyrrolizidine alkaloids that can damage the liver, so oral comfrey products should not be used. Never apply comfrey to broken skin or large areas of the body. If a topical preparation is considered, use only a regulated product with controlled alkaloid content and follow its instructions for a short period.",
    "question": "Why should comfrey not be taken by mouth?"
  },
  {
    "id": 14976,
    "category": "Treatment",
    "text": "St John's wort is a flowering plant sold as an herbal supplement for mild to moderate depressive symptoms. Some standardized extracts have shown benefits in certain studies, but results vary and they are not suitable for every type of depression. St John's wort interacts with many medicines, including hormonal contraceptives, antidepressants, anticoagulants, and transplant medicines, sometimes making them less effective or causing dangerous reactions. Consult a healthcare professional before use and never combine it with prescription antidepressants without medical supervision.",
    "question": "What is St John's wort used for?"
  },
  {
    "id": 14977,
    "category": "Treatment",
    "text": "St John's wort may increase skin sensitivity to sunlight, especially when taken in concentrated oral preparations. People using it should discuss sun protection and other risks with a healthcare professional and follow the product information. Severe sunburn or unusual skin reactions require stopping exposure and seeking appropriate advice. Its many drug interactions are an additional reason not to start it without checking with a pharmacist or clinician.",
    "question": "Does St John's wort increase sensitivity to sunlight?"
  },
  {
    "id": 14978,
    "category": "Treatment",
    "text": "Kava is a plant traditionally used to prepare a relaxing beverage in some Pacific Island cultures. Modern supplements and extracts are marketed for anxiety, but their quality and strength vary. Kava has been linked to serious liver injury and can cause drowsiness, especially when combined with alcohol or sedatives. It should not be used without professional advice and should be avoided by people with liver disease.",
    "question": "What is kava used for?"
  },
  {
    "id": 14979,
    "category": "Treatment",
    "text": "Kratom is a plant whose leaves contain psychoactive compounds that affect opioid receptors. Some people use it for pain or withdrawal symptoms, but evidence of safety and effectiveness is inadequate. It can cause dependence, withdrawal, seizures, liver problems, and potentially dangerous interactions with other substances. Kratom is not a safe substitute for evidence-based pain treatment or supervised addiction care.",
    "question": "Is kratom a safe herbal treatment?"
  },
  {
    "id": 14980,
    "category": "Treatment",
    "text": "Ephedra is a plant historically used in some weight-loss and stimulant products. Ephedra alkaloids can raise blood pressure and heart rate and have been associated with heart attacks, strokes, seizures, and deaths. Products containing these stimulant alkaloids are prohibited or tightly restricted in several countries, including the United States. Do not use ephedra for weight loss, energy, or respiratory symptoms.",
    "question": "Why is ephedra dangerous?"
  },
  {
    "id": 14981,
    "category": "Treatment",
    "text": "Bitter orange is a citrus plant whose extracts are sometimes marketed for weight loss and energy. Some products contain synephrine, a stimulant that may increase heart rate and blood pressure. Evidence that bitter orange supplements produce meaningful, lasting weight loss is weak, while safety concerns are significant. Avoid combining stimulant supplements with large amounts of caffeine, and consult a healthcare professional before using products marketed for weight loss.",
    "question": "What is bitter orange used for?"
  },
  {
    "id": 14982,
    "category": "Treatment",
    "text": "Guarana is a plant whose seeds contain caffeine and are used in some drinks and supplements. It can temporarily increase alertness, but it does not replace adequate sleep. Excessive caffeine may cause anxiety, insomnia, tremors, palpitations, or increased blood pressure. Check the total caffeine content of all products you consume and avoid concentrated guarana supplements if you are sensitive to stimulants or have relevant medical conditions.",
    "question": "What is guarana used for?"
  },
  {
    "id": 14983,
    "category": "Treatment",
    "text": "Yerba mate is a plant used to prepare a caffeinated beverage traditionally consumed in South America. Place the leaves in a suitable container, add hot rather than boiling water, and steep or refill according to the product's instructions. Caffeine can increase alertness but may cause insomnia, anxiety, or palpitations. Avoid drinking mate at scalding temperatures, and remember that frequent consumption of very hot beverages has been associated with an increased risk of esophageal cancer.",
    "question": "How do you use yerba mate?"
  },
  {
    "id": 14984,
    "category": "Treatment",
    "text": "Guayusa is a caffeinated leaf used to prepare a traditional beverage in parts of the Amazon region. Steep the dried leaves in hot water according to the product instructions and adjust the strength to your caffeine tolerance. It may temporarily improve alertness, but evidence for special medicinal benefits is limited. Excessive consumption can cause the same problems as other caffeinated drinks, including insomnia, anxiety, and palpitations.",
    "question": "What is guayusa tea used for?"
  },
  {
    "id": 14985,
    "category": "Treatment",
    "text": "Butterfly pea flower is a blue flowering plant used to color food and prepare herbal infusions. Steep a small quantity of food-grade dried flowers in hot water for several minutes, then strain. Lemon juice can change the drink's color from blue toward purple because of changes in acidity. The tea is primarily a beverage, and reliable evidence that it treats disease or produces major health benefits is limited.",
    "question": "How do you use butterfly pea flower?"
  },
  {
    "id": 14986,
    "category": "Treatment",
    "text": "Blue mallow flowers and leaves contain mucilage and are traditionally used in herbal teas for mild throat irritation. Prepare a commercial product according to its label, as the plant part and preparation method can vary. Evidence for treating coughs or digestive problems is limited. Mallow may affect the absorption of oral medicines, so consult a pharmacist about spacing it from other medications.",
    "question": "What is blue mallow used for?"
  },
  {
    "id": 14987,
    "category": "Treatment",
    "text": "Corn silk is the fine thread-like material found inside an ear of corn and is used in some traditional herbal teas. Commercial preparations should be used according to their instructions because evidence and safety information are limited. Corn silk is sometimes promoted as a diuretic, but reliable clinical evidence is insufficient. People with kidney or heart disease, or those taking diuretics or blood-pressure medicines, should seek medical advice before using it medicinally.",
    "question": "What is corn silk used for?"
  },
  {
    "id": 14988,
    "category": "Treatment",
    "text": "Horsetail is a plant used in some traditional herbal products marketed for urinary complaints, hair, or nails. It contains compounds that can affect vitamin B1 levels, and some species or preparations may contain harmful substances. Evidence for most claimed benefits is limited. Avoid unsupervised use, especially during pregnancy or in people with kidney or heart disease, and consult a healthcare professional before taking it with diuretics or other medicines.",
    "question": "What is horsetail herb used for?"
  },
  {
    "id": 14989,
    "category": "Treatment",
    "text": "Juniper berries are aromatic seed cones used in cooking, including as a flavoring for some meat dishes. They can be added in small culinary amounts, but medicinal use as a diuretic is not well supported by evidence. Large quantities or concentrated juniper oil can be harmful to the kidneys and other organs. Avoid medicinal use during pregnancy and seek professional advice if you have kidney disease.",
    "question": "How do you use juniper berries?"
  },
  {
    "id": 14990,
    "category": "Treatment",
    "text": "Cranberry products are made from the fruit of cranberry plants and are commonly used to support urinary tract health. Unsweetened juice or standardized capsules can be used according to product instructions, but cranberry does not treat an active urinary tract infection. Evidence suggests some cranberry products may help reduce recurrent infections in certain people, although effectiveness varies. People with urinary symptoms, fever, back pain, or blood in the urine should seek medical assessment rather than relying on cranberry.",
    "question": "How do you use cranberry for urinary health?"
  },
  {
    "id": 14991,
    "category": "Treatment",
    "text": "Bearberry leaf, also called uva ursi, is used in some traditional herbal preparations for urinary complaints. Its active compounds and potential toxicity mean it should not be treated as an ordinary tea. Evidence for benefit is limited, and prolonged use may damage the liver or cause other adverse effects. Avoid it during pregnancy and breastfeeding, in children, and in people with kidney disease; urinary symptoms should be assessed by a healthcare professional.",
    "question": "What is bearberry leaf used for?"
  },
  {
    "id": 14992,
    "category": "Treatment",
    "text": "Goldenrod is a flowering plant traditionally used in herbal preparations for urinary discomfort. It is sold as tea and commercial extracts, but evidence that it treats urinary infections or kidney disease is insufficient. People allergic to related plants may react to goldenrod, and those with heart or kidney conditions should seek professional advice before using it as a diuretic. Painful urination, fever, or flank pain requires medical assessment.",
    "question": "What is goldenrod used for?"
  },
  {
    "id": 14993,
    "category": "Treatment",
    "text": "Uva ursi is another name for bearberry leaf, a plant used historically in some urinary herbal remedies. It contains arbutin-related compounds, but safety and effectiveness are limited by the available evidence. It should not be taken casually as a daily tea or used to replace antibiotics when they are needed. Avoid it during pregnancy, breastfeeding, and childhood, and seek medical care for suspected urinary tract infection.",
    "question": "Is uva ursi safe for urinary infections?"
  },
  {
    "id": 14994,
    "category": "Treatment",
    "text": "Celery seed is a spice used in cooking and traditional remedies for fluid retention and joint complaints. Small amounts can be used to season food, but concentrated supplements have not been proven to treat these conditions. Celery can cause serious allergic reactions in sensitive individuals, and medicinal amounts may be unsuitable during pregnancy or with certain medicines. People with kidney disease or unexplained swelling should seek medical assessment instead of self-treating with celery seed.",
    "question": "What is celery seed used for?"
  },
  {
    "id": 14995,
    "category": "Treatment",
    "text": "Parsley leaf is a nutritious culinary herb that can add flavor and micronutrients to everyday meals. Wash it thoroughly and chop it into salads, soups, sauces, or cooked dishes. Parsley tea and concentrated parsley extracts are not proven treatments for kidney disease or fluid retention. Large medicinal amounts may be unsafe during pregnancy, and people taking warfarin should maintain consistent vitamin K intake.",
    "question": "Can parsley tea treat kidney problems?"
  },
  {
    "id": 14996,
    "category": "Treatment",
    "text": "Nettle leaf tea is traditionally used as a beverage and sometimes promoted for urinary complaints or joint discomfort. To prepare a commercial tea, follow the package instructions and strain it before drinking. Evidence for treating these conditions is limited, and nettle may affect blood pressure, blood sugar, and fluid balance. People with kidney or heart disease, pregnant individuals, and those taking diuretics or other medication should consult a healthcare professional before medicinal use.",
    "question": "Can nettle tea help urinary health?"
  },
  {
    "id": 14997,
    "category": "Treatment",
    "text": "Dandelion root is used in traditional herbal drinks and sometimes as a coffee substitute when roasted. Commercial roasted dandelion root can be brewed according to the package instructions. Claims that it detoxifies the liver or treats liver disease are not supported by strong clinical evidence. People with bile-duct obstruction, gallstones, or allergies to related plants should consult a healthcare professional before using concentrated products.",
    "question": "How do you use dandelion root?"
  },
  {
    "id": 14998,
    "category": "Treatment",
    "text": "Ginger, peppermint, and fennel are traditionally used in drinks for mild digestive discomfort, although evidence varies by herb and condition. Prepare each herb separately according to its product instructions rather than combining many concentrated ingredients at once. Peppermint may worsen acid reflux, while ginger can cause heartburn and fennel may trigger allergies in susceptible people. Persistent abdominal pain, repeated vomiting, black stools, or unexplained weight loss requires medical assessment.",
    "question": "Which herbs are commonly used for digestive discomfort?"
  },
  {
    "id": 14999,
    "category": "Treatment",
    "text": "Psyllium husk is a soluble fiber derived from the seeds of Plantago ovata and is used to improve bowel regularity. Mix the recommended amount with a full glass of water and drink it immediately before it thickens, then follow the product's instructions for additional fluids. Never swallow it dry because it may cause choking or intestinal blockage. It can affect medicine absorption, so ask a pharmacist how to separate doses, and do not use it if bowel obstruction is suspected.",
    "question": "How do you use psyllium for constipation?"
  },
  {
    "id": 15000,
    "category": "Treatment",
    "text": "Flaxseed is a food rich in fiber and plant-based omega-3 fatty acid ALA. Ground flaxseed can be added to oatmeal, yogurt, or smoothies, beginning with a small amount and drinking adequate water. It may help bowel regularity and can be part of a balanced diet, but it does not replace treatment for serious digestive conditions. Large amounts may cause bloating, and people taking oral medicines should ask a pharmacist about possible effects on absorption.",
    "question": "How do you use flaxseed for digestion?"
  },
  {
    "id": 15001,
    "category": "Treatment",
    "text": "Chia seeds absorb water and form a gel because they contain soluble fiber. Add them to yogurt, oatmeal, or another moist food and allow them to hydrate before eating. They can contribute to normal bowel function when consumed with enough fluid, but dry chia seeds can swell and pose a choking risk, particularly for people with swallowing difficulties. Increase fiber gradually to reduce gas and bloating.",
    "question": "How do you use chia seeds for bowel health?"
  },
  {
    "id": 15002,
    "category": "Treatment",
    "text": "Psyllium, flaxseed, and chia seeds provide dietary fiber that can support bowel regularity. Introduce fiber gradually, eat a varied diet, and drink enough fluids unless a clinician has advised fluid restriction. Psyllium must always be mixed with sufficient liquid, while chia seeds should be adequately hydrated before eating. Severe abdominal pain, vomiting, blood in the stool, or persistent changes in bowel habits require medical assessment.",
    "question": "Which plant foods help with constipation?"
  },
  {
    "id": 15003,
    "category": "Treatment",
    "text": "Ginger, peppermint, and chamomile are common ingredients in herbal drinks used for mild digestive discomfort. Prepare them according to their product instructions and use one ingredient at a time if you are unsure how you tolerate it. These drinks may feel soothing, but evidence varies and they do not treat every cause of stomach pain. Peppermint can aggravate reflux, chamomile may cause allergies, and persistent or severe symptoms require medical evaluation.",
    "question": "Which herbal teas can soothe the stomach?"
  },
  {
    "id": 15004,
    "category": "Treatment",
    "text": "Fenugreek seeds contain fiber and are used as a spice and in traditional food preparations. They can be cooked into dishes or used in food-grade products according to their instructions. Evidence for medicinal effects on blood sugar or milk production is mixed, and concentrated supplements can cause side effects. Avoid medicinal amounts during pregnancy and consult a healthcare professional if you take diabetes medication or have a legume allergy.",
    "question": "Can fenugreek help control blood sugar?"
  },
  {
    "id": 15005,
    "category": "Treatment",
    "text": "Gymnema is an herb traditionally used in India and studied for possible effects on blood sugar. It is sold in commercial capsules, teas, and extracts, but evidence supporting its use remains limited. It may lower blood sugar and increase the risk of hypoglycemia when combined with diabetes medication. People with diabetes should use it only with professional guidance and should monitor their blood sugar as advised by their clinician.",
    "question": "How do you use gymnema for blood sugar?"
  },
  {
    "id": 15006,
    "category": "Treatment",
    "text": "Bitter melon is a vegetable that contains compounds being studied for possible effects on blood sugar. It can be cooked as food, but concentrated extracts are not equivalent to eating the vegetable. Evidence for treating diabetes is insufficient, and medicinal products may cause low blood sugar or digestive side effects. Avoid medicinal use during pregnancy and consult a healthcare professional before using it alongside diabetes medication.",
    "question": "Can bitter melon replace diabetes medicine?"
  },
  {
    "id": 15007,
    "category": "Treatment",
    "text": "Garlic, ginger, and turmeric are widely used culinary plants that contain compounds studied for possible effects on inflammation and cardiovascular health. Add them in ordinary food quantities to soups, vegetables, and other meals as part of a balanced diet. Evidence for concentrated supplements varies, and none of these herbs should replace prescribed medication. High-dose products may interact with anticoagulants or other medicines, so consult a healthcare professional before taking them regularly as supplements.",
    "question": "Which herbs are commonly studied for inflammation?"
  },
  {
    "id": 15008,
    "category": "Treatment",
    "text": "Herbal remedies can contain active compounds that affect the body, but natural does not automatically mean safe. Correct plant identification, product quality, preparation, dose, and interactions with medicines all matter. Use food-grade herbs for cooking and follow the instructions on regulated herbal products rather than guessing doses for homemade extracts. Seek professional advice before using medicinal herbs during pregnancy, for children, or when treating a chronic illness.",
    "question": "How do you use herbal remedies safely?"
  },
  {
  "id": 15009,
  "category": "Treatment",
  "text": "Chamomile tea is commonly used to promote relaxation and may help some people settle down before sleep. Add 1–2 teaspoons of dried chamomile flowers to a cup of hot water, cover, and steep for 5–10 minutes. Strain before drinking. Evidence for treating insomnia is limited.",
  "question": "How do you make chamomile tea for sleep?"
},
{
  "id": 15010,
  "category": "Treatment",
  "text": "Chamomile tea may help relieve mild digestive discomfort, such as bloating or stomach cramps, although strong clinical evidence is limited. Steep 1–2 teaspoons of dried flowers in hot water for 5–10 minutes and strain. Stop using it if symptoms worsen or an allergic reaction occurs.",
  "question": "How do you use chamomile for an upset stomach?"
},
{
  "id": 15011,
  "category": "Treatment",
  "text": "A clean cloth soaked in cooled chamomile tea can be used as a mild external compress on intact skin. Chamomile may soothe minor irritation in some people, but it can also cause allergic reactions. Do not apply it to deep wounds, and stop if redness or itching develops.",
  "question": "How do you use chamomile tea on irritated skin?"
},
{
  "id": 15012,
  "category": "Treatment",
  "text": "Chamomile tea is traditionally used to help people relax during stressful periods. Steep 1–2 teaspoons of dried chamomile flowers in hot water for 5–10 minutes. It may provide a calming routine, but it is not a proven treatment for anxiety disorders.",
  "question": "Can chamomile tea help you relax?"
},
{
  "id": 15013,
  "category": "Treatment",
  "text": "Chamomile belongs to the daisy family, so people allergic to ragweed, chrysanthemums, marigolds, or daisies may also react to it. Reactions can include itching, swelling, or difficulty breathing. Seek emergency help for breathing problems or swelling of the throat.",
  "question": "Who should avoid chamomile?"
},
{
  "id": 15014,
  "category": "Treatment",
  "text": "Chamomile may interact with some medicines, including anticoagulants such as warfarin, and may add to the effects of sedatives. People taking regular medication should ask a pharmacist or clinician before using concentrated chamomile products. Ordinary tea is less concentrated than extracts or supplements, but interactions are still worth considering.",
  "question": "Can chamomile interact with medicines?"
},
{
  "id": 15015,
  "category": "Treatment",
  "text": "Chamomile tea should be allowed to cool to a comfortable temperature before drinking or using it on the skin. Never put hot tea directly onto sensitive skin or near the eyes. Use a freshly prepared infusion and discard it if it has been left standing for a long time.",
  "question": "How should chamomile tea be cooled and stored?"
},
{
  "id": 15016,
  "category": "Treatment",
  "text": "Chamomile is not a proven treatment for severe stomach pain, persistent vomiting, or unexplained digestive symptoms. Mild tea may be soothing for some people, but it should not delay medical assessment. Seek medical advice if symptoms are severe, persistent, or accompanied by blood or fever.",
  "question": "Can chamomile treat severe stomach pain?"
},
{
  "id": 15017,
  "category": "Treatment",
  "text": "Chamomile essential oil is much more concentrated than chamomile tea and should not be swallowed or applied undiluted to the skin. Concentrated oils can cause irritation or allergic reactions. Follow the product label and consult a qualified professional before using essential oils for health purposes.",
  "question": "Is chamomile essential oil safe to swallow?"
},
{
  "id": 15018,
  "category": "Treatment",
  "text": "Chamomile tea is not a substitute for prescribed sleep medication or professional care for persistent insomnia. A warm cup before bedtime may support a relaxing routine, but its effect varies between people. Regular sleep difficulties should be discussed with a healthcare professional.",
  "question": "Can chamomile replace sleeping pills?"
},
  {
    "id": 15035,
    "category": "Treatment",
    "text": "Immediately after being bitten, clean the area gently with soap and water to remove residual mosquito saliva and lessen the risk of localized infection. Apply an ice pack wrapped in a cloth or a cold compress to the bite for 10 minutes at a time to reduce swelling, inflammation, and localized itching.",
    "question": "What is the immediate first aid for a mosquito bite?"
  },
  {
    "id": 15036,
    "category": "Treatment",
    "text": "To relieve itching from a mosquito bite, apply an over-the-counter 1% hydrocortisone cream, calamine lotion, or a paste made of baking soda and water (1 tablespoon baking soda mixed with enough water to form a paste). Oral antihistamines containing cetirizine, loratadine, or diphenhydramine can also help reduce moderate to severe itching.",
    "question": "How to treat a mosquito bite itch?"
  },
  {
    "id": 15037,
    "category": "Treatment",
    "text": "Natural remedies to soothe mosquito bite symptoms include applying pure aloe vera gel, cold witch hazel on a cotton pad, crushed fresh basil leaves, or diluted tea tree oil (mixed with a carrier oil like coconut oil). Honey can also be dabbed onto the bite to act as a natural anti-inflammatory and anti-microbial agent.",
    "question": "What are natural remedies for mosquito bites?"
  },
  {
    "id": 15038,
    "category": "Treatment",
    "text": "Avoid scratching mosquito bites, as scratching breaks the skin barrier and introduces bacteria, which can lead to secondary bacterial infections like cellulitis or impetigo. Keep the bite clean, cover it with a sterile bandage if you cannot resist scratching, and trim fingernails short.",
    "question": "Why should you avoid scratching mosquito bites and how to prevent it?"
  },
  {
    "id": 15039,
    "category": "Treatment",
    "text": "Seek immediate medical attention if you experience signs of a severe allergic reaction (anaphylaxis), such as difficulty breathing, swelling of the throat or mouth, hives spreading across the body, or dizziness. You should also consult a doctor if the bite shows signs of infection (increased redness, heat, pus, swelling, or red streaks) or if you develop systemic symptoms like fever, joint pain, or persistent headache several days after being bitten.",
    "question": "When should you see a doctor for a mosquito bite?"
  },
  {
    "id": 15040,
    "category": "Treatment",
    "text": "For a bee sting, immediately remove the stinger by gently scraping it sideways with a fingernail, credit card, or blunt edge to prevent squeezing more venom into the skin. Wash the site with soap and water, then apply an ice pack wrapped in a cloth for 10 minutes at a time to minimize swelling and pain. Over-the-counter pain relievers and hydrocortisone cream or calamine lotion can help soothe localized pain and itching.",
    "question": "How do you treat a bee sting?"
  },
  {
    "id": 15041,
    "category": "Treatment",
    "text": "Unlike bees, wasps do not leave a stinger behind and can sting multiple times. Wash the sting area with soap and water right away to remove surface venom and prevent infection. Apply a cold pack for 10–15 minutes to reduce pain and inflammation. Applying a 1% hydrocortisone cream, calamine lotion, or an oral antihistamine helps control localized swelling and itching.",
    "question": "How do you treat a wasp sting?"
  },
  {
    "id": 15042,
    "category": "Treatment",
    "text": "Hornet stings carry a higher concentration of venom than typical wasp or bee stings, causing intense pain and potential swelling. Wash the area thoroughly with soap and water, and apply an ice pack wrapped in a towel in 10- to 15-minute intervals. Elevate the affected limb if possible to reduce swelling. Use oral ibuprofen or acetaminophen for pain relief, and take an oral antihistamine or apply topical hydrocortisone cream for itching.",
    "question": "How do you treat a hornet sting?"
  },
  {
    "id": 15043,
    "category": "Treatment",
    "text": "Horseflies bite and slice the skin rather than sting, leading to painful, slow-bleeding wounds prone to infection. Wash the bite site thoroughly with soap and warm water, apply an antiseptic lotion or cream, and cover it with a sterile bandage if needed. Apply a cold compress to relieve sharp pain and swelling. Avoid scratching, as open horsefly wounds easily contract secondary bacterial infections.",
    "question": "How do you treat a horsefly bite?"
  },
  {
    "id": 15044,
    "category": "Treatment",
    "text": "If a honeybee stings you, remove the stinger as quickly as possible—scraping it out horizontally with a card or fingernail is preferred to avoid squeezing the venom sac attached to the stinger. Avoid pinching or pulling with tweezers if possible, as pressing the venom sac injects additional venom into the skin.",
    "question": "How should you properly remove a bee stinger?"
  },
  {
    "id": 15045,
    "category": "Treatment",
    "text": "Insects like paper wasps, yellow jackets, hornets, and bumblebees can sting multiple times because their stingers are smooth and do not detach upon stinging. Honeybees, in contrast, have barbed stingers that get stuck in mammalian skin, causing the stinger and venom sac to detach and leading to the bee's death.",
    "question": "Which stinging insects can sting more than once?"
  },
  {
    "id": 15046,
    "category": "Treatment",
    "text": "A severe allergic reaction (anaphylaxis) requires emergency medical attention (calling emergency services) and immediate administration of an epinephrine auto-injector (EpiPen) if available. Symptoms include hives, swelling of the lips, tongue, or throat, difficulty breathing, wheezing, dizziness, rapid pulse, and loss of consciousness.",
    "question": "What is the emergency treatment for a severe insect sting allergic reaction?"
  },
  {
    "id": 15047,
    "category": "Treatment",
    "text": "Home remedies to ease minor insect stings include applying a paste of baking soda and water to neutralize itching and mild pain, using an ice pack to constrict blood vessels and limit swelling, applying pure aloe vera gel for soothing skin hydration, or dabbing cold witch hazel to act as an astringent.",
    "question": "What are safe home remedies for minor insect stings?"
  },
  {
    "id": 15048,
    "category": "Treatment",
    "text": "Seek medical attention if an insect sting leads to signs of infection (increasing pain, expanding redness, warmth, pus, or red streaks extending from the bite), if swelling continues to spread beyond the joint or limb over 24 to 48 hours, or if you receive dozens of simultaneous stings, which can cause toxic venom accumulation.",
    "question": "When should you see a doctor for an insect sting?"
  },
  {
    "id": 15049,
    "category": "Treatment",
    "text": "For a fire ant sting, immediately brush the ants off your skin manually (rinsing with water alone will not remove them, as they clamp down with their jaws). Wash the area with soap and water. Fire ant stings develop into itchy, fluid-filled pustules within 24 hours; do not pop these blisters, as doing so increases the risk of a secondary bacterial infection. Apply cold compresses, hydrocortisone cream, or calamine lotion to relieve pain and burning.",
    "question": "How do you treat a fire ant sting?"
  },
  {
    "id": 15050,
    "category": "Treatment",
    "text": "Yellow jacket stings often produce intense pain and significant swelling. Wash the sting site thoroughly with soap and water to clear residual venom and bacteria. Apply an ice pack for 10 to 15 minutes to reduce swelling, and elevate the affected arm or leg if possible. Oral antihistamines and topical corticosteroid creams help manage localized itching and inflammation.",
    "question": "How do you treat a yellow jacket sting?"
  },
  {
    "id": 15051,
    "category": "Treatment",
    "text": "For scorpion stings, wash the sting area with mild soap and water, apply a cold compress or ice pack for 10 minutes on and 10 minutes off to reduce pain and slow venom spread, and keep the affected limb immobilized at or below heart level. Seek immediate emergency medical care for any scorpion sting involving severe symptoms, young children, the elderly, or venomous species like the bark scorpion.",
    "question": "How do you treat a scorpion sting?"
  },
  {
    "id": 15052,
    "category": "Treatment",
    "text": "For a non-venomous spider bite, wash the bite site with soap and water, apply a cold compress to limit swelling, keep the area clean, and elevate the bite if located on a limb. Apply an over-the-counter antibiotic ointment and monitor the site for signs of bacterial infection or unusual skin necrosis.",
    "question": "How do you treat a general non-venomous spider bite?"
  },
  {
    "id": 15053,
    "category": "Treatment",
    "text": "A black widow spider bite often causes a faint double-puncture mark followed by severe muscle cramps, abdominal pain, nausea, and sweating. Wash the bite site with soap and water, apply an ice pack to slow venom absorption, elevate the limb if possible, and seek immediate emergency medical evaluation, as antivenom or hospital treatment may be required.",
    "question": "How do you treat a black widow spider bite?"
  },
  {
    "id": 15054,
    "category": "Treatment",
    "text": "A brown recluse spider bite often forms a central blister surrounded by a red ring (a 'bullseye' appearance) that can progress to an open, ulcerative wound. Wash the bite gently with soap and water, apply cold compresses (avoid heat, which accelerates tissue damage), elevate the limb, avoid strenuous physical activity, and consult a doctor immediately for wound monitoring.",
    "question": "How do you treat a brown recluse spider bite?"
  },
  {
    "id": 15055,
    "category": "Treatment",
    "text": "To safely remove an attached tick, use fine-tipped tweezers to grasp the tick as close to the skin's surface as possible. Pull upward with steady, even pressure without twisting or jerking, which can break off mouthparts in the skin. Clean the bite area thoroughly with rubbing alcohol or soap and water, and save the tick in a sealed container for identification if symptoms develop.",
    "question": "How do you properly remove a tick?"
  },
  {
    "id": 15056,
    "category": "Treatment",
    "text": "After removing a tick, clean the bite site with soap and water or rubbing alcohol and apply an antiseptic cream. Monitor the site for 30 days for symptoms of tick-borne illnesses such as Lyme disease, including an expanding red 'bullseye' rash (erythema migrans), fever, chills, fatigue, or muscle and joint aches.",
    "question": "What should you do after removing a tick?"
  },
  {
    "id": 15057,
    "category": "Treatment",
    "text": "Fleas usually bite in clusters around the ankles and lower legs, producing small, intensely itchy red bumps. Wash the bites with soap and water, apply ice or cold compresses to relieve itching, and use 1% hydrocortisone cream or calamine lotion. Avoid scratching to prevent skin tears and bacterial skin infections.",
    "question": "How do you treat flea bites?"
  },
  {
    "id": 15058,
    "category": "Treatment",
    "text": "Bed bug bites appear as small, itchy red spots often arranged in lines or small clusters on exposed skin during sleep. Wash the affected areas with soap and water to reduce infection risk, apply hydrocortisone cream or calamine lotion to relieve itching, and consider an oral antihistamine for persistent discomfort.",
    "question": "How do you treat bed bug bites?"
  },
  {
    "id": 15059,
    "category": "Treatment",
    "text": "Chiggers (mite larvae) attach to thin skin and cause intense itching with small red bumps or hives. Wash the skin vigorously with warm water and soap as soon as possible after outdoor exposure to dislodge remaining mites. Relieve itching by taking cool baths, applying hydrocortisone or calamine lotion, or using anti-itch creams.",
    "question": "How do you treat chigger bites?"
  },
  {
    "id": 15060,
    "category": "Treatment",
    "text": "Deer fly bites leave painful, swollen red bumps that may bleed. Wash the bite site immediately with soap and water to remove bacteria, apply an antiseptic cream, and use an ice pack for 10 to 15 minutes to reduce localized swelling and pain.",
    "question": "How do you treat a deer fly bite?"
  },
  {
    "id": 15061,
    "category": "Treatment",
    "text": "Black fly bites cause painful, red, itching bumps that often swell and bleed slightly. Clean the area with soap and water, apply a cold compress to minimize swelling, and use topical hydrocortisone or an oral antihistamine to manage itching.",
    "question": "How do you treat a black fly bite?"
  },
  {
    "id": 15062,
    "category": "Treatment",
    "text": "Biting midges ('no-see-ums') produce clusters of small, intensely itchy red spots. Wash the skin with soap and water, apply cold compresses to ease the burning sensation, and use calamine lotion or 1% hydrocortisone cream to control itching.",
    "question": "How do you treat biting midge or no-see-um bites?"
  },
  {
    "id": 15063,
    "category": "Treatment",
    "text": "Caterpillar hair stings occur when venomous bristles or hairs break off in the skin. Remove remaining hairs immediately using adhesive tape (pressing it gently over the area and pulling it off). Wash the skin with soap and water, apply a cold pack, and use topical hydrocortisone or oral antihistamines for itching and pain.",
    "question": "How do you treat a sting from a stinging caterpillar?"
  },
  {
    "id": 15064,
    "category": "Treatment",
    "text": "Centipede bites cause sharp pain, redness, and localized swelling. Wash the bite area thoroughly with soap and water, apply a cold compress or ice pack wrapped in a towel for 10-15 minute periods to soothe pain, and take over-the-counter pain relievers such as ibuprofen if needed.",
    "question": "How do you treat a centipede bite?"
  },
  {
    "id": 15065,
    "category": "Treatment",
    "text": "Millipedes do not bite or sting, but many species secrete toxic fluids that cause skin irritation, redness, or chemical burns. Immediately wash the affected skin thoroughly with soap and warm water, and avoid touching your eyes before washing your hands.",
    "question": "How do you treat skin irritation caused by a millipede?"
  },
  {
    "id": 15066,
    "category": "Treatment",
    "text": "Kissing bug (triatomine bug) bites are usually painless initially and appear as swollen, red welts, often near the face or mouth. Wash the bite area thoroughly with soap and water, avoid scratching to prevent rubbing insect feces into the skin break, and apply an anti-itch lotion.",
    "question": "How do you treat a kissing bug bite?"
  },
  {
    "id": 15067,
    "category": "Treatment",
    "text": "Head lice infestations cause persistent scalp itching and visible tiny nits (eggs) attached to hair shafts. Treat by applying an over-the-counter pediculicide (lice treatment shampoo containing permethrin or pyrethrins) according to package directions, then meticulously comb out dead lice and nits using a fine-toothed nit comb.",
    "question": "How do you treat head lice?"
  },
  {
    "id": 15068,
    "category": "Treatment",
    "text": "Scabies is caused by microscopic mites burrowing into the skin, producing intense itching and pimple-like rash burrows. Scabies requires a prescription topical medication, typically 5% permethrin cream, applied from the neck down over the entire body and washed off after 8 to 14 hours.",
    "question": "How do you treat scabies?"
  },
  {
    "id": 15069,
    "category": "Treatment",
    "text": "To minimize localized swelling from an insect sting on an arm or leg, elevate the affected limb above the level of your heart whenever resting. Combine elevation with intermittent cold pack applications for 10 to 15 minutes every hour.",
    "question": "How does elevating a stung limb help during treatment?"
  },
  {
    "id": 15070,
    "category": "Treatment",
    "text": "Applying heat directly to a fresh insect sting or spider bite can increase localized blood flow, worsening inflammation, swelling, and venom dispersion. Ice or cold compresses should be used instead to constrict blood vessels and numb pain.",
    "question": "Why should you avoid applying heat to a fresh insect sting?"
  },
  {
    "id": 15071,
    "category": "Treatment",
    "text": "Commercial sting relief swabs or sprays often contain topical anesthetics (like benzocaine or lidocaine) or antihistamines, which temporarily numb the skin surface and suppress local nerve signals that transmit pain and itching.",
    "question": "How do commercial insect sting relief sprays work?"
  },
  {
    "id": 15072,
    "category": "Treatment",
    "text": "An ice pack reduces sting swelling and pain by causing local vasoconstriction (narrowing of blood vessels), which decreases localized blood flow, limits fluid accumulation in surrounding tissue, and slows down nerve pain signaling.",
    "question": "How does an ice pack work to treat an insect sting?"
  },
  {
    "id": 15073,
    "category": "Treatment",
    "text": "Baking soda (sodium bicarbonate) mixed with water forms an alkaline paste that helps neutralize acidic components in certain insect venoms and calms localized skin irritation and itching.",
    "question": "Why is baking soda paste used on insect stings?"
  },
  {
    "id": 15074,
    "category": "Treatment",
    "text": "Witch hazel contains natural tannins that act as an astringent, helping to constrict body tissues, reduce skin inflammation, and dry up weeping skin irritations caused by bug bites.",
    "question": "How does witch hazel aid in insect bite treatment?"
  },
  {
    "id": 15075,
    "category": "Treatment",
    "text": "Hydrocortisone cream is a mild topical corticosteroid that reduces skin inflammation, redness, and itching by suppressing local immune responses at the site of an insect bite.",
    "question": "What role does hydrocortisone cream play in bite treatment?"
  },
  {
    "id": 15076,
    "category": "Treatment",
    "text": "Calamine lotion contains zinc oxide and ferric oxide, which exert a cooling and soothing effect on the skin while drying up fluid weeping from irritated bites or scratched skin.",
    "question": "How does calamine lotion relieve insect bite symptoms?"
  },
  {
    "id": 15077,
    "category": "Treatment",
    "text": "Oral antihistamines block histamine receptors in the body, preventing histamine released by immune cells from causing itching, hives, tissue redness, and swelling following a sting or bite.",
    "question": "How do oral antihistamines help with insect stings?"
  },
  {
    "id": 15078,
    "category": "Treatment",
    "text": "Epinephrine auto-injectors (EpiPens) treat severe allergic reactions (anaphylaxis) by rapidly constricting blood vessels to raise falling blood pressure, relaxing airway smooth muscles to restore breathing, and reducing swelling.",
    "question": "How does epinephrine work during an allergic emergency from a sting?"
  },
  {
    "id": 15079,
    "category": "Treatment",
    "text": "An insect sting in or around the mouth or throat can cause localized swelling that obstructs the airway and impairs breathing; this requires immediate emergency medical evaluation even if no systemic allergy exists.",
    "question": "Why is a sting inside the mouth or throat dangerous?"
  },
  {
    "id": 15080,
    "category": "Treatment",
    "text": "Secondary skin infections from insect bites occur when scratching damages the epidermal barrier, allowing environmental or skin bacteria (like Staphylococcus or Streptococcus) to enter and multiply.",
    "question": "What causes secondary bacterial infections after insect bites?"
  },
  {
    "id": 15081,
    "category": "Treatment",
    "text": "Signs of an infected insect bite include worsening pain, expanding redness beyond the bite site, skin that feels warm or hot to the touch, visible pus or yellow discharge, swelling that increases after two days, or red streaks spreading outward.",
    "question": "What are the signs that an insect bite has become infected?"
  },
  {
    "id": 15082,
    "category": "Treatment",
    "text": "Cellulitis is a deep bacterial skin infection that can develop after scratching an insect bite. It presents as spreading redness, swelling, warmth, tenderness, and sometimes systemic fever, requiring prescription oral or intravenous antibiotics.",
    "question": "What is cellulitis in relation to insect bites?"
  },
  {
    "id": 15083,
    "category": "Treatment",
    "text": "Large local reactions to insect stings involve extensive swelling spreading over 10 cm or across an entire joint, peaking within 24 to 48 hours. They are managed with ice, elevation, oral antihistamines, and sometimes oral corticosteroids prescribed by a physician.",
    "question": "How is a large local reaction to a sting treated?"
  },
  {
    "id": 15084,
    "category": "Treatment",
    "text": "Meat tenderizer containing the enzyme papain is a traditional home remedy used to break down protein toxins in sting venom, though it should be used cautiously as it can cause skin irritation in sensitive individuals.",
    "question": "Why is meat tenderizer sometimes suggested for insect stings?"
  },
  {
    "id": 15085,
    "category": "Treatment",
    "text": "Honey has anti-inflammatory and natural antibacterial properties that can help soothe skin irritation and prevent infection when applied sparingly to a clean insect bite.",
    "question": "How can honey be used to treat an insect bite?"
  },
  {
    "id": 15086,
    "category": "Treatment",
    "text": "Colloidal oatmeal added to a lukewarm bath coats the skin and reduces widespread itching and skin inflammation caused by multiple bug bites or chiggers.",
    "question": "How does an oatmeal bath help treat widespread bug bites?"
  },
  {
    "id": 15087,
    "category": "Treatment",
    "text": "An essential oil such as tea tree oil should always be diluted with a carrier oil (like coconut or jojoba oil) before applying to a bug bite to prevent chemical skin burns or contact dermatitis.",
    "question": "How should essential oils be applied to bug bites safely?"
  },
  {
    "id": 15088,
    "category": "Treatment",
    "text": "Applying rubbing alcohol to a fresh mosquito or insect bite cools the skin through rapid evaporation and neutralizes surface bacteria, but excessive use can cause dry skin and irritation.",
    "question": "What does rubbing alcohol do when applied to a fresh insect bite?"
  },
  {
    "id": 15089,
    "category": "Treatment",
    "text": "Venom immunotherapy (allergy shots) is a medical treatment that desensitizes individuals with severe sting allergies by administering gradually increasing doses of insect venom over several years.",
    "question": "What long-term treatment exists for people severely allergic to insect stings?"
  },
  {
    "id": 15090,
    "category": "Treatment",
    "text": "Blisters caused by insect bites or fire ant stings should be left intact because the skin overlying the fluid acts as a sterile natural barrier against bacterial entry.",
    "question": "Should you pop blisters formed by insect stings or bites?"
  },
  {
    "id": 15091,
    "category": "Treatment",
    "text": "Applying a simple adhesive bandage over an itchy insect bite acts as a physical barrier that prevents involuntary scratching, particularly during sleep.",
    "question": "How does covering an insect bite with a bandage help?"
  },
  {
    "id": 15092,
    "category": "Treatment",
    "text": "Over-the-counter pain relievers such as ibuprofen or acetaminophen help reduce localized inflammatory pain and body aches resulting from multiple stings or bites.",
    "question": "Which pain relievers are recommended for insect sting pain?"
  },
  {
    "id": 15093,
    "category": "Treatment",
    "text": "Applying vinegar (dilute acetic acid) to wasp stings is a traditional remedy aimed at neutralizing alkaline venom components, helping ease burning sensations on the skin.",
    "question": "Why is vinegar sometimes applied to wasp stings?"
  },
  {
    "id": 15094,
    "category": "Treatment",
    "text": "Applying petroleum jelly (Vaseline) to a clean bite site keeps the skin moisturized, promotes protective barrier repair, and prevents scabs from becoming dry and itchy.",
    "question": "How does petroleum jelly help in healing insect bites?"
  },
  {
    "id": 15095,
    "category": "Treatment",
    "text": "To treat insect stings on small children, wash the area with soap and water, apply an ice pack wrapped in a cloth, trim the child's fingernails short to prevent skin damage from scratching, and use age-appropriate antihistamines if recommended by a pediatrician.",
    "question": "How do you safely treat insect stings on young children?"
  },
  {
    "id": 15096,
    "category": "Treatment",
    "text": "When stung by a marine stinger like a jellyfish, rinse the area with vinegar (for box jellyfish) or seawater (avoid fresh water, which triggers nematocyst discharge), remove tentacles with tweezers, and immerse the area in hot water (45°C/113°F) for 20 minutes.",
    "question": "How do you treat a jellyfish sting?"
  },
  {
    "id": 15097,
    "category": "Treatment",
    "text": "Stings from stingrays require immediate immersion of the affected limb in hot water (as hot as tolerable without burning, around 45°C/113°F) for 30 to 90 minutes to neutralize heat-labile protein toxins and relieve severe pain.",
    "question": "How do you treat a stingray sting?"
  },
  {
    "id": 15098,
    "category": "Treatment",
    "text": "If a tick mouthpart breaks off and remains lodged in the skin during removal, clean the area and leave it alone; the skin will usually slough it out naturally over time. Forcing it out with needles can cause skin trauma and introduce infection.",
    "question": "What should you do if a tick's mouthparts remain stuck in the skin?"
  },
  {
    "id": 15162,
    "category": "Treatment",
    "text": "Cancer is a group of diseases in which abnormal cells grow uncontrollably and may invade nearby tissues or spread to other parts of the body. There is no single home test that can diagnose every type of cancer. A person can monitor symptoms and notice unusual changes, but diagnosis usually requires medical assessment and sometimes imaging, laboratory tests, or a biopsy. Finding a suspicious symptom does not mean that someone has cancer.",
    "question": "How can I check myself for cancer at home?"
  },
  {
    "id": 15163,
    "category": "Treatment",
    "text": "Common warning signs that deserve medical attention include an unexplained lump, unusual bleeding, persistent changes in bowel or bladder habits, an unexplained weight loss, a changing mole, or a sore that does not heal. Persistent cough, difficulty swallowing, and ongoing unexplained pain may also need assessment. These symptoms can have many causes other than cancer. Seek medical advice if a symptom is unexplained, persists, worsens, or is unusual for you.",
    "question": "What are the general warning signs of cancer?"
  },
  {
    "id": 15164,
    "category": "Treatment",
    "text": "Cancer cannot be reliably identified by symptoms alone because early cancers may cause no noticeable changes. Many warning signs overlap with infections, hormonal changes, inflammation, and other common illnesses. A clinician assesses the person's history, symptoms, examination findings, and risk factors to decide which tests are appropriate. A biopsy is often needed to confirm many cancers.",
    "question": "Can I tell whether I have cancer from symptoms alone?"
  },
  {
    "id": 15165,
    "category": "Treatment",
    "text": "Unexplained weight loss means losing weight without deliberately changing food intake or physical activity. It can result from many conditions, including thyroid disorders, digestive problems, chronic infections, and cancer. Noticeable unintentional weight loss, particularly when it continues, should be discussed with a healthcare professional. Record your weight over time and mention any associated symptoms.",
    "question": "Can unexplained weight loss be a sign of cancer?"
  },
  {
    "id": 15166,
    "category": "Treatment",
    "text": "Persistent fatigue can occur with cancer, but it is also common with anemia, poor sleep, stress, infections, and many other conditions. Cancer-related fatigue may not improve with ordinary rest and can interfere with daily activities. Fatigue alone is not a reliable way to identify cancer. Seek medical advice if it is unexplained, lasts for weeks, worsens, or occurs with other concerning symptoms.",
    "question": "Can constant tiredness be a sign of cancer?"
  },
  {
    "id": 15167,
    "category": "Treatment",
    "text": "A new lump or swelling can occur for many reasons, including cysts, infections, and benign growths. A lump that grows, feels unusually hard, remains in place, or persists should be examined by a healthcare professional. Texture and movement cannot reliably determine whether a lump is cancerous. Do not squeeze it or attempt to remove it at home.",
    "question": "How do I check whether a lump could be cancer?"
  },
  {
    "id": 15168,
    "category": "Treatment",
    "text": "A home skin check can help you notice new or changing moles and unusual skin spots. Look for asymmetry, irregular borders, multiple colors, changes in size, or a spot that looks different from your other moles. A melanoma can also be small, so diameter alone cannot determine whether a spot is dangerous. Arrange a professional skin examination for a changing, bleeding, itching, or suspicious lesion.",
    "question": "How can I check my skin for signs of cancer?"
  },
  {
    "id": 15169,
    "category": "Treatment",
    "text": "The ABCDE guide can help identify moles that need professional assessment: Asymmetry, irregular Border, varied Color, increasing Diameter, and Evolution or change. Not every melanoma displays all these features, and some are smaller than a pencil eraser. Take clear photographs with dates to help track changes, but do not use photographs to rule out cancer. A suspicious lesion needs assessment by a qualified clinician.",
    "question": "What is the ABCDE rule for checking moles?"
  },
  {
    "id": 15170,
    "category": "Treatment",
    "text": "Melanoma is a serious type of skin cancer that can develop in an existing mole or appear as a new spot. Warning signs include a changing shape, irregular edges, several colors, growth, bleeding, or a spot that looks different from surrounding moles. Some melanomas do not look like typical moles. A clinician should examine a suspicious spot, and a biopsy may be needed for diagnosis.",
    "question": "How can I recognize possible melanoma at home?"
  },
  {
    "id": 15171,
    "category": "Treatment",
    "text": "Basal cell carcinoma may appear as a pearly bump, a persistent sore, a pink patch, or a skin area that repeatedly crusts or bleeds. It often develops on sun-exposed areas such as the face, ears, neck, and hands. Its appearance can resemble harmless skin conditions, so appearance alone cannot confirm the diagnosis. Have a persistent or suspicious skin lesion examined.",
    "question": "What does basal cell skin cancer look like?"
  },
  {
    "id": 15172,
    "category": "Treatment",
    "text": "Squamous cell skin cancer can appear as a firm red bump, a rough scaly patch, or a sore that does not heal. It may crust, bleed, or become tender, especially on sun-exposed skin. Similar changes can occur with benign skin conditions. A persistent, growing, or bleeding lesion should be assessed by a healthcare professional.",
    "question": "What does squamous cell skin cancer look like?"
  },
  {
    "id": 15173,
    "category": "Treatment",
    "text": "A breast self-awareness check involves noticing the usual appearance and feel of your breasts, including the chest area and armpits. Warning signs include a new lump, skin dimpling, a newly inverted nipple, unusual nipple discharge, or a persistent change in shape. Breast pain alone is common and usually has non-cancerous causes, but persistent or unusual symptoms should be assessed. Self-checking cannot replace recommended screening or diagnose breast cancer.",
    "question": "How can I check my breasts for possible cancer?"
  },
  {
    "id": 15174,
    "category": "Treatment",
    "text": "A breast lump may be soft or firm, movable or fixed, and may or may not be painful. These features cannot reliably distinguish cancer from a cyst or another benign condition. Arrange a clinical assessment for any new breast lump or persistent change, even if it does not hurt. Depending on age and findings, evaluation may include ultrasound, mammography, or a biopsy.",
    "question": "How do I know if a breast lump is cancerous?"
  },
  {
    "id": 15175,
    "category": "Treatment",
    "text": "Breast cancer can sometimes cause skin dimpling, a change in breast shape, nipple inversion, or unusual discharge, including bloody discharge. These changes can also have non-cancerous causes. A new or persistent change should be assessed rather than watched indefinitely. Rapidly developing redness, warmth, swelling, or fever also warrants prompt medical assessment because infection is another possibility.",
    "question": "What breast changes can be warning signs of cancer?"
  },
  {
    "id": 15176,
    "category": "Treatment",
    "text": "Testicular cancer may present as a painless lump, enlargement, firmness, or a change in the feel of one testicle. Some people experience a heavy feeling in the scrotum or a dull ache in the lower abdomen or groin. Check gently for changes rather than squeezing or repeatedly pressing the testicle. Arrange a prompt medical assessment for a new lump or persistent change; sudden severe testicular pain is an emergency.",
    "question": "How can I check my testicles for possible cancer?"
  },
  {
    "id": 15177,
    "category": "Treatment",
    "text": "Prostate cancer often causes no symptoms in its early stages. Urinary difficulties, a weak stream, or frequent urination are common with benign prostate enlargement and do not prove cancer. Blood in the urine or semen and persistent urinary changes need medical assessment. Prostate cancer risk assessment may include a discussion of age and family history and a prostate-specific antigen blood test, but the test has limitations.",
    "question": "How can I check for prostate cancer at home?"
  },
  {
    "id": 15178,
    "category": "Treatment",
    "text": "There is no reliable home examination that can rule out prostate cancer. A PSA blood test measures prostate-specific antigen, but an elevated result can occur with benign enlargement, inflammation, or infection as well as cancer. A clinician interprets the result alongside age, risk factors, symptoms, and other findings. Discuss the benefits and limitations of screening before deciding whether to have a PSA test.",
    "question": "Can a home PSA test diagnose prostate cancer?"
  },
  {
    "id": 15179,
    "category": "Treatment",
    "text": "Cervical cancer may cause no symptoms in its early stages. Possible warning signs include bleeding after sex, bleeding between periods, bleeding after menopause, or persistent unusual vaginal discharge. These symptoms can also result from infections, hormonal changes, or other conditions. Cervical screening with an HPV test or Pap test, according to local guidance, can detect important changes before cancer develops.",
    "question": "How can I recognize possible cervical cancer symptoms?"
  },
  {
    "id": 15180,
    "category": "Treatment",
    "text": "A Pap test looks for abnormal cells from the cervix, while an HPV test looks for high-risk types of human papillomavirus associated with cervical cancer. These are screening tests, not home self-diagnosis methods. Depending on the result, follow-up may include repeat testing, colposcopy, or biopsy. Follow the screening schedule recommended for your age and country, even if you feel healthy.",
    "question": "Can I test myself for cervical cancer at home?"
  },
  {
    "id": 15181,
    "category": "Treatment",
    "text": "Ovarian cancer can cause persistent bloating, increasing abdominal size, pelvic or abdominal pain, feeling full quickly, or needing to urinate more often. These symptoms are common in many non-cancerous conditions, but new symptoms that occur frequently or persist deserve assessment. There is no proven routine home test that reliably screens average-risk people for ovarian cancer. A clinician may recommend examination, imaging, or blood tests depending on the situation.",
    "question": "How can I recognize possible ovarian cancer at home?"
  },
  {
    "id": 15182,
    "category": "Treatment",
    "text": "There is no reliable home test that can rule out ovarian cancer. CA-125 is a blood marker that can be elevated in ovarian cancer but also in benign conditions, and some ovarian cancers do not raise it. Ultrasound and other investigations may help assess a suspected problem, but no single result always provides a definitive answer. Persistent abdominal or pelvic symptoms should be evaluated by a healthcare professional.",
    "question": "Can a CA-125 home test detect ovarian cancer?"
  },
  {
    "id": 15183,
    "category": "Treatment",
    "text": "Colorectal cancer may cause blood in the stool, persistent changes in bowel habits, abdominal discomfort, unexplained weight loss, or iron-deficiency anemia. These symptoms can also occur with hemorrhoids, infections, and other digestive conditions. A stool appearance check cannot reliably confirm or exclude cancer. Seek medical advice for persistent changes or rectal bleeding, and follow recommended colorectal screening guidance.",
    "question": "How can I recognize possible colorectal cancer at home?"
  },
  {
    "id": 15184,
    "category": "Treatment",
    "text": "A fecal immunochemical test, or FIT, checks a stool sample for small amounts of human blood that may not be visible. It is used in some colorectal cancer screening programs and can often be completed at home using a supplied kit. A positive result does not mean cancer is definitely present, but it requires follow-up, usually with colonoscopy. A negative result does not rule out cancer when symptoms are present.",
    "question": "Can a home stool test detect colorectal cancer?"
  },
  {
    "id": 15185,
    "category": "Treatment",
    "text": "Blood in the stool can appear bright red, dark red, or black and tar-like, depending partly on where bleeding occurs. Possible causes include hemorrhoids, ulcers, inflammation, and colorectal cancer. You cannot determine the cause from color alone, so unexplained or recurring bleeding needs medical assessment. Heavy bleeding, black tarry stool with weakness, or bleeding with faintness requires urgent medical care.",
    "question": "Does blood in the stool mean colon cancer?"
  },
  {
    "id": 15186,
    "category": "Treatment",
    "text": "Lung cancer may cause a persistent or worsening cough, coughing up blood, shortness of breath, chest pain, or repeated chest infections. These symptoms can have many other causes, but coughing up blood should be assessed promptly. Early lung cancer may cause no noticeable symptoms. Home oxygen meters, breathing tests, and symptom checklists cannot rule out lung cancer.",
    "question": "How can I recognize possible lung cancer at home?"
  },
  {
    "id": 15187,
    "category": "Treatment",
    "text": "There is no reliable home test that can diagnose lung cancer. Medical evaluation may involve imaging such as a CT scan and, when indicated, testing a tissue sample. Low-dose CT screening is recommended for certain people at high risk, depending on age, smoking history, and local guidelines. A chest X-ray or a normal home breathing measurement cannot reliably exclude lung cancer.",
    "question": "Can I test myself for lung cancer without a doctor?"
  },
  {
    "id": 15188,
    "category": "Treatment",
    "text": "Persistent hoarseness, difficulty swallowing, a neck lump, or a sore in the mouth that does not heal can sometimes be associated with cancers of the mouth, throat, or voice box. Tobacco use, alcohol use, and some HPV infections increase the risk of certain head and neck cancers. These symptoms are often caused by non-cancerous conditions, but symptoms lasting more than a few weeks deserve assessment. A clinician may refer you to an ear, nose, and throat specialist.",
    "question": "How can I recognize possible throat or mouth cancer?"
  },
  {
    "id": 15189,
    "category": "Treatment",
    "text": "A home mouth check can help you notice a persistent ulcer, red or white patch, unexplained lump, or unusual thickening. Use good lighting and look at the lips, gums, tongue, inner cheeks, and roof and floor of the mouth. Such changes can result from infection or irritation, so appearance alone cannot establish cancer. Arrange a dental or medical assessment for a lesion that does not heal within about two weeks.",
    "question": "How can I check my mouth for signs of cancer?"
  },
  {
    "id": 15190,
    "category": "Treatment",
    "text": "Stomach cancer may cause persistent indigestion, upper abdominal discomfort, feeling full quickly, nausea, loss of appetite, or unexplained weight loss. These symptoms are common and are much more often caused by conditions other than cancer. Warning signs such as vomiting blood, black tarry stools, or difficulty swallowing need urgent assessment. Persistent or worsening digestive symptoms should be discussed with a clinician, especially when several warning signs occur together.",
    "question": "How can I recognize possible stomach cancer at home?"
  },
  {
    "id": 15191,
    "category": "Treatment",
    "text": "Pancreatic cancer may cause persistent upper abdominal or back pain, unexplained weight loss, loss of appetite, or jaundice, which is yellowing of the skin or eyes. Dark urine and pale stools can accompany jaundice. These symptoms can have other causes, but new jaundice requires urgent medical assessment. There is no reliable home test that can rule out pancreatic cancer.",
    "question": "How can I recognize possible pancreatic cancer at home?"
  },
  {
    "id": 15192,
    "category": "Treatment",
    "text": "Yellowing of the skin or whites of the eyes can indicate jaundice and may result from liver, gallbladder, bile duct, blood, or other conditions. Some causes are serious, including a blocked bile duct or liver disease, and jaundice can occasionally be associated with cancer. Check in natural light if you suspect yellowing, but do not rely on photographs or skin color alone. New jaundice requires urgent medical assessment.",
    "question": "Can yellow eyes be a sign of cancer?"
  },
  {
    "id": 15193,
    "category": "Treatment",
    "text": "Liver cancer may cause abdominal swelling or discomfort, loss of appetite, unexplained weight loss, fatigue, or jaundice, but early disease may produce no clear symptoms. Chronic hepatitis and cirrhosis increase the risk of liver cancer. People at elevated risk may need regular surveillance arranged by a healthcare professional. Home palpation of the abdomen or observation of symptoms cannot reliably diagnose or exclude liver cancer.",
    "question": "How can I recognize possible liver cancer at home?"
  },
  {
    "id": 15194,
    "category": "Treatment",
    "text": "Kidney cancer may cause blood in the urine, persistent pain in the side or back, a mass in the abdomen, unexplained fever, or weight loss. Many people have no symptoms in the early stages, and blood in the urine has several possible causes. A home urine dipstick cannot determine whether cancer is present. Visible blood in the urine should be medically assessed even if it occurs only once.",
    "question": "How can I recognize possible kidney cancer at home?"
  },
  {
    "id": 15195,
    "category": "Treatment",
    "text": "Bladder cancer may cause blood in the urine, sometimes without pain. Other possible symptoms include frequent urination, urgency, or discomfort when urinating, although infections and other conditions can cause the same symptoms. A urine test may detect blood but cannot establish the cause. Visible blood in the urine needs prompt medical evaluation.",
    "question": "How can I recognize possible bladder cancer at home?"
  },
  {
    "id": 15196,
    "category": "Treatment",
    "text": "Brain tumors can cause new or worsening headaches, seizures, changes in vision, weakness, balance problems, or changes in behavior. Most headaches are not caused by brain cancer, and symptoms depend on a tumor's location and growth. A symptom checklist or home neurological test cannot rule out a brain tumor. A first seizure, sudden weakness, or sudden severe headache requires emergency assessment.",
    "question": "How can I recognize possible brain cancer at home?"
  },
  {
    "id": 15197,
    "category": "Treatment",
    "text": "A headache is rarely a reliable sign of cancer on its own. Seek medical advice for a new, persistent, progressive headache, especially if it comes with vomiting, vision changes, seizures, personality changes, or weakness. A sudden headache that reaches maximum intensity rapidly is an emergency. Do not use the absence of these symptoms to rule out a brain tumor.",
    "question": "When can a headache be a warning sign of a brain tumor?"
  },
  {
    "id": 15198,
    "category": "Treatment",
    "text": "Lymphoma is a cancer of lymphocytes, a type of white blood cell. Possible signs include persistently enlarged lymph nodes, unexplained fever, drenching night sweats, and unexplained weight loss. Enlarged lymph nodes are commonly caused by infections and are not automatically cancerous. A persistent or enlarging lump, especially with other symptoms, should be assessed by a clinician.",
    "question": "How can I recognize possible lymphoma at home?"
  },
  {
    "id": 15199,
    "category": "Treatment",
    "text": "Leukemia affects blood-forming tissues and may cause fatigue, frequent infections, easy bruising, unusual bleeding, or pale skin. Some people also develop persistent fever, bone discomfort, or swollen lymph nodes. These symptoms have many possible causes and cannot confirm leukemia. A clinician may order a complete blood count and further tests if leukemia is suspected.",
    "question": "How can I recognize possible leukemia at home?"
  },
  {
    "id": 15200,
    "category": "Treatment",
    "text": "Unexplained bruising or bleeding can result from medication effects, injuries, platelet problems, liver disease, or blood cancers. Notice whether bruises occur without a clear injury or whether nosebleeds, gum bleeding, or tiny red-purple skin spots are new or recurrent. These findings do not prove cancer but deserve medical assessment when unexplained. Seek urgent care for severe bleeding, faintness, or bleeding that will not stop.",
    "question": "Can unexplained bruises be a sign of cancer?"
  },
  {
    "id": 15201,
    "category": "Treatment",
    "text": "Bone cancer is uncommon, and bone pain is much more often caused by injury, arthritis, or other non-cancerous conditions. Possible warning signs include persistent pain that worsens over time, swelling, or a lump near a bone. Pain that occurs at night can have many causes and does not diagnose cancer by itself. Persistent unexplained bone pain or swelling should be medically assessed.",
    "question": "How can I recognize possible bone cancer at home?"
  },
  {
    "id": 15202,
    "category": "Treatment",
    "text": "Thyroid cancer may present as a lump or swelling at the front of the neck, persistent hoarseness, difficulty swallowing, or enlarged neck lymph nodes. Many thyroid nodules are benign and do not cause symptoms. Feeling the neck cannot reliably distinguish a benign nodule from cancer. A clinician may arrange a thyroid ultrasound and, when appropriate, a needle biopsy.",
    "question": "How can I check my neck for possible thyroid cancer?"
  },
  {
    "id": 15203,
    "category": "Treatment",
    "text": "Penile cancer is rare and may cause a persistent sore, growth, thickened skin, unusual discharge, bleeding, or a change in skin color on the penis. Similar symptoms can occur with infections and inflammatory skin conditions. Gently noticing changes during normal hygiene may help identify a problem early. A persistent or suspicious change should be examined by a healthcare professional.",
    "question": "How can I recognize possible penile cancer at home?"
  },
  {
    "id": 15204,
    "category": "Treatment",
    "text": "Vulvar cancer may cause persistent itching, pain, skin color changes, thickened areas, lumps, or sores around the vulva. Many vulvar symptoms are caused by infections, irritation, or skin conditions, but symptoms that persist need assessment. Use a mirror if helpful to notice changes, without inserting tools or applying harsh products. A healthcare professional can examine the area and arrange a biopsy if needed.",
    "question": "How can I recognize possible vulvar cancer at home?"
  },
  {
    "id": 15205,
    "category": "Treatment",
    "text": "Endometrial cancer, which begins in the lining of the uterus, often causes abnormal vaginal bleeding. Bleeding after menopause is especially important to assess, even if it happens only once. Bleeding between periods or unusually heavy bleeding also has many possible causes but may need investigation. There is no reliable home test that can rule out endometrial cancer.",
    "question": "How can I recognize possible uterine cancer at home?"
  },
  {
    "id": 15206,
    "category": "Treatment",
    "text": "A home blood test cannot reliably screen for all cancers, and commercially advertised multi-cancer tests have limitations that depend on the product. Routine blood tests can reveal clues, such as anemia or abnormal organ function, but these findings are not specific to cancer. Normal blood results do not exclude every cancer. Testing should be selected by a clinician according to symptoms, risk factors, and established screening recommendations.",
    "question": "Can a home blood test detect all types of cancer?"
  },
  {
    "id": 15207,
    "category": "Treatment",
    "text": "Tumor markers are substances measured in blood or other samples that may be elevated in certain cancers. They can also be elevated in non-cancerous conditions, and some cancers do not produce high levels of the marker. Most tumor markers are not suitable as general screening tests for healthy people. Clinicians use particular markers in specific situations, such as helping monitor a known cancer or guide further evaluation.",
    "question": "Can tumor markers tell me if I have cancer?"
  },
  {
    "id": 15208,
    "category": "Treatment",
    "text": "Cancer screening looks for certain cancers or precancerous changes in people who may have no symptoms. Recommended tests depend on factors such as age, sex-related anatomy, personal history, family history, and national guidelines. Common examples include cervical screening, breast screening, and colorectal screening, while low-dose CT may be offered to some people at high risk of lung cancer. Screening does not detect every cancer and is different from investigating symptoms.",
    "question": "Which cancer screening tests should adults consider?"
  },
  {
    "id": 15209,
    "category": "Treatment",
    "text": "A family history of certain cancers can increase a person's risk, especially when several close relatives were affected or diagnoses occurred at unusually young ages. Inherited genetic variants contribute to some breast, ovarian, colorectal, prostate, and other cancers. Family history does not mean cancer is inevitable, and many cancers occur without a known inherited cause. Share relevant family diagnoses and ages at diagnosis with a healthcare professional to assess whether earlier screening or genetic counseling is appropriate.",
    "question": "How can I tell if I have an inherited risk of cancer?"
  },
  {
    "id": 15210,
    "category": "Treatment",
    "text": "Smoking, heavy alcohol use, ultraviolet radiation, certain infections, and some workplace exposures increase the risk of particular cancers. Risk is also affected by age, genetics, immune function, and chance, so no single factor predicts an individual's outcome with certainty. Avoiding tobacco, protecting skin from excessive ultraviolet radiation, limiting alcohol, maintaining recommended vaccinations, and following screening guidance can reduce some cancer risks. Healthy habits lower risk but cannot guarantee that cancer will never develop.",
    "question": "How can I estimate my personal risk of cancer?"
  },
  {
    "id": 15211,
    "category": "Treatment",
    "text": "Seek emergency care for severe breathing difficulty, heavy uncontrolled bleeding, a first seizure, sudden weakness, or a sudden severe headache. New jaundice, visible blood in the urine, coughing up blood, or a persistent suspicious lump also warrants prompt medical assessment, with urgency depending on severity and associated symptoms. Do not wait for a home test or for symptoms to become severe before seeking help. Early evaluation can identify treatable conditions and help detect some cancers sooner.",
    "question": "When should I seek medical help for possible cancer?"
  },
    {
    "id": 15212,
    "category": "Treatment",
    "text": "A biopsy is a procedure in which a small sample of tissue or cells is collected for examination. A pathologist studies the sample under a microscope to look for cancer and identify its type. Many cancers require a biopsy for confirmation, although the exact diagnostic process varies by cancer. A biopsy must be performed by a qualified healthcare professional.",
    "question": "What is a cancer biopsy?"
  },
  {
    "id": 15213,
    "category": "Treatment",
    "text": "A fine-needle aspiration biopsy uses a thin needle to collect cells or fluid from a lump or other suspicious area. It is commonly used to investigate certain thyroid nodules and enlarged lymph nodes. The sample may show whether abnormal cells are present, but some results require additional testing. A clinician determines whether this technique is suitable for the suspected condition.",
    "question": "What is a fine-needle aspiration test for cancer?"
  },
  {
    "id": 15214,
    "category": "Treatment",
    "text": "A core needle biopsy removes small cylinders of tissue using a hollow needle. It preserves more tissue structure than fine-needle aspiration and can help pathologists identify certain cancers and their characteristics. Imaging may guide the needle to the correct location. The procedure is performed by trained medical staff using appropriate precautions.",
    "question": "What is a core needle biopsy?"
  },
  {
    "id": 15215,
    "category": "Treatment",
    "text": "An excisional biopsy removes an entire suspicious lump or lesion, while an incisional biopsy removes only part of it. The tissue is examined by a pathologist to determine whether cancer is present. The choice depends on the lesion's size, location, and suspected diagnosis. Removing a lump does not automatically mean that all necessary cancer treatment is complete.",
    "question": "What is the difference between an excisional and incisional biopsy?"
  },
  {
    "id": 15216,
    "category": "Treatment",
    "text": "A pathology report describes the findings from tissue or cells examined in a laboratory. It may identify the cancer type, grade, and whether certain biomarkers are present. Some reports also describe whether cancer reaches the edges of a surgically removed sample. A clinician explains how the findings affect diagnosis, staging, and treatment decisions.",
    "question": "What information does a cancer pathology report contain?"
  },
  {
    "id": 15217,
    "category": "Treatment",
    "text": "A mammogram is an X-ray examination of the breasts used to screen for breast cancer or investigate symptoms. It can reveal masses, clusters of calcium deposits, and other changes that may not be felt during a physical examination. An abnormal result does not necessarily mean cancer is present. Additional mammography views, ultrasound, or biopsy may be recommended.",
    "question": "What is a mammogram and what can it detect?"
  },
  {
    "id": 15218,
    "category": "Treatment",
    "text": "A breast ultrasound uses sound waves to create images of breast tissue. It can help distinguish fluid-filled cysts from solid masses and investigate findings from a physical examination or mammogram. Ultrasound cannot reliably identify every breast cancer and is not a universal replacement for mammography. The appropriate tests depend on symptoms, age, breast characteristics, and clinical guidance.",
    "question": "Can an ultrasound detect breast cancer?"
  },
  {
    "id": 15219,
    "category": "Treatment",
    "text": "A cervical HPV test checks for high-risk types of human papillomavirus associated with cervical cancer. A positive result means a relevant HPV type was detected, not that cancer is present. Many HPV infections clear naturally, but persistent high-risk infections can cause precancerous changes. Follow-up depends on the HPV type, screening history, and local clinical guidelines.",
    "question": "What does a positive cervical HPV test mean?"
  },
  {
    "id": 15220,
    "category": "Treatment",
    "text": "A Pap test collects cells from the cervix to look for abnormal changes that may lead to cervical cancer. An abnormal result does not automatically mean cancer; many changes are mild or related to HPV infection. Depending on the result, a clinician may recommend repeat testing, an HPV test, colposcopy, or biopsy. Routine screening is important even when no symptoms are present.",
    "question": "What does an abnormal Pap test result mean?"
  },
  {
    "id": 15221,
    "category": "Treatment",
    "text": "A colonoscopy uses a flexible camera to examine the inside of the large intestine. It can identify suspicious growths, detect inflammation, and allow polyps to be removed for examination. Some polyps can develop into cancer over time, so removing them can help prevent colorectal cancer. Colonoscopy requires preparation and is performed by trained medical professionals.",
    "question": "How does a colonoscopy help detect colorectal cancer?"
  },
  {
    "id": 15222,
    "category": "Treatment",
    "text": "A polyp is a growth projecting from the lining of an organ, such as the colon. Many polyps are benign, but certain types can develop into colorectal cancer over time. Their risk depends on features such as type, size, and number. A removed polyp is usually examined in a laboratory to determine whether follow-up screening is needed.",
    "question": "Does finding a polyp mean I have cancer?"
  },
  {
    "id": 15223,
    "category": "Treatment",
    "text": "A FIT stool test detects small amounts of human blood in a stool sample and is used in some colorectal screening programs. It is usually completed at home using a kit supplied by a screening service or healthcare provider. A positive result needs follow-up, commonly a colonoscopy, because bleeding can have several causes. A negative result does not rule out colorectal cancer in someone who has concerning symptoms.",
    "question": "What should I do if my home stool cancer test is positive?"
  },
  {
    "id": 15224,
    "category": "Treatment",
    "text": "A complete blood count measures red blood cells, white blood cells, platelets, and related values. Abnormal results can provide clues to blood disorders, including some leukemias, but infections, nutritional deficiencies, medicines, and other conditions can produce similar changes. A normal result cannot exclude every blood cancer. Additional blood tests, examination, or bone marrow testing may be needed if leukemia is suspected.",
    "question": "Can a complete blood count detect cancer?"
  },
  {
    "id": 15225,
    "category": "Treatment",
    "text": "A blood film, also called a peripheral blood smear, allows a laboratory specialist to examine the shape and appearance of blood cells under a microscope. It may reveal abnormal cells that suggest a blood disorder, including some leukemias. It cannot diagnose every blood cancer on its own. Results are interpreted alongside blood counts, symptoms, and any additional tests.",
    "question": "What is a blood smear test for cancer?"
  },
  {
    "id": 15226,
    "category": "Treatment",
    "text": "A bone marrow biopsy collects a small sample of marrow, usually from a bone in the back of the hip. It helps investigate certain blood cancers, unexplained abnormal blood counts, and other marrow disorders. The sample is examined for abnormal cells and may undergo specialized laboratory testing. The procedure is performed by trained clinicians with measures to control discomfort.",
    "question": "What is a bone marrow biopsy used to diagnose?"
  },
  {
    "id": 15227,
    "category": "Treatment",
    "text": "A CT scan uses X-rays and computer processing to produce detailed cross-sectional images of the body. It can help locate tumors, assess their size, and investigate whether cancer may have spread. Some scans use contrast material to improve visibility of particular structures. CT findings alone do not always establish a diagnosis, and suspicious areas may need biopsy or other tests.",
    "question": "Can a CT scan detect cancer?"
  },
  {
    "id": 15228,
    "category": "Treatment",
    "text": "An MRI uses a strong magnetic field and radio waves to create detailed images of organs and soft tissues. It can be useful for evaluating the brain, spinal cord, pelvis, liver, and other areas. An MRI may show suspicious abnormalities, but many non-cancerous conditions can produce similar appearances. The results must be interpreted by a qualified radiologist alongside other clinical information.",
    "question": "Can an MRI scan diagnose cancer?"
  },
  {
    "id": 15229,
    "category": "Treatment",
    "text": "An ultrasound scan uses high-frequency sound waves to create images of internal organs and tissues. It can investigate lumps, abdominal organs, the thyroid, and pelvic structures without using ionizing radiation. Some cancers are visible on ultrasound, but others are difficult to detect with this method. An abnormal scan may require CT, MRI, biopsy, or further assessment.",
    "question": "What types of cancer can an ultrasound help investigate?"
  },
  {
    "id": 15230,
    "category": "Treatment",
    "text": "A PET scan uses a small amount of radioactive tracer to show areas of increased metabolic activity. It is often combined with CT and can help assess certain cancers or investigate possible spread. Infection and inflammation can also produce increased activity, while some cancers may not be clearly visible. PET results are interpreted with other tests rather than used alone to confirm cancer.",
    "question": "What is a PET scan used for in cancer diagnosis?"
  },
  {
    "id": 15231,
    "category": "Treatment",
    "text": "A chest X-ray can reveal some lung abnormalities, including large masses, fluid, or other changes. However, it may miss small tumors and is not a reliable test for ruling out lung cancer. People who meet specific high-risk criteria may be offered low-dose CT screening instead. Persistent symptoms need clinical assessment even if an earlier X-ray was normal.",
    "question": "Can a chest X-ray rule out lung cancer?"
  },
  {
    "id": 15232,
    "category": "Treatment",
    "text": "Low-dose CT screening uses a reduced amount of radiation to look for lung cancer in certain people at increased risk. Eligibility commonly depends on age and smoking history, with exact criteria varying by country and program. Screening can find cancers earlier, but it may also reveal harmless nodules that require follow-up. A clinician can help determine whether the expected benefits outweigh the potential harms.",
    "question": "Who should consider low-dose CT screening for lung cancer?"
  },
  {
    "id": 15233,
    "category": "Treatment",
    "text": "A dermatoscope is a magnifying instrument with specialized lighting that helps a clinician examine skin lesions in greater detail. It can reveal structures and pigment patterns that are not easily visible to the naked eye. Dermoscopy can help assess suspicious moles but cannot always determine whether a lesion is cancerous. A biopsy may still be required for confirmation.",
    "question": "What is dermoscopy for skin cancer?"
  },
  {
    "id": 15234,
    "category": "Treatment",
    "text": "A skin biopsy removes a small sample or an entire suspicious skin lesion for laboratory examination. It is commonly used to confirm or exclude skin cancers such as melanoma and other skin tumors. The biopsy technique depends on the lesion's appearance, size, and location. A qualified clinician should decide how the lesion is sampled and whether further treatment is needed.",
    "question": "How do doctors confirm skin cancer?"
  },
  {
    "id": 15235,
    "category": "Treatment",
    "text": "A PSA test measures prostate-specific antigen in the blood. A higher result can occur with prostate cancer, benign prostate enlargement, inflammation, or other factors. A PSA result cannot by itself prove or rule out cancer, and screening decisions involve considering potential benefits and harms. A clinician may recommend repeating the test or arranging further evaluation depending on the result and personal risk.",
    "question": "How should I interpret a PSA blood test result?"
  },
  {
    "id": 15236,
    "category": "Treatment",
    "text": "A digital rectal examination allows a clinician to feel the prostate through the rectal wall for changes in size, shape, or texture. It may identify an abnormality that requires further investigation, but it cannot detect every prostate cancer. It is not a home test and should be performed by a trained healthcare professional. PSA testing and other investigations may be considered depending on individual circumstances.",
    "question": "What is a digital rectal examination for prostate cancer?"
  },
  {
    "id": 15237,
    "category": "Treatment",
    "text": "Colposcopy uses a magnifying instrument to examine the cervix closely after certain abnormal screening results. A clinician may apply solutions that help highlight areas of abnormal tissue and take a biopsy if needed. Colposcopy does not automatically mean that cancer is present; many findings are precancerous or benign. Follow-up depends on the examination and laboratory results.",
    "question": "What happens during a colposcopy?"
  },
  {
    "id": 15238,
    "category": "Treatment",
    "text": "Cystoscopy uses a thin instrument with a camera to examine the inside of the bladder and urethra. It may be recommended when investigating blood in the urine or suspected bladder abnormalities. The clinician can inspect suspicious areas and may collect tissue for a biopsy. The procedure is performed in a medical setting and cannot be replaced by checking urine at home.",
    "question": "What is a cystoscopy used to detect?"
  },
  {
    "id": 15239,
    "category": "Treatment",
    "text": "An endoscopy uses a flexible instrument with a camera to examine the inside of the digestive tract or other accessible passages. Upper endoscopy can investigate the esophagus, stomach, and first part of the small intestine, while other endoscopic procedures examine different areas. A clinician may take tissue samples from suspicious lesions. The procedure and preparation depend on which part of the body is being examined.",
    "question": "How can an endoscopy help diagnose cancer?"
  },
  {
    "id": 15240,
    "category": "Treatment",
    "text": "An ERCP procedure combines endoscopy and X-ray imaging to examine and treat problems in the bile and pancreatic ducts. It is mainly used for selected duct disorders, such as blockages, rather than as a general cancer screening test. In certain situations, clinicians can collect samples or relieve an obstruction during the procedure. Its benefits and risks are assessed individually because complications can occur.",
    "question": "What is ERCP and when is it used in cancer investigations?"
  },
  {
    "id": 15241,
    "category": "Treatment",
    "text": "A lymph node biopsy removes or samples lymph node tissue to investigate unexplained enlargement or suspected cancer. The sample may help identify lymphoma or determine whether another cancer has spread. Enlarged nodes are often caused by infections and do not automatically indicate malignancy. The choice of biopsy method depends on the node's location and the suspected disease.",
    "question": "How do doctors test an enlarged lymph node for cancer?"
  },
  {
    "id": 15242,
    "category": "Treatment",
    "text": "Cancer staging describes how far a cancer has grown or spread in the body. Many solid tumors use stages I through IV, but staging systems differ by cancer type. Stage I often indicates more localized disease, while stage IV generally means distant spread. A stage cannot be determined reliably from symptoms alone and requires the appropriate investigations.",
    "question": "What do cancer stages 1, 2, 3, and 4 mean?"
  },
  {
    "id": 15243,
    "category": "Treatment",
    "text": "Cancer grade describes how abnormal cancer cells look under a microscope and may indicate how aggressively a tumor is likely to behave. Lower-grade cells often look more like normal cells, while higher-grade cells look more abnormal. Grade and stage describe different things: grade concerns cell appearance, while stage concerns the extent of disease. Their exact meanings and grading scales vary between cancer types.",
    "question": "What is the difference between cancer stage and grade?"
  },
  {
    "id": 15244,
    "category": "Treatment",
    "text": "A false-positive screening result suggests a possible problem when further testing finds no cancer. It can lead to additional scans, procedures, worry, and sometimes unnecessary treatment if the uncertainty is not resolved carefully. False positives occur because screening tests are designed to identify people who may need further investigation. A positive result should be followed according to the screening program's guidance rather than assumed to be a cancer diagnosis.",
    "question": "What is a false-positive cancer test?"
  },
  {
    "id": 15245,
    "category": "Treatment",
    "text": "A false-negative result occurs when a test fails to detect a cancer that is actually present. This can happen when a tumor is too small, does not produce the marker being measured, or is difficult for the test to identify. A negative screening result does not override persistent or concerning symptoms. Seek medical assessment if symptoms continue or worsen despite a reassuring test.",
    "question": "Can a cancer test be negative when cancer is present?"
  },
  {
    "id": 15246,
    "category": "Treatment",
    "text": "An incidental finding is an abnormality discovered during a test performed for another reason. It may be harmless, require monitoring, or need further investigation to determine its significance. Many incidental findings are not cancer, but some deserve additional assessment. The next step depends on the location, appearance, size, and the person's medical history.",
    "question": "What does an incidental finding on a scan mean?"
  },
  {
    "id": 15247,
    "category": "Treatment",
    "text": "A tumor marker is a substance that may be produced by cancer cells or by the body in response to a cancer. Examples include PSA, CA-125, and CEA, but each has specific uses and limitations. Levels can also rise because of benign conditions, and normal levels do not exclude cancer. Results must be interpreted in the context of the suspected disease and other investigations.",
    "question": "What are tumor markers and what do they tell doctors?"
  },
  {
    "id": 15248,
    "category": "Treatment",
    "text": "CA-125 is a blood marker used in selected situations involving ovarian cancer, including assessment of a suspected condition and monitoring some diagnosed cases. It can also rise with menstruation, endometriosis, pregnancy, and other non-cancerous conditions. It is not recommended as a general screening test for average-risk people without symptoms because it cannot reliably distinguish cancer from benign causes. A clinician decides whether it is useful alongside examination and imaging.",
    "question": "What does a CA-125 blood test tell you?"
  },
  {
    "id": 15249,
    "category": "Treatment",
    "text": "CEA, or carcinoembryonic antigen, is a marker that may be elevated in some colorectal cancers and other cancers. It can also rise in non-cancerous conditions and in some people who smoke. It is generally more useful for monitoring certain diagnosed cancers than for screening healthy people. A CEA result alone cannot diagnose cancer or reliably rule it out.",
    "question": "What does a CEA blood test mean?"
  },
  {
    "id": 15250,
    "category": "Treatment",
    "text": "Molecular testing examines genetic changes or other biological features in tumor cells. It can help classify certain cancers and identify treatments that are more likely to work. Some tests use tissue from a biopsy, while others can analyze tumor-related DNA circulating in blood in selected circumstances. These tests have specific limitations and do not replace every other part of cancer diagnosis.",
    "question": "What is molecular testing for cancer?"
  },
  {
    "id": 15251,
    "category": "Treatment",
    "text": "A liquid biopsy analyzes material such as tumor-related DNA found in a blood sample. In selected cancers, it can help identify genetic changes, guide treatment, or monitor disease. A negative result may occur even when a tumor is present because it may release very little detectable DNA. Liquid biopsy is not a universal home screening test and is not a replacement for tissue biopsy in every situation.",
    "question": "What is a liquid biopsy for cancer?"
  },
  {
    "id": 15252,
    "category": "Treatment",
    "text": "Genetic testing for inherited cancer risk looks for variants that can increase the chance of developing certain cancers. It is different from testing a tumor to choose treatment. A positive result indicates increased risk for particular conditions, not certainty that cancer will develop. Genetic counseling can help people understand the benefits, limitations, and implications of testing for themselves and relatives.",
    "question": "Can genetic testing predict whether I will get cancer?"
  },
  {
    "id": 15253,
    "category": "Treatment",
    "text": "A second medical opinion is an assessment by another qualified clinician, often to review a diagnosis, pathology report, or treatment plan. It can help clarify uncertainty, confirm the interpretation of complex findings, or identify alternative options. It is reasonable to request copies of relevant reports and imaging for review. Seeking another opinion should not delay urgent treatment when a medical team explains that immediate action is necessary.",
    "question": "Should I get a second opinion after a cancer diagnosis?"
  },
  {
    "id": 15254,
    "category": "Treatment",
    "text": "A screening test is intended to find signs of a disease before symptoms appear in people who may be at risk. A diagnostic test investigates a specific symptom or abnormal screening result. The same type of test can sometimes serve different purposes depending on the situation. Screening recommendations balance possible benefits with harms such as false positives, overdiagnosis, and unnecessary procedures.",
    "question": "What is the difference between cancer screening and diagnostic testing?"
  },
  {
    "id": 15255,
    "category": "Treatment",
    "text": "Overdiagnosis occurs when screening detects a cancer or abnormality that would never have caused symptoms or shortened the person's life. It can lead to treatment and side effects that would otherwise have been unnecessary. Overdiagnosis is different from a false positive because the abnormality really is present. Screening decisions should consider both the chance of early detection and the potential harms.",
    "question": "What does overdiagnosis mean in cancer screening?"
  },
  {
    "id": 15256,
    "category": "Treatment",
    "text": "A screening interval is the recommended time between tests for people without symptoms. The correct interval depends on the type of screening, age, prior results, risk factors, and local guidelines. Testing too frequently can increase false positives and unnecessary procedures, while waiting too long may miss important changes. Follow the schedule recommended by your healthcare professional or national screening program.",
    "question": "How often should I get screened for cancer?"
  },
  {
    "id": 15257,
    "category": "Treatment",
    "text": "A normal scan means that the examination did not identify an abnormality that the test could reliably detect. It does not prove that every organ is free of cancer because tests have limits in sensitivity and resolution. The meaning of a normal result depends on the scan type, body area, and reason it was ordered. Persistent symptoms may require reassessment or different testing.",
    "question": "Does a normal scan mean I definitely do not have cancer?"
  },
  {
    "id": 15258,
    "category": "Treatment",
    "text": "A suspicious scan result means that an area has features requiring further evaluation; it is not automatically a cancer diagnosis. The next step may be comparison with older images, repeat imaging, a specialist consultation, or biopsy. Some suspicious findings turn out to be benign, while others need prompt treatment. Ask the clinician what the result means, how urgent the follow-up is, and when it should occur.",
    "question": "What should I do if a scan shows a suspicious mass?"
  },
  {
    "id": 15259,
    "category": "Treatment",
    "text": "A cancer screening appointment usually begins with a review of age, symptoms, personal history, family history, and relevant risk factors. The healthcare professional explains which test is appropriate and what its potential benefits and limitations are. Some tests require preparation, such as bowel cleansing before colonoscopy, while others require little preparation. Ask when results will be available and how abnormal findings will be followed up.",
    "question": "How should I prepare for a cancer screening appointment?"
  },
  {
    "id": 15260,
    "category": "Treatment",
    "text": "When receiving a cancer test result, ask what the result establishes, what it cannot exclude, and whether more tests are needed. Clarify the timeframe for follow-up and who will contact you with results. Keep copies of reports and record any new or worsening symptoms. Do not interpret a single abnormal blood value or imaging phrase as proof of cancer without the full clinical assessment.",
    "question": "How do I understand and follow up on a cancer test result?"
  },
  {
    "id": 15261,
    "category": "Treatment",
    "text": "Cancer tests can involve radiation, discomfort, false-positive findings, false-negative findings, or complications, depending on the procedure. Screening is most useful when evidence shows that the expected benefits outweigh the potential harms for a particular group. The right approach depends on age, medical history, symptoms, and individual risk. A clinician can explain which tests are appropriate and which are unnecessary for your situation.",
    "question": "Are cancer screening tests always safe and necessary?"
  },
    {
    "id": 15262,
    "category": "Treatment",
    "text": "Cancer develops through a combination of genetic changes, biological processes, environmental exposures, and other factors. Some risks can be reduced, but others, such as aging and inherited susceptibility, cannot be controlled. Having a risk factor does not mean a person will definitely develop cancer. Prevention focuses on reducing avoidable risks and following evidence-based screening recommendations.",
    "question": "What causes cancer to develop?"
  },
  {
    "id": 15263,
    "category": "Treatment",
    "text": "Age is one of the strongest general risk factors for cancer because genetic damage can accumulate and the body's repair mechanisms can change over time. Some cancers also occur in children and young adults. Cancer risk varies by type, and younger people should not ignore persistent warning signs. Screening recommendations are designed around the risks and benefits for particular age groups.",
    "question": "Why does cancer risk increase with age?"
  },
  {
    "id": 15264,
    "category": "Treatment",
    "text": "Tobacco smoke contains many chemicals that damage DNA and increase the risk of several cancers, including lung, mouth, throat, bladder, and pancreatic cancer. Cigarette smoking is a major preventable cause of cancer. Quitting reduces future risk, and the benefits begin after stopping, although risk may remain higher than in someone who never smoked. Avoiding secondhand smoke also helps protect health.",
    "question": "How does smoking increase cancer risk?"
  },
  {
    "id": 15265,
    "category": "Treatment",
    "text": "Stopping smoking reduces the risk of lung cancer and many other tobacco-related diseases. The earlier a person quits, the greater the long-term health benefit, but quitting at any age is worthwhile. Counseling, structured cessation support, and approved medicines can improve the chance of success. A former smoker may still qualify for lung cancer screening depending on age and smoking history.",
    "question": "How can I reduce my cancer risk after quitting smoking?"
  },
  {
    "id": 15266,
    "category": "Treatment",
    "text": "Secondhand smoke exposes non-smokers to harmful chemicals that can cause disease, including lung cancer. There is no known risk-free level of exposure to tobacco smoke. Keeping homes and vehicles smoke-free and avoiding indoor smoking areas reduces exposure. Ventilation alone cannot reliably eliminate the harmful substances in tobacco smoke.",
    "question": "Can secondhand smoke cause cancer?"
  },
  {
    "id": 15267,
    "category": "Treatment",
    "text": "Alcoholic drinks contain ethanol, which the body converts into acetaldehyde, a substance that can damage DNA. Alcohol consumption increases the risk of several cancers, including cancers of the mouth, throat, esophagus, liver, breast, and colorectum. Risk generally rises with greater consumption, and no level of alcohol intake is completely risk-free for cancer. Reducing or avoiding alcohol can lower exposure to this risk factor.",
    "question": "How does alcohol increase cancer risk?"
  },
  {
    "id": 15268,
    "category": "Treatment",
    "text": "Human papillomavirus, or HPV, is a common virus transmitted mainly through intimate skin-to-skin contact. Persistent infection with certain high-risk HPV types can cause cervical, anal, penile, vulvar, vaginal, and some throat cancers. Most HPV infections clear naturally, but persistent infections can cause precancerous changes. HPV vaccination and recommended cervical screening help prevent some HPV-related cancers.",
    "question": "Can HPV cause cancer?"
  },
  {
    "id": 15269,
    "category": "Treatment",
    "text": "HPV vaccines protect against important cancer-causing HPV types and work best when given before exposure to the virus. They can prevent most cervical cancers and reduce the risk of several other HPV-related cancers. Vaccination does not treat an existing HPV infection or replace cervical screening when screening is recommended. Eligibility, dose schedules, and catch-up recommendations depend on age and national guidance.",
    "question": "How does the HPV vaccine prevent cancer?"
  },
  {
    "id": 15270,
    "category": "Treatment",
    "text": "Chronic infection with hepatitis B or hepatitis C can cause liver inflammation, scarring, and an increased risk of liver cancer. Hepatitis B vaccination prevents infection with the hepatitis B virus. Hepatitis C can often be cured with antiviral medicines, although people with advanced liver scarring may continue to need liver cancer surveillance. Testing and treatment are especially important for people with known exposure or other risk factors.",
    "question": "Can hepatitis cause liver cancer?"
  },
  {
    "id": 15271,
    "category": "Treatment",
    "text": "Helicobacter pylori is a bacterium that can infect the stomach and cause chronic inflammation and ulcers. Long-standing infection increases the risk of certain stomach cancers and some stomach lymphomas. Testing and treatment are recommended in appropriate clinical situations, especially when an infection has been identified. Antibiotics should be used under medical guidance rather than taken without testing or a prescription.",
    "question": "Can a stomach infection cause cancer?"
  },
  {
    "id": 15272,
    "category": "Treatment",
    "text": "Sunlight contains ultraviolet radiation that can damage skin-cell DNA and increase the risk of melanoma and other skin cancers. Risk rises with excessive exposure, sunburns, and repeated ultraviolet damage. Protective clothing, shade, and broad-spectrum sunscreen help reduce exposure. Avoiding tanning beds is also important because they expose skin to cancer-causing ultraviolet radiation.",
    "question": "How does sunlight increase skin cancer risk?"
  },
  {
    "id": 15273,
    "category": "Treatment",
    "text": "Sunscreen helps reduce ultraviolet exposure when applied correctly, but it does not make unlimited time in the sun safe. Use broad-spectrum sunscreen with SPF 30 or higher, apply it generously, and reapply approximately every two hours and after swimming or heavy sweating. Combine sunscreen with shade, protective clothing, and a hat. Sunscreen reduces risk but cannot eliminate it completely.",
    "question": "How should I use sunscreen to reduce skin cancer risk?"
  },
  {
    "id": 15274,
    "category": "Treatment",
    "text": "Indoor tanning devices expose the skin to ultraviolet radiation that can damage DNA and increase skin cancer risk. Using a tanning bed does not provide a safe way to obtain a tan. A tan itself is a sign that the skin has responded to ultraviolet exposure. Avoiding tanning beds and protecting skin outdoors are safer choices.",
    "question": "Can tanning beds cause skin cancer?"
  },
  {
    "id": 15275,
    "category": "Treatment",
    "text": "A family history of cancer may indicate shared environmental risks or inherited genetic variants that increase susceptibility. Risk can be more concerning when several close relatives have related cancers or were diagnosed unusually young. Most cancers are not caused by a single inherited variant. Discussing family history with a clinician can help determine whether earlier screening or genetic counseling is appropriate.",
    "question": "Does cancer run in families?"
  },
  {
    "id": 15276,
    "category": "Treatment",
    "text": "Inherited variants in genes such as BRCA1 and BRCA2 can increase the risk of breast, ovarian, prostate, and certain other cancers. Having one of these variants does not mean cancer is inevitable. People with relevant family histories may benefit from genetic counseling and tailored screening or prevention strategies. Genetic testing should be accompanied by appropriate explanation of what the results can and cannot predict.",
    "question": "Which inherited genes can increase cancer risk?"
  },
  {
    "id": 15277,
    "category": "Treatment",
    "text": "Lynch syndrome is an inherited condition that increases the risk of colorectal, endometrial, and several other cancers. It is associated with changes in genes involved in repairing DNA errors. People with Lynch syndrome may need earlier and more frequent screening than the general population. A clinician or genetic counselor can assess family history and explain appropriate testing and prevention.",
    "question": "What is Lynch syndrome and why does it increase cancer risk?"
  },
  {
    "id": 15278,
    "category": "Treatment",
    "text": "Excess body fat is associated with a higher risk of several cancers, including colorectal, endometrial, kidney, liver, and postmenopausal breast cancer. Possible mechanisms include hormonal changes, chronic inflammation, and altered metabolism. Maintaining a healthy weight may reduce risk, but body weight is only one part of a person's overall cancer risk. Health advice should focus on sustainable habits rather than blame or extreme dieting.",
    "question": "Can obesity increase cancer risk?"
  },
  {
    "id": 15279,
    "category": "Treatment",
    "text": "Regular physical activity is associated with a lower risk of certain cancers, including colorectal and postmenopausal breast cancer. Exercise can also support healthy body weight, metabolic health, and general well-being. Activities can include walking, cycling, swimming, gardening, and strength training, adapted to a person's abilities. Physical activity reduces some risks but cannot guarantee cancer prevention.",
    "question": "Can exercise help prevent cancer?"
  },
  {
    "id": 15280,
    "category": "Treatment",
    "text": "A diet rich in vegetables, fruits, whole grains, legumes, and other fiber-rich foods supports overall health and may help reduce the risk of some cancers. Processed meat is associated with colorectal cancer, while high consumption of red meat is also linked to increased risk. No single food can prevent or cure cancer. A balanced dietary pattern is more useful than relying on a particular superfood.",
    "question": "What foods can help reduce cancer risk?"
  },
  {
    "id": 15281,
    "category": "Treatment",
    "text": "Processed meat includes products such as bacon, ham, sausages, and many deli meats that have been preserved by curing, salting, smoking, or other processes. Regular consumption is associated with an increased risk of colorectal cancer. The risk depends partly on the amount consumed, and reducing processed meat is a practical prevention measure. A balanced diet can include alternative protein sources such as beans, lentils, fish, and poultry.",
    "question": "Can processed meat increase colorectal cancer risk?"
  },
  {
    "id": 15282,
    "category": "Treatment",
    "text": "Dietary fiber supports bowel function and is associated with a lower risk of colorectal cancer. Sources include whole grains, beans, lentils, vegetables, fruits, nuts, and seeds. Increasing fiber gradually and drinking adequate fluids can help reduce digestive discomfort. Fiber is one part of a healthy diet and does not replace colorectal cancer screening.",
    "question": "Does eating fiber help prevent colorectal cancer?"
  },
  {
    "id": 15283,
    "category": "Treatment",
    "text": "Vitamin and mineral supplements have not been shown to prevent all cancers, and high doses can sometimes cause harm. Beta-carotene supplements, for example, increased lung cancer risk in studies of smokers and some other high-risk groups. Nutrients are generally best obtained from a balanced diet unless a clinician identifies a specific need. Do not use supplements as a replacement for proven prevention or screening measures.",
    "question": "Can vitamins and supplements prevent cancer?"
  },
  {
    "id": 15284,
    "category": "Treatment",
    "text": "There is no convincing evidence that alkaline diets prevent or cure cancer. The body regulates blood pH tightly, and food does not meaningfully change the pH of the blood in a healthy person. Fruits and vegetables can support health, but avoiding medical treatment in favor of an alkaline diet can be dangerous. People diagnosed with cancer should discuss dietary changes with their treatment team.",
    "question": "Can an alkaline diet prevent cancer?"
  },
  {
    "id": 15285,
    "category": "Treatment",
    "text": "Sugar does not uniquely feed cancer cells because all cells in the body use glucose for energy. Eating large amounts of sugary foods can contribute to excess calorie intake and weight gain, which are associated with increased risk of certain cancers. Eliminating all carbohydrates does not selectively starve a tumor. A balanced diet and evidence-based medical care are more appropriate than extreme sugar restriction.",
    "question": "Does eating sugar cause cancer to grow?"
  },
  {
    "id": 15286,
    "category": "Treatment",
    "text": "Stress can affect sleep, behavior, and general health, but evidence that stress alone directly causes cancer is not conclusive. Chronic stress may indirectly influence risk when it contributes to smoking, heavy alcohol use, inactivity, or other harmful behaviors. Stress management can improve well-being but should not be presented as a guaranteed cancer prevention method. Cancer risk is influenced by multiple biological and environmental factors.",
    "question": "Can stress cause cancer?"
  },
  {
    "id": 15287,
    "category": "Treatment",
    "text": "Ordinary psychological stress does not cause cancer in a simple or predictable way. Cancer usually develops through accumulated genetic changes and interactions among age, inherited susceptibility, exposures, and biological processes. Stress may affect a person's health behaviors and ability to cope with illness, but it is not proof of cancer risk by itself. Supportive care can help people manage stress without blaming themselves for disease.",
    "question": "Can emotional trauma directly cause cancer?"
  },
  {
    "id": 15288,
    "category": "Treatment",
    "text": "Microwaves used in household microwave ovens are non-ionizing radiation and do not make food radioactive. There is no convincing evidence that using a microwave oven as intended causes cancer. The main practical hazard is burns from hot food, steam, or unsuitable containers. Follow the manufacturer's instructions and use microwave-safe cookware.",
    "question": "Can microwave ovens cause cancer?"
  },
  {
    "id": 15289,
    "category": "Treatment",
    "text": "Mobile phones emit radiofrequency energy, which is non-ionizing and does not have enough energy to directly break chemical bonds in DNA. Research has not established that ordinary mobile phone use causes cancer, although scientific monitoring continues. People who want to reduce exposure can use speakerphone or a hands-free device. Such precautions are optional and should not be mistaken for proof that phones cause cancer.",
    "question": "Can mobile phones cause brain cancer?"
  },
  {
    "id": 15290,
    "category": "Treatment",
    "text": "X-rays and CT scans use ionizing radiation, which can damage DNA and slightly increase cancer risk. The risk from an individual medically indicated examination is generally small, and the benefit of obtaining important diagnostic information often outweighs it. CT scans usually involve more radiation than ordinary X-rays, with dose varying by examination. Tell healthcare professionals about previous imaging and ask whether a test is necessary, but do not refuse essential imaging solely from fear of radiation.",
    "question": "Can medical X-rays and CT scans cause cancer?"
  },
  {
    "id": 15291,
    "category": "Treatment",
    "text": "Radon is a naturally occurring radioactive gas that can accumulate indoors, especially in buildings with certain soil and foundation conditions. Long-term exposure increases lung cancer risk, particularly for people who smoke. Radon cannot be reliably detected by smell, taste, or sight. A suitable radon test can measure indoor levels, and high readings may require professional mitigation.",
    "question": "Can radon gas in a house cause lung cancer?"
  },
  {
    "id": 15292,
    "category": "Treatment",
    "text": "Asbestos is a group of mineral fibers that can cause serious diseases, including mesothelioma and lung cancer, when inhaled. Risk is especially associated with occupational or prolonged exposure, and disease may develop many years later. Do not cut, drill, sand, or remove suspected asbestos-containing materials yourself. Arrange assessment and safe handling by qualified professionals when asbestos may be present.",
    "question": "Can asbestos exposure cause cancer?"
  },
  {
    "id": 15293,
    "category": "Treatment",
    "text": "Benzene is an industrial chemical found in some fuels, smoke, and workplace environments. Significant exposure can damage blood-forming cells and increase the risk of leukemia, particularly acute myeloid leukemia. Risk depends on the amount, duration, and route of exposure. Follow workplace safety procedures, avoid unnecessary fuel-vapor exposure, and seek occupational health advice if exposure is suspected.",
    "question": "Can benzene exposure cause leukemia?"
  },
  {
    "id": 15294,
    "category": "Treatment",
    "text": "Certain pesticides and industrial chemicals have been associated with cancer risks, but the evidence differs by substance and exposure level. Risk depends on the chemical, duration, route of exposure, and protective measures used. Follow product labels, use required protective equipment, and comply with workplace safety guidance. A suspected significant occupational exposure should be discussed with an occupational health professional.",
    "question": "Can chemical exposure at work increase cancer risk?"
  },
  {
    "id": 15295,
    "category": "Treatment",
    "text": "Air pollution contains particles and chemicals that can contribute to lung cancer risk, especially with long-term exposure. Pollution levels vary by location, traffic, industry, and weather. Individuals cannot eliminate all exposure, but reducing tobacco smoke, improving indoor ventilation where appropriate, and following local air-quality advice may help reduce some risks. Air pollution exposure does not mean that a person will develop cancer.",
    "question": "Can air pollution cause cancer?"
  },
  {
    "id": 15296,
    "category": "Treatment",
    "text": "Some workplaces expose people to carcinogens, including asbestos, silica dust, diesel exhaust, and certain industrial chemicals. Employers should assess hazards and provide effective controls, training, and protective equipment. Respirators alone may not be sufficient if exposure controls are inadequate. Workers concerned about repeated exposure should consult workplace safety or occupational health professionals.",
    "question": "Which workplace exposures can increase cancer risk?"
  },
  {
    "id": 15297,
    "category": "Treatment",
    "text": "Human immunodeficiency virus, or HIV, weakens the immune system and increases the risk of certain cancers, including Kaposi sarcoma and some lymphomas. Effective antiretroviral treatment helps preserve immune function and reduces the risk of several HIV-associated complications. Appropriate vaccination, screening, and treatment of other infections may also help reduce cancer risks. HIV does not mean that a person will inevitably develop cancer.",
    "question": "Can HIV increase the risk of cancer?"
  },
  {
    "id": 15298,
    "category": "Treatment",
    "text": "Organ transplant recipients often take medicines that suppress the immune system to prevent rejection. These medicines can increase the risk of certain cancers, including skin cancers and some lymphomas. Regular follow-up, sun protection, vaccination where appropriate, and recommended screening are important. Transplant recipients should discuss individualized prevention measures with their specialist rather than changing immunosuppressive medicines themselves.",
    "question": "Can immune-suppressing medicines increase cancer risk?"
  },
  {
    "id": 15299,
    "category": "Treatment",
    "text": "Hormones can influence the growth of some cancers, including certain breast and endometrial cancers. Risk depends on the hormone involved, the person's biology, age, treatment history, and duration of exposure. Hormonal medicines can have important benefits and should not be stopped without medical advice. Discuss personal cancer risks and alternatives with the prescribing clinician.",
    "question": "Can hormones increase cancer risk?"
  },
  {
    "id": 15300,
    "category": "Treatment",
    "text": "Some forms of hormone replacement therapy are associated with changes in the risk of breast or endometrial cancer, depending on the hormones used, duration, and whether a person has a uterus. Benefits and risks differ between individuals and treatment regimens. Do not start or stop prescribed hormone therapy solely because of general cancer warnings. A clinician can review personal medical history and discuss appropriate options.",
    "question": "Can hormone replacement therapy cause cancer?"
  },
  {
    "id": 15301,
    "category": "Treatment",
    "text": "Night-shift work and circadian rhythm disruption have been studied for possible links with cancer, particularly breast cancer. Research suggests a potential association in some circumstances, but individual risk is difficult to quantify and the evidence is not the same for every cancer. Shift workers should focus on practical health measures such as adequate sleep, avoiding tobacco, balanced nutrition, and recommended screening. Work schedules alone cannot determine whether someone will develop cancer.",
    "question": "Can working night shifts increase cancer risk?"
  },
  {
    "id": 15302,
    "category": "Treatment",
    "text": "Vaccination can prevent certain infections that increase cancer risk. HPV vaccination helps prevent several HPV-related cancers, while hepatitis B vaccination helps prevent chronic hepatitis B infection and its associated liver cancer risk. Vaccines do not prevent every cancer and do not replace recommended screening. Ask a healthcare professional which vaccines are appropriate for your age, health, and vaccination history.",
    "question": "Which vaccines can help prevent cancer?"
  },
  {
    "id": 15303,
    "category": "Treatment",
    "text": "Breastfeeding is associated with a lower risk of breast cancer for the person who breastfeeds, with risk reduction influenced by duration and other factors. It is one of several biological and reproductive factors associated with breast cancer risk. Not breastfeeding does not mean that someone will develop cancer. Screening and medical advice remain important according to age and individual risk.",
    "question": "Can breastfeeding reduce breast cancer risk?"
  },
  {
    "id": 15304,
    "category": "Treatment",
    "text": "Long-term inflammation can contribute to cancer development in certain conditions, such as chronic hepatitis in the liver or inflammatory bowel disease in the colon. Inflammation does not automatically lead to cancer, and many inflammatory illnesses never become cancerous. Appropriate treatment and monitoring of chronic conditions can reduce complications and help identify concerning changes. Follow the surveillance plan recommended by the treating clinician.",
    "question": "Can chronic inflammation cause cancer?"
  },
  {
    "id": 15305,
    "category": "Treatment",
    "text": "Diabetes and metabolic health have been associated with increased risk of some cancers, including liver, pancreatic, endometrial, and colorectal cancer. The relationship involves several factors, including insulin regulation, body weight, and shared lifestyle influences. Diabetes does not mean cancer is inevitable, and medicines should not be stopped because of general claims about cancer risk. Good diabetes care and recommended screening support overall health.",
    "question": "Can diabetes increase cancer risk?"
  },
  {
    "id": 15306,
    "category": "Treatment",
    "text": "Sleep is important for general health, but evidence that a particular sleep duration directly prevents cancer is limited. Poor sleep may contribute to behaviors or metabolic changes that influence overall health. Aim for a regular sleep schedule and seek help for persistent insomnia or possible sleep disorders. Adequate sleep is beneficial, but it is not a substitute for established cancer prevention measures.",
    "question": "Can getting enough sleep prevent cancer?"
  },
  {
    "id": 15307,
    "category": "Treatment",
    "text": "Some herbal products and dietary supplements can interact with medicines or contain contaminants, and evidence that they prevent cancer is generally insufficient. Concentrated supplements are not equivalent to eating ordinary foods or drinking customary beverages. High doses of certain vitamins or plant compounds can cause harm. Discuss supplements with a healthcare professional, especially during cancer treatment or when taking prescription medicines.",
    "question": "Can herbal remedies prevent cancer?"
  },
  {
    "id": 15308,
    "category": "Treatment",
    "text": "There is no reliable evidence that baking soda, detox drinks, or cleansing regimens can prevent or cure cancer. The body regulates acid-base balance through the lungs and kidneys, and attempts to alter it with home remedies can be dangerous. Such methods can cause harmful changes in blood chemistry or delay effective treatment. Use evidence-based prevention strategies and seek medical advice for cancer concerns.",
    "question": "Can baking soda or detox cleanses prevent cancer?"
  },
  {
    "id": 15309,
    "category": "Treatment",
    "text": "Cancer is not generally contagious and cannot be caught through ordinary contact, sharing food, hugging, or using the same household objects. Certain infections, including HPV, hepatitis B, hepatitis C, and Helicobacter pylori, can spread between people and increase cancer risk. Preventing and treating these infections can reduce some cancer risks. A person with cancer does not need to be isolated from family and friends because of the cancer itself.",
    "question": "Can you catch cancer from another person?"
  },
  {
    "id": 15310,
    "category": "Treatment",
    "text": "Cancer prevention cannot guarantee that a person will never develop cancer, because age, inherited factors, random cellular changes, and other influences also matter. However, avoiding tobacco, limiting alcohol, protecting skin from ultraviolet radiation, maintaining healthy habits, getting recommended vaccines, and following screening guidance can reduce some risks. Preventive actions should be realistic and sustainable. Persistent symptoms still require assessment even in people who follow healthy habits.",
    "question": "What are the most effective ways to reduce cancer risk?"
  },
  {
    "id": 15311,
    "category": "Treatment",
    "text": "People with a strong family history, inherited cancer syndrome, previous precancerous changes, or certain chronic infections may need a personalized prevention plan. Depending on the risk, this may include earlier screening, more frequent examinations, genetic counseling, or preventive medication or surgery in selected cases. These decisions require professional assessment because the benefits and harms vary. Share relevant family and medical history with a clinician to determine the appropriate plan.",
    "question": "Who needs a personalized cancer prevention plan?"
  },
    {
    "id": 15312,
    "category": "Treatment",
    "text": "Cancer treatment depends on the cancer type, its location, stage, biological features, and the patient's overall health. Common treatments include surgery, chemotherapy, radiotherapy, immunotherapy, targeted therapy, and hormone therapy. Some patients receive one treatment, while others need a combination.",
    "question": "How is cancer treated?"
  },
  {
    "id": 15313,
    "category": "Treatment",
    "text": "Cancer surgery removes a tumor and sometimes nearby tissue or lymph nodes. It may aim to cure cancer, reduce its size, relieve symptoms, or determine how far it has spread. Surgery is not suitable for every cancer, particularly when disease is widespread or the tumor cannot be safely removed.",
    "question": "How does cancer surgery work?"
  },
  {
    "id": 15314,
    "category": "Treatment",
    "text": "Chemotherapy uses medicines that kill cancer cells or stop them from growing and dividing. Because some healthy cells also divide quickly, chemotherapy can cause side effects such as nausea, fatigue, hair loss, mouth sores, and low blood cell counts. The specific effects depend on the drugs and doses used.",
    "question": "What is chemotherapy?"
  },
  {
    "id": 15315,
    "category": "Treatment",
    "text": "Radiotherapy uses high-energy radiation to damage cancer cells and prevent them from multiplying. It can be delivered by a machine outside the body or, in some treatments, by radioactive material placed inside or near the tumor. Side effects depend on the treated area and may include fatigue, skin irritation, or inflammation.",
    "question": "What is radiotherapy?"
  },
  {
    "id": 15316,
    "category": "Treatment",
    "text": "Immunotherapy helps the immune system recognize or attack cancer cells. Some medicines remove signals that cancer uses to hide from immune defenses, while others stimulate particular immune cells. Immunotherapy can produce long-lasting responses in some cancers, but it does not work for every patient and can cause immune-related inflammation.",
    "question": "What is cancer immunotherapy?"
  },
  {
    "id": 15317,
    "category": "Treatment",
    "text": "Targeted cancer therapy acts on particular molecules or biological changes that help cancer cells grow and survive. Doctors may test a tumor for specific biomarkers to determine whether a targeted medicine is suitable. These treatments can be more selective than conventional chemotherapy, but they can still cause serious side effects and cancer may develop resistance.",
    "question": "What is targeted cancer therapy?"
  },
  {
    "id": 15318,
    "category": "Treatment",
    "text": "Hormone therapy slows or blocks hormones that help certain cancers grow. It is commonly used for some breast and prostate cancers. Depending on the medicine, it may cause hot flashes, sexual changes, fatigue, mood changes, or effects on bone health.",
    "question": "What is hormone therapy for cancer?"
  },
  {
    "id": 15319,
    "category": "Treatment",
    "text": "Cancer treatment plans are chosen according to the specific disease and the patient's circumstances. Doctors consider the likelihood of controlling or curing the cancer, possible side effects, existing health conditions, and the patient's priorities. Patients can ask about the benefits, risks, alternatives, and consequences of delaying or declining a treatment.",
    "question": "How do doctors choose a cancer treatment?"
  },
  {
    "id": 15320,
    "category": "Treatment",
    "text": "Adjuvant therapy is additional treatment given after the main treatment, often surgery, to reduce the risk of cancer returning. It may include chemotherapy, radiotherapy, hormone therapy, targeted therapy, or immunotherapy. Whether it is recommended depends on the cancer type and the estimated risk of recurrence.",
    "question": "What is adjuvant cancer therapy?"
  },
  {
    "id": 15321,
    "category": "Treatment",
    "text": "Neoadjuvant therapy is treatment given before the main treatment, often before surgery. It may shrink a tumor, make surgery easier, or help doctors assess how the cancer responds to treatment. Depending on the cancer, it may involve chemotherapy, radiotherapy, hormone therapy, targeted therapy, or immunotherapy.",
    "question": "What is neoadjuvant cancer therapy?"
  },
  {
    "id": 15322,
    "category": "Treatment",
    "text": "A treatment cycle is a planned period of cancer treatment followed by a recovery interval when appropriate. Repeated cycles allow medicines to affect cancer cells while giving healthy tissues time to recover. The number and length of cycles depend on the treatment plan and how well the patient tolerates it.",
    "question": "What is a chemotherapy cycle?"
  },
  {
    "id": 15323,
    "category": "Treatment",
    "text": "Cancer treatment is often delivered in cycles or scheduled sessions rather than continuously. Some medicines are given through a vein, others are taken as tablets, and some treatments use injections or specialized procedures. The treatment team explains the schedule, monitoring requirements, and what to do if a dose is missed or a session must be postponed.",
    "question": "How often is cancer treatment given?"
  },
  {
    "id": 15324,
    "category": "Treatment",
    "text": "Hair loss can occur with some chemotherapy medicines and may affect the scalp, eyebrows, eyelashes, or other body areas. Not every chemotherapy drug causes hair loss, and radiotherapy usually affects hair only in the treated area. Hair often grows back after treatment, although its color or texture may change temporarily or permanently.",
    "question": "Does cancer treatment cause hair loss?"
  },
  {
    "id": 15325,
    "category": "Treatment",
    "text": "Cancer-related nausea can result from chemotherapy, radiotherapy, other medicines, or the cancer itself. Doctors can prescribe anti-nausea medicines and may recommend small, frequent meals and adequate fluids. Severe or persistent vomiting, inability to keep fluids down, or signs of dehydration should be reported promptly to the treatment team.",
    "question": "How can nausea from cancer treatment be managed?"
  },
  {
    "id": 15326,
    "category": "Treatment",
    "text": "Cancer-related fatigue is a persistent feeling of tiredness that may not improve fully with sleep. It can result from the cancer, treatment, anemia, pain, poor nutrition, or emotional stress. Depending on the cause, management may include gentle activity, rest planning, nutrition support, treatment of anemia, and evaluation for other medical problems.",
    "question": "Why does cancer treatment cause fatigue?"
  },
  {
    "id": 15327,
    "category": "Treatment",
    "text": "Some cancer treatments lower white blood cell counts, increasing the risk of infection. A fever during cancer treatment can be a medical emergency, especially during chemotherapy. Follow the oncology team's temperature instructions and contact them immediately if the specified fever threshold is reached; do not wait for symptoms to worsen.",
    "question": "Why is fever dangerous during chemotherapy?"
  },
  {
    "id": 15328,
    "category": "Treatment",
    "text": "Chemotherapy and some other cancer treatments can lower platelet counts, making bleeding and bruising more likely. Patients may be advised to avoid activities that cause injury and to report unusual bruising, nosebleeds, blood in urine or stool, or persistent bleeding. Severe bleeding requires emergency medical care.",
    "question": "Can cancer treatment cause bleeding?"
  },
  {
    "id": 15329,
    "category": "Treatment",
    "text": "Cancer treatment can sometimes damage the lining of the mouth, causing sores, pain, dryness, or difficulty swallowing. Gentle oral hygiene, regular dental care when appropriate, and recommended mouth rinses may help reduce discomfort. Severe pain, bleeding, fever, or an inability to drink should be reported to the treatment team.",
    "question": "Why does cancer treatment cause mouth sores?"
  },
  {
    "id": 15330,
    "category": "Treatment",
    "text": "Some cancer treatments cause diarrhea, constipation, or other digestive problems. The cause matters because treatment differs depending on the medicine and the symptom. Severe diarrhea, blood in the stool, intense abdominal pain, or signs of dehydration require prompt medical assessment rather than self-treatment alone.",
    "question": "Can cancer treatment affect digestion?"
  },
  {
    "id": 15331,
    "category": "Treatment",
    "text": "Cancer treatment may affect appetite, taste, smell, and the body's ability to maintain weight. Eating smaller, frequent meals and choosing foods with enough protein and calories can help some patients. A dietitian experienced in cancer care can provide individualized advice, especially when swallowing, digestion, or weight loss becomes a problem.",
    "question": "What should cancer patients eat during treatment?"
  },
  {
    "id": 15332,
    "category": "Treatment",
    "text": "Cancer treatment can cause weight loss through reduced appetite, nausea, swallowing difficulties, inflammation, or changes in metabolism. Unintentional weight loss should be reported because it may weaken the body and affect treatment tolerance. Doctors can investigate the cause and arrange nutrition support when needed.",
    "question": "Why do some cancer patients lose weight?"
  },
  {
    "id": 15333,
    "category": "Treatment",
    "text": "Some cancer treatments can damage nerves, causing tingling, numbness, burning pain, or weakness in the hands and feet. This condition is called peripheral neuropathy. Patients should report new symptoms early because the care team may adjust treatment, investigate other causes, or recommend ways to reduce pain and prevent falls.",
    "question": "Can chemotherapy damage nerves?"
  },
  {
    "id": 15334,
    "category": "Treatment",
    "text": "Some cancer medicines can affect the heart, kidneys, liver, lungs, or other organs. Doctors may check blood tests, heart function, blood pressure, or imaging before and during treatment. Monitoring helps identify problems early, but patients should also report new symptoms rather than relying only on scheduled tests.",
    "question": "Can cancer treatment damage organs?"
  },
  {
    "id": 15335,
    "category": "Treatment",
    "text": "Cancer treatment may temporarily or permanently affect fertility in people of any sex. Before treatment begins, patients who may want biological children should ask about fertility preservation, such as freezing sperm, eggs, or embryos. Some options need to be arranged quickly, so discussing fertility early is important when medically feasible.",
    "question": "Can cancer treatment cause infertility?"
  },
  {
    "id": 15336,
    "category": "Treatment",
    "text": "Cancer treatment can affect sexual desire, arousal, erections, vaginal comfort, hormone levels, and body image. These changes may result from medication, surgery, radiotherapy, fatigue, pain, or emotional distress. Patients can discuss symptoms with their care team because treatments and supportive options may improve sexual health and comfort.",
    "question": "Can cancer treatment affect sexual function?"
  },
  {
    "id": 15337,
    "category": "Treatment",
    "text": "Pregnancy during cancer treatment requires specialist assessment because some medicines and radiation exposures can harm a developing fetus. The risks depend on the treatment, the stage of pregnancy, and the cancer. Patients who are pregnant, may be pregnant, or want to become pregnant should tell their oncology team before treatment decisions are made.",
    "question": "Can cancer treatment be given during pregnancy?"
  },
  {
    "id": 15338,
    "category": "Treatment",
    "text": "Cancer surgery may cause pain, swelling, fatigue, scars, or temporary limits on movement. Recovery depends on the operation, the patient's health, and whether additional treatment is needed. The surgical team provides instructions about wound care, activity, medication, and warning signs such as worsening redness, fever, or unusual discharge.",
    "question": "How long does it take to recover from cancer surgery?"
  },
  {
    "id": 15339,
    "category": "Treatment",
    "text": "After surgery, a wound should be cared for according to the instructions provided by the surgical team. Keeping it clean and following dressing instructions can help reduce complications. Increasing redness, warmth, swelling, pus, wound separation, fever, or worsening pain may indicate infection or another problem and should be assessed promptly.",
    "question": "How should a cancer surgery wound be cared for?"
  },
  {
    "id": 15340,
    "category": "Treatment",
    "text": "Lymph nodes may be removed or treated during cancer surgery to check for spread or help control the disease. This can sometimes disrupt lymph drainage and cause lymphedema, a persistent swelling often affecting an arm or leg. Early assessment and treatment can help manage symptoms and reduce complications.",
    "question": "What is lymphedema after cancer treatment?"
  },
  {
    "id": 15341,
    "category": "Treatment",
    "text": "Cancer rehabilitation helps people regain strength, movement, independence, and daily functioning during or after treatment. It may include physical therapy, occupational therapy, speech therapy, nutrition support, or help managing fatigue. The program is tailored to the person's symptoms, abilities, and treatment-related limitations.",
    "question": "What is cancer rehabilitation?"
  },
  {
    "id": 15342,
    "category": "Treatment",
    "text": "Exercise may help some people with cancer reduce fatigue, preserve strength, improve mood, and maintain daily function. The safest activity depends on the cancer, treatment, blood counts, bone health, and other medical conditions. Patients should ask their care team about suitable activity, especially if they have severe anemia, infection, balance problems, or cancer affecting the bones.",
    "question": "Can cancer patients exercise during treatment?"
  },
  {
    "id": 15343,
    "category": "Treatment",
    "text": "Some vaccines may be less effective during cancer treatment, and certain live vaccines may be unsafe for people with weakened immune systems. Vaccination decisions depend on the treatment, immune function, vaccine type, and risk of infection. Patients should ask their oncology team which vaccines they need and when to receive them.",
    "question": "Can cancer patients receive vaccines?"
  },
  {
    "id": 15344,
    "category": "Treatment",
    "text": "Some herbal products, vitamins, and dietary supplements can interact with cancer medicines or affect bleeding, liver function, or treatment effectiveness. Natural products are not automatically safe, and high doses of certain antioxidants may be inappropriate during some treatments. Patients should tell their oncology team about every supplement and medicine they take before starting anything new.",
    "question": "Can supplements interfere with cancer treatment?"
  },
  {
    "id": 15345,
    "category": "Treatment",
    "text": "Cancer clinical trials evaluate new treatments, new combinations of existing treatments, or improved ways to prevent, detect, and manage cancer. Some trials compare a new approach with standard care, while others study supportive care or diagnostic methods. Eligibility rules apply, and participation is voluntary; patients can ask about potential benefits, risks, costs, and available alternatives.",
    "question": "What is a cancer clinical trial?"
  },
  {
    "id": 15346,
    "category": "Treatment",
    "text": "A second medical opinion is an assessment of a diagnosis or treatment plan by another qualified clinician. It may help confirm the diagnosis, clarify options, or identify clinical trials or specialized treatments. Patients can usually request copies of pathology reports, scans, and other medical records to support the review.",
    "question": "Should I get a second opinion for cancer?"
  },
  {
    "id": 15347,
    "category": "Treatment",
    "text": "Cancer treatment can cause fear, sadness, anger, uncertainty, and changes in family relationships. Emotional distress is common and does not mean a patient is coping badly. Counseling, support groups, social workers, and mental health professionals can help patients and their families manage the emotional and practical effects of cancer.",
    "question": "How can cancer patients cope with emotional stress?"
  },
  {
    "id": 15348,
    "category": "Treatment",
    "text": "Palliative care focuses on relieving pain, other symptoms, stress, and practical difficulties caused by serious illness. It can be provided alongside treatments intended to control or cure cancer and is not limited to the final days of life. A palliative care team may include doctors, nurses, social workers, and other specialists.",
    "question": "What is palliative care for cancer?"
  },
  {
    "id": 15349,
    "category": "Treatment",
    "text": "Hospice care focuses on comfort and quality of life when a person is approaching the end of life and curative treatment is no longer the goal. Eligibility and the way hospice services are organized vary by country and health system. Hospice teams can support symptom control, emotional needs, caregivers, and planning for the person's preferred place of care.",
    "question": "What is hospice care for cancer?"
  },
  {
    "id": 15350,
    "category": "Treatment",
    "text": "Cancer pain may result from a tumor pressing on tissues, cancer affecting bones or nerves, surgery, or other treatments. Management can include medicines, radiotherapy, procedures, physical approaches, and psychological support. New, severe, or rapidly worsening pain should be reported because it may require urgent assessment and a change in the care plan.",
    "question": "How is cancer pain treated?"
  },
  {
    "id": 15351,
    "category": "Treatment",
    "text": "Opioids such as morphine may be prescribed for moderate to severe cancer pain when a clinician considers them appropriate. They can provide important relief but may cause constipation, nausea, sleepiness, or dangerous breathing suppression. Patients should take them only as prescribed, avoid sharing them, and ask the care team how to manage side effects and store the medicine safely.",
    "question": "Are opioids used to treat cancer pain?"
  },
  {
    "id": 15352,
    "category": "Treatment",
    "text": "A complete response means that available tests show no detectable evidence of cancer after treatment. It does not always mean that every cancer cell has been eliminated, because microscopic disease may remain undetectable. The risk of recurrence depends on the cancer type, stage, biology, and length of follow-up.",
    "question": "Does a complete response mean cancer is cured?"
  },
  {
    "id": 15353,
    "category": "Treatment",
    "text": "Cancer recurrence means that cancer returns after a period when it was undetectable or controlled. It may occur at the original site, nearby tissues, or distant parts of the body. Follow-up visits and recommended tests help detect some recurrences, while new or persistent symptoms should be discussed with a clinician between appointments.",
    "question": "Can cancer return after treatment?"
  },
  {
    "id": 15354,
    "category": "Treatment",
    "text": "Cancer remission means that signs and symptoms of cancer have decreased or disappeared. Partial remission means the cancer has reduced but may still be present, while complete remission means no evidence is detectable with current tests. Remission is not always the same as cure, and continued monitoring may be needed.",
    "question": "What does cancer remission mean?"
  },
  {
    "id": 15355,
    "category": "Treatment",
    "text": "Cancer that no longer responds to a treatment may be described as treatment-resistant. Resistance can occur because some cancer cells survive treatment and develop or already possess biological features that help them grow despite the medicine. Doctors may reassess the tumor, review test results, and consider a different treatment, combination, or clinical trial.",
    "question": "Why can cancer become resistant to treatment?"
  },
  {
    "id": 15356,
    "category": "Treatment",
    "text": "Metastatic cancer has spread from its original site to another part of the body. Treatment may aim to control growth, extend life, relieve symptoms, or sometimes achieve long-term remission, depending on the cancer type and available therapies. Metastatic cancer is not always untreatable, and the outlook varies considerably between individuals.",
    "question": "Can metastatic cancer be treated?"
  },
  {
    "id": 15357,
    "category": "Treatment",
    "text": "Stopping cancer treatment can have different consequences depending on the disease, the treatment, and the patient's goals. Some treatments control cancer only while they are being given, while others may continue to provide benefit after completion. Before stopping, delaying, or changing treatment, patients should discuss the expected benefits, risks, alternatives, and symptom-management options with their oncology team.",
    "question": "What happens if a patient stops cancer treatment?"
  },
  {
    "id": 15358,
    "category": "Treatment",
    "text": "Cancer follow-up care monitors recovery, checks for recurrence when appropriate, manages lasting side effects, and supports general health. The schedule and tests depend on the cancer type, treatment received, and individual risk. Patients should also report concerning new symptoms between appointments rather than waiting for the next scheduled visit.",
    "question": "What happens during cancer follow-up?"
  },
  {
    "id": 15359,
    "category": "Treatment",
    "text": "Some side effects of cancer treatment appear months or years after treatment ends. Examples include nerve damage, fertility problems, heart or lung effects, bone changes, and difficulties with memory or concentration. The risks depend on the treatment and dose, so survivors may need long-term monitoring and a record of the treatments they received.",
    "question": "Can cancer treatment cause long-term side effects?"
  },
  {
    "id": 15360,
    "category": "Treatment",
    "text": "Cancer survivorship care addresses health and quality of life during and after cancer treatment. It may include monitoring for recurrence, managing late effects, reviewing screening needs, supporting mental health, and helping patients return to work or daily activities. A written survivorship care plan can summarize past treatments and recommended follow-up.",
    "question": "What is cancer survivorship care?"
  },
  {
    "id": 15361,
    "category": "Treatment",
    "text": "During cancer treatment, urgent warning signs can include fever at the threshold specified by the oncology team, difficulty breathing, chest pain, confusion, uncontrolled bleeding, or a sudden severe headache. Persistent vomiting, inability to drink, severe diarrhea, or rapidly worsening symptoms also need prompt medical advice. Patients should follow their treatment team's emergency instructions and contact emergency services for life-threatening symptoms.",
    "question": "When should a cancer patient seek emergency help?"
  },
];