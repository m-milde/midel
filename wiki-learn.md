<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Free use; no sale, rebrand, or profit from this software. See LICENSE. -->

Question list for Midel **batch Wikipedia teaching** (`npm run wiki:learn`). Not loaded by the chat page. Larger corpus: **`wiki-learn-expanded.md`**. Full design: [MODEL.md — Batch Wikipedia learning](MODEL.md#batch-wikipedia-learning-from-wiki-learnmd).

Requires **`save_taught.py`** on port **8787** for saves (one process only). New rows append to **`taught_facts.js`** with sequential **Teaching** ids; then **`npm run audit:ids`** and **`npm run learn:new:loop`** to train **`stage3_brain.js`**. Chat lookup can use the writer or direct Wikipedia; the batch defaults to direct lookup with throttling.

---

General concepts

* What is utopia?
* What is dystopia?
* What is philosophy?
* What is democracy?
* What is capitalism?
* What is socialism?
* What is communism?
* What is freedom?
* What is justice?
* What is equality?
* What is morality?
* What is ethics?
* What is logic?
* What is knowledge?
* What is consciousness?
* What is reality?
* What is truth?
* What is probability?
* What is infinity?
* What is time?
* What is space?
* What is causality?
* What is evolution?
* What is civilization?
* What is culture?
* What is society?
* What is globalization?
* What is nationalism?
* What is colonialism?
* What is imperialism?
* What is revolution?

Computing & Internet

* What is a computer?
* What is a computer network?
* What is the Internet?
* What is the World Wide Web?
* What is a website?
* What is a web browser?
* What is a search engine?
* What is a server?
* What is a client?
* What is a database?
* What is a database management system?
* What is a file system?
* What is an operating system?
* What is Linux?
* What is Windows?
* What is macOS?
* What is Android?
* What is iOS?
* What is an application?
* What is software?
* What is hardware?
* What is firmware?
* What is an algorithm?
* What is source code?
* What is a programming language?
* What is an API?
* What is a framework?
* What is a library?
* What is a compiler?
* What is an interpreter?
* What is a virtual machine?
* What is cloud computing?
* What is edge computing?
* What is virtualization?
* What is a virtual private network?
* What is an intranet?
* What is an extranet?
* What is a domain name?
* What is an IP address?
* What is DNS?
* What is HTTP?
* What is HTTPS?
* What is HTML?
* What is CSS?
* What is JavaScript?
* What is JSON?
* What is XML?
* What is a cookie?
* What is a hyperlink?
* What is a hyperlink anchor?
* What is a URL?
* What is a web server?
* What is a proxy server?
* What is a firewall?
* What is encryption?
* What is authentication?
* What is authorization?
* What is cybersecurity?
* What is malware?
* What is a computer virus?
* What is ransomware?
* What is phishing?
* What is spam?

For example, Wikipedia defines an extranet as a controlled private computer network that allows communication with authorized external parties such as business partners, suppliers, vendors, or customers.  

AI & Machine Learning

* What is artificial intelligence?
* What is machine learning?
* What is deep learning?
* What is a neural network?
* What is a neuron?
* What is a perceptron?
* What is a transformer?
* What is a large language model?
* What is generative AI?
* What is natural language processing?
* What is computer vision?
* What is speech recognition?
* What is reinforcement learning?
* What is supervised learning?
* What is unsupervised learning?
* What is a training dataset?
* What is a model?
* What is an AI inference?
* What is a parameter in machine learning?
* What is an embedding?
* What is a vector database?
* What is a token in AI?
* What is tokenization?
* What is a prompt?
* What is prompt engineering?
* What is an AI hallucination?
* What is overfitting?
* What is underfitting?
* What is an AI benchmark?
* What is a knowledge base?
* What is an expert system?
* What is a chatbot?
* What is an AI agent?
* What is synthetic data?
* What is computer-generated imagery?

Design

* What is graphic design?
* What is visual design?
* What is communication design?
* What is web design?
* What is user interface design?
* What is user experience design?
* What is interaction design?
* What is product design?
* What is industrial design?
* What is typography?
* What is a typeface?
* What is a font?
* What is a serif?
* What is a sans-serif?
* What is kerning?
* What is tracking?
* What is leading?
* What is a baseline?
* What is a grid?
* What is composition?
* What is visual hierarchy?
* What is balance in design?
* What is contrast?
* What is alignment?
* What is proximity?
* What is repetition?
* What is whitespace?
* What is negative space?
* What is color theory?
* What is a color wheel?
* What is hue?
* What is saturation?
* What is brightness?
* What is value in color?
* What is a gradient?
* What is a palette?
* What is a design system?
* What is a design token?
* What is a component?
* What is a wireframe?
* What is a prototype?
* What is a mockup?
* What is responsive design?
* What is accessibility in design?
* What is a user persona?
* What is a user journey?
* What is a design pattern?
* What is brutalism in web design?
* What is minimalism in design?
* What is skeuomorphism?
* What is neumorphism?
* What is glassmorphism?

Science

* What is physics?
* What is chemistry?
* What is biology?
* What is astronomy?
* What is geology?
* What is ecology?
* What is genetics?
* What is microbiology?
* What is an atom?
* What is a molecule?
* What is an element?
* What is a chemical compound?
* What is a chemical reaction?
* What is gravity?
* What is energy?
* What is mass?
* What is matter?
* What is electricity?
* What is magnetism?
* What is light?
* What is sound?
* What is temperature?
* What is pressure?
* What is a force?
* What is velocity?
* What is acceleration?
* What is a black hole?
* What is a galaxy?
* What is a star?
* What is a planet?
* What is an asteroid?
* What is a comet?
* What is a nebula?
* What is a fossil?
* What is DNA?
* What is RNA?
* What is a chromosome?
* What is a cell?
* What is a bacterium?
* What is a virus?
* What is photosynthesis?
* What is respiration?
* What is an ecosystem?

History & Civilization

* What is history?
* What is prehistory?
* What is archaeology?
* What is an empire?
* What is a kingdom?
* What is a republic?
* What is a city-state?
* What is a dynasty?
* What is a monarchy?
* What is feudalism?
* What is the Renaissance?
* What is the Enlightenment?
* What was the Industrial Revolution?
* What was the French Revolution?
* What was the American Revolution?
* What was the Roman Empire?
* What was the Byzantine Empire?
* What was the Ottoman Empire?
* What was the Mongol Empire?
* What was the First Bulgarian Empire?
* What was the Second Bulgarian Empire?
* What was the Cold War?
* What was the Iron Curtain?
* What was the Silk Road?
* What was the Magna Carta?
* What was the Black Death?
* What was the Protestant Reformation?

Geography

* What is geography?
* What is a continent?
* What is a country?
* What is a state?
* What is a province?
* What is a municipality?
* What is a capital city?
* What is a border?
* What is a peninsula?
* What is an island?
* What is an archipelago?
* What is a mountain?
* What is a mountain range?
* What is a valley?
* What is a plateau?
* What is a desert?
* What is a rainforest?
* What is a river?
* What is a lake?
* What is a waterfall?
* What is an ocean?
* What is a sea?
* What is a strait?
* What is a gulf?
* What is a climate?
* What is a biome?
* What is the equator?
* What is the Prime Meridian?
* What is latitude?
* What is longitude?
* What is a time zone?

Everyday objects & technology

* What is a bicycle?
* What is an automobile?
* What is an engine?
* What is a battery?
* What is an electric motor?
* What is a camera?
* What is a lens?
* What is a microphone?
* What is a speaker?
* What is a television?
* What is a radio?
* What is a satellite?
* What is a drone?
* What is a robot?
* What is a 3D printer?
* What is a telescope?
* What is a microscope?
* What is a thermometer?
* What is a compass?
* What is a clock?
* What is a watch?
* What is a refrigerator?
* What is a washing machine?
* What is a dishwasher?
* What is a microwave oven?
* What is an electric vehicle?
* What is a solar panel?
* What is a wind turbine?

Mathematics

* What is mathematics?
* What is a number?
* What is an integer?
* What is a fraction?
* What is a decimal?
* What is a percentage?
* What is a prime number?
* What is an even number?
* What is an odd number?
* What is an equation?
* What is an inequality?
* What is algebra?
* What is geometry?
* What is trigonometry?
* What is calculus?
* What is statistics?
* What is probability?
* What is a function?
* What is a variable?
* What is a constant?
* What is a vector?
* What is a matrix?
* What is a triangle?
* What is a polygon?
* What is a circle?
* What is a sphere?
* What is a cube?
* What is a fractal?

Arts & Culture

* What is art?
* What is painting?
* What is sculpture?
* What is photography?
* What is illustration?
* What is architecture?
* What is music?
* What is literature?
* What is poetry?
* What is a novel?
* What is a short story?
* What is a theater?
* What is cinema?
* What is animation?
* What is a documentary?
* What is a portrait?
* What is a landscape painting?
* What is surrealism?
* What is impressionism?
* What is cubism?
* What is expressionism?
* What is modernism?
* What is postmodernism?
* What is pop art?
* What is abstract art?
* What is realism?
* What is symbolism?

Psychology & Human Behavior

* What is psychology?
* What is memory?
* What is perception?
* What is attention?
* What is learning?
* What is intelligence?
* What is emotion?
* What is motivation?
* What is personality?
* What is behavior?
* What is communication?
* What is language?
* What is empathy?
* What is creativity?
* What is imagination?
* What is habit?
* What is stress?
* What is sleep?
* What is dreaming?
* What is social psychology?
* What is cognitive psychology?
* What is behavioral psychology?

Business & Economics

* What is economics?
* What is a business?
* What is a company?
* What is a corporation?
* What is a startup?
* What is entrepreneurship?
* What is a market?
* What is supply?
* What is demand?
* What is inflation?
* What is deflation?
* What is a recession?
* What is gross domestic product?
* What is a currency?
* What is a bank?
* What is a loan?
* What is interest?
* What is a mortgage?
* What is a stock?
* What is a bond?
* What is a stock market?
* What is an investment?
* What is a dividend?
* What is profit?
* What is revenue?
* What is a budget?
* What is taxation?
* What is insurance?
* What is a premium?
* What is a contract?
* What is a supply chain?
* What is marketing?
* What is advertising?
* What is branding?

Philosophy, religion & ideas

* What is religion?
* What is mythology?
* What is theology?
* What is atheism?
* What is agnosticism?
* What is spirituality?
* What is humanism?
* What is existentialism?
* What is stoicism?
* What is nihilism?
* What is determinism?
* What is free will?
* What is utilitarianism?
* What is existentialism?
* What is Buddhism?
* What is Christianity?
* What is Islam?
* What is Hinduism?
* What is Judaism?
* What is Taoism?
* What is Confucianism?

Government & society

* What is a government?
* What is a constitution?
* What is a parliament?
* What is a congress?
* What is a legislature?
* What is a judiciary?
* What is an executive branch?
* What is a political party?
* What is an election?
* What is a referendum?
* What is a citizen?
* What is citizenship?
* What is a law?
* What is a court?
* What is a legal system?
* What is a treaty?
* What is diplomacy?
* What is a municipality?
* What is a census?
* What is a public service?

Nature & environment

* What is nature?
* What is the environment?
* What is an ecosystem?
* What is biodiversity?
* What is conservation?
* What is pollution?
* What is climate change?
* What is global warming?
* What is recycling?
* What is renewable energy?
* What is solar energy?
* What is wind energy?
* What is hydropower?
* What is a forest?
* What is a wetland?
* What is an endangered species?
* What is extinction?
* What is a food chain?
* What is a food web?
* What is a habitat?
* What is migration?
* What is hibernation?

This style is particularly useful because a question such as “What is utopia?” maps very naturally to a Wikipedia article, while the resulting article can teach the model definition, origin, history, related concepts, examples, and terminology. Wikipedia describes utopia as an imagined society with highly desirable or near-perfect qualities, and also connects it to concepts such as dystopia and utopian literature.  

For your Midel teaching corpus, I’d actually go beyond “What is X?”. A much richer question-generation strategy would include:

* What is X?
* Who was X?
* What was X?
* Where is X?
* When did X happen?
* Why is X important?
* How does X work?
* How did X develop?
* What are the main types of X?
* What are examples of X?
* What is the difference between X and Y?
* What is the history of X?
* What are the advantages of X?
* What are the disadvantages of X?
* What is X used for?
* What is X made of?
* How is X different from Y?