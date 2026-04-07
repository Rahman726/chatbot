// Chatbot with Knowledge Base
document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements - Login
  const loginContainer = document.getElementById("login-container");
  const usernameInput = document.getElementById("username-input");
  const loginBtn = document.getElementById("login-btn");
  
  // DOM Elements - Chatbot
  const chatbotIcon = document.getElementById("chatbot-icon");
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotHeader = document.getElementById("chatbot-header");
  const saveBtn = document.getElementById("save-btn");
  const sendBtn = document.getElementById("send-btn");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");

  // State
  let username = "";
  let messages = [];

  // Login functionality
  loginBtn.addEventListener("click", doLogin);
  usernameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      doLogin();
    }
  });

  function doLogin() {
    const name = usernameInput.value.trim();
    if (!name) {
      alert("Please enter a username!");
      return;
    }
    username = name;
    loginContainer.classList.add("hidden");
    chatbotIcon.style.display = "flex";
    
    // Update header to show username
    const headerSpan = chatbotHeader.querySelector("span");
    headerSpan.textContent = `Abdul's Agent - ${username}`;
    
    // Welcome message
    appendMessage("bot", `Welcome ${username}! I'm Abdul's Agent. How can I help you today?`);
  }

  // Hide chatbot icon initially until login
  chatbotIcon.style.display = "none";

  // Toggle chatbot visibility when icon is clicked
  chatbotIcon.addEventListener("click", function () {
    chatbotContainer.classList.toggle("hidden");
    if (!chatbotContainer.classList.contains("hidden")) {
      chatbotInput.focus();
    }
  });

  // Send message on Enter key
  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Save chat to file
  saveBtn.addEventListener("click", function () {
    if (messages.length === 0) {
      alert("No messages to save!");
      return;
    }

    let chatContent = `Abdul's Agent - Chat History\n`;
    chatContent += `${"=".repeat(50)}\n\n`;
    chatContent += "Date: " + new Date().toLocaleString() + "\n\n";

    messages.forEach((msg) => {
      const sender = msg.sender === "user" ? "You" : "Abdul's Agent";
      chatContent += sender + ": " + msg.text + "\n\n";
    });

    // Create and download file
    const blob = new Blob([chatContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat_history_" + new Date().toISOString().slice(0, 10) + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Send message
  function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage) {
      appendMessage("user", userMessage);
      chatbotInput.value = "";
      getBotResponse(userMessage);
    }
  }

  // Append message to chat
  function appendMessage(sender, text) {
    messages.push({ sender, text });
    
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = text;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Knowledge Base for answering questions without API
  const knowledgeBase = {
    // Science & Nature
    "sun": "The Sun is the star at the center of our Solar System. It's about 4.6 billion years old and is 109 times the diameter of Earth.",
    "moon": "The Moon is Earth's only natural satellite. It's about 384,400 km from Earth and takes 27.3 days to orbit Earth.",
    "earth": "Earth is the third planet from the Sun and the only known planet to support life. It has a diameter of 12,742 km.",
    "water": "Water is a chemical compound with formula H₂O. It covers 71% of Earth's surface and is essential for all known forms of life.",
    "gravity": "Gravity is a force that attracts two bodies toward each other. On Earth, it causes objects to fall at 9.8 m/s².",
    "atom": "An atom is the basic unit of matter, consisting of protons, neutrons, and electrons.",
    "dna": "DNA (Deoxyribonucleic acid) is the molecule that carries genetic instructions for all living organisms.",
    "photosynthesis": "Photosynthesis is the process by which plants convert light energy into chemical energy (glucose) using CO₂ and water.",
    "solar system": "Our Solar System has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
    "black hole": "A black hole is a region of space where gravity is so strong that nothing, not even light, can escape.",
    "evolution": "Evolution is the process by which species change over time through natural selection, first described by Charles Darwin.",
    "climate change": "Climate change refers to long-term shifts in temperatures and weather patterns, largely caused by human activities.",
    
    // Geography
    "pakistan": "Pakistan is a country in South Asia with a population of about 240 million. Capital: Islamabad. Official languages: Urdu and English.",
    "india": "India is the world's largest democracy with 1.4 billion people. Capital: New Delhi. Known for its rich culture and diversity.",
    "china": "China is the world's most populous country with 1.4 billion people. It's the second largest economy globally.",
    "usa": "The United States of America has 50 states and a population of about 333 million. Capital: Washington D.C.",
    "london": "London is the capital of the United Kingdom with about 9 million people. Famous for Big Ben and the Thames River.",
    "paris": "Paris is the capital of France, known as the 'City of Light' and famous for the Eiffel Tower.",
    "mount everest": "Mount Everest is the world's highest mountain at 8,848.86 meters (29,031.7 feet) above sea level.",
    "amazon": "The Amazon River is the largest river by discharge volume in the world, flowing through South America.",
    "sahara": "The Sahara is the world's largest hot desert, covering much of North Africa.",
    
    // Technology
    "internet": "The Internet is a global network connecting billions of computers. It was invented in the 1960s and became public in the 1990s.",
    "computer": "A computer is an electronic device that processes data according to instructions. The first computer was ENIAC (1945).",
    "ai": "AI (Artificial Intelligence) is the simulation of human intelligence in machines that can learn and solve problems.",
    "programming": "Programming is writing instructions for computers using languages like JavaScript, Python, Java, or C++.",
    "javascript": "JavaScript is a programming language used to create interactive web pages. It was created in 1995 by Brendan Eich.",
    "python": "Python is a high-level programming language known for its simplicity. Created by Guido van Rossum in 1991.",
    "html": "HTML (HyperText Markup Language) is the standard markup language for creating web pages.",
    "css": "CSS (Cascading Style Sheets) is used to style and layout web pages, controlling colors, fonts, and spacing.",
    "database": "A database is an organized collection of structured information stored electronically in a computer system.",
    "cloud computing": "Cloud computing delivers computing services (storage, processing) over the internet, like AWS, Azure, and Google Cloud.",
    "blockchain": "Blockchain is a decentralized digital ledger that records transactions across multiple computers securely.",
    "bitcoin": "Bitcoin is the first decentralized cryptocurrency, created in 2009 by an unknown person using the name Satoshi Nakamoto.",
    
    // Health & Biology
    "heart": "The human heart beats about 100,000 times per day, pumping blood throughout the body.",
    "brain": "The human brain contains about 86 billion neurons and uses 20% of the body's energy.",
    "blood": "Blood is a body fluid that delivers nutrients and oxygen. Humans have about 5 liters of blood.",
    "sleep": "Adults need 7-9 hours of sleep per night for optimal health and brain function.",
    "vitamin": "Vitamins are organic compounds essential for normal growth and nutrition, needed in small quantities.",
    "protein": "Proteins are essential nutrients made of amino acids, needed for building muscles and tissues.",
    "calories": "A calorie is a unit of energy. Average adults need 2000-2500 calories per day.",
    "exercise": "Regular exercise improves health, reduces disease risk, and boosts mental wellbeing. Aim for 150 minutes per week.",
    "water intake": "Adults should drink about 8 glasses (2 liters) of water per day for proper hydration.",
    
    // History
    "world war 2": "World War II lasted from 1939 to 1945. It involved over 30 countries and resulted in 70-85 million deaths.",
    "world war 1": "World War I lasted from 1914 to 1918. It was called 'The Great War' and involved major world powers.",
    "einstein": "Albert Einstein (1879-1955) was a physicist who developed the theory of relativity and E=mc².",
    "newton": "Isaac Newton (1643-1727) discovered gravity and formulated the three laws of motion.",
    "tesla": "Nikola Tesla (1856-1943) was an inventor best known for his work on alternating current electricity.",
    "edison": "Thomas Edison (1847-1931) invented the light bulb, phonograph, and motion picture camera.",
    "gandhi": "Mahatma Gandhi (1869-1948) led India's independence movement through non-violent resistance.",
    "lincoln": "Abraham Lincoln (1809-1865) was the 16th US President who abolished slavery.",
    "hitler": "Adolf Hitler (1889-1945) was the dictator of Nazi Germany responsible for WWII and the Holocaust.",
    "pyramids": "The Egyptian pyramids were built as tombs for pharaohs about 4,500 years ago. The Great Pyramid is the oldest.",
    "taj mahal": "The Taj Mahal was built by Mughal Emperor Shah Jahan in memory of his wife in 1653. It's in Agra, India.",
    "eiffel tower": "The Eiffel Tower was built in 1889 for the World's Fair in Paris. It's 330 meters tall.",
    "titanic": "The Titanic sank on April 15, 1912, after hitting an iceberg. About 1,500 people died.",
    
    // Space
    "nasa": "NASA (National Aeronautics and Space Administration) is the US space agency founded in 1958.",
    "iss": "The International Space Station orbits Earth at 400 km altitude. It has been continuously occupied since 2000.",
    "mars": "Mars is the fourth planet from the Sun, known as the Red Planet due to iron oxide on its surface.",
    "jupiter": "Jupiter is the largest planet in our solar system, with a Great Red Spot that's a giant storm.",
    "saturn": "Saturn is famous for its prominent ring system made of ice and rock particles.",
    "neil armstrong": "Neil Armstrong was the first person to walk on the Moon on July 20, 1969, saying 'One small step for man...'",
    "big bang": "The Big Bang theory suggests the universe began about 13.8 billion years ago from a hot, dense state.",
    "galaxy": "A galaxy is a gravitationally bound system of stars. The Milky Way contains 200-400 billion stars.",
    
    // Mathematics
    "pi": "Pi (π) is approximately 3.14159. It's the ratio of a circle's circumference to its diameter.",
    "pythagoras": "The Pythagorean theorem states: a² + b² = c² for right triangles. Named after Greek mathematician Pythagoras.",
    "fibonacci": "The Fibonacci sequence is: 0, 1, 1, 2, 3, 5, 8, 13... Each number is the sum of the two preceding ones.",
    "prime number": "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
    "infinity": "Infinity (∞) represents an unbounded quantity, larger than any real number.",
    "zero": "Zero (0) is both a number and a digit. It was invented in India around the 5th century.",
    
    // General Knowledge
    "alphabet": "The English alphabet has 26 letters, starting from A to Z.",
    "rainbow": "A rainbow has 7 colors: Red, Orange, Yellow, Green, Blue, Indigo, and Violet (ROYGBIV).",
    "continents": "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
    "oceans": "There are 5 oceans: Pacific, Atlantic, Indian, Southern (Antarctic), and Arctic.",
    "days in year": "A common year has 365 days. A leap year has 366 days (February has 29 days).",
    "months": "There are 12 months in a year: January, February, March, April, May, June, July, August, September, October, November, December.",
    "planets": "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
    "senses": "Humans have 5 traditional senses: sight, hearing, touch, taste, and smell.",
    "elements": "There are 118 chemical elements. The most abundant in the universe is hydrogen.",
    "speed of light": "Light travels at 299,792,458 meters per second (about 186,282 miles per second) in a vacuum.",
    "speed of sound": "Sound travels at about 343 meters per second (1,125 ft/s) in air at room temperature.",
    "gold": "Gold (Au) is a chemical element with atomic number 79. It's rare, valuable, and doesn't corrode.",
    "oxygen": "Oxygen (O) is element 8. It makes up 21% of Earth's atmosphere and is essential for life.",
    "carbon": "Carbon (C) is element 6. It's the basis of organic chemistry and life on Earth.",
    
    // Sports
    "cricket": "Cricket is a bat-and-ball game played between two teams of 11 players. Popular in South Asia, England, and Australia.",
    "football": "Football (soccer) is the world's most popular sport, played by two teams of 11 players.",
    "messi": "Lionel Messi is an Argentine footballer, considered one of the greatest players of all time. Won 8 Ballon d'Or awards.",
    "ronaldo": "Cristiano Ronaldo is a Portuguese footballer, one of the greatest goal scorers. He has won 5 Ballon d'Or awards.",
    "world cup": "The FIFA World Cup is held every 4 years. Brazil has won the most titles (5).",
    "olympics": "The Olympic Games are held every 4 years. There are Summer and Winter Olympics with athletes from around the world.",
    
    // Movies & Entertainment
    "harry potter": "Harry Potter is a series of 7 fantasy novels by J.K. Rowling, following a young wizard at Hogwarts.",
    "marvel": "Marvel Comics created iconic superheroes like Spider-Man, Iron Man, Captain America, and the Avengers.",
    "star wars": "Star Wars is a sci-fi franchise created by George Lucas in 1977. It has 9 main saga films.",
    "titanic movie": "Titanic (1997) is a romance/disaster film by James Cameron. It won 11 Oscars.",
    "avatar": "Avatar (2009) is a sci-fi film by James Cameron, the highest-grossing film of all time.",
    "bollywood": "Bollywood refers to Hindi-language film industry based in Mumbai, India. It produces the most films globally.",
    
    // Food & Drinks
    "pizza": "Pizza originated in Naples, Italy. It typically consists of dough, tomato sauce, cheese, and various toppings.",
    "coffee": "Coffee is a brewed drink from roasted coffee beans. It's the 2nd most traded commodity after oil.",
    "tea": "Tea is the second most consumed beverage after water. It originated in China over 4,000 years ago.",
    "chocolate": "Chocolate is made from cocoa beans. Dark chocolate has health benefits due to antioxidants.",
    "honey": "Honey is a natural sweetener made by bees. It never spoils - edible honey was found in 3,000-year-old Egyptian tombs.",
    
    // Business & Economics
    "economy": "An economy is a system of production, distribution, and consumption of goods and services in a region.",
    "inflation": "Inflation is the rate at which the general level of prices for goods and services rises, reducing purchasing power.",
    "stock market": "A stock market is where shares of publicly traded companies are bought and sold.",
    "gdp": "GDP (Gross Domestic Product) is the total value of all goods and services produced in a country in a year.",
    "entrepreneur": "An entrepreneur is someone who creates and runs a business, taking financial risks to do so.",
    
    // Religion & Philosophy
    "islam": "Islam is a monotheistic religion founded by Prophet Muhammad in the 7th century. Followers are called Muslims.",
    "christianity": "Christianity is based on the teachings of Jesus Christ. It's the world's largest religion with 2.4 billion followers.",
    "hinduism": "Hinduism is one of the oldest religions, originating in India. It has diverse beliefs and practices.",
    "buddhism": "Buddhism was founded by Siddhartha Gautama (Buddha) in India around 5th century BCE.",
    "quran": "The Quran is the holy book of Islam, believed to be the word of God revealed to Prophet Muhammad.",
    "bible": "The Bible is the sacred text of Christianity, consisting of the Old and New Testaments.",
    "meditation": "Meditation is a practice of focusing the mind for mental clarity and emotional calmness.",
    
    // Urdu specific knowledge
    "عمران خان": "عمران خان پاکستان کے 22ویں وزیر اعظم رہ چکے ہیں۔ وہ 2018 سے 2022 تک اقتدار میں رہے۔",
    "پاکستان کا دارالحکومت": "پاکستان کا دارالحکومت اسلام آباد ہے۔",
    "بابا قائد": "بابائے قوم قائد اعظم محمد علی جناح پاکستان کے بانی ہیں۔",
    "علامہ اقبال": "علامہ محمد اقبال شاعر مشرق کہلاتے ہیں۔ انہوں نے پاکستان کے خیال کو پیش کیا۔"
  };

  // Helper function to find matching knowledge
  function findKnowledge(msg) {
    // Direct match
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (msg.includes(key)) {
        return value;
      }
    }
    return null;
  }

  // Calculator function
  function calculate(expr) {
    try {
      // Basic math operations
      const cleanExpr = expr.replace(/[^0-9+\-*/.()\s]/g, '');
      if (!cleanExpr) return null;
      const result = Function('"use strict"; return (' + cleanExpr + ')')();
      return `The answer is ${result}`;
    } catch {
      return null;
    }
  }

  // Unit converter
  function convert(msg) {
    // Temperature conversions
    if (msg.includes("celsius") || msg.includes("fahrenheit")) {
      const cMatch = msg.match(/(\d+)\s*c/);
      const fMatch = msg.match(/(\d+)\s*f/);
      if (cMatch) {
        const c = parseInt(cMatch[1]);
        const f = (c * 9/5) + 32;
        return `${c}°C = ${f.toFixed(1)}°F`;
      }
      if (fMatch) {
        const f = parseInt(fMatch[1]);
        const c = (f - 32) * 5/9;
        return `${f}°F = ${c.toFixed(1)}°C`;
      }
    }
    // Distance conversions
    if (msg.includes("km to miles") || msg.includes("kilometers to miles")) {
      const match = msg.match(/(\d+)/);
      if (match) {
        const km = parseInt(match[1]);
        return `${km} km = ${(km * 0.621371).toFixed(2)} miles`;
      }
    }
    if (msg.includes("miles to km") || msg.includes("miles to kilometers")) {
      const match = msg.match(/(\d+)/);
      if (match) {
        const miles = parseInt(match[1]);
        return `${miles} miles = ${(miles * 1.60934).toFixed(2)} km`;
      }
    }
    // Weight conversions
    if (msg.includes("kg to lbs") || msg.includes("kilograms to pounds")) {
      const match = msg.match(/(\d+)/);
      if (match) {
        const kg = parseInt(match[1]);
        return `${kg} kg = ${(kg * 2.20462).toFixed(2)} lbs`;
      }
    }
    // Currency info
    if (msg.includes("dollar") || msg.includes("rupee") || msg.includes("euro") || msg.includes("pound")) {
      return "Currency rates change daily. Check xe.com or your bank for current exchange rates.";
    }
    return null;
  }

  // Definition helper
  function getDefinition(msg) {
    const questionWords = ["what is", "what are", "define", "meaning of", "definition of", "کیا ہے", "کیا مطلب"];
    for (const qw of questionWords) {
      if (msg.includes(qw)) {
        const searchTerm = msg.replace(qw, "").trim();
        const knowledge = findKnowledge(searchTerm);
        if (knowledge) {
          return knowledge;
        }
      }
    }
    return null;
  }

  async function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    let botMessage = "";

    // 1. Try knowledge base for definitions/questions
    const definition = getDefinition(msg);
    if (definition) {
      botMessage = definition;
    }
    // 2. Try direct knowledge lookup
    else if (findKnowledge(msg)) {
      botMessage = findKnowledge(msg);
    }
    // 3. Try math calculation
    else if (msg.match(/[\d\s]+[+\-*/].*[\d\s]+/) || msg.includes("calculate") || msg.includes("+ ") || msg.includes(" - ") || msg.includes(" times ") || msg.includes("multiplied by") || msg.includes("divided by")) {
      // Extract math expression
      let expr = msg.replace(/calculate|what is|equals|equal to|plus|minus|times|multiplied by|divided by|how much is/g, "")
                    .replace(/plus/g, "+")
                    .replace(/minus/g, "-")
                    .replace(/times|multiplied by/g, "*")
                    .replace(/divided by/g, "/")
                    .trim();
      const result = calculate(expr);
      botMessage = result || "I can help with basic math like: 2+2, 10*5, 100/4, etc.";
    }
    // 4. Try unit conversion
    else if (convert(msg)) {
      botMessage = convert(msg);
    }
    // 5. Check for Urdu or Urdu request
    else {
      const hasUrduText = /[\u0600-\u06FF]/.test(userMessage);
      const askingForUrdu = msg.includes("urdu") || msg.includes("اردو") || msg.includes("in urdu");

      if (hasUrduText || askingForUrdu) {
        // Urdu responses
        if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("سلام") || msg.includes("السلام")) {
          botMessage = "السلام علیکم! میں آپ کی کیسے مدد کر سکتا ہوں؟";
        } else if (msg.includes("how are you") || msg.includes("کیسے") || msg.includes("حال")) {
          botMessage = "میں ٹھیک ہوں، شکریہ! آپ کیسے ہیں؟";
        } else if (msg.includes("name") || msg.includes("نام")) {
          botMessage = "میں ایک چیٹ بوٹ ہوں۔ آپ مجھے بوٹ کہہ سکتے ہیں!";
        } else if (msg.includes("time") || msg.includes("وقت") || msg.includes("ساعہ")) {
          botMessage = "ابھی کا وقت ہے: " + new Date().toLocaleTimeString();
        } else if (msg.includes("date") || msg.includes("تاریخ") || msg.includes("دن")) {
          botMessage = "آج کی تاریخ ہے: " + new Date().toLocaleDateString();
        } else if (msg.includes("help") || msg.includes("مدد")) {
          botMessage = "میں آپ کی مدد کر سکتا ہوں۔ سلام، وقت، تاریخ، لطیفے، اور عام سوالات پوچھیں۔";
        } else if (msg.includes("joke") || msg.includes("لطیفہ") || msg.includes("مزاح")) {
          const urduJokes = [
            "ایک انجینئر نے ڈاکٹر سے کہا: آپ صرف ایک انسان کا نظام ٹھیک کرتے ہیں، لیکن میں کسی بھی مشین کا نظام ٹھیک کر سکتا ہوں!",
            "استاد: تم نے اپنے ہوم ورک کیوں نہیں کیا؟ طالب علم: سر، میرا کتا اسے کھا گیا! استاد: لیکن یہ تو ریاضی کا کام تھا؟ طالب علم: ہاں سر، وہ بھی اسے نہیں سمجھ پایا!",
            "بیوی: سنو جی، اگر میں مر جاؤں تو تم دوبارہ شادی کرو گے؟ شوہر: نہیں، میں کتے کے ساتھ رہ لوں گا۔ بیوی: کیا کتے سے اتنی محبت ہے؟ شوہر: نہیں، وہ کتوں سے شادی نہیں کرتا!"
          ];
          botMessage = urduJokes[Math.floor(Math.random() * urduJokes.length)];
        } else if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("الوداع") || msg.includes("خدا حافظ")) {
          botMessage = "خدا حافظ! آپ کا دن اچھا گزرے!";
        } else if (msg.includes("thanks") || msg.includes("thank you") || msg.includes("شکریہ")) {
          botMessage = "آپ کا شکریہ! میں خوش ہوں کہ میں مدد کر سکا!";
        } else if (hasUrduText) {
          botMessage = "آپ نے کہا: \"" + userMessage + "\"۔ میں ایک سادہ بوٹ ہوں، لیکن میں اردو سمجھنے کی کوشش کروں گا!";
        } else {
          botMessage = "میں اردو میں بات کر سکتا ہوں! سلام، وقت، تاریخ، لطیفے، یا مدد کے لیے پوچھیں۔";
        }
      } else {
        // English responses
        if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
          botMessage = "Hello! How can I help you today?";
        } else if (msg.includes("how are you")) {
          botMessage = "I'm doing great, thanks for asking! How about you?";
        } else if (msg.includes("name")) {
          botMessage = "I'm a smart chatbot. You can call me Bot!";
        } else if (msg.includes("time")) {
          botMessage = "The current time is " + new Date().toLocaleTimeString();
        } else if (msg.includes("date")) {
          botMessage = "Today's date is " + new Date().toLocaleDateString();
        } else if (msg.includes("help")) {
          botMessage = "I can answer questions about science, history, geography, technology, math, and more! Just ask me anything like:\n• What is gravity?\n• Who is Einstein?\n• Calculate 25 * 4\n• Convert 100 km to miles\n• What is the capital of France?";
        } else if (msg.includes("joke")) {
          const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the scarecrow win an award? He was outstanding in his field!",
            "Why don't eggs tell jokes? They'd crack each other up!"
          ];
          botMessage = jokes[Math.floor(Math.random() * jokes.length)];
        } else if (msg.includes("bye") || msg.includes("goodbye")) {
          botMessage = "Goodbye! Have a great day!";
        } else if (msg.includes("thanks") || msg.includes("thank you")) {
          botMessage = "You're welcome! Happy to help!";
        } else {
          botMessage = "I understand you asked: \"" + userMessage + "\".\n\nI have a knowledge base covering:\n• Science (sun, earth, gravity, atoms, DNA)\n• History (Einstein, WWII, pyramids)\n• Geography (countries, capitals)\n• Technology (AI, programming, internet)\n• Space (planets, NASA, black holes)\n• General facts (rainbow colors, elements)\n\nTry asking something specific or type 'help' to see examples!";
        }
      }
    }

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    appendMessage("bot", botMessage);
  }
});