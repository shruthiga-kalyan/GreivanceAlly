const OpenAI = require('openai');

async function suggestDepartments(grievance) {
    const openai = new OpenAI({
        apiKey: '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',dangerouslyAllowBrowser: true // This is the default and can be omitted
    });

    // List of Indian ministries - 102
    const indianMinistries = [
        "Agriculture and Farmers Welfare",
        "Agriculture Research and Education",
        "Animal Husbandry, Dairying",
        "Atomic Energy",
        "Ayush",
        "Bio Technology",
        "Central Board of Direct Taxes(Income Tax)",
        "Central Board of Excise and Customs",
        "Chemicals and Petrochemicals",
        "Civil Aviation",
        "Coal",
        "Commerce",
        "Consumer Affairs",
        "Cooperation",
        "Corporate Affairs",
        "Culture",
        "Defence",
        "Defence Finance",
        "Defence Production",
        "Defence Research and Development",
        "Development of North Eastern Region",
        "Drinking Water and Sanitation",
        "Earth Sciences",
        "Economic Affairs",
        "Electronics & Information Technology",
        "Empowerment of Persons with Disabilities",
        "Environment, Forest and Climate Change",
        "Ex Servicemen Welfare",
        "Expenditure",
        "External Affairs",
        "Fertilizers",
        "Financial Services",
        "Financial Services(Banking Division)",
        "Financial Services(Insurance Division)",
        "Fisheries",
        "Food and Public Distribution",
        "Food Processing Industries",
        "Health & Family Welfare",
        "Health Research",
        "Heavy Industry",
        "Higher Education",
        "Home Affairs",
        "House and Urban Affairs",
        "Information and Broadcasting",
        "Investment & Public Asset Management",
        "Justice",
        "Labour and Employment",
        "Land Resources",
        "Legal Affairs",
        "Legislative Department",
        "Micro Small and Medium Enterprises",
        "Military Affairs",
        "Mines",
        "Minority Affairs",
        "New and Renewable Energy",
        "NITI Aayog",
        "O/o the Comptroller & Auditor General of India",
        "Official Language",
        "Panchayati Raj",
        "Parliamentary Affairs",
        "Personnel and Training",
        "Petroleum and Natural Gas",
        "Pharmaceutical",
        "Posts",
        "Power",
        "Promotion of Industry and Internal Trade",
        "Public Enterprises",
        "Railways, Railway Board",
        "Revenue",
        "Road Transport and Highways",
        "Rural Development",
        "School Education and Literacy",
        "Science and Technology",
        "Scientific & Industrial Research",
        "Shipping",
        "Skill Development and Entrepreneurship",
        "Social Justice and Empowerment",
        "Space",
        "Sports",
        "Staff Selection Commission",
        "Statistics and Programme Implementation",
        "Steel",
        "Telecommunication",
        "Textiles",
        "Tourism",
        "Tribal Affairs",
        "Unique Identification Authority of India",
        "Water Resources, River Development & Ganga Rejuvenation",
        "Women and Child Development",
        "Youth Affairs",
        "Administrative Reforms and Public Grievances",
        "State Governments/Others"
    ];

    const systemMessage = `
        You are an assistant used for grievance readdressal. Output a JSON data that contains the department classified based on the given grievance under Indian ministry from the list ${indianMinistries}, summarize the given grievance so that it can be submitted as grievance, prioritize the grievance on the scale of 1 to 5 based on their importance, list of relevant departments under the Indian ministries from the list ${indianMinistries} to which the given grievance is valid and can be submitted
        Example Output: {"department": "Drinking Water and Sanitation", "summary": "There has been a marked decrease in the quality of water in the locality, posing a sanitation risk.", "priority": 3, "relateddepartments": ["Health & Family Welfare", "Environment, Forest and Climate Change"]}`;

    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: grievance },
        ],
    });

    const assistantResponse = chatCompletion.choices[0].message.content;
    const suggestedDepartments = JSON.parse(assistantResponse).relateddepartments;

    return suggestedDepartments;
}

// Export the suggestDepartments function
module.exports = { suggestDepartments };
