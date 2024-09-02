import axios from 'axios';
import OpenAI from 'openai';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import CustomOptions from './CustomOptions';
import GetCmptNo from './GetCmptNo';
import GetDept from './GetDept';
import GetStats from './GetStats';
import OtherDepts from './OtherDepts';
import PushMong from './PushMong';
import Translator from './Translator.mjs';

class GrievanceAssistant extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      grievance: '',
      department: 'null',
      othDepts: [],
      lang: 'en'
    };
    
    this.openai = new OpenAI({
      apiKey: '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', dangerouslyAllowBrowser: true// Your OpenAI API key
    });
  }
  
  componentWillMount(){
    const {steps} = this.props;
    const {grievance,department,othDepts} = steps;
    this.setState({grievance,department,othDepts});
  }
  
  async componentDidMount() {
    // if(type === 1){
      await this.main();
      // }
    }
    
    async main() {
      // const fs = require('fs');
      const {grievance} = this.state;
    const indian_ministries = [
      "Agriculture and Farmers Welfare",
      "Agriculture Research and Education",
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
      "Housing and Urban Affairs",
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
      "State Governments/Others",
      "Animal Husbandry, Dairying"
  ];

    const chatCompletion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are an assistant used for grievance readdressal. Output a JSON data that contains the department classified based on the given grievance under Indian ministry from the list ${indian_ministries}, summarize the given grievance so that it can be submitted as grievance, prioritize the grievance on the scale of 1 to 5 based on their importance, list of relevant departments under the Indian ministries from the list \${indianMinistries} to which the given grievance is valid and can be submitted 
                                    Example Output: {"department": "Drinking Water and Sanitation", "summary": "There has been a marked decrease in the quality of water in the locality, posing a sanitation risk.", "priority": 3, "relateddepartments": ["Health & Family Welfare", "Environment, Forest and Climate Change"]}` },
        { role: 'user', content: "There has been a marked decrease in the quality of water in the locality. This is posing a sanitation risk in our area. Please look into the issue." },
        { role: 'assistant', content: `{
                                        "department": "Drinking Water and Sanitation",
                                        "summary": "There has been a marked decrease in the quality of water in the locality, posing a sanitation risk.",
                                        "priority": 3,
                                        "relateddepartments": ["Health & Family Welfare", "Environment, Forest and Climate Change"]
                                      }`
          },
        { role: 'user', content: grievance.value },
      ],
    });
    const jsonans = JSON.parse(chatCompletion.choices[0].message.content);
    this.setState({department: jsonans.department});
    this.setState({othDepts: jsonans.relateddepartments});
    try {
      await axios.put('http://localhost:3001/gptData', jsonans);
    } catch (error) {
      console.error('Error overwriting data in JSON Server:', error);
    }
  }

  render() {
    const {lang} = this.state;
    return (
      <Translator text='Your Grievance is being Submitted...' targetLang={lang} />
    );
  }
  
  
}

GrievanceAssistant.propTypes = {
  steps: PropTypes.object,
};

GrievanceAssistant.defaultProps = {
  steps: undefined,
};

class Chatbot extends Component {
  constructor(props){
    super(props);
    this.state = {
      lang: props.language
    }
  }
  render() {
    const {lang} = this.state;
    const theme = {
      background: '#f5f8fb',
      fontFamily: 'Arial, sans-serif',
      headerBgColor: '#197B22',
      headerFontColor: '#fff',
      headerFontSize: '18px',
      botBubbleColor: '#0F3789',
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a',
    };

    const config = {
      floating: true,
      width: '500px',
    };

    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          recognitionEnable={true}
          recognitionLang= {lang}
          speechSynthesis={{ enable: true, lang: {lang} }}
          headerTitle="GrievanceAlly - VISHU"
          steps = {[
            {
              id: 'start',
              component: <CustomOptions lang={lang} options={[
                {value: 1, label: 'Start Conversation',trigger: '0'}
              ]}/>,
              asMessage: true,
            },
            {
              id: '0',
              component: <Translator text = 'Hi!! I am VISHU.. - Grievance Chatbot. I am here to help you.' targetLang = {lang}/>,
              asMessage: true,
              trigger: '1'
            },
            {
              id: '1',
              component: <Translator text = 'Select any one of The below Services' targetLang = {lang}/>,
              asMessage: true,
              trigger: '2',
            },
            {
              id: '2',
              component: <CustomOptions lang={lang} options = {[
                { value: 1, label: 'Lodge Grievance', trigger: '4' },
                { value: 2, label: 'Check Grievance Status', trigger: 'status' },
                { value: 3, label: 'Grievance Reappeal', trigger: 'reapp' },
                { value: 5, label: 'Rerouted Grievance Enquiry', trigger: 'rert' },
              ]}/>,
              asMessage: true
            },
            {
              id: '4',
              component: <Translator text = 'Tell me your Grievance ' targetLang = {lang}/>,
              asMessage: true,
              trigger:'grievance'
            },{
              id:'grievance',
              user:true,
              trigger:'getdept'
            },
            {
              id: 'callapi',
              component: <GrievanceAssistant lang={lang}/>,
              asMessage: true,
              trigger: 'getdept'
        },{
            // delay: 7000,
            id:'getdept',
            component: <GetDept lang={lang}/>,
            asMessage: true,
            trigger:'6'
        },
          {
            id:'6',
            component: <Translator text = 'Thank you for giving your grievance' targetLang = {lang}/>,
            asMessage: true,
            trigger:'10'
          },{
            id:'10',
            component: <Translator text = 'Do you want to change the department?' targetLang = {lang}/>,
            asMessage: true,
            trigger:'11'
          },{
            id:'11',
            component: <CustomOptions lang={lang} options ={[
              { value: 1, label: 'Yes', trigger: '12' },
              { value: 2, label: 'No', trigger: '13' },
            ]} />,
            asMessage: true,
          },{
            id:'12',
            component: <OtherDepts lang={lang}/>,
            asMessage: true,
          },
          {
            id:'14',
            component: <Translator text = 'Your grievance will be submitted to the Selected Department' targetLang = {lang}/>,
            asMessage: true,
            trigger:'13'
          },{
            id:'13',
            component: <Translator text = 'Confirm submitting the grievance ?' targetLang = {lang}/>,
            asMessage: true,
            trigger:'17'
          },{
            id:'17',
            component: <CustomOptions lang={lang} options={[
              { value: 1, label: 'Confirm', trigger: '18' },
              { value: 2, label: 'Cancel', trigger: '1' },
            ]}/>,
            asMessage: true,
          },{
            id: '18',
            component: <PushMong lang={lang}/>,
            asMessage: true,
            trigger: '26'
          }
          ,{
            id:'26',
            component: <Translator text = 'You can use this reference number to track the progress of your grievance' targetLang = {lang}/>,
            asMessage: true,
            trigger:'1'
          },{
            id:'status',
            component: <Translator text = 'Choose the complaint number' targetLang = {lang}/>,
            asMessage: true,
            trigger:'statoptions'
          }
          ,{
            id: 'statoptions',
            component: <GetCmptNo lang={lang}/>,
            asMessage: true,
          }
          ,{
            id:'statdet',
            component: <GetStats lang={lang}/>,
            asMessage: true,
            trigger:'stat'
          }
          ,{
            id:'stat',
            component: <Translator text = 'Do you want to check the status of another grievance:' targetLang = {lang}/>,
            asMessage: true,
            trigger:'statop'
          }
          ,{
            id: 'statop',
            component: <CustomOptions lang={lang} options={[
              { value: 1, label: 'Yes', trigger: 'status' },
              { value: 2, label: 'No', trigger: '1' },
            ]}/>,
            asMessage: true,
          }
          ,{
            id:'reapp',
            component: <Translator text = 'Enter the rejected complaint number that you want to reappeal' targetLang = {lang}/>,
            asMessage: true,
            trigger:'reapp1'
          }
          ,{
            id:'reapp1',
            user: true,
            trigger:'reapp2'
          }
          ,{
            id:'reapp2',
            component: <Translator text = 'Summary' targetLang = {lang}/>,
            asMessage: true,
            trigger:'reapp3'
          }
          ,{
            id:'reapp3',
            component: <Translator text = 'Do you want to reappeal the above grievance:' targetLang = {lang}/>,
            asMessage: true,
            trigger:'reapp4'
          }
          ,{
            id:'reapp4',
            component: <CustomOptions lang={lang} options={[
              { value: 1, label: 'Yes', trigger: 'reappyes' },
              { value: 2, label: 'No', trigger: 'reappno' },
            ]}/>,
            asMessage: true,
          }
          ,{
            id:'reappyes',
            message:"Logic for reappealing",
            // component: <Translator text = 'Enter the Aadhar Number' targetLang = {lang}/>,
            // asMessage: true,
            trigger:'reappy1'
          }
          ,{
            id:'reappy1',
            component: <Translator text = 'The grievance has been successfully reappealed' targetLang = {lang}/>,
            asMessage: true,
            trigger:'1'
          }
          ,{
            id:'reappno',
            component: <Translator text = 'The grievance is not reappealed' targetLang = {lang}/>,
            asMessage: true,
            trigger:'1'
          }
          ,{
            id:'rert',
            component: <Translator text = 'Enter the reroute Id' targetLang = {lang}/>,
            asMessage: true,
            trigger:'rert1'
          }
          ,{
            id:'rert1',
            user: true,
            trigger:'rert2'
          }
          ,{
            id:'rert2',
            message:"Display the rerouting summary",
            // component: <Translator text = 'Enter the Aadhar Number' targetLang = {lang}/>,
            // asMessage: true,
            trigger:'1'
          }
        ]}
          {...config}
        />
      </ThemeProvider>
    );
  }
}

export default Chatbot;