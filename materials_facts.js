/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

var MATERIALS_LIBRARY = [
  {
    "id": 6673,
    "category": "Materials",
    "text": "A material is a substance or combination of substances used to make objects, structures, tools, and products. Materials can be natural or manufactured.",
    "question": "What is a material?"
  },
  {
    "id": 6674,
    "category": "Materials",
    "text": "Materials can be classified as natural or synthetic. Natural materials come from sources such as plants, animals, rocks, and minerals, while synthetic materials are manufactured by people.",
    "question": "What are the main types of materials?"
  },
  {
    "id": 6675,
    "category": "Materials",
    "text": "Natural materials are materials obtained directly from nature with relatively little processing. Examples include wood, stone, clay, cotton, wool, leather, and natural rubber.",
    "question": "What are natural materials?"
  },
  {
    "id": 6676,
    "category": "Materials",
    "text": "Synthetic materials are made by humans through chemical or industrial processes. Examples include plastics, synthetic fibers, many types of rubber, and some advanced composites.",
    "question": "What are synthetic materials?"
  },
  {
    "id": 6677,
    "category": "Materials",
    "text": "Metals are materials that are generally strong, durable, electrically conductive, and thermally conductive. Common metals include iron, steel, aluminum, copper, zinc, and titanium.",
    "question": "What are metals?"
  },
  {
    "id": 6678,
    "category": "Materials",
    "text": "Steel is an alloy mainly made from iron and carbon. It is strong, durable, and widely used in buildings, bridges, vehicles, machines, tools, and infrastructure.",
    "question": "What is steel?"
  },
  {
    "id": 6679,
    "category": "Materials",
    "text": "Stainless steel is a steel alloy containing enough chromium to resist corrosion. It is commonly used for kitchen equipment, medical instruments, construction, appliances, and industrial applications.",
    "question": "What is stainless steel?"
  },
  {
    "id": 6680,
    "category": "Materials",
    "text": "Aluminum is a lightweight metal that resists corrosion and conducts heat and electricity well. It is widely used in aircraft, vehicles, buildings, packaging, electronics, and household products.",
    "question": "What is aluminum?"
  },
  {
    "id": 6681,
    "category": "Materials",
    "text": "Copper is a reddish-brown metal with excellent electrical and thermal conductivity. It is widely used in electrical wiring, electronics, plumbing, roofing, and heat exchangers.",
    "question": "What is copper?"
  },
  {
    "id": 6682,
    "category": "Materials",
    "text": "Iron is a strong, relatively dense metal that is widely used to produce steel. It is one of the most important metals in construction, manufacturing, machinery, and transportation.",
    "question": "What is iron?"
  },
  {
    "id": 6683,
    "category": "Materials",
    "text": "Titanium is a strong, lightweight metal with excellent corrosion resistance. It is used in aircraft, spacecraft, medical implants, sports equipment, and high-performance engineering applications.",
    "question": "What is titanium?"
  },
  {
    "id": 6684,
    "category": "Materials",
    "text": "Zinc is a bluish-white metal commonly used to protect steel from corrosion through galvanization. It is also used in batteries, alloys, construction products, and other industrial applications.",
    "question": "What is zinc?"
  },
  {
    "id": 6685,
    "category": "Materials",
    "text": "Brass is an alloy made mainly from copper and zinc. It is valued for its appearance, corrosion resistance, and ease of machining and is used in fittings, instruments, hardware, and decorative objects.",
    "question": "What is brass?"
  },
  {
    "id": 6686,
    "category": "Materials",
    "text": "Bronze is a group of copper-based alloys, traditionally containing tin. Bronze is strong and corrosion resistant and has been used for tools, sculptures, coins, bearings, and marine components.",
    "question": "What is bronze?"
  },
  {
    "id": 6687,
    "category": "Materials",
    "text": "An alloy is a material made by combining two or more elements, with at least one usually being a metal. Alloys are produced to obtain useful properties that individual elements may not have.",
    "question": "What is an alloy?"
  },
  {
    "id": 6688,
    "category": "Materials",
    "text": "A metal is generally a chemical element or material with good electrical and thermal conductivity, metallic appearance, and the ability to deform without breaking under suitable conditions.",
    "question": "What is a metal?"
  },
  {
    "id": 6689,
    "category": "Materials",
    "text": "Concrete is a construction material made by mixing cement, water, and aggregates such as sand and gravel or crushed stone. It hardens into a strong, durable material.",
    "question": "What is concrete?"
  },
  {
    "id": 6690,
    "category": "Materials",
    "text": "Cement is a powdered binding material that reacts with water and hardens. It is an important ingredient in concrete, mortar, grout, and many other construction materials.",
    "question": "What is cement?"
  },
  {
    "id": 6691,
    "category": "Materials",
    "text": "Mortar is a mixture commonly made from cement or lime, sand, and water. It is used to join bricks, blocks, and stones and to fill gaps between masonry units.",
    "question": "What is mortar?"
  },
  {
    "id": 6692,
    "category": "Materials",
    "text": "Brick is a small construction unit commonly made from clay or other mineral materials and hardened by firing. Bricks are widely used for walls, buildings, pavements, and other structures.",
    "question": "What is a brick?"
  },
  {
    "id": 6693,
    "category": "Materials",
    "text": "Clay is a fine-grained natural material made mainly of very small mineral particles. When mixed with water it can be shaped, and when dried or fired it becomes hard and durable.",
    "question": "What is clay?"
  },
  {
    "id": 6694,
    "category": "Materials",
    "text": "Ceramic is a hard, heat-resistant material usually made from inorganic nonmetallic substances such as clay and other minerals. Ceramics are used in pottery, tiles, bricks, sanitaryware, and technical applications.",
    "question": "What is ceramic?"
  },
  {
    "id": 6695,
    "category": "Materials",
    "text": "Porcelain is a type of fine ceramic made from carefully selected mineral materials and fired at high temperatures. It is strong, dense, and often white and is used for tableware, tiles, and sanitary products.",
    "question": "What is porcelain?"
  },
  {
    "id": 6696,
    "category": "Materials",
    "text": "Glass is a hard, transparent or translucent material commonly made by heating silica-rich materials with other substances until they melt and then cooling the mixture into a solid.",
    "question": "What is glass?"
  },
  {
    "id": 6697,
    "category": "Materials",
    "text": "Fiberglass is a material made from very fine glass fibers. It is lightweight, strong, corrosion resistant, and commonly used for insulation, construction products, boats, and composite materials.",
    "question": "What is fiberglass?"
  },
  {
    "id": 6698,
    "category": "Materials",
    "text": "Wood is a natural material obtained from trees and other woody plants. It is strong, relatively lightweight, renewable when responsibly managed, and widely used in construction, furniture, tools, and paper production.",
    "question": "What is wood?"
  },
  {
    "id": 6699,
    "category": "Materials",
    "text": "Hardwood comes mainly from broad-leaved trees such as oak, maple, beech, and walnut. Hardwoods are often dense and durable and are commonly used for furniture, flooring, and construction.",
    "question": "What is hardwood?"
  },
  {
    "id": 6700,
    "category": "Materials",
    "text": "Softwood comes mainly from coniferous trees such as pine, spruce, fir, and cedar. Softwoods are generally lightweight and are widely used in construction, furniture, paper, and packaging.",
    "question": "What is softwood?"
  },
  {
    "id": 6701,
    "category": "Materials",
    "text": "Plywood is an engineered wood product made by bonding several thin layers of wood veneer together, usually with the grain directions arranged at right angles for greater strength and stability.",
    "question": "What is plywood?"
  },
  {
    "id": 6702,
    "category": "Materials",
    "text": "Particleboard is an engineered wood product made by pressing wood particles together with adhesives under heat and pressure. It is commonly used in furniture and interior construction.",
    "question": "What is particleboard?"
  },
  {
    "id": 6703,
    "category": "Materials",
    "text": "MDF, or medium-density fibreboard, is an engineered wood product made from finely processed wood fibers combined with resin and compressed into dense panels. It is widely used in furniture and interior design.",
    "question": "What is MDF?"
  },
  {
    "id": 6704,
    "category": "Materials",
    "text": "Paper is a thin material made mainly from cellulose fibers obtained from wood, recycled paper, or other plant sources. It is used for writing, printing, packaging, and many other purposes.",
    "question": "What is paper?"
  },
  {
    "id": 6705,
    "category": "Materials",
    "text": "Cardboard is a thick paper-based material made from one or more layers of paper fibers. It is widely used for packaging, boxes, signs, and many temporary structures.",
    "question": "What is cardboard?"
  },
  {
    "id": 6706,
    "category": "Materials",
    "text": "Plastic is a group of synthetic materials made mainly from polymers. Plastics can be molded into many shapes and are widely used in packaging, construction, electronics, vehicles, and household products.",
    "question": "What is plastic?"
  },
  {
    "id": 6707,
    "category": "Materials",
    "text": "A polymer is a very large molecule made from many smaller repeating units called monomers. Polymers can be natural or synthetic and are the main building blocks of many plastics and fibers.",
    "question": "What is a polymer?"
  },
  {
    "id": 6708,
    "category": "Materials",
    "text": "Thermoplastics are plastics that can be softened by heating and hardened again by cooling. This allows many thermoplastics to be reshaped and recycled more easily than thermosetting plastics.",
    "question": "What are thermoplastics?"
  },
  {
    "id": 6709,
    "category": "Materials",
    "text": "Thermosetting plastics are polymers that become permanently hardened after being cured. Once fully set, they generally cannot be melted and reshaped like thermoplastics.",
    "question": "What are thermosetting plastics?"
  },
  {
    "id": 6710,
    "category": "Materials",
    "text": "Polyethylene is one of the most widely used plastics. It is used to make packaging, containers, pipes, films, bottles, and many household products.",
    "question": "What is polyethylene?"
  },
  {
    "id": 6711,
    "category": "Materials",
    "text": "PVC, or polyvinyl chloride, is a widely used plastic that can be rigid or flexible. It is commonly used for pipes, cables, flooring, window frames, and other construction products.",
    "question": "What is PVC?"
  },
  {
    "id": 6712,
    "category": "Materials",
    "text": "Polypropylene is a lightweight and durable plastic that resists many chemicals and can tolerate relatively high temperatures. It is used in packaging, containers, automotive parts, textiles, and household products.",
    "question": "What is polypropylene?"
  },
  {
    "id": 6713,
    "category": "Materials",
    "text": "Polystyrene is a synthetic plastic used in packaging, disposable products, insulation, and other applications. Expanded polystyrene is a lightweight foam commonly used for thermal insulation and protective packaging.",
    "question": "What is polystyrene?"
  },
  {
    "id": 6714,
    "category": "Materials",
    "text": "Rubber is an elastic material that can stretch and return toward its original shape. Natural rubber comes from latex produced by certain plants, while synthetic rubber is manufactured from chemical compounds.",
    "question": "What is rubber?"
  },
  {
    "id": 6715,
    "category": "Materials",
    "text": "Silicone is a family of synthetic polymers containing silicon and oxygen in their main chemical structure. Silicone materials are flexible, heat resistant, and widely used in seals, medical products, cookware, and electronics.",
    "question": "What is silicone?"
  },
  {
    "id": 6716,
    "category": "Materials",
    "text": "Textiles are materials made from fibers that are woven, knitted, bonded, or otherwise formed into fabrics. They are used for clothing, upholstery, bedding, industrial products, and many other applications.",
    "question": "What are textiles?"
  },
  {
    "id": 6717,
    "category": "Materials",
    "text": "Cotton is a natural plant fiber obtained from the cotton plant. It is soft, breathable, absorbent, and widely used to make clothing, household fabrics, and medical products.",
    "question": "What is cotton?"
  },
  {
    "id": 6718,
    "category": "Materials",
    "text": "Wool is a natural animal fiber obtained mainly from sheep and some other animals. It provides warmth, absorbs moisture, and is used in clothing, carpets, blankets, and other textiles.",
    "question": "What is wool?"
  },
  {
    "id": 6719,
    "category": "Materials",
    "text": "Silk is a natural protein fiber produced mainly by silkworms. It is smooth, strong for its weight, and valued for its appearance and use in clothing, textiles, and decorative products.",
    "question": "What is silk?"
  },
  {
    "id": 6720,
    "category": "Materials",
    "text": "Leather is a durable material made by processing animal hides or skins, usually through tanning. It is used for shoes, clothing, furniture, bags, belts, and other products.",
    "question": "What is leather?"
  },
  {
    "id": 6721,
    "category": "Materials",
    "text": "Nylon is a family of synthetic polymers commonly used to make strong and durable fibers. It is used in clothing, ropes, carpets, fishing lines, engineering parts, and many industrial products.",
    "question": "What is nylon?"
  },
  {
    "id": 6722,
    "category": "Materials",
    "text": "Polyester is a group of synthetic polymers widely used to produce fibers and fabrics. Polyester is durable, relatively resistant to wrinkles and moisture, and commonly used in clothing and household textiles.",
    "question": "What is polyester?"
  },
  {
    "id": 6723,
    "category": "Materials",
    "text": "A composite material is made by combining two or more different materials to produce properties that are difficult to achieve with the individual materials alone.",
    "question": "What is a composite material?"
  },
  {
    "id": 6724,
    "category": "Materials",
    "text": "Carbon fiber is a material made from very thin carbon-based fibers. It is lightweight, strong, and stiff and is used in aircraft, vehicles, bicycles, sporting equipment, and other high-performance products.",
    "question": "What is carbon fiber?"
  },
  {
    "id": 6725,
    "category": "Materials",
    "text": "Carbon-fiber-reinforced polymer is a composite made from carbon fibers embedded in a polymer matrix. It combines low weight with high strength and stiffness.",
    "question": "What is carbon-fiber-reinforced polymer?"
  },
  {
    "id": 6726,
    "category": "Materials",
    "text": "Fiberglass-reinforced plastic is a composite material made from glass fibers embedded in a polymer resin. It is strong, lightweight, corrosion resistant, and used in boats, vehicles, buildings, and industrial products.",
    "question": "What is fiberglass-reinforced plastic?"
  },
  {
    "id": 6727,
    "category": "Materials",
    "text": "Stone is a naturally occurring solid material made of one or more minerals. Natural stone is used in construction, roads, monuments, sculptures, flooring, countertops, and other products.",
    "question": "What is stone?"
  },
  {
    "id": 6728,
    "category": "Materials",
    "text": "Granite is a hard natural rock composed mainly of quartz, feldspar, and other minerals. It is widely used for buildings, countertops, monuments, flooring, and other applications.",
    "question": "What is granite?"
  },
  {
    "id": 6729,
    "category": "Materials",
    "text": "Marble is a natural stone formed when limestone or related carbonate rocks are transformed by heat and pressure. It is commonly used for buildings, sculptures, floors, walls, and countertops.",
    "question": "What is marble?"
  },
  {
    "id": 6730,
    "category": "Materials",
    "text": "Limestone is a sedimentary rock composed mainly of calcium carbonate. It is used as a building material and as an important raw material for producing cement and lime.",
    "question": "What is limestone?"
  },
  {
    "id": 6731,
    "category": "Materials",
    "text": "Sand is a loose material made of small mineral or rock particles. It is widely used in construction, glass production, foundries, landscaping, and many industrial processes.",
    "question": "What is sand?"
  },
  {
    "id": 6732,
    "category": "Materials",
    "text": "Gravel consists of loose pieces of rock and mineral material larger than typical sand particles. It is commonly used in concrete, roads, drainage systems, landscaping, and construction.",
    "question": "What is gravel?"
  },
  {
    "id": 6733,
    "category": "Materials",
    "text": "Gypsum is a soft mineral composed of calcium sulfate dihydrate. It is widely used to make plaster, drywall, plasterboard, and other construction materials.",
    "question": "What is gypsum?"
  },
  {
    "id": 6734,
    "category": "Materials",
    "text": "Plaster is a material applied as a paste or mixture to walls, ceilings, and other surfaces. It can be made from gypsum, lime, cement, or other binders.",
    "question": "What is plaster?"
  },
  {
    "id": 6735,
    "category": "Materials",
    "text": "Asphalt is a dark, sticky material made primarily from bitumen and mineral aggregates. It is widely used for roads, pavements, roofing, and waterproofing.",
    "question": "What is asphalt?"
  },
  {
    "id": 6736,
    "category": "Materials",
    "text": "Bitumen is a thick, dark, highly viscous material derived mainly from petroleum or found naturally. It is commonly used for road surfaces, roofing, and waterproofing.",
    "question": "What is bitumen?"
  },
  {
    "id": 6737,
    "category": "Materials",
    "text": "Adhesives are substances used to join two surfaces together. They include glues, epoxies, contact adhesives, and other materials designed to create bonds between different surfaces.",
    "question": "What are adhesives?"
  },
  {
    "id": 6738,
    "category": "Materials",
    "text": "Epoxy is a type of polymer material commonly used as an adhesive, protective coating, and component of composite materials. Once cured, epoxy can be strong, hard, and chemically resistant.",
    "question": "What is epoxy?"
  },
  {
    "id": 6739,
    "category": "Materials",
    "text": "Foam is a material containing many small gas-filled spaces within a solid or liquid structure. Solid foams are used for insulation, packaging, furniture, cushions, and protective products.",
    "question": "What is foam?"
  },
  {
    "id": 6740,
    "category": "Materials",
    "text": "Polystyrene foam is a lightweight plastic foam commonly used for thermal insulation and packaging. Its cellular structure contains many small spaces filled with air.",
    "question": "What is polystyrene foam?"
  },
  {
    "id": 6741,
    "category": "Materials",
    "text": "Mineral wool is an insulating material made from mineral fibers, commonly produced from rock or industrial materials. It is used for thermal insulation, sound insulation, and fire protection in buildings.",
    "question": "What is mineral wool?"
  },
  {
    "id": 6742,
    "category": "Materials",
    "text": "Fiberglass insulation is an insulating material made from very fine glass fibers. The fibers trap air and reduce heat transfer, making fiberglass widely used in buildings.",
    "question": "What is fiberglass insulation?"
  },
  {
    "id": 6743,
    "category": "Materials",
    "text": "Insulation is a material or construction layer designed to reduce the transfer of heat, sound, electricity, or other forms of energy between different areas.",
    "question": "What is insulation?"
  },
  {
    "id": 6744,
    "category": "Materials",
    "text": "A semiconductor is a material whose electrical conductivity is between that of a conductor and an insulator. Silicon is the most widely used semiconductor material in modern electronics.",
    "question": "What is a semiconductor?"
  },
  {
    "id": 6745,
    "category": "Materials",
    "text": "Silicon is a chemical element widely used in electronics because its electrical properties can be precisely controlled. It is also an important component of glass, ceramics, and many minerals.",
    "question": "What is silicon?"
  },
  {
    "id": 6746,
    "category": "Materials",
    "text": "Graphite is a form of carbon with atoms arranged in layers. It conducts electricity, is soft and slippery, and is used in pencils, lubricants, batteries, and industrial applications.",
    "question": "What is graphite?"
  },
  {
    "id": 6747,
    "category": "Materials",
    "text": "Diamond is a crystalline form of carbon in which the atoms are strongly bonded in a three-dimensional structure. It is extremely hard and is used in jewelry and cutting tools.",
    "question": "What is diamond?"
  },
  {
    "id": 6748,
    "category": "Materials",
    "text": "Ceramic materials generally resist high temperatures, corrosion, and wear and are often electrically insulating. These properties make ceramics useful in construction, cookware, electronics, and engineering.",
    "question": "What are the main properties of ceramics?"
  },
  {
    "id": 6749,
    "category": "Materials",
    "text": "Hardness is a material property describing its resistance to scratching, indentation, or permanent deformation. Hard materials are generally more difficult to scratch or deform.",
    "question": "What is hardness?"
  },
  {
    "id": 6750,
    "category": "Materials",
    "text": "Strength is a material's ability to withstand an applied force without failing. Different types of strength include tensile, compressive, shear, and bending strength.",
    "question": "What is material strength?"
  },
  {
    "id": 6751,
    "category": "Materials",
    "text": "Tensile strength is the maximum pulling stress a material can withstand before it breaks or fails. It is an important property for materials used in structures, cables, and mechanical parts.",
    "question": "What is tensile strength?"
  },
  {
    "id": 6752,
    "category": "Materials",
    "text": "Compressive strength is a material's ability to withstand forces that push or squeeze it without failing. Concrete and many types of stone have high compressive strength.",
    "question": "What is compressive strength?"
  },
  {
    "id": 6753,
    "category": "Materials",
    "text": "Elasticity is the ability of a material to deform when a force is applied and return toward its original shape when the force is removed.",
    "question": "What is elasticity?"
  },
  {
    "id": 6754,
    "category": "Materials",
    "text": "Plasticity is the ability of a material to undergo permanent deformation without breaking. Materials with high plasticity can be reshaped and remain in their new form.",
    "question": "What is plasticity?"
  },
  {
    "id": 6755,
    "category": "Materials",
    "text": "Brittleness is the tendency of a material to break or fracture with relatively little permanent deformation. Glass and many ceramics are examples of relatively brittle materials.",
    "question": "What is brittleness?"
  },
  {
    "id": 6756,
    "category": "Materials",
    "text": "Ductility is the ability of a material to undergo significant deformation under tension before breaking. Many metals, including copper and aluminum, are relatively ductile.",
    "question": "What is ductility?"
  },
  {
    "id": 6757,
    "category": "Materials",
    "text": "Malleability is the ability of a material to be permanently shaped by compression without breaking. Many metals can be hammered or rolled into thin sheets because they are malleable.",
    "question": "What is malleability?"
  },
  {
    "id": 6758,
    "category": "Materials",
    "text": "Density is the amount of mass contained in a given volume of a material. It helps describe how heavy a material is for its size.",
    "question": "What is material density?"
  },
  {
    "id": 6759,
    "category": "Materials",
    "text": "Thermal conductivity is a measure of how easily a material transfers heat. Metals such as copper and aluminum have high thermal conductivity, while materials such as foam have low thermal conductivity.",
    "question": "What is thermal conductivity?"
  },
  {
    "id": 6760,
    "category": "Materials",
    "text": "Electrical conductivity describes how easily electric current can pass through a material. Metals such as copper and aluminum are good electrical conductors, while rubber and glass are generally insulators.",
    "question": "What is electrical conductivity?"
  },
  {
    "id": 6761,
    "category": "Materials",
    "text": "Corrosion is the gradual deterioration of a material caused by chemical or electrochemical reactions with its environment. Metals such as iron can corrode when exposed to oxygen and moisture.",
    "question": "What is corrosion?"
  },
  {
    "id": 6762,
    "category": "Materials",
    "text": "Rust is a group of iron oxides that forms when iron or steel reacts with oxygen and moisture. Rust weakens exposed metal over time if corrosion is not controlled.",
    "question": "What is rust?"
  },
  {
    "id": 6763,
    "category": "Materials",
    "text": "Galvanization is a process of coating iron or steel with zinc to protect it from corrosion. The zinc layer provides a physical barrier and can also provide sacrificial protection.",
    "question": "What is galvanization?"
  },
  {
    "id": 6764,
    "category": "Materials",
    "text": "Recycling is the process of collecting and processing used materials so that their material content can be used to make new products. Metals, glass, paper, and some plastics can be recycled.",
    "question": "What is material recycling?"
  },
  {
    "id": 6765,
    "category": "Materials",
    "text": "Biodegradable materials are materials that can be broken down by microorganisms and natural biological processes under suitable conditions. Some natural materials are biodegradable, while many conventional plastics degrade very slowly.",
    "question": "What are biodegradable materials?"
  },
  {
    "id": 6766,
    "category": "Materials",
    "text": "A renewable material comes from a resource that can naturally replenish within a relatively short period. Wood, bamboo, cotton, and other plant-based materials can be renewable when their sources are responsibly managed.",
    "question": "What are renewable materials?"
  },
  {
    "id": 6767,
    "category": "Materials",
    "text": "Bamboo is a fast-growing grass that can be used as a material for construction, furniture, flooring, tools, and other products. It can be renewable when harvested and managed sustainably.",
    "question": "What is bamboo?"
  },
  {
    "id": 6768,
    "category": "Materials",
    "text": "Cork is a lightweight, flexible natural material harvested from the bark of cork oak trees without normally killing the tree. It is used for bottle stoppers, flooring, insulation, and other products.",
    "question": "What is cork?"
  },
  {
    "id": 6769,
    "category": "Materials",
    "text": "Natural rubber is an elastic material obtained mainly from latex produced by rubber trees. It is used in tires, gloves, seals, elastic products, and many other applications.",
    "question": "What is natural rubber?"
  },
  {
    "id": 6770,
    "category": "Materials",
    "text": "A biomaterial is a material designed to interact with living biological systems for medical or therapeutic purposes. Biomaterials are used in implants, prosthetics, tissue engineering, and medical devices.",
    "question": "What is a biomaterial?"
  },
  {
    "id": 6771,
    "category": "Materials",
    "text": "A smart material is a material that can change one or more of its properties in response to external conditions such as temperature, light, pressure, electricity, or magnetic fields.",
    "question": "What is a smart material?"
  },
  {
    "id": 6772,
    "category": "Materials",
    "text": "Shape-memory alloys are metals that can return to a previously defined shape after being deformed when exposed to an appropriate temperature. They are used in medical devices, engineering, and other applications.",
    "question": "What is a shape-memory alloy?"
  },
  {
    "id": 6773,
    "category": "Materials",
    "text": "Aerogel is an extremely lightweight solid material with a highly porous structure containing a large amount of air. Some aerogels have excellent thermal insulation properties.",
    "question": "What is aerogel?"
  },
  {
    "id": 6774,
    "category": "Materials",
    "text": "Graphene is a single layer of carbon atoms arranged in a two-dimensional honeycomb structure. It has exceptional electrical, thermal, and mechanical properties and is studied for many advanced applications.",
    "question": "What is graphene?"
  },
  {
    "id": 6775,
    "category": "Materials",
    "text": "Kevlar is a strong synthetic aramid fiber known for its high tensile strength and resistance to heat. It is used in protective clothing, ropes, composites, and other high-performance products.",
    "question": "What is Kevlar?"
  },
  {
    "id": 6776,
    "category": "Materials",
    "text": "Aramid fibers are a family of strong synthetic fibers that resist heat and have high tensile strength. They are used in protective clothing, ropes, tires, aerospace components, and composites.",
    "question": "What are aramid fibers?"
  },
  {
    "id": 6777,
    "category": "Materials",
    "text": "A refractory material is designed to withstand extremely high temperatures without melting or losing its useful properties. Refractories are used to line furnaces, kilns, reactors, and other high-temperature equipment.",
    "question": "What are refractory materials?"
  },
  {
    "id": 6778,
    "category": "Materials",
    "text": "A waterproof material resists the passage of liquid water. Waterproofing materials are used in roofs, foundations, bathrooms, clothing, containers, and other products where protection from water is required.",
    "question": "What is a waterproof material?"
  },
  {
    "id": 6779,
    "category": "Materials",
    "text": "A fire-resistant material is designed to resist ignition, slow the spread of fire, or maintain useful properties when exposed to high temperatures. Fire-resistant materials are important in buildings and protective equipment.",
    "question": "What is a fire-resistant material?"
  },
  {
    "id": 6780,
    "category": "Materials",
    "text": "Material selection is the process of choosing a suitable material for a particular product or structure based on properties such as strength, weight, durability, cost, temperature resistance, and environmental impact.",
    "question": "How are materials selected for products?"
  },
  {
    "id": 6781,
    "category": "Materials",
    "text": "Material properties describe how a material behaves under different physical, chemical, thermal, electrical, or mechanical conditions. Important properties include strength, hardness, density, elasticity, conductivity, and durability.",
    "question": "What are material properties?"
  },
  {
    "id": 6782,
    "category": "Materials",
    "text": "Durability is the ability of a material to maintain its useful properties and resist damage or deterioration over time under expected conditions of use.",
    "question": "What is material durability?"
  },
  {
    "id": 6783,
    "category": "Materials",
    "text": "A conductor is a material that allows heat or electricity to pass through it relatively easily. Metals such as copper and aluminum are common electrical and thermal conductors.",
    "question": "What is a conductor?"
  },
  {
    "id": 6784,
    "category": "Materials",
    "text": "An insulator is a material that strongly resists the flow of electricity, heat, or another form of energy. Rubber, glass, foam, and many ceramics can act as insulators.",
    "question": "What is an insulator?"
  },
  {
    "id": 6785,
    "category": "Materials",
    "text": "A coating is a layer of material applied to the surface of another material to protect it, improve its appearance, reduce corrosion, resist chemicals, or provide other useful properties.",
    "question": "What is a material coating?"
  },
  {
    "id": 6786,
    "category": "Materials",
    "text": "Powder coating is a finishing process in which a dry polymer powder is applied to a surface and then heated so that it melts and forms a continuous protective coating.",
    "question": "What is powder coating?"
  },
  {
    "id": 6787,
    "category": "Materials",
    "text": "A laminate is a material made by bonding multiple layers together. Laminates can combine different materials or layers to provide improved strength, appearance, durability, moisture resistance, or other properties.",
    "question": "What is a laminate?"
  },
  {
    "id": 6788,
    "category": "Materials",
    "text": "Engineered wood is made by processing wood fibers, particles, or veneers and bonding them together to create products with controlled properties. Examples include plywood, MDF, and particleboard.",
    "question": "What is engineered wood?"
  },
  {
    "id": 6789,
    "category": "Materials",
    "text": "Building materials are materials used to construct and finish buildings and other structures. Common examples include concrete, steel, brick, wood, glass, stone, insulation, plaster, and drywall.",
    "question": "What are building materials?"
  },
  {
    "id": 6790,
    "category": "Materials",
    "text": "The main materials used in modern construction include concrete, steel, wood, masonry, glass, aluminum, stone, plastics, insulation, and engineered wood products. Different materials are selected for different structural and functional requirements.",
    "question": "What are the main construction materials?"
  },
  {
    "id": 6791,
    "category": "Materials",
    "text": "Materials can be combined to take advantage of different properties. For example, reinforced concrete combines concrete's compressive strength with steel's tensile strength.",
    "question": "Why are different materials combined?"
  },
  {
    "id": 6792,
    "category": "Materials",
    "text": "Reinforced concrete is concrete containing steel bars, mesh, or other reinforcement. The concrete carries much of the compression while the reinforcement helps resist tension and cracking.",
    "question": "What is reinforced concrete?"
  },
  {
    "id": 6793,
    "category": "Materials",
    "text": "Prestressed concrete is concrete in which internal stresses are deliberately introduced using tensioned steel reinforcement. This can increase structural capacity and reduce cracking and deflection.",
    "question": "What is prestressed concrete?"
  },
  {
    "id": 6794,
    "category": "Materials",
    "text": "Glass fiber is a thin strand of glass used individually or in bundles to provide strength, reinforcement, insulation, or other properties. Glass fibers are important in fiberglass and composite materials.",
    "question": "What is glass fiber?"
  },
  {
    "id": 6795,
    "category": "Materials",
    "text": "A fiber is a long, thin material with a high length-to-width ratio. Fibers can be natural or synthetic and are used in textiles, composites, insulation, ropes, and many industrial products.",
    "question": "What is a fiber?"
  },
  {
    "id": 6796,
    "category": "Materials",
    "text": "Natural fibers come from plants or animals. Common examples include cotton, linen, hemp, wool, and silk, and they are widely used in textiles and other products.",
    "question": "What are natural fibers?"
  },
  {
    "id": 6797,
    "category": "Materials",
    "text": "Synthetic fibers are manufactured from chemical polymers rather than obtained directly from plants or animals. Common examples include polyester, nylon, acrylic, and polypropylene fibers.",
    "question": "What are synthetic fibers?"
  },
  {
    "id": 6798,
    "category": "Materials",
    "text": "Acrylic is a synthetic polymer material that can be made into transparent sheets, fibers, coatings, and other products. Acrylic sheets are lightweight and can be clearer and more impact resistant than ordinary glass in some applications.",
    "question": "What is acrylic?"
  },
  {
    "id": 6799,
    "category": "Materials",
    "text": "Polycarbonate is a strong, transparent thermoplastic known for its impact resistance. It is used in safety glazing, protective equipment, electronics, vehicle components, and other products.",
    "question": "What is polycarbonate?"
  },
  {
    "id": 6800,
    "category": "Materials",
    "text": "ABS, or acrylonitrile butadiene styrene, is a tough thermoplastic commonly used in consumer products, electronics housings, automotive components, pipes, and 3D printing.",
    "question": "What is ABS plastic?"
  }
];