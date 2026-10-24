<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Free use; no sale, rebrand, or profit from this software. See LICENSE. -->

# Midel Wikipedia Teaching Questions — Expanded

Generated from the existing wiki-learn.md corpus using practical, type-aware question templates.

The corpus keeps the original concepts and adds questions about definitions, importance, types, examples, history, operation, development, use, composition, and selected comparisons. Questions that would be semantically inappropriate for a concept are intentionally omitted.

`npm run wiki:learn` skips **`[+]`** and **`[x]`**. Default **4s** between questions; lookups use **direct Wikipedia** (throttled). On **429** the batch waits and retries (does not mark **`[x]`**). Saves use the writer **`nextId`** (Teaching ids **3001+**, skipping pack blocks like gemstone **4001–4040**). After a batch: **`npm run audit:ids`**, reload the lab, then **`npm run learn:new:loop`**. **`save_taught.py`** on port **8787** required for saves. See **`MODEL.md`** (batch, Teaching ids, learn-new).

## General concepts

* [+] What is utopia?
* [+] What is dystopia?
* [+] What is philosophy?
* [+] What is democracy?
* [+] What is capitalism?
* [+] What is socialism?
* [+] What is communism?
* [+] What is freedom?
* [+] What is justice?
* [+] What is equality?
* [+] What is morality?
* [+] What is ethics?
* [+] What is logic?
* [+] What is knowledge?
* [+] What is consciousness?
* [+] What is reality?
* [+] What is truth?
* [+] What is probability?
* [+] What is infinity?
* [+] What is time?
* [+] What is space?
* [+] What is causality?
* [+] What is evolution?
* [+] What is civilization?
* [+] What is culture?
* [+] What is society?
* [+] What is globalization?
* [+] What is nationalism?
* [x] What is colonialism?
* [+] What is imperialism?
* [+] What is revolution?
* [+] Why is utopia important?
* [x] What are the main types of utopia?
* [x] What are examples of utopia?
* [x] What is the history of utopia?
* [x] What is utopia used for?
* [+] How does utopia work?
* [+] How did utopia develop?
* [x] What is the difference between utopia and dystopia?
* [x] How is utopia different from dystopia?
* [x] Why is dystopia important?
* [x] What are the main types of dystopia?
* [x] What are examples of dystopia?
* [x] What is the history of dystopia?
* [x] What is dystopia used for?
* [x] How does dystopia work?
* [x] How did dystopia develop?
* [x] Why is philosophy important?
* [x] What are the main types of philosophy?
* [x] What are examples of philosophy?
* [x] What is the history of philosophy?
* [x] What is philosophy used for?
* [x] How does philosophy work?
* [x] How did philosophy develop?
* [x] Why is democracy important?
* [x] What are the main types of democracy?
* [x] What are examples of democracy?
* [x] What is the history of democracy?
* [x] What is democracy used for?
* [x] How does democracy work?
* [+] How did democracy develop?
* [x] When did democracy begin?
* [x] What is the difference between democracy and communism?
* [x] How is democracy different from communism?
* [x] Why is capitalism important?
* [x] What are the main types of capitalism?
* [x] What are examples of capitalism?
* [x] What is the history of capitalism?
* [x] What is capitalism used for?
* [x] How does capitalism work?
* [x] How did capitalism develop?
* [x] When did capitalism begin?
* [x] What is the difference between capitalism and socialism?
* [x] How is capitalism different from socialism?
* [x] Why is socialism important?
* [x] What are the main types of socialism?
* [x] What are examples of socialism?
* [x] What is the history of socialism?
* [x] What is socialism used for?
* [x] How does socialism work?
* [x] How did socialism develop?
* [x] When did socialism begin?
* [x] Why is communism important?
* [+] What are the main types of communism?
* [+] What are examples of communism?
* [+] What is the history of communism?
* [+] What is communism used for?
* [+] How does communism work?
* [+] How did communism develop?
* [+] When did communism begin?
* [+] Why is freedom important?
* [+] What are the main types of freedom?
* [+] What are examples of freedom?
* [+] What is the history of freedom?
* [+] What is freedom used for?
* [+] How does freedom work?
* [+] How did freedom develop?
* [x] When did freedom begin?
* [+] Why is justice important?
* [+] What are the main types of justice?
* [+] What are examples of justice?
* [+] What is the history of justice?
* [+] What is justice used for?
* [+] How does justice work?
* [+] How did justice develop?
* [x] When did justice begin?
* [+] Why is equality important?
* [+] What are the main types of equality?
* [+] What are examples of equality?
* [+] What is the history of equality?
* [+] What is equality used for?
* [+] How does equality work?
* [+] How did equality develop?
* [x] When did equality begin?
* [+] Why is morality important?
* [+] What are the main types of morality?
* [+] What are examples of morality?
* [+] What is the history of morality?
* [+] What is morality used for?
* [+] How does morality work?
* [+] How did morality develop?
* [x] When did morality begin?
* [+] Why is ethics important?
* [+] What are the main types of ethics?
* [+] What are examples of ethics?
* [+] What is the history of ethics?
* [+] What is ethics used for?
* [+] How does ethics work?
* [+] How did ethics develop?
* [x] When did ethics begin?
* [+] Why is logic important?
* [+] What are the main types of logic?
* [+] What are examples of logic?
* [+] What is the history of logic?
* [+] What is logic used for?
* [+] How does logic work?
* [+] How did logic develop?
* [x] When did logic begin?
* [+] Why is knowledge important?
* [+] What are the main types of knowledge?
* [+] What are examples of knowledge?
* [+] What is the history of knowledge?
* [+] What is knowledge used for?
* [+] How does knowledge work?
* [+] How did knowledge develop?
* [x] When did knowledge begin?
* [+] Why is consciousness important?
* [+] What are the main types of consciousness?
* [+] What are examples of consciousness?
* [+] What is the history of consciousness?
* [+] What is consciousness used for?
* [+] How does consciousness work?
* [+] How did consciousness develop?
* [+] When did consciousness begin?
* [+] Why is reality important?
* [+] What are the main types of reality?
* [+] What are examples of reality?
* [+] What is the history of reality?
* [+] What is reality used for?
* [+] How does reality work?
* [+] How did reality develop?
* [x] When did reality begin?
* [+] Why is truth important?
* [+] What are the main types of truth?
* [+] What are examples of truth?
* [+] What is the history of truth?
* [+] What is truth used for?
* [+] How does truth work?
* [+] How did truth develop?
* [x] When did truth begin?
* [+] Why is probability important?
* [+] What are the main types of probability?
* [+] What are examples of probability?
* [+] What is the history of probability?
* [+] What is probability used for?
* [+] How does probability work?
* [+] How did probability develop?
* [x] When did probability begin?
* [+] Why is infinity important?
* [+] What are the main types of infinity?
* [+] What are examples of infinity?
* [+] What is the history of infinity?
* [+] What is infinity used for?
* [+] How does infinity work?
* [+] How did infinity develop?
* [x] When did infinity begin?
* [+] Why is time important?
* [+] What are the main types of time?
* [+] What are examples of time?
* [+] What is the history of time?
* [+] What is time used for?
* [+] How does time work?
* [x] How did time develop?
* [+] When did time begin?
* [+] Why is space important?
* [+] What are the main types of space?
* [+] What are examples of space?
* [+] What is the history of space?
* [+] What is space used for?
* [+] How does space work?
* [+] How did space develop?
* [+] When did space begin?
* [+] Why is causality important?
* [+] What are the main types of causality?
* [+] What are examples of causality?
* [+] What is the history of causality?
* [+] What is causality used for?
* [+] How does causality work?
* [+] How did causality develop?
* [x] When did causality begin?
* [+] Why is evolution important?
* [x] What are the main types of evolution?
* [+] What are examples of evolution?
* [+] What is the history of evolution?
* [+] What is evolution used for?
* [+] How does evolution work?
* [+] How did evolution develop?
* [+] When did evolution begin?
* [+] Why is civilization important?
* [+] What are the main types of civilization?
* [+] What are examples of civilization?
* [+] What is the history of civilization?
* [+] What is civilization used for?
* [+] How does civilization work?
* [+] How did civilization develop?
* [x] When did civilization begin?
* [+] Why is culture important?
* [+] What are the main types of culture?
* [+] What are examples of culture?
* [+] What is the history of culture?
* [+] What is culture used for?
* [+] How does culture work?
* [+] How did culture develop?
* [x] When did culture begin?
* [+] Why is society important?
* [+] What are the main types of society?
* [+] What are examples of society?
* [+] What is the history of society?
* [+] What is society used for?
* [+] How does society work?
* [+] How did society develop?
* [x] When did society begin?
* [+] Why is globalization important?
* [+] What are the main types of globalization?
* [+] What are examples of globalization?
* [+] What is the history of globalization?
* [+] What is globalization used for?
* [+] How does globalization work?
* [+] How did globalization develop?
* [x] When did globalization begin?
* [+] Why is nationalism important?
* [+] What are the main types of nationalism?
* [+] What are examples of nationalism?
* [+] What is the history of nationalism?
* [+] What is nationalism used for?
* [+] How does nationalism work?
* [+] How did nationalism develop?
* [x] When did nationalism begin?
* [+] Why is colonialism important?
* [+] What are the main types of colonialism?
* [+] What are examples of colonialism?
* [+] What is the history of colonialism?
* [+] What is colonialism used for?
* [+] How does colonialism work?
* [+] How did colonialism develop?
* [x] When did colonialism begin?
* [+] Why is imperialism important?
* [+] What are the main types of imperialism?
* [+] What are examples of imperialism?
* [+] What is the history of imperialism?
* [+] What is imperialism used for?
* [+] How does imperialism work?
* [+] How did imperialism develop?
* [x] When did imperialism begin?
* [+] Why is revolution important?
* [+] What are the main types of revolution?
* [+] What are examples of revolution?
* [+] What is the history of revolution?
* [+] What is revolution used for?
* [+] How does revolution work?
* [+] How did revolution develop?
* [+] When did revolution begin?

## Computing & Internet

* [+] What is a computer?
* [+] What is a computer network?
* [+] What is the Internet?
* [+] What is the World Wide Web?
* [+] What is a website?
* [+] What is a web browser?
* [+] What is a search engine?
* [+] What is a server?
* [+] What is a client?
* [+] What is a database?
* [+] What is a database management system?
* [+] What is a file system?
* [+] What is an operating system?
* [+] What is Linux?
* [+] What is Windows?
* [+] What is macOS?
* [+] What is Android?
* [+] What is iOS?
* [+] What is an application?
* [+] What is software?
* [+] What is hardware?
* [+] What is firmware?
* [+] What is an algorithm?
* [+] What is source code?
* [+] What is a programming language?
* [+] What is an API?
* [+] What is a framework?
* [+] What is a library?
* [+] What is a compiler?
* [+] What is an interpreter?
* [+] What is a virtual machine?
* [+] What is cloud computing?
* [+] What is edge computing?
* [+] What is virtualization?
* [+] What is a virtual private network?
* [+] What is an intranet?
* [+] What is an extranet?
* [+] What is a domain name?
* [+] What is an IP address?
* [+] What is DNS?
* [+] What is HTTP?
* [+] What is HTTPS?
* [+] What is HTML?
* [+] What is CSS?
* [+] What is JavaScript?
* [+] What is JSON?
* [+] What is XML?
* [+] What is a cookie?
* [+] What is a hyperlink?
* [+] What is a hyperlink anchor?
* [+] What is a URL?
* [+] What is a web server?
* [+] What is a proxy server?
* [+] What is a firewall?
* [+] What is encryption?
* [+] What is authentication?
* [+] What is authorization?
* [+] What is cybersecurity?
* [+] What is malware?
* [+] What is a computer virus?
* [+] What is ransomware?
* [+] What is phishing?
* [+] What is spam?
* [+] Why is a computer important?
* [+] What are the main types of a computer?
* [+] What are examples of a computer?
* [+] What is the history of a computer?
* [+] What is a computer used for?
* [+] How does a computer work?
* [+] How did a computer develop?
* [+] Why is a computer network important?
* [+] What are the main types of a computer network?
* [+] What are examples of a computer network?
* [+] What is the history of a computer network?
* [+] What is a computer network used for?
* [+] How does a computer network work?
* [+] How did a computer network develop?
* [+] Why is the Internet important?
* [+] What are the main types of the Internet?
* [+] What are examples of the Internet?
* [+] What is the history of the Internet?
* [+] What is the Internet used for?
* [+] How does the Internet work?
* [+] How did the Internet develop?
* [+] Why is the World Wide Web important?
* [+] What are the main types of the World Wide Web?
* [+] What are examples of the World Wide Web?
* [+] What is the history of the World Wide Web?
* [+] What is the World Wide Web used for?
* [+] How does the World Wide Web work?
* [+] How did the World Wide Web develop?
* [+] Why is a website important?
* [+] What are the main types of a website?
* [+] What are examples of a website?
* [+] What is the history of a website?
* [+] What is a website used for?
* [+] How does a website work?
* [+] How did a website develop?
* [+] Why is a web browser important?
* [+] What are the main types of a web browser?
* [+] What are examples of a web browser?
* [+] What is the history of a web browser?
* [+] What is a web browser used for?
* [+] How does a web browser work?
* [+] How did a web browser develop?
* [+] Why is a search engine important?
* [+] What are the main types of a search engine?
* [+] What are examples of a search engine?
* [+] What is the history of a search engine?
* [+] What is a search engine used for?
* [+] How does a search engine work?
* [+] How did a search engine develop?
* [+] Why is a server important?
* [+] What are the main types of a server?
* [+] What are examples of a server?
* [+] What is the history of a server?
* [+] What is a server used for?
* [+] How does a server work?
* [+] How did a server develop?
* [+] Why is a client important?
* [+] What are the main types of a client?
* [+] What are examples of a client?
* [+] What is the history of a client?
* [+] What is a client used for?
* [+] How does a client work?
* [+] How did a client develop?
* [+] Why is a database important?
* [+] What are the main types of a database?
* [+] What are examples of a database?
* [+] What is the history of a database?
* [+] What is a database used for?
* [+] How does a database work?
* [+] How did a database develop?
* [+] Why is a database management system important?
* [+] What are the main types of a database management system?
* [+] What are examples of a database management system?
* [+] What is the history of a database management system?
* [+] What is a database management system used for?
* [+] How does a database management system work?
* [+] How did a database management system develop?
* [+] Why is a file system important?
* [+] What are the main types of a file system?
* [+] What are examples of a file system?
* [+] What is the history of a file system?
* [+] What is a file system used for?
* [+] How does a file system work?
* [+] How did a file system develop?
* [+] Why is an operating system important?
* [+] What are the main types of an operating system?
* [+] What are examples of an operating system?
* [+] What is the history of an operating system?
* [+] What is an operating system used for?
* [+] How does an operating system work?
* [+] How did an operating system develop?
* [+] Why is linux important?
* [+] What are the main types of linux?
* [+] What are examples of linux?
* [+] What is the history of linux?
* [+] What is linux used for?
* [+] How does linux work?
* [+] How did linux develop?
* [x] When did linux begin?
* [+] Why is windows important?
* [+] What are the main types of windows?
* [+] What are examples of windows?
* [+] What is the history of windows?
* [+] What is windows used for?
* [+] How does windows work?
* [+] How did windows develop?
* [x] When did windows begin?
* [+] Why is macOS important?
* [+] What are the main types of macOS?
* [+] What are examples of macOS?
* [+] What is the history of macOS?
* [+] What is macOS used for?
* [+] How does macOS work?
* [+] How did macOS develop?
* [x] When did macOS begin?
* [+] Why is android important?
* [+] What are the main types of android?
* [+] What are examples of android?
* [+] What is the history of android?
* [+] What is android used for?
* [+] How does android work?
* [+] How did android develop?
* [x] When did android begin?
* [+] Why is iOS important?
* [+] What are the main types of iOS?
* [+] What are examples of iOS?
* [+] What is the history of iOS?
* [+] What is iOS used for?
* [+] How does iOS work?
* [+] How did iOS develop?
* [x] When did iOS begin?
* [+] Why is an application important?
* [x] What are the main types of an application?
* [x] What are examples of an application?
* [+] What is the history of an application?
* [+] What is an application used for?
* [+] How does an application work?
* [+] How did an application develop?
* [+] Why is software important?
* [+] What are the main types of software?
* [+] What are examples of software?
* [+] What is the history of software?
* [+] What is software used for?
* [+] How does software work?
* [+] How did software develop?
* [x] What is software made of?
* [+] Why is hardware important?
* [+] What are the main types of hardware?
* [+] What are examples of hardware?
* [+] What is the history of hardware?
* [+] What is hardware used for?
* [+] How does hardware work?
* [+] How did hardware develop?
* [+] What is hardware made of?
* [+] Why is firmware important?
* [+] What are the main types of firmware?
* [+] What are examples of firmware?
* [+] What is the history of firmware?
* [+] What is firmware used for?
* [+] How does firmware work?
* [+] How did firmware develop?
* [x] What is firmware made of?
* [+] Why is an algorithm important?
* [+] What are the main types of an algorithm?
* [+] What are examples of an algorithm?
* [+] What is the history of an algorithm?
* [+] What is an algorithm used for?
* [+] How does an algorithm work?
* [+] How did an algorithm develop?
* [+] Why is source code important?
* [+] What are the main types of source code?
* [+] What are examples of source code?
* [+] What is the history of source code?
* [+] What is source code used for?
* [+] How does source code work?
* [+] How did source code develop?
* [x] What is source code made of?
* [+] Why is a programming language important?
* [+] What are the main types of a programming language?
* [+] What are examples of a programming language?
* [+] What is the history of a programming language?
* [+] What is a programming language used for?
* [+] How does a programming language work?
* [+] How did a programming language develop?
* [+] Why is an API important?
* [+] What are the main types of an API?
* [+] What are examples of an API?
* [+] What is the history of an API?
* [+] What is an API used for?
* [+] How does an API work?
* [+] How did an API develop?
* [+] Why is a framework important?
* [+] What are the main types of a framework?
* [+] What are examples of a framework?
* [+] What is the history of a framework?
* [+] What is a framework used for?
* [+] How does a framework work?
* [+] How did a framework develop?
* [+] Why is a library important?
* [+] What are the main types of a library?
* [+] What are examples of a library?
* [+] What is the history of a library?
* [+] What is a library used for?
* [+] How does a library work?
* [+] How did a library develop?
* [+] Why is a compiler important?
* [+] What are the main types of a compiler?
* [+] What are examples of a compiler?
* [+] What is the history of a compiler?
* [+] What is a compiler used for?
* [+] How does a compiler work?
* [+] How did a compiler develop?
* [+] Why is an interpreter important?
* [+] What are the main types of an interpreter?
* [+] What are examples of an interpreter?
* [+] What is the history of an interpreter?
* [+] What is an interpreter used for?
* [+] How does an interpreter work?
* [+] How did an interpreter develop?
* [+] Why is a virtual machine important?
* [+] What are the main types of a virtual machine?
* [+] What are examples of a virtual machine?
* [+] What is the history of a virtual machine?
* [+] What is a virtual machine used for?
* [+] How does a virtual machine work?
* [+] How did a virtual machine develop?
* [+] Why is cloud computing important?
* [+] What are the main types of cloud computing?
* [+] What are examples of cloud computing?
* [+] What is the history of cloud computing?
* [+] What is cloud computing used for?
* [+] How does cloud computing work?
* [+] How did cloud computing develop?
* [+] Why is edge computing important?
* [+] What are the main types of edge computing?
* [+] What are examples of edge computing?
* [+] What is the history of edge computing?
* [+] What is edge computing used for?
* [+] How does edge computing work?
* [+] How did edge computing develop?
* [+] Why is virtualization important?
* [+] What are the main types of virtualization?
* [+] What are examples of virtualization?
* [+] What is the history of virtualization?
* [+] What is virtualization used for?
* [+] How does virtualization work?
* [+] How did virtualization develop?
* [+] Why is a virtual private network important?
* [x] What are the main types of a virtual private network?
* [+] What are examples of a virtual private network?
* [+] What is the history of a virtual private network?
* [+] What is a virtual private network used for?
* [+] How does a virtual private network work?
* [+] How did a virtual private network develop?
* [+] Why is an intranet important?
* [+] What are the main types of an intranet?
* [+] What are examples of an intranet?
* [+] What is the history of an intranet?
* [+] What is an intranet used for?
* [+] How does an intranet work?
* [+] How did an intranet develop?
* [x] Why is an extranet important?
* [x] What are the main types of an extranet?
* [+] What are examples of an extranet?
* [x] What is the history of an extranet?
* [+] What is an extranet used for?
* [+] How does an extranet work?
* [+] How did an extranet develop?
* [+] Why is a domain name important?
* [+] What are the main types of a domain name?
* [+] What are examples of a domain name?
* [+] What is the history of a domain name?
* [+] What is a domain name used for?
* [+] How does a domain name work?
* [+] How did a domain name develop?
* [+] Why is an IP address important?
* [+] What are the main types of an IP address?
* [+] What are examples of an IP address?
* [+] What is the history of an IP address?
* [+] What is an IP address used for?
* [+] How does an IP address work?
* [+] How did an IP address develop?
* [+] Why is dNS important?
* [+] What are the main types of dNS?
* [+] What are examples of dNS?
* [+] What is the history of dNS?
* [+] What is dNS used for?
* [+] How does dNS work?
* [+] How did dNS develop?
* [+] What is dNS made of?
* [+] Why is hTTP important?
* [+] What are the main types of hTTP?
* [+] What are examples of hTTP?
* [+] What is the history of hTTP?
* [+] What is hTTP used for?
* [+] How does hTTP work?
* [+] How did hTTP develop?
* [x] What is hTTP made of?
* [+] What is the difference between http and https?
* [+] How is http different from https?
* [+] Why is hTTPS important?
* [+] What are the main types of hTTPS?
* [+] What are examples of hTTPS?
* [+] What is the history of hTTPS?
* [+] What is hTTPS used for?
* [+] How does hTTPS work?
* [+] How did hTTPS develop?
* [x] What is hTTPS made of?
* [+] Why is hTML important?
* [+] What are the main types of hTML?
* [+] What are examples of hTML?
* [+] What is the history of hTML?
* [+] What is hTML used for?
* [+] How does hTML work?
* [+] How did hTML develop?
* [x] What is hTML made of?
* [+] What is the difference between html and css?
* [+] How is html different from css?
* [+] What is the difference between html and javascript?
* [+] How is html different from javascript?
* [+] Why is CSS important?
* [+] What are the main types of CSS?
* [+] What are examples of CSS?
* [+] What is the history of CSS?
* [+] What is CSS used for?
* [+] How does CSS work?
* [+] How did CSS develop?
* [+] What is CSS made of?
* [+] Why is javaScript important?
* [+] What are the main types of javaScript?
* [+] What are examples of javaScript?
* [+] What is the history of javaScript?
* [+] What is javaScript used for?
* [+] How does javaScript work?
* [+] How did javaScript develop?
* [x] What is javaScript made of?
* [+] Why is jSON important?
* [+] What are the main types of jSON?
* [+] What are examples of jSON?
* [+] What is the history of jSON?
* [+] What is jSON used for?
* [+] How does jSON work?
* [+] How did jSON develop?
* [x] What is jSON made of?
* [+] Why is XML important?
* [+] What are the main types of XML?
* [+] What are examples of XML?
* [+] What is the history of XML?
* [+] What is XML used for?
* [+] How does XML work?
* [+] How did XML develop?
* [x] What is XML made of?
* [+] Why is a cookie important?
* [+] What are the main types of a cookie?
* [+] What are examples of a cookie?
* [+] What is the history of a cookie?
* [+] What is a cookie used for?
* [+] How does a cookie work?
* [+] How did a cookie develop?
* [+] Why is a hyperlink important?
* [+] What are the main types of a hyperlink?
* [+] What are examples of a hyperlink?
* [+] What is the history of a hyperlink?
* [+] What is a hyperlink used for?
* [+] How does a hyperlink work?
* [+] How did a hyperlink develop?
* [+] Why is a hyperlink anchor important?
* [+] What are the main types of a hyperlink anchor?
* [+] What are examples of a hyperlink anchor?
* [+] What is the history of a hyperlink anchor?
* [+] What is a hyperlink anchor used for?
* [+] How does a hyperlink anchor work?
* [x] How did a hyperlink anchor develop?
* [+] Why is a URL important?
* [+] What are the main types of a URL?
* [+] What are examples of a URL?
* [+] What is the history of a URL?
* [+] What is a URL used for?
* [+] How does a URL work?
* [+] How did a URL develop?
* [+] Why is a web server important?
* [+] What are the main types of a web server?
* [+] What are examples of a web server?
* [+] What is the history of a web server?
* [+] What is a web server used for?
* [+] How does a web server work?
* [+] How did a web server develop?
* [+] Why is a proxy server important?
* [+] What are the main types of a proxy server?
* [+] What are examples of a proxy server?
* [+] What is the history of a proxy server?
* [+] What is a proxy server used for?
* [+] How does a proxy server work?
* [+] How did a proxy server develop?
* [+] Why is a firewall important?
* [+] What are the main types of a firewall?
* [+] What are examples of a firewall?
* [+] What is the history of a firewall?
* [+] What is a firewall used for?
* [+] How does a firewall work?
* [+] How did a firewall develop?
* [+] Why is encryption important?
* [+] What are the main types of encryption?
* [+] What are examples of encryption?
* [+] What is the history of encryption?
* [+] What is encryption used for?
* [+] How does encryption work?
* [+] How did encryption develop?
* [x] What is encryption made of?
* [x] What is the difference between encryption and authentication?
* [+] How is encryption different from authentication?
* [+] Why is authentication important?
* [+] What are the main types of authentication?
* [+] What are examples of authentication?
* [+] What is the history of authentication?
* [+] What is authentication used for?
* [+] How does authentication work?
* [+] How did authentication develop?
* [+] What is the difference between authentication and authorization?
* [+] How is authentication different from authorization?
* [+] Why is authorization important?
* [+] What are the main types of authorization?
* [+] What are examples of authorization?
* [+] What is the history of authorization?
* [+] What is authorization used for?
* [+] How does authorization work?
* [+] How did authorization develop?
* [+] Why is cybersecurity important?
* [+] What are the main types of cybersecurity?
* [+] What are examples of cybersecurity?
* [+] What is the history of cybersecurity?
* [+] What is cybersecurity used for?
* [+] How does cybersecurity work?
* [+] How did cybersecurity develop?
* [+] Why is malware important?
* [+] What are the main types of malware?
* [+] What are examples of malware?
* [+] What is the history of malware?
* [+] What is malware used for?
* [+] How does malware work?
* [+] How did malware develop?
* [+] What is malware made of?
* [+] Why is a computer virus important?
* [+] What are the main types of a computer virus?
* [+] What are examples of a computer virus?
* [+] What is the history of a computer virus?
* [+] What is a computer virus used for?
* [+] How does a computer virus work?
* [+] How did a computer virus develop?
* [+] Why is ransomware important?
* [+] What are the main types of ransomware?
* [+] What are examples of ransomware?
* [+] What is the history of ransomware?
* [+] What is ransomware used for?
* [+] How does ransomware work?
* [+] How did ransomware develop?
* [x] What is ransomware made of?
* [+] Why is phishing important?
* [+] What are the main types of phishing?
* [+] What are examples of phishing?
* [+] What is the history of phishing?
* [+] What is phishing used for?
* [+] How does phishing work?
* [+] How did phishing develop?
* [+] Why is spam important?
* [+] What are the main types of spam?
* [+] What are examples of spam?
* [+] What is the history of spam?
* [+] What is spam used for?
* [+] How does spam work?
* [+] How did spam develop?
* [+] What is spam made of?

## AI & Machine Learning

* [+] What is artificial intelligence?
* [+] What is machine learning?
* [+] What is deep learning?
* [+] What is a neural network?
* [+] What is a neuron?
* [+] What is a perceptron?
* [+] What is a transformer?
* [+] What is a large language model?
* [+] What is generative AI?
* [+] What is natural language processing?
* [+] What is computer vision?
* [+] What is speech recognition?
* [+] What is reinforcement learning?
* [+] What is supervised learning?
* [+] What is unsupervised learning?
* [+] What is a training dataset?
* [+] What is a model?
* [+] What is an AI inference?
* [+] What is a parameter in machine learning?
* [+] What is an embedding?
* [+] What is a vector database?
* [+] What is a token in AI?
* [+] What is tokenization?
* [+] What is a prompt?
* [+] What is prompt engineering?
* [+] What is an AI hallucination?
* [+] What is overfitting?
* [x] What is underfitting?
* [+] What is an AI benchmark?
* [+] What is a knowledge base?
* [+] What is an expert system?
* [+] What is a chatbot?
* [+] What is an AI agent?
* [+] What is synthetic data?
* [+] What is computer-generated imagery?
* [+] Why is artificial intelligence important?
* [+] What are the main types of artificial intelligence?
* [+] What are examples of artificial intelligence?
* [+] What is the history of artificial intelligence?
* [+] What is artificial intelligence used for?
* [+] How does artificial intelligence work?
* [+] How did artificial intelligence develop?
* [x] When did artificial intelligence begin?
* [+] Why is machine learning important?
* [+] What are the main types of machine learning?
* [+] What are examples of machine learning?
* [+] What is the history of machine learning?
* [+] What is machine learning used for?
* [+] How does machine learning work?
* [+] How did machine learning develop?
* [x] When did machine learning begin?
* [x] What is the difference between machine learning and deep learning?
* [+] How is machine learning different from deep learning?
* [+] What is the difference between ai and machine learning?
* [+] How is ai different from machine learning?
* [+] Why is deep learning important?
* [+] What are the main types of deep learning?
* [+] What are examples of deep learning?
* [+] What is the history of deep learning?
* [+] What is deep learning used for?
* [+] How does deep learning work?
* [+] How did deep learning develop?
* [x] When did deep learning begin?
* [+] Why is a neural network important?
* [+] What are the main types of a neural network?
* [+] What are examples of a neural network?
* [+] What is the history of a neural network?
* [+] What is a neural network used for?
* [+] How does a neural network work?
* [+] How did a neural network develop?
* [+] Why is a neuron important?
* [+] What are the main types of a neuron?
* [+] What are examples of a neuron?
* [+] What is the history of a neuron?
* [+] What is a neuron used for?
* [+] How does a neuron work?
* [+] How did a neuron develop?
* [+] Why is a perceptron important?
* [+] What are the main types of a perceptron?
* [+] What are examples of a perceptron?
* [+] What is the history of a perceptron?
* [+] What is a perceptron used for?
* [+] How does a perceptron work?
* [+] How did a perceptron develop?
* [+] Why is a transformer important?
* [+] What are the main types of a transformer?
* [+] What are examples of a transformer?
* [+] What is the history of a transformer?
* [+] What is a transformer used for?
* [+] How does a transformer work?
* [+] How did a transformer develop?
* [+] Why is a large language model important?
* [+] What are the main types of a large language model?
* [+] What are examples of a large language model?
* [+] What is the history of a large language model?
* [+] What is a large language model used for?
* [+] How does a large language model work?
* [+] How did a large language model develop?
* [+] Why is generative AI important?
* [+] What are the main types of generative AI?
* [+] What are examples of generative AI?
* [+] What is the history of generative AI?
* [+] What is generative AI used for?
* [+] How does generative AI work?
* [+] How did generative AI develop?
* [x] When did generative AI begin?
* [+] Why is natural language processing important?
* [+] What are the main types of natural language processing?
* [+] What are examples of natural language processing?
* [+] What is the history of natural language processing?
* [+] What is natural language processing used for?
* [+] How does natural language processing work?
* [+] How did natural language processing develop?
* [+] When did natural language processing begin?
* [+] Why is computer vision important?
* [+] What are the main types of computer vision?
* [+] What are examples of computer vision?
* [+] What is the history of computer vision?
* [+] What is computer vision used for?
* [+] How does computer vision work?
* [+] How did computer vision develop?
* [+] When did computer vision begin?
* [x] What is the difference between computer vision and speech recognition?
* [x] How is computer vision different from speech recognition?
* [+] Why is speech recognition important?
* [+] What are the main types of speech recognition?
* [+] What are examples of speech recognition?
* [+] What is the history of speech recognition?
* [+] What is speech recognition used for?
* [+] How does speech recognition work?
* [+] How did speech recognition develop?
* [+] Why is reinforcement learning important?
* [+] What are the main types of reinforcement learning?
* [+] What are examples of reinforcement learning?
* [+] What is the history of reinforcement learning?
* [+] What is reinforcement learning used for?
* [+] How does reinforcement learning work?
* [+] How did reinforcement learning develop?
* [x] When did reinforcement learning begin?
* [+] Why is supervised learning important?
* [+] What are the main types of supervised learning?
* [+] What are examples of supervised learning?
* [+] What is the history of supervised learning?
* [+] What is supervised learning used for?
* [+] How does supervised learning work?
* [+] How did supervised learning develop?
* [x] When did supervised learning begin?
* [+] What is the difference between supervised learning and unsupervised learning?
* [+] How is supervised learning different from unsupervised learning?
* [+] Why is unsupervised learning important?
* [+] What are the main types of unsupervised learning?
* [+] What are examples of unsupervised learning?
* [+] What is the history of unsupervised learning?
* [+] What is unsupervised learning used for?
* [+] How does unsupervised learning work?
* [x] How did unsupervised learning develop?
* [x] When did unsupervised learning begin?
* [+] Why is a training dataset important?
* [+] What are the main types of a training dataset?
* [+] What are examples of a training dataset?
* [+] What is the history of a training dataset?
* [+] What is a training dataset used for?
* [+] How does a training dataset work?
* [+] How did a training dataset develop?
* [+] Why is a model important?
* [+] What are the main types of a model?
* [+] What are examples of a model?
* [+] What is the history of a model?
* [+] What is a model used for?
* [+] How does a model work?
* [+] How did a model develop?
* [+] Why is an AI inference important?
* [+] What are the main types of an AI inference?
* [+] What are examples of an AI inference?
* [+] What is the history of an AI inference?
* [+] What is an AI inference used for?
* [+] How does an AI inference work?
* [+] How did an AI inference develop?
* [x] Why is a parameter in machine learning important?
* [x] What are the main types of a parameter in machine learning?
* [+] What are examples of a parameter in machine learning?
* [x] What is the history of a parameter in machine learning?
* [+] What is a parameter in machine learning used for?
* [x] How does a parameter in machine learning work?
* [x] How did a parameter in machine learning develop?
* [+] Why is an embedding important?
* [+] What are the main types of an embedding?
* [+] What are examples of an embedding?
* [+] What is the history of an embedding?
* [+] What is an embedding used for?
* [+] How does an embedding work?
* [+] How did an embedding develop?
* [x] Why is a vector database important?
* [+] What are the main types of a vector database?
* [x] What are examples of a vector database?
* [+] What is the history of a vector database?
* [+] What is a vector database used for?
* [+] How does a vector database work?
* [+] How did a vector database develop?
* [+] Why is a token in AI important?
* [+] What are the main types of a token in AI?
* [+] What are examples of a token in AI?
* [+] What is the history of a token in AI?
* [+] What is a token in AI used for?
* [+] How does a token in AI work?
* [+] How did a token in AI develop?
* [+] Why is tokenization important?
* [x] What are the main types of tokenization?
* [+] What are examples of tokenization?
* [+] What is the history of tokenization?
* [+] What is tokenization used for?
* [+] How does tokenization work?
* [+] How did tokenization develop?
* [+] Why is a prompt important?
* [+] What are the main types of a prompt?
* [+] What are examples of a prompt?
* [+] What is the history of a prompt?
* [+] What is a prompt used for?
* [+] How does a prompt work?
* [+] How did a prompt develop?
* [+] Why is prompt engineering important?
* [+] What are the main types of prompt engineering?
* [+] What are examples of prompt engineering?
* [+] What is the history of prompt engineering?
* [+] What is prompt engineering used for?
* [+] How does prompt engineering work?
* [+] How did prompt engineering develop?
* [+] Why is an AI hallucination important?
* [+] What are the main types of an AI hallucination?
* [+] What are examples of an AI hallucination?
* [+] What is the history of an AI hallucination?
* [+] What is an AI hallucination used for?
* [+] How does an AI hallucination work?
* [+] How did an AI hallucination develop?
* [+] Why is overfitting important?
* [x] What are the main types of overfitting?
* [+] What are examples of overfitting?
* [+] What is the history of overfitting?
* [+] What is overfitting used for?
* [+] How does overfitting work?
* [+] How did overfitting develop?
* [x] Why is underfitting important?
* [x] What are the main types of underfitting?
* [x] What are examples of underfitting?
* [x] What is the history of underfitting?
* [x] What is underfitting used for?
* [x] How does underfitting work?
* [x] How did underfitting develop?
* [+] Why is an AI benchmark important?
* [+] What are the main types of an AI benchmark?
* [+] What are examples of an AI benchmark?
* [+] What is the history of an AI benchmark?
* [+] What is an AI benchmark used for?
* [+] How does an AI benchmark work?
* [+] How did an AI benchmark develop?
* [+] Why is a knowledge base important?
* [+] What are the main types of a knowledge base?
* [+] What are examples of a knowledge base?
* [+] What is the history of a knowledge base?
* [+] What is a knowledge base used for?
* [+] How does a knowledge base work?
* [+] How did a knowledge base develop?
* [+] Why is an expert system important?
* [+] What are the main types of an expert system?
* [+] Why is a chatbot important?
* [+] What are the main types of a chatbot?
* [+] What are examples of a chatbot?
* [+] What is a chatbot used for?
* [+] How does a chatbot work?
* [+] Why is an AI agent important?
* [+] What are the main types of an AI agent?
* [+] What are examples of an AI agent?
* [+] What is an AI agent used for?
* [+] How does an AI agent work?
* [+] How did an AI agent develop?
* [+] Why is synthetic data important?
* [+] What are examples of synthetic data?
* [+] How does synthetic data work?
* [x] What are the main types of computer-generated imagery?
* [+] What are examples of computer-generated imagery?
* [+] What is computer-generated imagery?

## Design

* [+] What is graphic design?
* [+] What is visual design?
* [+] What is communication design?
* [+] What is web design?
* [+] What is user interface design?
* [+] What is user experience design?
* [+] What is interaction design?
* [+] What is product design?
* [+] What is industrial design?
* [+] What is typography?
* [+] What is a typeface?
* [+] What is a font?
* [+] What is a serif?
* [+] What is a sans-serif?
* [+] What is kerning?
* [+] What is tracking?
* [+] What is leading?
* [+] What is a baseline?
* [+] What is a grid?
* [+] What is composition?
* [+] What is visual hierarchy?
* [+] What is balance in design?
* [+] What is contrast?
* [+] What is alignment?
* [+] What is proximity?
* [+] What is repetition?
* [+] What is whitespace?
* [+] What is negative space?
* [+] What is color theory?
* [+] What is a color wheel?
* [+] What is hue?
* [+] What is saturation?
* [+] What is brightness?
* [+] What is value in color?
* [+] What is a gradient?
* [+] What is a palette?
* [+] What is a design system?
* [x] What is a design token?
* [+] What is a component?
* [+] What is a wireframe?
* [+] What is a prototype?
* [+] What is a mockup?
* [+] What is responsive design?
* [+] What is accessibility in design?
* [+] What is a user persona?
* [+] What is a user journey?
* [+] What is a design pattern?
* [x] What is brutalism in web design?
* [+] What is minimalism in design?
* [x] What is skeuomorphism?
* [+] What is neumorphism?
* [+] What is glassmorphism?
* [+] Why is graphic design important?
* [+] What are the main types of graphic design?
* [+] What are examples of graphic design?
* [+] What is the history of graphic design?
* [+] What is the difference between graphic design and visual design?
* [+] How is graphic design different from visual design?
* [+] Why is visual design important?
* [+] What are the main types of visual design?
* [+] What are examples of visual design?
* [+] What is the history of visual design?
* [+] What are the main types of communication design?
* [+] What are examples of communication design?
* [+] How did communication design develop?
* [+] Why is web design important?
* [+] What are the main types of web design?
* [+] What are examples of web design?
* [+] What is the history of web design?
* [+] What is web design used for?
* [+] How does web design work?
* [+] What is the difference between web design and user interface design?
* [+] Difference between web design and user interface design (UI)?
* [+] Why is user interface design important?
* [+] What are the main types of user interface design?
* [+] What are examples of user interface design?
* [+] What is the difference between user interface design and user experience design?
* [+] Different between user interface design (UI) and user experience design (UX)?
* [+] Why is user experience design important?
* [+] What are the main types of user experience design?
* [+] What are examples of user experience design?
* [+] What is the history of user experience design?
* [+] What is user experience design used for?
* [+] How does user experience design work?
* [+] Why is interaction design important?
* [+] What are the main types of interaction design?
* [+] What are examples of interaction design?
* [+] What is interaction design used for?
* [+] How does interaction design work?
* [x] When did interaction design begin?
* [+] Why is product design important?
* [+] What are the main types of product design?
* [+] What are examples of product design?
* [+] What is the history of product design?
* [+] What is product design used for?
* [+] How does product design work?
* [+] How did product design develop?
* [+] When did product design begin?
* [+] Why is industrial design important?
* [+] What are the main types of industrial design?
* [+] What are examples of industrial design?
* [+] What is the history of industrial design?
* [+] What is industrial design used for?
* [+] How does industrial design work?
* [+] How did industrial design develop?
* [x] When did industrial design begin?
* [+] Why is typography important?
* [+] What are the main types of typography?
* [+] What are examples of typography?
* [+] What is the history of typography?
* [+] What is typography used for?
* [+] How does typography work?
* [+] How did typography develop?
* [x] When did typography begin?
* [+] Why is a typeface important?
* [+] What are the main types of a typeface?
* [+] What are examples of a typeface?
* [+] What is the history of a typeface?
* [+] What is a typeface used for?
* [+] How does a typeface work?
* [+] How did a typeface develop?
* [+] Why is a font important?
* [+] What are the main types of a font?
* [+] What are examples of a font?

## Science

* [+] What is astronomy?
* [+] What is geology?
* [+] What is ecology?
* [+] What is genetics?
* [+] What is microbiology?
* [+] What is an atom?
* [+] What is a molecule?
* [+] What is an element?
* [+] What is a chemical compound?
* [+] What is a chemical reaction?
* [+] What is gravity?
* [+] What is energy?
* [+] What is mass?
* [+] What is matter?
* [+] What is electricity?
* [+] What is magnetism?
* [+] What is light?
* [+] What is sound?
* [+] What is temperature?
* [+] What is pressure?
* [+] What is a force?
* [+] What is velocity?
* [+] What is acceleration?
* [+] What is a black hole?
* [+] What is a galaxy?
* [+] What is a star?
* [+] What is a planet?
* [+] What is an asteroid?
* [+] What is a comet?
* [+] What is a nebula?
* [+] What is a fossil?
* [+] What is DNA?
* [+] What is RNA?
* [+] What is a chromosome?
* [+] What is a cell?
* [+] What is a bacterium?
* [+] What is a virus?
* [+] What is photosynthesis?
* [+] What is respiration?
* [+] What is an ecosystem?
* [+] What are the main types of physics?
* [+] What is the history of physics?
* [+] Why is chemistry important?
* [x] What are the main types of chemistry?
* [+] Why is biology important?
* [+] What are the main types of biology?
* [+] What are examples of biology?
* [+] What is the history of biology?
* [+] What is biology used for?
* [+] How does biology work?
* [+] How did biology develop?
* [+] When did biology begin?
* [+] Why is astronomy important?
* [x] What are the main types of astronomy?
* [+] What are examples of astronomy?
* [+] What is the history of astronomy?
* [+] What is astronomy used for?
* [+] How does astronomy work?
* [+] What are the main types of geology?
* [+] What are examples of geology?
* [+] What is the history of geology?
* [+] What is geology used for?
* [+] Why is ecology important?
* [+] What are the main types of ecology?

Science — Biology, Chemistry, Physics & Astronomy

Ecology

* [+] What is ecology?
* [+] What does ecology study?
* [x] What are the main branches of ecology?
* [+] What is an ecosystem?
* [x] What is the difference between ecology and environmental science?
* [x] How do organisms interact with their environment?
* [+] What is a population in ecology?
* [+] What is a community in ecology?
* [+] What is a habitat?
* [+] What is a niche in ecology?
* [+] What is a food chain?
* [+] What is a food web?
* [+] What is biodiversity?
* [+] What factors affect an ecosystem?
* [+] What are biotic and abiotic factors?
* [x] How do ecosystems change over time?
* [+] What is ecological succession?
* [x] How do human activities affect ecosystems?
* [+] Why is ecology important?

Genetics

* [+] What is genetics?
* [+] What does genetics study?
* [+] What is a gene?
* [+] What is DNA?
* [+] What is a chromosome?
* [+] What is heredity?
* [+] How are traits inherited?
* [+] What is a genetic mutation?
* [+] What causes genetic mutations?
* [+] What is a dominant gene?
* [+] What is a recessive gene?
* [+] What is a genotype?
* [+] What is a phenotype?
* [+] What is genetic variation?
* [+] What is genetic inheritance?
* [+] What did Gregor Mendel discover?
* [+] What are Mendel’s laws of inheritance?
* [+] How does genetic testing work?
* [x] How is genetics used in medicine?
* [+] How is genetics used in agriculture?

Microbiology

* [+] What is microbiology?
* [+] What does microbiology study?
* [+] What are microorganisms?
* [x] What are the main groups of microorganisms?
* [+] What is a bacterium?
* [+] What is a virus?
* [+] What is a fungus?
* [+] What are protozoa?
* [+] What is a microorganism used for?
* [+] How are microorganisms studied?
* [+] How do bacteria reproduce?
* [x] How do viruses reproduce?
* [+] What is the difference between bacteria and viruses?
* [x] Which microorganisms are beneficial to humans?
* [+] Which microorganisms cause disease?
* [x] How are microorganisms used in food production?
* [x] How are microorganisms used in medicine?
* [+] How did microbiology develop?
* [x] Who founded modern microbiology?
* [+] Why is microbiology important?

Atoms

* [+] What is an atom?
* [+] What is an atom made of?
* [+] What are protons, neutrons, and electrons?
* [+] Where are protons, neutrons, and electrons located?
* [+] What is an atomic nucleus?
* [+] What is an electron shell?
* [+] What determines the identity of an atom?
* [+] What is atomic number?
* [+] What is atomic mass?
* [+] What are isotopes?
* [+] What is an ion?
* [x] How does an atom become an ion?
* [+] How do atoms form chemical bonds?
* [+] What is the difference between an atom and a molecule?
* [+] What is the difference between an atom and an element?
* [+] How was the atomic model developed?
* [+] Who discovered the atomic nucleus?
* [+] Who discovered the electron?
* [x] How did scientists discover the structure of the atom?

Molecules

* [+] What is a molecule?
* [+] What is a molecule made of?
* [+] How do atoms form molecules?
* [+] What is a chemical bond?
* [+] What are the main types of chemical bonds?
* [+] What is a covalent bond?
* [+] What is an ionic bond?
* [+] What is a polar molecule?
* [+] What is a nonpolar molecule?
* [+] What is the difference between an atom and a molecule?
* [+] What is the difference between a molecule and a chemical compound?
* [+] What are some common molecules?
* [x] Why is water considered a molecule?
* [x] How does molecular structure affect the properties of a substance?
* [x] How are molecules represented in chemistry?
* [+] What is a molecular formula?
* [+] What is molecular mass?

Chemical elements

* [+] What is a chemical element?
* [x] What makes one element different from another?
* [+] How many chemical elements are known?
* [+] What is the periodic table?
* [+] How is the periodic table organized?
* [+] What are metals and nonmetals?
* [+] What are metalloids?
* [+] What are the noble gases?
* [+] What are the halogens?
* [+] What are the alkali metals?
* [+] What are the transition metals?
* [+] What is an element’s atomic number?
* [+] What is an element’s symbol?
* [+] Which elements occur naturally?
* [+] Which elements are synthetic?
* [x] How are new chemical elements discovered?
* [x] How are elements formed in stars?
* [+] What is the difference between an element and a compound?

Chemical compounds

* [+] What is a chemical compound?
* [+] How are chemical compounds formed?
* [+] What is the difference between an element and a compound?
* [+] What is the difference between a mixture and a compound?
* [+] What are ionic compounds?
* [+] What are molecular compounds?
* [+] What are some common chemical compounds?
* [x] What is water as a chemical compound?
* [+] What is carbon dioxide?
* [+] What is sodium chloride?
* [x] How are chemical compounds named?
* [x] How are chemical compounds represented by formulas?
* [x] How do the properties of compounds differ from those of their elements?
* [+] How can chemical compounds be separated?
* [x] Where are chemical compounds used in everyday life?

Chemical reactions

* [+] What is a chemical reaction?
* [x] What happens during a chemical reaction?
* [+] What are reactants and products?
* [x] How can a chemical reaction be represented?
* [+] What are the main types of chemical reactions?
* [+] What is a synthesis reaction?
* [+] What is a decomposition reaction?
* [+] What is a combustion reaction?
* [+] What is an oxidation-reduction reaction?
* [+] What is an acid-base reaction?
* [+] What is a catalyst?
* [x] What factors affect the rate of a chemical reaction?
* [+] What is chemical equilibrium?
* [x] How can you tell that a chemical reaction has occurred?
* [x] What is the difference between a chemical reaction and a physical change?
* [+] Why are chemical reactions important?
* [x] Where are chemical reactions used in everyday life?

⸻

Physics

Gravity

* [+] What is gravity?
* [+] How does gravity work?
* [+] What causes gravitational attraction?
* [x] How does gravity affect objects on Earth?
* [x] How does gravity affect the Moon?
* [x] How does gravity keep planets in orbit?
* [x] How does gravity affect tides?
* [x] How does gravity change with distance?
* [+] What is gravitational acceleration?
* [x] What is the difference between gravity and gravitational force?
* [x] How did Isaac Newton explain gravity?
* [x] How did Einstein’s theory of relativity change our understanding of gravity?
* [+] What is a gravitational field?
* [+] What is microgravity?
* [+] What is escape velocity?
* [+] How is gravity different on different planets?

Energy

* [+] What is energy?
* [+] What are the main forms of energy?
* [+] What is kinetic energy?
* [+] What is potential energy?
* [+] What is thermal energy?
* [+] What is chemical energy?
* [+] What is electrical energy?
* [+] What is nuclear energy?
* [+] What is mechanical energy?
* [+] How can energy be transferred?
* [+] Can energy be created or destroyed?
* [+] What is the law of conservation of energy?
* [+] What is the difference between energy and power?
* [+] How is energy measured?
* [x] How is energy used in everyday life?
* [+] How is energy converted from one form to another?

Mass

* [+] What is mass?
* [x] How is mass measured?
* [+] What is the difference between mass and weight?
* [x] Does mass change when an object moves?
* [x] Does mass change on the Moon?
* [x] What is inertial mass?
* [+] What is gravitational mass?
* [+] How is mass related to energy?
* [+] What is the mass of an object?

Matter

* [+] What is matter?
* [+] What is matter made of?
* [+] What are the states of matter?
* [+] What is a solid?
* [+] What is a liquid?
* [+] What is a gas?
* [+] What is plasma?
* [+] What is a Bose–Einstein condensate?
* [+] How can matter change from one state to another?
* [+] What is melting?
* [+] What is freezing?
* [+] What is evaporation?
* [+] What is condensation?
* [+] What is sublimation?
* [+] What is the difference between a physical and chemical change?
* [+] How are mass and matter related?

Electricity

* [+] What is electricity?
* [+] What is electric charge?
* [+] What are positive and negative charges?
* [+] How does electric current work?
* [+] What is voltage?
* [+] What is resistance?
* [+] What is electrical power?
* [+] What is an electric circuit?
* [+] What are conductors and insulators?
* [+] What is static electricity?
* [+] What is the difference between AC and DC electricity?
* [+] How does a battery produce electricity?
* [x] How does electricity flow through a wire?
* [+] What is Ohm’s law?
* [x] How is electricity generated?
* [x] How is electricity transmitted?
* [x] How is electricity used in everyday life?

Magnetism

* [+] What is magnetism?
* [+] What causes magnetism?
* [+] What is a magnetic field?
* [x] What are magnetic poles?
* [+] Why do magnets attract or repel?
* [+] What materials are magnetic?
* [+] What is electromagnetism?
* [+] How does an electromagnet work?
* [+] How are electricity and magnetism related?
* [x] How does a compass use magnetism?
* [x] How does a magnetic field affect moving charges?
* [x] How is magnetism used in electric motors?
* [x] How is magnetism used in generators?
* [+] What is Earth’s magnetic field?

Light

* [+] What is light?
* [+] What is visible light?
* [+] Is light a wave or a particle?
* [+] What is the electromagnetic spectrum?
* [+] What are infrared and ultraviolet light?
* [+] How fast does light travel?
* [+] How does light travel?
* [+] What is reflection?
* [+] What is refraction?
* [+] What is diffraction?
* [+] What is interference?
* [+] How does a lens affect light?
* [+] Why does a prism separate white light into colors?
* [x] How do we see objects using light?
* [+] What is the difference between light and sound?
* [x] How is light used in technology?

Sound

* [+] What is sound?
* [+] How is sound produced?
* [+] How does sound travel?
* [x] Can sound travel through space?
* [+] What is a sound wave?
* [+] What is frequency?
* [+] What is amplitude?
* [+] What is wavelength?
* [+] What determines the pitch of a sound?
* [x] What determines the loudness of a sound?
* [+] What is the speed of sound?
* [x] How does sound behave in different materials?
* [+] What is an echo?
* [+] What is resonance?
* [+] What is ultrasound?
* [+] What is the difference between sound and light?

Temperature

* [+] What is temperature?
* [+] How is temperature measured?
* [x] What are Celsius, Fahrenheit, and Kelvin?
* [+] What is absolute zero?
* [+] What is the difference between temperature and heat?
* [+] How does a thermometer work?
* [x] Why do objects expand when heated?
* [x] How does temperature affect matter?
* [x] How does temperature affect gases?
* [+] What is thermal equilibrium?
* [x] Why does temperature change with altitude?
* [x] How is temperature measured in science?

Pressure

* [+] What is pressure?
* [+] How is pressure calculated?
* [+] What units are used to measure pressure?
* [+] What is atmospheric pressure?
* [+] How does air pressure change with altitude?
* [+] What is water pressure?
* [x] How does pressure affect gases?
* [x] How does pressure affect liquids?
* [+] What is the difference between pressure and force?
* [+] How does a hydraulic system use pressure?
* [+] How is pressure measured?
* [x] Why do ears hurt when pressure changes?

Force

* [x] What is a force?
* [+] How is force measured?
* [+] What are the main types of force?
* [+] What is gravity?
* [+] What is friction?
* [+] What is normal force?
* [+] What is tension?
* [+] What is air resistance?
* [x] What is Newton’s first law of motion?
* [x] What is Newton’s second law of motion?
* [x] What is Newton’s third law of motion?
* [+] How does force affect motion?
* [+] What is the difference between force and energy?
* [+] What is the difference between mass and force?

Velocity

* [+] What is velocity?
* [+] How is velocity different from speed?
* [+] How is velocity calculated?
* [+] What is average velocity?
* [x] What is instantaneous velocity?
* [+] Why does velocity have direction?
* [x] Can an object have zero velocity while still accelerating?
* [x] How is velocity represented in physics?
* [+] What is the difference between velocity and acceleration?

Acceleration

* [+] What is acceleration?
* [+] How is acceleration calculated?
* [+] What causes acceleration?
* [+] What is constant acceleration?
* [+] What is gravitational acceleration?
* [x] How does acceleration affect velocity?
* [x] Can an object accelerate while moving at constant speed?
* [+] What is the difference between acceleration and velocity?
* [+] What is the acceleration due to gravity on Earth?

⸻

Astronomy

Black holes

* [+] What is a black hole?
* [+] How does a black hole form?
* [+] What is an event horizon?
* [+] What is a singularity?
* [x] What happens when something enters a black hole?
* [+] Can light escape from a black hole?
* [+] What is a stellar black hole?
* [+] What is a supermassive black hole?
* [+] Where are black holes found?
* [x] How are black holes detected?
* [+] What is a black hole’s accretion disk?
* [+] What are gravitational waves from black holes?
* [x] How do black holes affect nearby stars?
* [+] What is the difference between a black hole and a neutron star?

Galaxies

* [+] What is a galaxy?
* [x] What is a galaxy made of?
* [+] What are the main types of galaxies?
* [+] What is a spiral galaxy?
* [+] What is an elliptical galaxy?
* [+] What is an irregular galaxy?
* [+] What is the Milky Way?
* [+] Where is the Solar System located in the Milky Way?
* [+] How do galaxies form?
* [+] How do galaxies evolve?
* [+] How do galaxies interact?
* [x] What happens when galaxies collide?
* [+] What is the difference between a galaxy and a solar system?
* [x] How many galaxies are in the observable universe?

Stars

* [+] What is a star?
* [+] How are stars formed?
* [+] What is a star made of?
* [x] How do stars produce energy?
* [+] What is nuclear fusion in stars?
* [+] What are the main types of stars?
* [+] What is a red dwarf?
* [+] What is a giant star?
* [+] What is a supergiant star?
* [+] What is a white dwarf?
* [+] What is a neutron star?
* [x] What determines the color of a star?
* [x] What determines the brightness of a star?
* [+] How long do stars live?
* [+] How do stars die?
* [+] What is a supernova?
* [x] How are elements formed inside stars?

Planets

* [+] What is a planet?
* [x] What makes an object a planet?
* [+] What are the eight planets of the Solar System?
* [+] What is the difference between a planet and a dwarf planet?
* [+] What are terrestrial planets?
* [+] What are gas giants?
* [+] What are ice giants?
* [+] How do planets form?
* [+] Why do planets orbit stars?
* [x] Why do planets have different sizes?
* [x] Why do planets have different atmospheres?
* [x] What makes Earth different from other planets?
* [+] What is an exoplanet?
* [+] How are exoplanets discovered?
* [x] Can a planet exist without a star?

Asteroids

* [+] What is an asteroid?
* [+] Where are most asteroids found?
* [+] What is the asteroid belt?
* [x] What are asteroids made of?
* [+] How are asteroids formed?
* [+] What is the difference between an asteroid and a meteor?
* [+] What is the difference between an asteroid and a comet?
* [+] How are asteroids classified?
* [x] How are asteroids detected?
* [x] What happens when an asteroid approaches Earth?
* [x] How have asteroids affected Earth’s history?
* [x] Could an asteroid cause a mass extinction?

Comets

* [+] What is a comet?
* [x] What is a comet made of?
* [+] What is the nucleus of a comet?
* [+] What is a comet’s coma?
* [+] What is a comet’s tail?
* [x] Why do comets develop tails near the Sun?
* [+] Where do comets come from?
* [+] What is the Kuiper Belt?
* [+] What is the Oort Cloud?
* [+] What is the difference between a comet and an asteroid?
* [+] How are comets classified?
* [x] How often do comets return?
* [x] What are some famous comets?

Nebulae

* [+] What is a nebula?
* [+] What is a nebula made of?
* [+] What are the main types of nebulae?
* [+] What is an emission nebula?
* [+] What is a reflection nebula?
* [+] What is a planetary nebula?
* [+] What is a supernova remnant?
* [+] How are nebulae formed?
* [x] How are stars formed inside nebulae?
* [x] Why do some nebulae appear different colors?
* [+] What is the difference between a nebula and a galaxy?

⸻

Biology

Fossils

* [+] What is a fossil?
* [+] How are fossils formed?
* [+] What are the main types of fossils?
* [+] What is fossilization?
* [+] Where are fossils found?
* [x] What can fossils tell us about ancient life?
* [x] How do scientists determine the age of fossils?
* [+] What is radiometric dating?
* [x] What is the difference between a fossil and a fossilized bone?
* [+] What is a trace fossil?
* [+] What is a fossil record?
* [+] Why are fossils important for understanding evolution?
* [x] What are some famous fossils?

DNA

* [+] What is DNA?
* [+] What does DNA stand for?
* [x] What is DNA made of?
* [+] What is the structure of DNA?
* [+] What are nucleotides?
* [+] What are the four bases in DNA?
* [x] How does DNA store genetic information?
* [x] How is DNA copied?
* [+] What is DNA replication?
* [+] What is a gene?
* [x] How does DNA determine traits?
* [+] What is the difference between DNA and RNA?
* [+] How was the structure of DNA discovered?
* [+] Who discovered the structure of DNA?
* [x] How is DNA used in medicine?
* [x] How is DNA used in forensic science?
* [+] How is DNA used to determine biological relationships?

RNA

* [+] What is RNA?
* [+] What does RNA stand for?
* [x] What is RNA made of?
* [+] How is RNA different from DNA?
* [+] What are the main types of RNA?
* [+] What is messenger RNA?
* [+] What is transfer RNA?
* [+] What is ribosomal RNA?
* [x] What does RNA do inside a cell?
* [x] How does RNA help make proteins?
* [+] What is transcription?
* [+] What is translation?
* [x] How do RNA viruses use RNA?
* [x] Why is RNA important in modern biotechnology?

Chromosomes

* [+] What is a chromosome?
* [x] What are chromosomes made of?
* [+] Where are chromosomes found?
* [+] How many chromosomes do humans have?
* [+] What is a chromosome pair?
* [+] What is the difference between chromosomes, DNA, and genes?
* [+] What are sex chromosomes?
* [+] What are autosomes?
* [x] How are chromosomes copied during cell division?
* [x] What happens when chromosomes do not separate correctly?
* [+] What is a karyotype?
* [+] How are chromosomes inherited from parents?

Cells

* [+] What is a cell?
* [x] Why are cells considered the basic units of life?
* [+] What are the main types of cells?
* [x] What is a prokaryotic cell?
* [+] What is a eukaryotic cell?
* [x] What is the difference between plant and animal cells?
* [+] What are the main parts of a cell?
* [+] What does the cell membrane do?
* [+] What does the nucleus do?
* [+] What are mitochondria?
* [+] What are ribosomes?
* [+] What are chloroplasts?
* [x] How do cells obtain energy?
* [x] How do cells reproduce?
* [+] What is mitosis?
* [+] What is meiosis?
* [+] How are cells specialized?

Bacteria

* [+] What is a bacterium?
* [+] What are bacteria?
* [x] What does a bacterial cell look like?
* [+] How do bacteria reproduce?
* [+] Where do bacteria live?
* [x] Are all bacteria harmful?
* [+] Which bacteria are beneficial?
* [+] Which bacteria cause disease?
* [x] How do antibiotics affect bacteria?
* [+] What is antibiotic resistance?
* [+] What is the difference between bacteria and viruses?
* [+] How are bacteria used in food production?
* [x] How are bacteria used in biotechnology?
* [x] How did scientists discover bacteria?

Viruses

* [+] What is a virus?
* [x] What is a virus made of?
* [x] How do viruses reproduce?
* [x] Why do viruses need host cells?
* [x] How do viruses infect cells?
* [x] What are the main types of viruses?
* [+] What is a viral genome?
* [+] What is a viral capsid?
* [x] What is the difference between viruses and bacteria?
* [x] How does the immune system respond to viruses?
* [x] How do vaccines protect against viruses?
* [+] How do antiviral drugs work?
* [x] How do viruses evolve?
* [x] What are some important human viruses?

Photosynthesis

* [+] What is photosynthesis?
* [+] How does photosynthesis work?
* [x] Where does photosynthesis occur?
* [+] What do plants need for photosynthesis?
* [+] What are the products of photosynthesis?
* [+] What role does sunlight play in photosynthesis?
* [+] What is chlorophyll?
* [+] Why is photosynthesis important for life?
* [x] How does photosynthesis affect Earth’s atmosphere?
* [+] What is the difference between photosynthesis and cellular respiration?
* [+] Which organisms can perform photosynthesis?
* [x] How do plants use glucose produced by photosynthesis?

Cellular respiration

* [+] What is cellular respiration?
* [+] How does cellular respiration work?
* [x] Where does cellular respiration occur?
* [+] What is the role of mitochondria?
* [+] What are the products of cellular respiration?
* [x] How does cellular respiration produce ATP?
* [+] What is ATP?
* [+] What is aerobic respiration?
* [+] What is anaerobic respiration?
* [+] What is fermentation?
* [+] What is the difference between cellular respiration and photosynthesis?
* [x] Why do cells need cellular respiration?

⸻

History & Civilization

This section especially needs a major change because “What was the history of the Roman Empire?”, “What was the Roman Empire used for?”, and “How did the Roman Empire work?” aren’t useful variants.

For historical entities, use origin → development → major events → people → characteristics → decline/legacy.

History

* [+] What is history?
* [+] What does history study?
* [+] What is the difference between history and prehistory?
* [+] What are primary sources?
* [+] What are secondary sources?
* [+] How do historians study the past?
* [x] How do historians determine whether a historical source is reliable?
* [+] What is historiography?
* [+] What is chronology?
* [x] Why are historical sources important?
* [+] What is archaeology?
* [x] How does archaeology help historians?
* [+] Why is history important?
* [+] What are the main periods of human history?
* [+] When does recorded history begin?

Prehistory

* [+] What is prehistory?
* [+] What is the difference between prehistory and history?
* [+] When did prehistory begin?
* [+] When did prehistory end?
* [x] What are the Stone Age, Bronze Age, and Iron Age?
* [x] What was life like during the Stone Age?
* [x] How did early humans obtain food?
* [x] When did humans begin using tools?
* [+] When did humans begin farming?
* [x] When did humans begin living in permanent settlements?
* [+] How do archaeologists study prehistoric societies?
* [x] What evidence do we have about prehistoric humans?

Archaeology

* [+] What is archaeology?
* [+] What does archaeology study?
* [x] How do archaeologists investigate ancient sites?
* [+] What is an archaeological excavation?
* [+] What is an archaeological artifact?
* [+] What is an archaeological site?
* [x] How do archaeologists date artifacts?
* [+] What is radiocarbon dating?
* [x] What can archaeology tell us about ancient civilizations?
* [+] What is the difference between archaeology and anthropology?
* [x] How has modern technology changed archaeology?

Empires

* [+] What is an empire?
* [+] How is an empire different from a kingdom?
* [+] How were empires governed?
* [+] How did empires expand?
* [x] How did empires control distant territories?
* [x] Why did empires build roads and communication networks?
* [+] Why did empires decline?
* [+] What are some of the largest empires in history?
* [x] What is the difference between an empire and a federation?
* [x] How did imperialism shape world history?

Kingdoms

* [+] What is a kingdom?
* [+] How is a kingdom governed?
* [+] What is a monarch?
* [+] How is a kingdom different from an empire?
* [x] How was royal succession determined?
* [x] What role did nobles play in medieval kingdoms?
* [x] How did medieval kingdoms collect taxes?
* [x] How did kingdoms defend their territory?
* [x] How did kingdoms develop into modern states?

Republics

* [+] What is a republic?
* [x] How is a republic different from a monarchy?
* [x] How does a republic govern its citizens?
* [+] What is representative government?
* [x] What is the difference between a republic and a democracy?
* [+] What are some historical republics?
* [+] How did the Roman Republic work?
* [+] How did modern republics develop?

Dynasties

* [+] What is a dynasty?
* [x] How does a dynasty maintain power?
* [+] How is a dynasty different from a monarchy?
* [x] How is dynastic succession determined?
* [x] What are some famous dynasties?
* [x] What role did dynasties play in ancient China?
* [+] Why do dynasties rise and fall?
* [x] How did dynastic rule influence history?

Monarchy

* [+] What is a monarchy?
* [+] What is an absolute monarchy?
* [+] What is a constitutional monarchy?
* [x] What is the difference between absolute and constitutional monarchy?
* [x] How is a monarch chosen?
* [x] How is royal succession determined?
* [+] What powers can a monarch have?
* [x] How have monarchies changed over time?
* [x] What are some modern constitutional monarchies?

Feudalism

* [+] What was feudalism?
* [+] Where and when did feudalism develop?
* [+] How did the feudal system work?
* [x] What was the relationship between lords and vassals?
* [+] What was a fief?
* [x] What role did peasants play in feudal society?
* [+] What was serfdom?
* [x] How did castles fit into feudal society?
* [x] How did feudalism decline?
* [x] Was feudalism the same throughout medieval Europe?

⸻

Major historical periods and events

Renaissance

* [+] What was the Renaissance?
* [+] Where did the Renaissance begin?
* [+] When did the Renaissance begin?
* [+] Why did the Renaissance begin in Italy?
* [x] What were the main characteristics of the Renaissance?
* [+] Who were the major Renaissance artists?
* [+] What was Renaissance humanism?
* [x] How did the Renaissance affect science?
* [x] How did the Renaissance affect art?
* [x] How did the printing press influence the Renaissance?
* [x] How did the Renaissance spread across Europe?
* [x] How did the Renaissance influence modern Europe?

Enlightenment

* [+] What was the Enlightenment?
* [x] When did the Enlightenment occur?
* [x] Where did the Enlightenment begin?
* [+] What ideas were central to the Enlightenment?
* [+] Who were the major Enlightenment thinkers?
* [+] What did John Locke argue?
* [x] What did Montesquieu argue?
* [x] What did Voltaire argue?
* [+] What did Jean-Jacques Rousseau argue?
* [+] How did the Enlightenment influence democracy?
* [+] How did the Enlightenment influence the American and French Revolutions?

Industrial Revolution

* [+] What was the Industrial Revolution?
* [+] Where did the Industrial Revolution begin?
* [+] When did the Industrial Revolution begin?
* [+] Why did the Industrial Revolution begin in Britain?
* [x] What inventions drove the Industrial Revolution?
* [+] What was the steam engine’s role in the Industrial Revolution?
* [x] How did factories change production?
* [x] How did the Industrial Revolution change cities?
* [x] How did the Industrial Revolution affect workers?
* [x] How did the Industrial Revolution affect transportation?
* [x] How did the Industrial Revolution change everyday life?
* [x] What were the environmental effects of industrialization?

French Revolution

* [+] What was the French Revolution?
* [x] When did the French Revolution begin?
* [x] Why did the French Revolution begin?
* [+] What were the main causes of the French Revolution?
* [x] What happened during the storming of the Bastille?
* [+] Who was Louis XVI?
* [+] Who was Maximilien Robespierre?
* [+] What was the Reign of Terror?
* [+] What was the Declaration of the Rights of Man and of the Citizen?
* [+] How did the French Revolution end?
* [+] How did Napoleon rise to power?
* [x] What were the major consequences of the French Revolution?

American Revolution

* [+] What was the American Revolution?
* [+] When did the American Revolution begin?
* [+] Why did the American Revolution begin?
* [x] What caused the American colonies to rebel against Britain?
* [+] What was the Boston Tea Party?
* [+] What was the Declaration of Independence?
* [x] Who wrote the Declaration of Independence?
* [+] Who fought in the American Revolutionary War?
* [+] What was the role of George Washington?
* [+] How did the American Revolution end?
* [+] What was the Treaty of Paris of 1783?
* [x] What were the consequences of the American Revolution?

Roman Empire

* [+] What was the Roman Empire?
* [x] When did the Roman Empire begin?
* [x] How did the Roman Empire begin?
* [x] How large was the Roman Empire?
* [x] How was the Roman Empire governed?
* [+] Who was Augustus?
* [+] What was the Roman Senate?
* [x] How did Rome expand its territory?
* [x] What was daily life like in the Roman Empire?
* [x] How did Roman roads help the empire?
* [x] What role did the Roman army play?
* [x] What religions were practiced in the Roman Empire?
* [+] How did Christianity spread through the Roman Empire?
* [+] Why did the Western Roman Empire decline?
* [+] When did the Western Roman Empire fall?
* [+] What was the legacy of the Roman Empire?

Byzantine Empire

* [+] What was the Byzantine Empire?
* [x] Why is the Byzantine Empire also called the Eastern Roman Empire?
* [x] When did the Byzantine Empire begin?
* [+] What was Constantinople?
* [+] Who was Justinian I?
* [+] What was the Hagia Sophia?
* [+] What was the Byzantine legal system?
* [x] What role did Orthodox Christianity play in the Byzantine Empire?
* [x] How did Byzantine culture influence Eastern Europe?
* [x] What caused the decline of the Byzantine Empire?
* [+] When did Constantinople fall?
* [x] What happened to the Byzantine Empire after 1453?

Ottoman Empire

* [+] What was the Ottoman Empire?
* [x] When did the Ottoman Empire begin?
* [x] How did the Ottoman Empire expand?
* [+] Who was Osman I?
* [+] Who was Mehmed II?
* [x] What happened when the Ottomans conquered Constantinople?
* [+] How was the Ottoman Empire governed?
* [+] What was the role of the sultan?
* [+] What was the Janissary corps?
* [x] What religions and peoples lived in the Ottoman Empire?
* [x] How large did the Ottoman Empire become?
* [+] Why did the Ottoman Empire decline?
* [+] When did the Ottoman Empire end?
* [x] What was the legacy of the Ottoman Empire?

First Bulgarian Empire

* [+] What was the First Bulgarian Empire?
* [+] When was the First Bulgarian Empire founded?
* [+] Who founded the First Bulgarian Empire?
* [x] What happened in 681?
* [x] What was the capital of the First Bulgarian Empire?
* [+] Who was Khan Krum?
* [x] How did Khan Krum expand Bulgaria?
* [+] Who was Boris I?
* [+] Why did Boris I convert Bulgaria to Christianity?
* [+] Who were Cyril and Methodius?
* [x] How did the disciples of Cyril and Methodius influence Bulgaria?
* [+] What was the Preslav Literary School?
* [+] What was the Ohrid Literary School?
* [+] Who was Tsar Simeon I?
* [+] Why was Simeon I’s reign important?
* [x] How did the First Bulgarian Empire decline?
* [+] When did the First Bulgarian Empire end?

Second Bulgarian Empire

* [+] What was the Second Bulgarian Empire?
* [+] When was the Second Bulgarian Empire founded?
* [+] Who were the brothers Asen and Peter?
* [+] What was Tarnovo?
* [+] Who was Tsar Kaloyan?
* [+] Who was Tsar Ivan Asen II?
* [x] How large did the Second Bulgarian Empire become?
* [+] What was the Battle of Klokotnitsa?
* [x] Why was the reign of Ivan Asen II important?
* [+] What was the Tarnovo Literary School?
* [x] How did the Second Bulgarian Empire decline?
* [+] When did Tarnovo fall?
* [+] When did the Second Bulgarian Empire end?

Cold War

* [+] What was the Cold War?
* [+] When did the Cold War begin?
* [+] Why did the Cold War begin?
* [x] Which countries were the main rivals during the Cold War?
* [+] What were NATO and the Warsaw Pact?
* [+] What was the Iron Curtain?
* [+] What was the Berlin Blockade?
* [+] What was the Cuban Missile Crisis?
* [+] What was the Space Race?
* [+] What was the arms race?
* [+] What were proxy wars?
* [x] How did the Cold War affect Europe?
* [x] How did the Cold War affect Asia?
* [+] How did the Cold War end?
* [+] When did the Soviet Union dissolve?

Silk Road

* [+] What was the Silk Road?
* [+] Where did the Silk Road run?
* [+] When did the Silk Road develop?
* [+] Why was the Silk Road important?
* [x] What goods were traded along the Silk Road?
* [x] What ideas and technologies spread along the Silk Road?
* [x] How did religions spread along the Silk Road?
* [x] Which civilizations participated in Silk Road trade?
* [x] Was the Silk Road one road or a network of routes?
* [x] How did the Silk Road decline?

Black Death

* [+] What was the Black Death?
* [+] When did the Black Death occur?
* [+] Where did the Black Death begin?
* [+] What caused the Black Death?
* [x] How did the plague spread across Europe?
* [x] What symptoms did the Black Death cause?
* [x] How many people died during the Black Death?
* [x] How did people respond to the plague?
* [x] How did the Black Death affect European society?
* [x] How did the Black Death affect the economy?
* [x] How did the Black Death change European history?
* [x] How did the Black Death eventually decline?

Protestant Reformation

* [+] What was the Protestant Reformation?
* [x] When did the Protestant Reformation begin?
* [x] Why did the Protestant Reformation begin?
* [+] Who was Martin Luther?
* [+] What were the Ninety-five Theses?
* [x] Why did Martin Luther criticize the Catholic Church?
* [+] What was the role of the printing press in the Reformation?
* [+] Who were the major Protestant reformers?
* [+] What was the Catholic Counter-Reformation?
* [x] How did the Reformation change European politics?
* [x] How did the Reformation change Christianity?

Geography

* [+] What is geography?
* [+] What does geography study?
* [+] What are the main branches of geography?
* [+] What is physical geography?
* [+] What is human geography?
* [+] What is cartography?
* [+] What is a map?
* [+] What is a geographic coordinate system?
* [+] How do geographers study Earth?
* [+] Why is geography important?
* [x] How does geography influence human settlement?
* [x] How does geography influence climate?
* [x] How does geography influence culture and economies?

Continents

* [+] What is a continent?
* [x] How many continents are there?
* [+] What are the continents of the world?
* [x] How are continents defined?
* [+] How did the continents form?
* [+] What is continental drift?
* [+] What is plate tectonics?
* [x] How have continents changed over geological time?

Countries and political geography

* [+] What is a country?
* [x] What makes a territory a country?
* [+] What is a sovereign state?
* [+] What is the difference between a country and a state?
* [+] What is a nation?
* [+] What is the difference between a nation and a state?
* [+] What is a border?
* [x] How are international borders established?
* [+] What is a capital city?
* [+] Why do countries have capital cities?
* [+] What is a province?
* [+] What is a municipality?
* [x] How are countries divided into administrative regions?

Landforms

* [+] What is a peninsula?
* [+] How are peninsulas formed?
* [x] What are some famous peninsulas?
* [+] What is an island?
* [+] How are islands formed?
* [+] What are volcanic islands?
* [+] What are continental islands?
* [+] What is an archipelago?
* [x] What are some famous archipelagos?
* [+] What is a mountain?
* [+] How are mountains formed?
* [+] What are the main types of mountains?
* [+] What is a mountain range?
* [+] How are mountain ranges formed?
* [+] What is a valley?
* [+] How are valleys formed?
* [+] What is a plateau?
* [+] How are plateaus formed?
* [+] What is a desert?
* [+] How are deserts formed?
* [x] What are the main types of deserts?
* [+] What is a rainforest?
* [+] Where are tropical rainforests found?
* [+] Why are rainforests important?

Rivers and lakes

* [+] What is a river?
* [+] How does a river form?
* [+] What are the main parts of a river?
* [+] What is a river source?
* [+] What is a river mouth?
* [+] What is a tributary?
* [+] What is a river basin?
* [x] How do rivers shape landscapes?
* [+] Why are rivers important to human civilization?
* [+] What is a lake?
* [+] How are lakes formed?
* [+] What are the main types of lakes?
* [x] What is the largest lake in the world?
* [+] What is the difference between a lake and a sea?

Oceans and seas

* [+] What is an ocean?
* [+] How many oceans are there?
* [+] What are the world’s oceans?
* [+] How were the oceans formed?
* [+] What is the difference between an ocean and a sea?
* [+] What is a sea?
* [+] What is a strait?
* [x] How are straits important for navigation?
* [+] What is a gulf?
* [+] What is a bay?
* [+] What is an ocean current?
* [x] How do ocean currents affect climate?
* [+] Why are oceans important to life on Earth?

Climate

* [+] What is climate?
* [+] What is the difference between climate and weather?
* [+] What factors determine climate?
* [+] What are the main climate zones?
* [+] What is a tropical climate?
* [+] What is a temperate climate?
* [+] What is a polar climate?
* [+] What is a desert climate?
* [x] How does latitude affect climate?
* [x] How does altitude affect climate?
* [x] How do oceans affect climate?
* [+] What is a biome?
* [+] How are climate and biomes related?

Latitude and longitude

* [+] What is latitude?
* [+] What is longitude?
* [+] What is the Equator?
* [+] What is the Prime Meridian?
* [+] How are latitude and longitude used to locate places?
* [+] What are the Tropic of Cancer and Tropic of Capricorn?
* [+] What are the Arctic and Antarctic Circles?
* [+] What is a geographic coordinate?
* [+] What is a time zone?
* [+] Why do time zones exist?
* [+] How are time zones related to longitude?
* [x] Why do some countries use more than one time zone?

Bicycle

* [+] What is a bicycle?
* [+] What are the main parts of a bicycle?
* [+] How does a bicycle work?
* [x] How does pedaling move a bicycle?
* [+] How do bicycle gears work?
* [+] What is a bicycle chain?
* [+] How do bicycle brakes work?
* [+] What are the main types of bicycles?
* [+] What is the difference between a road bike and a mountain bike?
* [+] When was the modern bicycle invented?
* [x] How has the bicycle changed over time?

Automobile

* [+] What is an automobile?
* [+] What are the main parts of a car?
* [+] How does a car work?
* [+] How does a car engine work?
* [+] How does a transmission work?
* [x] How do car brakes work?
* [+] How does a steering system work?
* [+] What are the main types of cars?
* [+] What is the difference between an electric car and a gasoline car?
* [+] When was the automobile invented?
* [x] How did automobiles change transportation?

Engine

* [+] What is an engine?
* [+] How does an engine work?
* [+] What are the main types of engines?
* [+] What is an internal combustion engine?
* [+] How does a gasoline engine work?
* [+] How does a diesel engine work?
* [+] What is a two-stroke engine?
* [+] What is a four-stroke engine?
* [+] What is the difference between an engine and a motor?
* [+] What is engine displacement?
* [x] How does an engine produce mechanical power?

Battery

* [+] What is a battery?
* [+] How does a battery work?
* [+] What is a battery made of?
* [+] What is an electric cell?
* [+] What are the main types of batteries?
* [+] What is a lithium-ion battery?
* [+] What is a rechargeable battery?
* [+] How does a battery store energy?
* [x] How does a battery produce electrical current?
* [x] What determines battery capacity?
* [+] What is battery voltage?
* [x] Why do rechargeable batteries eventually lose capacity?
* [+] What is the difference between a battery and a fuel cell?

Electric motor

* [+] What is an electric motor?
* [+] How does an electric motor work?
* [x] How does electricity create motion in a motor?
* [+] What are the main types of electric motors?
* [+] What is a DC motor?
* [+] What is an AC motor?
* [+] What is a brushless motor?
* [x] What is the difference between an electric motor and an engine?
* [+] Where are electric motors used?
* [+] How are electric motors used in electric vehicles?

Camera

* [+] What is a camera?
* [+] How does a camera work?
* [+] What are the main parts of a camera?
* [+] What does a camera lens do?
* [+] What is an image sensor?
* [+] How does a digital camera capture an image?
* [+] What is exposure?
* [x] What are aperture, shutter speed, and ISO?
* [+] What is autofocus?
* [+] What are the main types of cameras?
* [+] What is the difference between a DSLR and a mirrorless camera?
* [+] How did photography cameras develop?

Lens

* [+] What is a lens?
* [+] How does a lens work?
* [+] How does a lens focus light?
* [x] What are the main types of lenses?
* [+] What is a convex lens?
* [x] What is a concave lens?
* [+] What is focal length?
* [+] What is lens magnification?
* [+] What is a wide-angle lens?
* [+] What is a telephoto lens?
* [x] What is the difference between a camera lens and the human eye lens?
* [+] Where are lenses used?

Microphone

* [+] What is a microphone?
* [+] How does a microphone work?
* [+] How does a microphone convert sound into an electrical signal?
* [+] What are the main types of microphones?
* [+] What is a dynamic microphone?
* [+] What is a condenser microphone?
* [x] What is the difference between dynamic and condenser microphones?
* [+] Where are microphones used?
* [+] How did microphones develop?

Speaker

* [+] What is a loudspeaker?
* [+] How does a speaker work?
* [+] How does a speaker convert an electrical signal into sound?
* [+] What are the main parts of a speaker?
* [+] What are the main types of speakers?
* [+] What is a woofer?
* [+] What is a tweeter?
* [+] What is a subwoofer?
* [+] What is the difference between a speaker and a microphone?
* [x] How do headphones produce sound?

Television

* [+] What is television?
* [+] How does a television work?
* [x] How does a television display an image?
* [+] What is a television signal?
* [+] What are the main types of television displays?
* [+] What is LCD?
* [+] What is OLED?
* [x] What is LED television?
* [+] What is the difference between LCD and OLED?
* [+] How does digital television work?
* [+] How did television develop?

Radio

* [+] What is radio?
* [+] How does radio communication work?
* [+] What is a radio wave?
* [+] How does a radio transmit a signal?
* [+] How does a radio receiver work?
* [+] What are AM and FM?
* [x] What is the difference between AM and FM?
* [+] What is radio broadcasting?
* [+] How did radio communication develop?

Satellite

* [+] What is a satellite?
* [+] What is an artificial satellite?
* [+] How does a satellite stay in orbit?
* [+] What is an orbit?
* [+] What are the main types of satellites?
* [+] What are communication satellites?
* [+] What are weather satellites?
* [+] What are navigation satellites?
* [+] What are Earth observation satellites?
* [x] How do satellites communicate with Earth?
* [+] What is GPS?
* [x] How are satellites launched?
* [x] How long can satellites remain in orbit?

Drone

* [+] What is a drone?
* [+] How does a drone fly?
* [+] What are the main parts of a drone?
* [+] What are the main types of drones?
* [x] How does a drone’s flight controller work?
* [x] How does GPS help a drone navigate?
* [+] How does a drone camera work?
* [+] What are drones used for?
* [+] How are drones used in photography?
* [+] How are drones used in agriculture?
* [x] How are drones used for mapping and surveying?
* [+] What is the difference between a drone and an aircraft?

Robot

* [+] What is a robot?
* [+] What are the main parts of a robot?
* [+] How does a robot work?
* [+] How do robots sense their environment?
* [+] How do robots move?
* [x] What is a robotic actuator?
* [x] What is a robot controller?
* [+] What are the main types of robots?
* [+] What are industrial robots?
* [+] What are autonomous robots?
* [+] What are robots used for?
* [+] How are robots used in manufacturing?
* [x] What is the difference between a robot and an artificial intelligence system?

3D printer

* [+] What is a 3D printer?
* [+] How does 3D printing work?
* [+] What is additive manufacturing?
* [+] What are the main types of 3D printing?
* [+] What is FDM 3D printing?
* [x] What is resin 3D printing?
* [x] What materials can 3D printers use?
* [+] What is a 3D printer filament?
* [x] How is a 3D model prepared for printing?
* [x] What is slicing in 3D printing?
* [+] What are 3D printers used for?
* [+] How is 3D printing used in manufacturing and medicine?

Telescope

* [+] What is a telescope?
* [+] How does a telescope work?
* [+] What is a refracting telescope?
* [+] What is a reflecting telescope?
* [+] What is an astronomical telescope?
* [+] What is telescope magnification?
* [+] What is aperture?
* [x] Why is telescope aperture important?
* [+] How do telescopes collect light?
* [+] What can telescopes reveal about distant objects?
* [+] What is a space telescope?
* [+] How is a space telescope different from a ground-based telescope?

Microscope

* [+] What is a microscope?
* [+] How does a microscope work?
* [+] What are the main types of microscopes?
* [+] What is a light microscope?
* [+] What is an electron microscope?
* [x] What is microscope magnification?
* [+] What is microscope resolution?
* [+] What can be seen with a microscope?
* [x] How does a microscope differ from a telescope?
* [x] How did microscopes contribute to biology?

Thermometer

* [+] What is a thermometer?
* [+] How does a thermometer work?
* [+] What are the main types of thermometers?
* [+] How does a mercury thermometer work?
* [x] How does a digital thermometer work?
* [+] How is temperature measured?
* [+] What is the Celsius scale?
* [+] What is the Fahrenheit scale?
* [+] What is the Kelvin scale?
* [+] What is the difference between temperature and heat?

Compass

* [+] What is a compass?
* [+] How does a compass work?
* [+] Why does a compass point north?
* [+] What is Earth’s magnetic field?
* [+] What is magnetic north?
* [+] What is true north?
* [x] What are the main types of compasses?
* [+] How is a compass used for navigation?
* [+] How did the magnetic compass develop?

Clock and watch

* [+] What is a clock?
* [+] How does a clock measure time?
* [+] What are the main types of clocks?
* [+] What is a mechanical clock?
* [+] How does a mechanical clock work?
* [+] What is a quartz clock?
* [+] How does a quartz clock work?
* [+] What is an atomic clock?
* [x] Why are atomic clocks so accurate?
* [+] What is a watch?
* [+] What is the difference between a clock and a watch?
* [x] What are mechanical and quartz watches?
* [x] How did clocks and watches develop?

Refrigerator

* [+] What is a refrigerator?
* [+] How does a refrigerator work?
* [x] How does refrigeration remove heat?
* [+] What is a refrigeration cycle?
* [+] What is a refrigerant?
* [+] What are the main parts of a refrigerator?
* [x] What does a compressor do in a refrigerator?
* [+] What does a thermostat do?
* [x] Why does a refrigerator produce heat?
* [+] How is a refrigerator different from a freezer?
* [+] How did refrigeration develop?

Washing machine

* [+] What is a washing machine?
* [+] How does a washing machine work?
* [+] What are the main parts of a washing machine?
* [x] How does a washing machine clean clothes?
* [x] What is the difference between a front-loading and top-loading washing machine?
* [x] What does the washing machine drum do?
* [+] How does the spin cycle work?
* [+] What is a washing machine’s water pump used for?
* [x] How do washing machines control water temperature?
* [+] How did washing machines develop?

Dishwasher

* [+] What is a dishwasher?
* [+] How does a dishwasher work?
* [+] How does a dishwasher clean dishes?
* [+] What are the main parts of a dishwasher?
* [+] What is the role of detergent in a dishwasher?
* [x] How does a dishwasher heat water?
* [x] How does the dishwasher drain water?
* [+] What is the difference between a dishwasher and hand washing?
* [+] How did dishwashers develop?

Microwave oven

* [+] What is a microwave oven?
* [+] How does a microwave oven work?
* [+] How do microwaves heat food?
* [+] What are microwaves?
* [x] Why do some foods heat faster than others?
* [+] What is the role of water molecules in microwave heating?
* [x] Why does metal behave differently in a microwave?
* [+] What are the main parts of a microwave oven?
* [x] Is microwave cooking different from conventional cooking?
* [+] How did microwave ovens develop?

Electric vehicles

* [+] What is an electric vehicle?
* [+] How does an electric car work?
* [+] What are the main parts of an electric vehicle?
* [+] How does an electric motor propel an electric car?
* [+] How does an electric vehicle battery work?
* [x] How are electric vehicles charged?
* [+] What are the main types of electric vehicles?
* [+] What is a hybrid vehicle?
* [x] What is the difference between a hybrid and a fully electric vehicle?
* [x] What determines an electric vehicle’s range?
* [+] How does regenerative braking work?
* [+] How did electric vehicles develop?

Solar panels

* [+] What is a solar panel?
* [+] How does a solar panel work?
* [+] How do solar cells convert sunlight into electricity?
* [+] What is the photovoltaic effect?
* [+] What are solar cells made of?
* [+] What are the main types of solar panels?
* [+] What is the difference between monocrystalline and polycrystalline solar panels?
* [+] How much electricity can a solar panel produce?
* [x] What factors affect solar panel efficiency?
* [x] How are solar panels used in homes?
* [+] How are solar panels connected to the electrical grid?

Wind turbines

* [+] What is a wind turbine?
* [+] How does a wind turbine work?
* [x] How does wind energy become electricity?
* [+] What are the main parts of a wind turbine?
* [+] What is a turbine blade?
* [+] What are horizontal-axis and vertical-axis wind turbines?
* [x] Where are wind turbines installed?
* [x] What factors affect wind turbine power output?
* [+] What is a wind farm?
* [+] How are offshore wind turbines different from onshore turbines?
* [x] How did wind power technology develop?

Mathematics

* [+] What is mathematics?
* [x] What are the main branches of mathematics?
* [+] What is arithmetic?
* [+] What is algebra?
* [+] What is geometry?
* [+] What is trigonometry?
* [+] What is calculus?
* [+] What is statistics?
* [+] What is probability?
* [+] How is mathematics used in science?
* [+] How is mathematics used in engineering?
* [+] How is mathematics used in everyday life?
* [+] How did mathematics develop?

Numbers

* [+] What is a number?
* [x] What are the main types of numbers?
* [+] What is a natural number?
* [+] What is a whole number?
* [+] What is an integer?
* [+] What is a rational number?
* [+] What is an irrational number?
* [+] What is a real number?
* [+] What is a complex number?
* [+] What is the difference between an integer and a rational number?
* [+] What is the difference between rational and irrational numbers?
* [+] What is zero?
* [+] Why is zero important in mathematics?

Fractions

* [+] What is a fraction?
* [+] What are the numerator and denominator?
* [x] What is a proper fraction?
* [x] What is an improper fraction?
* [x] What is a mixed number?
* [x] How do you add fractions?
* [x] How do you subtract fractions?
* [x] How do you multiply fractions?
* [x] How do you divide fractions?
* [+] What is an equivalent fraction?
* [x] How are fractions related to decimals?
* [+] How are fractions related to percentages?

Percentages

* [+] What is a percentage?
* [+] How is a percentage calculated?
* [x] How do you convert a fraction to a percentage?
* [x] How do you convert a decimal to a percentage?
* [x] How do you calculate a percentage increase?
* [x] How do you calculate a percentage decrease?
* [x] How are percentages used in everyday life?
* [+] What is the difference between percentage and percentage point?

Prime numbers

* [+] What is a prime number?
* [+] What is a composite number?
* [x] How can you determine whether a number is prime?
* [x] What are the first prime numbers?
* [+] Why are prime numbers important?
* [+] What is prime factorization?
* [x] How are prime numbers used in cryptography?
* [x] What is the difference between a prime number and a composite number?

Equations

* [+] What is an equation?
* [+] What is a mathematical expression?
* [+] What is a variable in an equation?
* [x] How do you solve a simple equation?
* [+] What is a linear equation?
* [+] What is a quadratic equation?
* [+] What is a system of equations?
* [+] What is an equation used for?
* [x] What is the difference between an equation and an inequality?

Algebra

* [+] What is algebra?
* [+] What is a variable?
* [+] What is a constant?
* [+] What is an algebraic expression?
* [+] What is a linear equation?
* [+] What is a polynomial?
* [+] What is a quadratic equation?
* [+] What is a function?
* [x] How are algebraic equations solved?
* [x] Where is algebra used in everyday life?
* [x] Why is algebra important in science and engineering?

Geometry

* [+] What is geometry?
* [+] What are the basic concepts of geometry?
* [+] What is a point?
* [+] What is a line?
* [+] What is an angle?
* [+] What is a shape?
* [+] What is area?
* [+] What is perimeter?
* [+] What is volume?
* [+] What is the Pythagorean theorem?
* [+] What is Euclidean geometry?
* [+] How is geometry used in architecture and engineering?

Triangle

* [+] What is a triangle?
* [+] What are the main types of triangles?
* [+] What is an equilateral triangle?
* [+] What is an isosceles triangle?
* [x] What is a scalene triangle?
* [+] What is a right triangle?
* [x] How is the area of a triangle calculated?
* [+] What is the sum of the angles of a triangle?
* [+] What is the Pythagorean theorem?
* [+] Where are triangles used in engineering and architecture?

Circle

* [+] What is a circle?
* [+] What are the parts of a circle?
* [+] What is a radius?
* [+] What is a diameter?
* [+] What is circumference?
* [+] What is pi?
* [x] How is the area of a circle calculated?
* [x] How is the circumference of a circle calculated?
* [+] What is a chord?
* [+] What is a tangent to a circle?
* [x] Where are circles used in mathematics and engineering?

Fractals

* [+] What is a fractal?
* [+] What is self-similarity?
* [x] What are some famous fractals?
* [+] What is the Mandelbrot set?
* [+] How are fractals generated?
* [x] Where do fractal patterns occur in nature?
* [x] How are fractals used in computer graphics?
* [+] How are fractals used in mathematics?

Art

* [+] What is art?
* [+] What are the main forms of art?
* [+] What is visual art?
* [+] What is performing art?
* [+] What is applied art?
* [+] What is contemporary art?
* [x] What purposes can art serve?
* [+] How has art changed throughout history?
* [+] What are the major periods of Western art?
* [x] How do artists use color, form, line, and composition?
* [+] What is the difference between fine art and applied art?

Painting

* [+] What is painting?
* [+] What are the main types of painting?
* [+] What are the most common painting techniques?
* [+] What is oil painting?
* [+] What is watercolor painting?
* [+] What is acrylic painting?
* [+] What is fresco?
* [+] What is perspective in painting?
* [+] What is composition in painting?
* [x] How has painting changed throughout history?
* [+] What is the difference between painting and drawing?
* [+] Who are some of the most influential painters in history?

Sculpture

* [+] What is sculpture?
* [+] What are the main types of sculpture?
* [x] What materials are commonly used in sculpture?
* [+] What is carving?
* [+] What is modeling?
* [+] What is casting?
* [+] What is a relief sculpture?
* [x] How has sculpture developed throughout history?
* [+] What is the difference between sculpture and architecture?
* [+] Who are some of the most influential sculptors?

Photography

* [+] What is photography?
* [+] How does photography work?
* [+] How does a camera capture an image?
* [+] What are the main types of photography?
* [+] What is portrait photography?
* [+] What is landscape photography?
* [+] What is documentary photography?
* [+] What is photojournalism?
* [x] What are aperture, shutter speed, and ISO?
* [+] What is photographic composition?
* [+] How did photography develop?
* [x] What is the difference between photography and illustration?

Illustration

* [+] What is illustration?
* [+] What is illustration used for?
* [+] What are the main types of illustration?
* [+] What is editorial illustration?
* [+] What is scientific illustration?
* [+] What is technical illustration?
* [+] What is children’s book illustration?
* [+] How is illustration used in advertising?
* [+] How has digital illustration changed the field?
* [+] What is the difference between illustration and fine art?
* [+] What is the difference between illustration and graphic design?

Architecture

* [+] What is architecture?
* [+] What does architecture involve?
* [+] What are the main types of architecture?
* [+] What is residential architecture?
* [+] What is commercial architecture?
* [+] What is public architecture?
* [+] What are the main elements of a building?
* [+] What is architectural style?
* [+] What is structural design?
* [+] How does architecture reflect culture?
* [x] How has architecture changed throughout history?
* [+] What is the difference between architecture and civil engineering?

Music

* [+] What is music?
* [+] What are the basic elements of music?
* [x] What are melody, harmony, and rhythm?
* [+] What is a musical scale?
* [+] What is a musical genre?
* [x] What are the main families of musical instruments?
* [+] How does music notation work?
* [+] What is tempo?
* [+] What is musical rhythm?
* [+] How has music changed throughout history?
* [+] What are the major periods of Western classical music?
* [+] How is music used in different cultures?

Literature

* [+] What is literature?
* [+] What are the main forms of literature?
* [+] What is prose?
* [+] What is poetry?
* [+] What is fiction?
* [+] What is nonfiction?
* [+] What is a narrative?
* [+] What is a literary genre?
* [+] What is a literary movement?
* [+] What are the major periods of literature?
* [x] How has literature changed throughout history?
* [+] What is the difference between fiction and nonfiction?

Poetry

* [+] What is poetry?
* [+] What are the main types of poetry?
* [+] What is a poem?
* [+] What is rhyme?
* [+] What is rhythm in poetry?
* [+] What is meter?
* [+] What is a stanza?
* [+] What is a metaphor?
* [+] What is symbolism in poetry?
* [+] What is free verse?
* [+] Who are some of the most influential poets?

Novel

* [+] What is a novel?
* [+] What are the main types of novels?
* [+] What is a protagonist?
* [+] What is an antagonist?
* [+] What is a narrator?
* [+] What is a plot?
* [+] What is a setting?
* [+] What is character development?
* [x] What are the major genres of novels?
* [+] How did the modern novel develop?
* [+] What is the difference between a novel and a short story?

Cinema

* [+] What is cinema?
* [+] How does filmmaking work?
* [+] What are the main stages of film production?
* [+] What is a film director?
* [+] What is cinematography?
* [+] What is film editing?
* [+] What is a screenplay?
* [+] What are the main film genres?
* [+] What is documentary cinema?
* [+] How did cinema develop?
* [+] What is the difference between cinema and theater?
* [x] What is the difference between a film and a television series?

Animation

* [+] What is animation?
* [x] How does animation create the illusion of movement?
* [+] What are the main types of animation?
* [+] What is traditional animation?
* [+] What is stop-motion animation?
* [+] What is 2D computer animation?
* [+] What is 3D computer animation?
* [+] What is motion graphics?
* [x] How is animation used in films and games?
* [+] How did animation develop?
* [x] What is the difference between animation and live-action cinema?

Art movements

Surrealism

* [+] What is surrealism?
* [x] When did surrealism begin?
* [x] Where did surrealism begin?
* [x] What ideas influenced surrealism?
* [x] What are the main characteristics of surrealist art?
* [+] Who were the major surrealist artists?
* [x] What techniques did surrealist artists use?
* [x] How did surrealism influence literature?
* [x] How did surrealism influence cinema?
* [x] What are some famous surrealist artworks?
* [x] How did surrealism influence modern art?

Psychology

* [+] What is psychology?
* [+] What does psychology study?
* [x] What are the main branches of psychology?
* [+] What is cognitive psychology?
* [+] What is behavioral psychology?
* [+] What is social psychology?
* [+] What is developmental psychology?
* [+] What is clinical psychology?
* [+] How do psychologists study human behavior?
* [+] What methods are used in psychological research?
* [x] How did psychology become a scientific discipline?
* [x] What is the difference between psychology and psychiatry?

Memory

* [+] What is memory?
* [+] How does human memory work?
* [+] What are the main types of memory?
* [+] What is short-term memory?
* [+] What is long-term memory?
* [+] What is working memory?
* [x] How are memories formed?
* [+] How are memories stored?
* [+] Why do people forget?
* [x] What factors affect memory?
* [+] How does sleep affect memory?
* [x] What is the difference between memory and learning?

Perception

* [+] What is perception?
* [+] How does human perception work?
* [+] What is sensory perception?
* [x] How does the brain interpret sensory information?
* [+] What is visual perception?
* [+] What is auditory perception?
* [+] What are optical illusions?

Attention

* [+] What is attention?
* [+] How does attention work?
* [+] What is selective attention?
* [+] What is divided attention?
* [x] What is sustained attention?
* [x] What affects human attention?
* [x] Why is multitasking difficult?

Learning

* [+] What is learning?
* [+] How does learning work?
* [+] What are the main types of learning?
* [+] What is classical conditioning?
* [+] What is operant conditioning?
* [+] What is observational learning?
* [x] What factors affect learning?
* [x] How does repetition affect learning?
* [x] How does sleep affect learning?
* [x] What is the difference between learning and memory?

Intelligence

* [+] What is intelligence?
* [x] How is intelligence measured?
* [+] What is an intelligence quotient?
* [+] What are intelligence tests?
* [x] What are the limitations of intelligence tests?
* [+] What is fluid intelligence?
* [+] What is crystallized intelligence?
* [x] How do psychologists study intelligence?
* [+] What is the difference between intelligence and knowledge?

Emotion

* [+] What is an emotion?
* [+] How do emotions work?
* [+] What are the basic human emotions?
* [+] How are emotions related to the brain?
* [+] What causes emotional responses?
* [x] How do emotions affect decision-making?
* [+] How do emotions affect behavior?

Motivation

* [+] What is motivation?
* [+] How does motivation work?
* [+] What are intrinsic and extrinsic motivation?
* [+] What factors influence motivation?
* [x] How does motivation affect behavior?
* [x] How does reward affect motivation?
* [+] What is the difference between motivation and emotion?

Personality

* [+] What is personality?
* [x] How is personality studied?
* [+] What are the major theories of personality?
* [+] What are personality traits?
* [+] What is the Big Five personality model?

Communication

* [+] What is communication?
* [+] How does communication work?
* [+] What are the main forms of communication?
* [+] What is verbal communication?
* [+] What is nonverbal communication?
* [+] What is body language?
* [+] What is written communication?
* [+] What causes communication problems?
* [+] How does culture affect communication?
* [+] What is the difference between communication and language?

Language

* [+] What is language?
* [+] How does language work?
* [x] What are the main components of language?
* [+] What is grammar?
* [+] What is syntax?
* [+] What is semantics?
* [+] What is phonology?
* [x] How do children learn language?
* [+] How did human language develop?
* [+] How does language influence communication?
* [+] What is the difference between language and speech?

Creativity

* [+] What is creativity?
* [+] How does creativity work?
* [x] What are the characteristics of creative thinking?
* [x] How do people generate creative ideas?
* [x] What factors affect creativity?
* [+] How is creativity studied?
* [x] How is creativity used in art and design?

Sleep

* [+] What is sleep?
* [x] Why do humans need sleep?
* [x] What happens in the brain during sleep?
* [+] What are the stages of sleep?
* [+] What is REM sleep?
* [+] What is deep sleep?
* [+] Why are sleep cycles important?
* [+] How does sleep affect memory?
* [x] How does sleep affect learning?
* [+] How does lack of sleep affect the body and brain?
* [+] What is dreaming?
* [x] What is the difference between sleep and hibernation?

⸻

Business & Economics

Economics

* [+] What is economics?
* [x] What does economics study?
* [+] What are the main branches of economics?
* [+] What is microeconomics?
* [+] What is macroeconomics?
* [+] What is a market?
* [+] What is supply?
* [+] What is demand?
* [x] How do supply and demand affect prices?
* [+] What is scarcity?
* [+] What is opportunity cost?
* [+] What is inflation?
* [+] What is unemployment?
* [+] What is gross domestic product?
* [+] What is economic growth?
* [+] What is a recession?
* [+] How do economists measure an economy?
* [+] How does international trade work?

Business

* [+] What is a business?
* [+] What does a business do?
* [x] What are the main types of businesses?
* [+] What is a company?
* [+] What is a corporation?
* [+] What is a sole proprietorship?
* [+] What is a partnership?
* [+] What is a startup?
* [x] How does a business make money?
* [+] What is a business model?
* [+] What is revenue?
* [+] What is profit?
* [+] What are operating costs?
* [+] What is a business plan?
* [+] How does a company grow?
* [x] What causes businesses to fail?

Entrepreneurship

* [+] What is entrepreneurship?
* [+] What is an entrepreneur?
* [x] How do entrepreneurs start businesses?
* [+] What is a startup?
* [+] What is a business idea?
* [+] What is a business model?
* [+] What is a business plan?
* [+] What is venture capital?
* [+] What is an investor?
* [+] What is a startup accelerator?
* [+] How do startups raise money?
* [+] What is innovation?

Market

* [+] What is a market?
* [+] How does a market work?
* [+] What are buyers and sellers?
* [+] What is supply?
* [+] What is demand?
* [+] How is a market price determined?
* [+] What is competition?
* [+] What is a monopoly?
* [+] What is an oligopoly?
* [+] What is a competitive market?
* [+] What is a market economy?
* [+] What is a financial market?
* [+] What is an online marketplace?

Inflation

* [+] What is inflation?
* [+] How is inflation measured?
* [+] What causes inflation?
* [+] What is the consumer price index?
* [x] How does inflation affect prices?
* [x] How does inflation affect wages?
* [x] How does inflation affect savings?
* [x] How does inflation affect borrowing?
* [+] What is the difference between inflation and deflation?
* [+] What is hyperinflation?
* [x] How do central banks try to control inflation?

Recession

* [+] What is a recession?
* [+] What causes a recession?
* [x] How is a recession measured?
* [x] What happens to employment during a recession?
* [x] What happens to businesses during a recession?
* [x] How does a recession affect consumers?
* [+] Difference between a recession and a depression?
* [x] How do governments respond to recessions?

GDP

* [+] What is gross domestic product?
* [+] How is GDP calculated?
* [+] What does GDP measure?
* [+] What are the components of GDP?
* [+] What is GDP per capita?
* [+] What is the difference between nominal and real GDP?
* [x] What are the limitations of GDP?
* [+] How is GDP used to compare economies?

Currency

* [+] What is currency?
* [+] What is money?
* [+] What are the functions of money?
* [+] How does a currency work?
* [x] What gives money its value?
* [+] What is fiat currency?
* [+] What is a central bank?
* [x] How are exchange rates determined?
* [+] What is currency exchange?
* [+] Why do currencies have different values?
* [+] What is inflation’s effect on currency?

Banks

* [+] What is a bank?
* [+] How does a bank work?
* [+] What services do banks provide?
* [x] How do banks make money?
* [+] What is a bank account?
* [+] What is a savings account?
* [+] What is a checking account?
* [+] What is a loan?
* [x] How do banks create money through lending?
* [+] What is a central bank?
* [+] What is the difference between a commercial bank and a central bank?

Loans

* [+] What is a loan?
* [+] How does a loan work?
* [+] What are the main types of loans?
* [+] What is principal?
* [+] What is interest?
* [+] How is loan interest calculated?
* [+] What is a fixed interest rate?
* [+] What is a variable interest rate?
* [+] What is collateral?
* [+] What is the difference between a secured and unsecured loan?
* [+] What is a mortgage?

Mortgage

* [+] What is a mortgage?
* [+] How does a mortgage work?
* [+] What is mortgage principal?
* [+] What is mortgage interest?
* [+] What is a down payment?
* [+] What is a mortgage term?
* [+] What is a fixed-rate mortgage?
* [+] What is an adjustable-rate mortgage?
* [x] What happens when a mortgage is paid off?
* [x] What happens when a borrower cannot repay a mortgage?

Stocks

* [+] What is a stock?
* [x] What does owning a stock mean?
* [+] What is a share?
* [+] How does the stock market work?
* [+] Why do companies issue stocks?
* [+] What is a stock exchange?
* [+] What is a dividend?
* [+] What is a stock price?
* [+] Why do stock prices change?
* [+] What is market capitalization?
* [+] What is the difference between stocks and bonds?

Bonds

* [+] What is a bond?
* [+] How does a bond work?
* [+] Who issues bonds?
* [+] What is the principal of a bond?
* [+] What is a bond’s interest rate?
* [+] What is a coupon?
* [x] What happens when a bond matures?
* [+] What is the difference between a government bond and a corporate bond?
* [+] What is the difference between bonds and stocks?

Investment

* [+] What is an investment?
* [+] What are the main types of investments?
* [+] What is an asset?
* [+] What is investment risk?
* [+] What is diversification?
* [+] What is a return on investment?
* [+] What is compound interest?
* [+] What is a mutual fund?
* [+] What is an exchange-traded fund?
* [x] What is the difference between saving and investing?

Profit and revenue

* [+] What is revenue?
* [+] What is profit?
* [+] What is the difference between revenue and profit?
* [+] What is gross profit?
* [+] What is operating profit?
* [+] What is net profit?
* [+] What are business expenses?
* [x] How is profit calculated?
* [x] Why can a profitable company still have cash-flow problems?

Insurance

* [+] What is insurance?
* [+] How does insurance work?
* [x] Why do people buy insurance?
* [+] What is an insurance policy?
* [+] What is an insurance premium?
* [+] What is an insurance claim?
* [+] What is a deductible?
* [+] What is an insurer?
* [+] What is an insured person?
* [+] What are the main types of insurance?
* [+] What is life insurance?
* [+] What is health insurance?
* [+] What is property insurance?
* [+] What is liability insurance?
* [x] How are insurance premiums determined?

Marketing

* [+] What is marketing?
* [+] What is the purpose of marketing?
* [+] What are the main types of marketing?
* [+] What is market research?
* [+] What is a target audience?
* [+] What is a marketing strategy?
* [+] What is digital marketing?
* [+] What is content marketing?
* [+] What is email marketing?
* [+] What is social media marketing?
* [+] What is search engine optimization?
* [x] What is the difference between marketing and advertising?

Advertising

* [+] What is advertising?
* [+] What is the purpose of advertising?
* [+] What are the main types of advertising?
* [+] What is a target audience?
* [+] How does advertising influence consumer awareness?
* [+] What is digital advertising?
* [+] What is display advertising?
* [+] What is search advertising?
* [+] What is social media advertising?
* [x] What is the difference between advertising and marketing?

Branding

* [+] What is branding?
* [+] What is a brand?
* [+] What is brand identity?
* [+] What is a logo?
* [+] What is brand recognition?
* [+] What is brand positioning?
* [+] What is brand strategy?

⸻

Philosophy & Religion

This should be a separate category, not mixed into Business.

Philosophy

* [+] What is philosophy?
* [+] What are the main branches of philosophy?
* [x] What is metaphysics?
* [+] What is epistemology?
* [+] What is ethics?
* [+] What is logic?
* [+] What is political philosophy?
* [+] What is philosophy of mind?
* [+] What is existentialism?
* [+] What is free will?
* [+] What is determinism?
* [+] What is the problem of free will?
* [+] What is utilitarianism?
* [+] What is stoicism?
* [+] What is nihilism?
* [+] What is humanism?
* [+] How did ancient Greek philosophy develop?
* [+] Who were Socrates, Plato, and Aristotle?

Religion

* [+] What is religion?
* [+] What are the main characteristics of religions?
* [+] What is the difference between religion and mythology?
* [+] What is theology?
* [+] What is religious belief?
* [+] What are sacred texts?
* [+] What is religious ritual?
* [+] What is monotheism?
* [+] What is polytheism?
* [+] What is atheism?
* [+] What is agnosticism?
* [+] What is spirituality?
* [+] How have religions influenced human history?

Buddhism

* [+] What is Buddhism?
* [+] Who was Siddhartha Gautama?
* [+] What are the Four Noble Truths?
* [+] What is the Eightfold Path?
* [+] What is nirvana?
* [+] What is karma in Buddhism?
* [+] What is meditation in Buddhism?
* [x] What are the main branches of Buddhism?
* [+] Where did Buddhism originate?
* [+] How did Buddhism spread across Asia?

Christianity

* [+] What is Christianity?
* [+] Who was Jesus?
* [+] What is the Bible?
* [+] What are the main beliefs of Christianity?
* [+] What is the Trinity?
* [+] What is the significance of the crucifixion of Jesus?
* [x] What is the resurrection in Christianity?
* [+] What are the main branches of Christianity?
* [+] What is the difference between Catholicism, Eastern Orthodoxy, and Protestantism?
* [+] How did Christianity influence European history?

Islam

* [+] What is Islam?
* [+] Who was Muhammad?
* [+] What is the Quran?
* [+] What are the Five Pillars of Islam?
* [x] What is the meaning of the word Islam?
* [+] What are the main beliefs of Islam?
* [x] What are the main branches of Islam?
* [+] What is the difference between Sunni and Shia Islam?
* [+] Where did Islam originate?
* [x] How did Islam spread beyond Arabia?
* [x] How did Islam influence science and culture?

Hinduism

* [+] What is Hinduism?
* [+] Where did Hinduism originate?
* [+] What are the main beliefs of Hinduism?
* [+] What are the Vedas?
* [+] What is karma in Hinduism?
* [+] What is dharma?
* [+] What is reincarnation?
* [+] What is moksha?

Judaism

* [+] What is Judaism?
* [+] What are the main beliefs of Judaism?
* [+] What is the Torah?
* [+] Who was Abraham?
* [+] Who was Moses?
* [+] What is the covenant in Judaism?
* [+] What are the main Jewish holidays?
* [x] What are the main branches of Judaism?
* [x] Where did Judaism originate?

⸻

Nature & Environment

This section should be dramatically cleaned because the current X placeholders and recursive nonsense need to go entirely.

Nature

* [+] What is nature?
* [+] What does the natural environment include?
* [+] What is the difference between nature and the environment?
* [+] What are natural ecosystems?
* [+] How do living and nonliving parts of nature interact?
* [+] Why is biodiversity important?
* [+] How do humans affect natural environments?
* [+] Why are natural habitats important?

Environment

* [+] What is the environment?
* [+] What are the main components of the environment?
* [+] What are biotic and abiotic factors?
* [+] How do humans affect the environment?
* [+] What is environmental science?
* [+] What is environmental pollution?
* [+] What is environmental conservation?
* [+] Why is environmental protection important?

Biodiversity

* [+] What is biodiversity?
* [+] What are the main levels of biodiversity?
* [+] What is genetic diversity?
* [x] What is species diversity?
* [+] What is ecosystem diversity?
* [+] Why is biodiversity important?
* [+] What causes biodiversity loss?
* [x] How does habitat destruction affect biodiversity?
* [+] How does climate change affect biodiversity?
* [+] What is biodiversity conservation?
* [x] How can endangered species be protected?

Conservation

* [+] What is conservation?
* [+] What is nature conservation?
* [+] Why is conservation important?
* [x] What are the main approaches to conservation?
* [+] What is a protected area?
* [+] What is a national park?
* [+] What is wildlife conservation?
* [x] What is habitat restoration?
* [+] What are some examples of successful conservation?

Pollution

* [+] What is pollution?
* [+] What are the main types of pollution?
* [+] What is air pollution?
* [+] What is water pollution?
* [+] What is soil pollution?
* [+] What is noise pollution?
* [+] What causes air pollution?
* [+] WHow does pollution affect human health?
* [+] WHow does pollution affect wildlife?
* [+] WHow does pollution affect climate?
* [+] WHow can pollution be reduced?

Climate change

* [+] What is climate change?
* [+] What causes climate change?
* [+] What is the greenhouse effect?
* [+] What are greenhouse gases?
* [+] What is global warming?
* [+] What is the difference between climate change and global warming?
* [x] How is human activity affecting climate change?
* [+] How does climate change affect sea levels?
* [+] How does climate change affect ecosystems?
* [+] What is the role of carbon dioxide in climate change?

Recycling

* [+] What is recycling?
* [+] How does recycling work?
* [+] What materials can be recycled?
* [+] How is plastic recycled?
* [+] How is paper recycled?
* [+] How is glass recycled?
* [+] How is metal recycled?
* [+] What happens to materials after they are collected?
* [+] What is the difference between recycling, reuse, and waste reduction?
* [+] What are the limitations of recycling?

Renewable energy

* [+] What is renewable energy?
* [+] What are the main types of renewable energy?
* [+] What is solar energy?
* [+] What is wind energy?
* [+] What is hydropower?
* [+] What is geothermal energy?
* [+] What is biomass energy?
* [+] How does renewable energy differ from fossil fuels?
* [+] What are the advantages and limitations of renewable energy?

Forests

* [+] What is a forest?
* [+] What are the main types of forests?
* [+] What is a tropical rainforest?
* [+] What is a temperate forest?
* [+] What is a boreal forest?
* [+] Why are forests important?
* [+] How do forests affect climate?
* [+] How do forests support biodiversity?
* [+] How can forests be protected and restored?

Wetlands

* [+] What is a wetland?
* [+] What are the main types of wetlands?
* [+] Where are wetlands found?
* [+] Why are wetlands important?
* [+] How do wetlands support biodiversity?
* [+] How do wetlands reduce flooding?
* [+] How do wetlands filter water?
* [+] What threatens wetlands?
* [+] How can wetlands be protected and restored?

