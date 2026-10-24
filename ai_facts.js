/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

var AI_LIBRARY = [
  {
    "id": 11001,
    "category": "Artificial Intelligence",
    "text": "A neural network processes information through connected layers of artificial neurons. Each layer transforms the information and passes it to the next, allowing the network to learn patterns and produce an output.",
    "question": "How does a neural network turn input into an output?"
  },
  {
    "id": 11002,
    "category": "Artificial Intelligence",
    "text": "An artificial neuron combines incoming values using learned weights and a bias, then calculates an output. Many neurons work together so a neural network can learn useful patterns from data.",
    "question": "What does an artificial neuron do?"
  },
  {
    "id": 11003,
    "category": "Artificial Intelligence",
    "text": "Weights determine how strongly each input affects a neuron’s calculation. During training, the network adjusts these values so important signals have more influence on its predictions.",
    "question": "What do weights do in a neural network?"
  },
  {
    "id": 11004,
    "category": "Artificial Intelligence",
    "text": "A bias gives a neuron an adjustable value in addition to the weighted inputs. This helps the neuron produce useful outputs even when its inputs are small or zero.",
    "question": "Why does a neural network use bias values?"
  },
  {
    "id": 11005,
    "category": "Artificial Intelligence",
    "text": "An activation function transforms a neuron's calculated value before it is passed to the next layer. It helps a neural network learn complex relationships that a simple series of linear calculations could not represent.",
    "question": "What is an activation function used for?"
  },
  {
    "id": 11006,
    "category": "Artificial Intelligence",
    "text": "ReLU, short for Rectified Linear Unit, returns the input when it is positive and returns zero when it is negative. It is widely used in hidden layers of neural networks because it is simple to calculate.",
    "question": "How does the ReLU activation function work?"
  },
  {
    "id": 11007,
    "category": "Artificial Intelligence",
    "text": "The sigmoid function converts a number into a value between 0 and 1. This range can represent a model’s estimated probability for a binary classification, although the output is not automatically well calibrated.",
    "question": "When is the sigmoid function useful in AI?"
  },
  {
    "id": 11008,
    "category": "Artificial Intelligence",
    "text": "Softmax converts a set of scores into values that add up to 1. It is often used to express a model’s relative confidence across several mutually exclusive classes.",
    "question": "Why does a model use the softmax function?"
  },
  {
    "id": 11009,
    "category": "Artificial Intelligence",
    "text": "A loss function measures how far a model’s prediction is from the target answer according to a chosen formula. Training uses this measurement to guide changes that should make future predictions more accurate.",
    "question": "How does a loss function help train a model?"
  },
  {
    "id": 11010,
    "category": "Artificial Intelligence",
    "text": "Gradient descent adjusts a model’s parameters in a direction that is expected to reduce its loss. It usually makes repeated small updates during training rather than finding the best parameters in one step.",
    "question": "How does gradient descent improve a model?"
  },
  {
    "id": 11011,
    "category": "Artificial Intelligence",
    "text": "An epoch is one complete pass through the training dataset. Training often uses several epochs so the model can gradually adjust its parameters, though too many can lead to overfitting.",
    "question": "What does an epoch mean when training AI?"
  },
  {
    "id": 11012,
    "category": "Artificial Intelligence",
    "text": "A batch is a group of training examples processed together before a training update. Using batches can make learning more efficient and helps control how much memory training requires.",
    "question": "Why are training examples processed in batches?"
  },
  {
    "id": 11013,
    "category": "Artificial Intelligence",
    "text": "The learning rate controls how large a model’s parameter updates are during training. If it is too high, learning may become unstable; if it is too low, training may take a long time.",
    "question": "What does the learning rate control?"
  },
  {
    "id": 11014,
    "category": "Artificial Intelligence",
    "text": "Overfitting happens when a model learns the training examples too closely, including details that do not generalize. It may perform well on training data but make poor predictions on new examples.",
    "question": "What is overfitting in machine learning?"
  },
  {
    "id": 11015,
    "category": "Artificial Intelligence",
    "text": "Underfitting happens when a model fails to learn important patterns in its training data. This can occur when the model is too simple, training is insufficient, or the input information is not useful enough.",
    "question": "What is underfitting, and why is it a problem?"
  },
  {
    "id": 11016,
    "category": "Artificial Intelligence",
    "text": "Regularization adds a constraint or penalty that discourages a model from becoming unnecessarily complex. It can help the model focus on patterns that generalize better to data it has not seen.",
    "question": "How can regularization reduce overfitting?"
  },
  {
    "id": 11017,
    "category": "Artificial Intelligence",
    "text": "Dropout temporarily disables randomly selected neurons during training. This encourages the network not to depend too heavily on particular neurons and can help reduce overfitting.",
    "question": "What does dropout do during neural network training?"
  },
  {
    "id": 11018,
    "category": "Artificial Intelligence",
    "text": "A training dataset contains examples that a model uses to learn patterns and relationships. The quality, size, and variety of these examples can strongly affect how well the model works.",
    "question": "What is a training dataset used for?"
  },
  {
    "id": 11019,
    "category": "Artificial Intelligence",
    "text": "A validation dataset helps developers compare model settings and monitor performance during development. It is kept separate from the training examples, while a final test set is reserved for a more independent evaluation.",
    "question": "Why do developers use a validation dataset?"
  },
  {
    "id": 11020,
    "category": "Artificial Intelligence",
    "text": "A test dataset contains examples that are held back from model training. It helps estimate how well the finished model performs on data it has not used to learn or tune its parameters.",
    "question": "How is a test dataset different from a training dataset?"
  },
  {
    "id": 11021,
    "category": "Artificial Intelligence",
    "text": "Classification is a task in which a model assigns an input to one or more categories. For example, an email classifier might label a message as spam or not spam.",
    "question": "What is classification in machine learning?"
  },
  {
    "id": 11022,
    "category": "Artificial Intelligence",
    "text": "Regression predicts a numerical value from input information. Examples include estimating a house price, forecasting demand, or predicting how much energy a building may use.",
    "question": "What is regression used for in machine learning?"
  },
  {
    "id": 11023,
    "category": "Artificial Intelligence",
    "text": "Clustering groups data points that are similar according to selected features or a similarity measure. It can reveal structure in data even when examples do not come with predefined category labels.",
    "question": "How does clustering help analyze data?"
  },
  {
    "id": 11024,
    "category": "Artificial Intelligence",
    "text": "A convolutional neural network (CNN) is commonly used for image tasks because it can learn visual features such as edges, textures, shapes, and object parts. By combining features across layers, it can help classify images or locate objects within them.",
    "question": "How can a neural network recognize objects in images?"
  },
  {
    "id": 11025,
    "category": "Artificial Intelligence",
    "text": "A convolution applies a small filter, also called a kernel, across an input such as an image. The filter responds to patterns in different locations, helping the network detect visual features.",
    "question": "What happens during a convolution in a CNN?"
  },
  {
    "id": 11026,
    "category": "Artificial Intelligence",
    "text": "Pooling reduces the spatial size of feature maps while keeping a summary of important information. This can reduce computation and make later layers less sensitive to small shifts in a feature’s position.",
    "question": "Why do some convolutional networks use pooling?"
  },
  {
    "id": 11027,
    "category": "Artificial Intelligence",
    "text": "A recurrent neural network (RNN) processes a sequence one step at a time and carries information from earlier steps forward. This design can be useful for ordered data such as text, audio, or time-series measurements.",
    "question": "How does a recurrent neural network process a sequence?"
  },
  {
    "id": 11028,
    "category": "Artificial Intelligence",
    "text": "An embedding represents an item, such as a word, image, or product, as a list of numbers. The numerical representation can capture useful relationships, allowing a model to compare items by their learned features.",
    "question": "What is an embedding in machine learning?"
  },
  {
    "id": 11029,
    "category": "Artificial Intelligence",
    "text": "A generative model learns patterns from examples and uses what it has learned to create new content. Depending on the model, that content may include text, images, audio, video, or other data.",
    "question": "What is a generative model able to do?"
  },
  {
    "id": 11030,
    "category": "Artificial Intelligence",
    "text": "A large language model (LLM) is trained on large amounts of text to learn statistical patterns in language. It can use those patterns to generate text and perform tasks such as summarizing, answering questions, or rewriting passages.",
    "question": "How does a large language model learn to work with text?"
  },
  {
    "id": 11031,
    "category": "Artificial Intelligence",
    "text": "Inference is the process of running a trained model on input data to obtain an output. For a chatbot, inference happens when the model processes a prompt and generates a response.",
    "question": "What does inference mean when using an AI model?"
  },
  {
    "id": 11032,
    "category": "Artificial Intelligence",
    "text": "During training, a model adjusts its learned parameters using examples and a learning method. The goal is to make its outputs more useful for the task, such as predicting a value or generating appropriate text.",
    "question": "What happens during AI model training?"
  },
  {
    "id": 11033,
    "category": "Artificial Intelligence",
    "text": "Parameters are learned numerical values inside a model, such as weights and biases. Training adjusts them, and their combined values influence how the model responds to new inputs.",
    "question": "What are parameters in an AI model?"
  },
  {
    "id": 11034,
    "category": "Artificial Intelligence",
    "text": "Hyperparameters are settings chosen to guide the training process or model design, rather than values learned directly from individual training examples. Examples include learning rate, batch size, and the number of training epochs.",
    "question": "How are hyperparameters different from model parameters?"
  },
  {
    "id": 11035,
    "category": "Artificial Intelligence",
    "text": "Transfer learning starts with a model that has already learned useful patterns and adapts it to a related task. It can reduce the amount of data and computing needed compared with training a model from scratch.",
    "question": "What is transfer learning, and why is it useful?"
  },
  {
    "id": 11036,
    "category": "Artificial Intelligence",
    "text": "Fine-tuning continues training a pretrained model on a more focused dataset. This can adapt the model’s behavior to a particular subject, style, language, or task.",
    "question": "What does fine-tuning do to an existing AI model?"
  },
  {
    "id": 11037,
    "category": "Artificial Intelligence",
    "text": "Data augmentation creates modified versions of existing training examples, such as rotating or cropping an image. It gives a model more variety during training without requiring every variation to be collected separately.",
    "question": "How does data augmentation help machine learning?"
  },
  {
    "id": 11038,
    "category": "Artificial Intelligence",
    "text": "Accuracy is the proportion of predictions that a classification model gets correct. It is easy to understand, but it can be misleading when some classes are much more common than others.",
    "question": "What does accuracy tell us about a classifier?"
  },
  {
    "id": 11039,
    "category": "Artificial Intelligence",
    "text": "Precision measures how many of the cases predicted as positive are actually positive. It is especially useful when false alarms are costly, such as incorrectly flagging a legitimate message as spam.",
    "question": "What does precision measure in classification?"
  },
  {
    "id": 11040,
    "category": "Artificial Intelligence",
    "text": "Recall measures how many of all actual positive cases the model successfully identifies. It matters when missing a real positive case is costly, such as failing to flag a dangerous defect.",
    "question": "What does recall measure in classification?"
  },
  {
    "id": 11041,
    "category": "Artificial Intelligence",
    "text": "Artificial intelligence (AI) is the field of creating computer systems that perform tasks commonly associated with human intelligence. These tasks can include recognizing patterns, understanding language, making predictions, and generating content.",
    "question": "What is artificial intelligence?"
  },
  {
    "id": 11042,
    "category": "Artificial Intelligence",
    "text": "Machine learning is an approach to AI in which systems learn patterns from data instead of relying only on hand-written rules. The learned patterns are then used to make predictions, classify information, or generate outputs.",
    "question": "What is machine learning, and how does it relate to AI?"
  },
  {
    "id": 11043,
    "category": "Artificial Intelligence",
    "text": "Deep learning uses neural networks with multiple layers to learn representations of data. These layers can build from simple features to more complex patterns, often requiring substantial data and computing power.",
    "question": "What makes deep learning different from other machine learning methods?"
  },
  {
    "id": 11044,
    "category": "Artificial Intelligence",
    "text": "Supervised learning trains a model on examples paired with known answers, often called labels. The model learns to predict those answers for new examples, such as identifying an object in a labeled image.",
    "question": "How does supervised learning work?"
  },
  {
    "id": 11045,
    "category": "Artificial Intelligence",
    "text": "Unsupervised learning looks for structure in data without being given a correct label for every example. It can be used to group similar items, discover patterns, or create compact representations of data.",
    "question": "How does unsupervised learning find patterns in data?"
  },
  {
    "id": 11046,
    "category": "Artificial Intelligence",
    "text": "Reinforcement learning trains an agent through interaction with an environment. The agent receives rewards or penalties and learns a strategy that aims to gain more reward over time.",
    "question": "How does reinforcement learning teach an AI agent?"
  },
  {
    "id": 11047,
    "category": "Artificial Intelligence",
    "text": "An AI model is a computational system that has learned patterns from data and uses them to produce outputs from new inputs. Depending on its design, it may classify information, make predictions, recognize content, or generate responses.",
    "question": "What is an AI model, in simple terms?"
  },
  {
    "id": 11048,
    "category": "Artificial Intelligence",
    "text": "A dataset is an organized collection of examples or measurements. AI developers use datasets to train models, adjust their settings, and evaluate how well they perform.",
    "question": "What is a dataset, and why does AI need one?"
  },
  {
    "id": 11049,
    "category": "Artificial Intelligence",
    "text": "A label is the known answer or category attached to a training example. For instance, an image of a cat might have the label “cat,” giving a supervised model a target to learn to predict.",
    "question": "What does a label mean in supervised learning?"
  },
  {
    "id": 11050,
    "category": "Artificial Intelligence",
    "text": "Features are pieces of information a model uses to learn patterns or make predictions. They might include an image’s pixel values, a house’s size and location, or words in a text.",
    "question": "What are features in a machine learning model?"
  },
  {
    "id": 11051,
    "category": "Artificial Intelligence",
    "text": "A prediction is the result a model produces after processing an input. It might be a category, a numerical estimate, a probability score, or generated text, depending on the task.",
    "question": "What is a prediction made by an AI model?"
  },
  {
    "id": 11052,
    "category": "Artificial Intelligence",
    "text": "A prompt is the text, instruction, question, or other input given to an AI system to guide what it does. Clear prompts that include relevant context and constraints often lead to more useful results.",
    "question": "What is a prompt when working with AI?"
  },
  {
    "id": 11053,
    "category": "Artificial Intelligence",
    "text": "Natural language processing (NLP) is an area of AI focused on working with human language. It supports tasks such as translation, text classification, summarization, information extraction, and text generation.",
    "question": "What does natural language processing allow computers to do?"
  },
  {
    "id": 11054,
    "category": "Artificial Intelligence",
    "text": "Computer vision is the field of AI that enables computers to analyze images and video. It can be used to recognize objects, read text in pictures, detect movement, or inspect visual defects.",
    "question": "How does computer vision help AI understand images?"
  },
  {
    "id": 11055,
    "category": "Artificial Intelligence",
    "text": "Speech recognition converts spoken language into text or another representation a computer can process. It is used in voice typing, voice assistants, meeting transcription, and spoken command systems.",
    "question": "How does speech recognition work?"
  },
  {
    "id": 11056,
    "category": "Artificial Intelligence",
    "text": "Text-to-speech (TTS) technology generates spoken audio from written text. Modern systems can use trained models to produce speech with natural timing, pronunciation, and voice characteristics.",
    "question": "How does text-to-speech turn writing into speech?"
  },
  {
    "id": 11057,
    "category": "Artificial Intelligence",
    "text": "A chatbot is an application that communicates with people through text or speech. Depending on its design, it may answer common questions, guide users through tasks, or hold a more flexible conversation using AI.",
    "question": "What is a chatbot used for?"
  },
  {
    "id": 11058,
    "category": "Artificial Intelligence",
    "text": "An AI assistant can respond to instructions and help with tasks such as answering questions, drafting text, planning, explaining ideas, or summarizing information. Its abilities depend on the model, available tools, and information it can access.",
    "question": "What can an AI assistant help a person do?"
  },
  {
    "id": 11059,
    "category": "Artificial Intelligence",
    "text": "An AI hallucination is an output that sounds plausible but contains false, invented, or unsupported information. It can happen even when the response is written confidently, so important claims should be checked.",
    "question": "What is an AI hallucination?"
  },
  {
    "id": 11060,
    "category": "Artificial Intelligence",
    "text": "An AI model can make mistakes because of gaps or errors in its training data, ambiguous prompts, limitations in its design, or missing context. A fluent answer is not proof that the information is correct.",
    "question": "Why can an AI model give a wrong answer?"
  },
  {
    "id": 11061,
    "category": "Artificial Intelligence",
    "text": "AI bias occurs when data, design choices, or deployment conditions lead to systematically unfair or skewed results. It can affect different groups in different ways, so developers need to test systems across relevant situations and populations.",
    "question": "How can bias affect an AI system?"
  },
  {
    "id": 11062,
    "category": "Artificial Intelligence",
    "text": "Model size often refers to how many learned parameters the model contains, although storage size and computational requirements also matter. A larger model is not automatically better for every task or device.",
    "question": "What does the size of an AI model usually mean?"
  },
  {
    "id": 11063,
    "category": "Artificial Intelligence",
    "text": "A parameter count tells how many learned numerical values a model contains. It gives one indication of model scale, but it does not by itself measure accuracy, speed, reliability, or overall usefulness.",
    "question": "What does a model’s parameter count tell us?"
  },
  {
    "id": 11064,
    "category": "Artificial Intelligence",
    "text": "A pretrained model has already learned general patterns from a dataset before being used or adapted for a specific purpose. Starting with a pretrained model can save time and computing compared with training from the beginning.",
    "question": "What is a pretrained model?"
  },
  {
    "id": 11065,
    "category": "Artificial Intelligence",
    "text": "An AI benchmark is a standardized task, test, or dataset used to measure and compare model performance. Results are most meaningful when the benchmark reflects the intended use and the evaluation method is fair.",
    "question": "How are AI benchmarks used?"
  },
  {
    "id": 11066,
    "category": "Artificial Intelligence",
    "text": "Evaluation measures how well a model performs against selected criteria or test examples. It helps developers identify strengths, weaknesses, and possible risks before relying on the model in real situations.",
    "question": "Why should an AI model be evaluated?"
  },
  {
    "id": 11067,
    "category": "Artificial Intelligence",
    "text": "A confusion matrix compares a classifier’s predictions with the actual classes of the examples. It shows the counts of correct and incorrect predictions for each class, helping reveal which mistakes the model makes.",
    "question": "What information does a confusion matrix show?"
  },
  {
    "id": 11068,
    "category": "Artificial Intelligence",
    "text": "A true positive occurs when a model predicts that a case belongs to a positive class and that prediction is correct. For example, a system that correctly flags a message as spam has produced a true positive.",
    "question": "What is a true positive in machine learning?"
  },
  {
    "id": 11069,
    "category": "Artificial Intelligence",
    "text": "A false positive occurs when a model predicts a positive result for a case that is actually negative. For example, a spam filter creates a false positive when it incorrectly sends a legitimate email to the spam folder.",
    "question": "What is a false positive, and why can it matter?"
  },
  {
    "id": 11070,
    "category": "Artificial Intelligence",
    "text": "A false negative occurs when a model predicts a negative result even though the case is actually positive. For example, a system misses a real defect when it classifies a faulty product as acceptable.",
    "question": "What is a false negative in classification?"
  },
  {
    "id": 11071,
    "category": "Artificial Intelligence",
    "text": "A true negative occurs when a model predicts the negative class and the case really is negative. For example, a spam filter correctly leaves a legitimate email in the inbox.",
    "question": "What is a true negative in classification?"
  },
  {
    "id": 11072,
    "category": "Artificial Intelligence",
    "text": "A feature vector is an ordered list of numbers representing the features of one example. A machine learning model can use this numerical representation to compare examples or make predictions.",
    "question": "What is a feature vector?"
  },
  {
    "id": 11073,
    "category": "Artificial Intelligence",
    "text": "Normalization transforms numerical values to a more consistent scale or range. This can help some machine learning methods train more reliably, especially when input features originally have very different magnitudes.",
    "question": "Why is numerical data sometimes normalized before training?"
  },
  {
    "id": 11074,
    "category": "Artificial Intelligence",
    "text": "Data preprocessing prepares raw information for use by a model. It may include cleaning errors, handling missing values, converting formats, scaling numbers, or organizing examples into a consistent structure.",
    "question": "What is data preprocessing in AI?"
  },
  {
    "id": 11075,
    "category": "Artificial Intelligence",
    "text": "Data cleaning identifies and corrects problems such as duplicate records, inconsistent formats, errors, or missing values. Cleaner data can improve training and evaluation, although the right treatment depends on the data and task.",
    "question": "Why is data cleaning important for AI?"
  },
  {
    "id": 11076,
    "category": "Artificial Intelligence",
    "text": "Input is the information supplied to a model before it produces an output. Depending on the model, input might be a question, an image, a sound recording, numerical measurements, or a combination of formats.",
    "question": "What counts as input to an AI model?"
  },
  {
    "id": 11077,
    "category": "Artificial Intelligence",
    "text": "An output is the result a model produces after processing its input. It can be a predicted class, a score, a numerical value, generated text, an image, or another result supported by the model.",
    "question": "What is the output of an AI model?"
  },
  {
    "id": 11078,
    "category": "Artificial Intelligence",
    "text": "An AI pipeline is a series of connected steps that moves data through a process, such as preparation, model inference, and output handling. Organizing work as a pipeline can make a system easier to test, maintain, and automate.",
    "question": "What is an AI pipeline?"
  },
  {
    "id": 11079,
    "category": "Artificial Intelligence",
    "text": "An AI agent observes information, chooses actions, and acts toward a goal, often repeating this cycle as new information arrives. Some agents can use tools or interact with an environment, but their autonomy varies by design.",
    "question": "What makes an AI system an agent?"
  },
  {
    "id": 11080,
    "category": "Artificial Intelligence",
    "text": "Automation uses software or machines to perform tasks with limited human intervention. AI can make automation more flexible when a task involves interpreting language, recognizing patterns, or making predictions.",
    "question": "What is automation, and how can AI be part of it?"
  },
  {
    "id": 11081,
    "category": "Artificial Intelligence",
    "text": "Generative AI produces new content based on patterns learned from data. Depending on the system, it can create text, images, music, speech, video, or computer code in response to prompts or other inputs.",
    "question": "What is generative AI used to create?"
  },
  {
    "id": 11082,
    "category": "Artificial Intelligence",
    "text": "Multimodal AI can process or combine more than one type of information, such as text, images, audio, or video. This allows a system to answer questions about a picture, interpret spoken instructions, or connect information across formats.",
    "question": "What does multimodal AI mean?"
  },
  {
    "id": 11083,
    "category": "Artificial Intelligence",
    "text": "An AI image generator uses a trained generative model to create an image from a prompt or other input. The prompt guides the result, but the exact image can vary and may not follow every instruction perfectly.",
    "question": "How does an AI image generator create pictures?"
  },
  {
    "id": 11084,
    "category": "Artificial Intelligence",
    "text": "An AI coding assistant can suggest code, explain unfamiliar functions, help modify existing code, and point out possible bugs. Its suggestions still need review and testing because generated code can be incorrect, insecure, or unsuitable for the project.",
    "question": "How can an AI coding assistant help a developer?"
  },
  {
    "id": 11085,
    "category": "Artificial Intelligence",
    "text": "Retrieval-augmented generation (RAG) retrieves relevant information from a source, such as a document collection, and provides it to a language model before it answers. This can ground responses in specific material, though retrieval errors or incorrect interpretation can still lead to mistakes.",
    "question": "How does retrieval-augmented generation help a language model?"
  },
  {
    "id": 11086,
    "category": "Artificial Intelligence",
    "text": "A vector database stores numerical representations called vectors and helps find vectors that are similar. AI systems can use it to retrieve related documents, images, or other items based on meaning or learned features rather than exact wording alone.",
    "question": "What is a vector database used for in AI?"
  },
  {
    "id": 11087,
    "category": "Artificial Intelligence",
    "text": "Semantic search tries to find information that matches the meaning or intent of a query, not just its exact words. It can retrieve relevant results even when the query and the source use different wording.",
    "question": "What is semantic search?"
  },
  {
    "id": 11088,
    "category": "Artificial Intelligence",
    "text": "An AI application programming interface (API) lets one software system send a request to an AI service and receive a result. It provides a defined way for applications to use model capabilities without implementing the model themselves.",
    "question": "How does an AI API connect software to an AI model?"
  },
  {
    "id": 11089,
    "category": "Artificial Intelligence",
    "text": "Local AI runs a model on a computer or device controlled by the user instead of relying entirely on a remote service. Depending on the setup, this can improve privacy and offline access, but it is limited by the device’s memory and processing power.",
    "question": "What does it mean to run AI locally?"
  },
  {
    "id": 11090,
    "category": "Artificial Intelligence",
    "text": "Cloud AI runs models on remote computers that users access over a network. It can provide access to powerful hardware without requiring it locally, but it may depend on internet access, service availability, cost, and data-sharing policies.",
    "question": "How is cloud AI different from local AI?"
  },
  {
    "id": 11091,
    "category": "Artificial Intelligence",
    "text": "A graphics processing unit (GPU) can perform many numerical operations in parallel, which suits the calculations used by many neural networks. GPUs can speed up training and inference, although the benefit depends on the model and the hardware.",
    "question": "Why are GPUs useful for running AI models?"
  },
  {
    "id": 11092,
    "category": "Artificial Intelligence",
    "text": "Yes. A central processing unit (CPU) is a general-purpose processor that can run many AI models, especially smaller ones. A GPU may be faster for certain workloads, but CPU performance depends on the model, software, and available hardware.",
    "question": "Can a CPU run an AI model?"
  },
  {
    "id": 11093,
    "category": "Artificial Intelligence",
    "text": "Inference speed describes how quickly a model processes input and produces output. It may be measured as response time, items processed per second, or generated tokens per second, depending on the task.",
    "question": "What does inference speed measure?"
  },
  {
    "id": 11094,
    "category": "Artificial Intelligence",
    "text": "Latency is the time delay between sending input to an AI system and receiving its response or first output. Lower latency makes interactive tools feel more responsive, though total completion time also depends on how much output is generated.",
    "question": "What does latency mean when using AI?"
  },
  {
    "id": 11095,
    "category": "Artificial Intelligence",
    "text": "Context is the surrounding information that helps an AI model interpret a request. It may include earlier messages, instructions, documents, or details about the task, and it can change which answer is most appropriate.",
    "question": "Why does context matter when an AI answers a question?"
  },
  {
    "id": 11096,
    "category": "Artificial Intelligence",
    "text": "A context window is the amount of input and conversation information a model can process at one time, usually measured in tokens. If the relevant information exceeds that limit, some content may need to be shortened, summarized, or left out.",
    "question": "What is an AI model’s context window?"
  },
  {
    "id": 11097,
    "category": "Artificial Intelligence",
    "text": "Temperature is a generation setting that affects how a model samples its next token. Lower values usually make outputs more predictable, while higher values often produce more varied wording; temperature does not guarantee correctness or creativity.",
    "question": "How does temperature affect AI-generated text?"
  },
  {
    "id": 11098,
    "category": "Artificial Intelligence",
    "text": "Sampling is a method for choosing the next token from the probabilities predicted by a generative model. The sampling method and its settings influence how predictable or varied the generated response will be.",
    "question": "What is sampling in text generation?"
  },
  {
    "id": 11099,
    "category": "Artificial Intelligence",
    "text": "An AI model described as open source or open-weight has components made available under stated terms, but the exact meaning depends on the release. Users should check the license and what is actually provided, since access to weights does not always include training data or all source code.",
    "question": "What does open source mean for an AI model?"
  },
  {
    "id": 11100,
    "category": "Artificial Intelligence",
    "text": "Training data influences the subjects, language patterns, examples, and biases a model can learn. Diverse, relevant, and well-prepared data can help, but the data alone does not guarantee that a model will be accurate or fair.",
    "question": "How does training data influence an AI model?"
  }
];