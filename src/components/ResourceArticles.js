const ARTICLES = [
    {   
        id: "s1",
        tag: "study",
        title: "Exam Preparation: Ten Study Tips",
        description: "You selected #STUDY, you might be interested in this article!",
        link: "https://www.topuniversities.com/student-info/health-and-support/exam-preparation-ten-study-tips",
        image: "https://i.ibb.co/KDCDnbG/Screen-Shot-2020-05-09-at-7-18-43-PM.png"
    },
    {   
        id: "s2",
        tag: "study",
        title: "Studying 101: Study Smarter Not Harder",
        description: "You selected #STUDY, you might be interested in this article!",
        link: "https://learningcenter.unc.edu/tips-and-tools/studying-101-study-smarter-not-harder/",
        image: "https://i.ibb.co/1zBMBW0/Screen-Shot-2020-05-09-at-7-16-59-PM.png"
    },
    {   
        id: "s3",
        tag: "study",
        title: "Tips for effective, efficient studying",
        description: "You selected #STUDY, you might be interested in this article!",
        link: "https://www.khanacademy.org/test-prep/sat/new-sat-tips-planning/new-sat-how-to-prep/a/tips-for-effective-efficient-studying",
        image: "https://i.ibb.co/C0XvzZy/Screen-Shot-2020-05-09-at-7-21-53-PM.png"
    },
    {   
        id: "s4",
        tag: "study",
        title: "BEST Memorisation Techniques For Exams",
        description: "You selected #STUDY, you might be interested in this article!",
        link: "https://examstudyexpert.com/memorisation-techniques-for-exams/",
        image: "https://i0.wp.com/examstudyexpert.com/wp-content/uploads/2019/02/Man-in-graduation-cap.jpg?w=1355&ssl=1"
    },
    {
        id: "r1",
        tag: "relationship",
        title: "10 Things you Can Do to Improve Your Relationship",
        description: "You selected #RELATIONSHIP, you might be interested in this article!",
        link: "https://theeverygirl.com/10-things-you-can-do-to-improve-your-relationship/",
        image: "https://i.ibb.co/9HdG8z8/Screen-Shot-2020-05-08-at-5-38-13-PM.png"
    },
    {
        id: "r2",
        tag: "relationship",
        title: "The Best Relationship Advice I Ever Received",
        description: "You selected #RELATIONSHIP, you might be interested in this article!",
        link: "https://www.cheatsheet.com/health-fitness/the-best-relationship-advice-i-ever-received.html/",
        image: "https://i.ibb.co/b3Lz6yM/Screen-Shot-2020-05-09-at-7-09-29-PM.png"
    },
    {
        id: "r3",
        tag: "relationship",
        title: "Teenage relationships: romance and intimacy",
        description: "You selected #RELATIONSHIP, you might be interested in this article!",
        link: "https://raisingchildren.net.au/pre-teens/communicating-relationships/romantic-relationships/teen-relationships",
        image: "https://i.ibb.co/BP3MfTN/Screen-Shot-2020-05-09-at-7-28-33-PM.png"
    },
    {
        id: "r4",
        tag: "relationship",
        title: "Am I in a Healthy Relationship?",
        description: "You selected #RELATIONSHIP, you might be interested in this article!",
        link: "https://kidshealth.org/en/teens/healthy-relationship.html",
        image: "data:image/jpeg;base64,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"
    },
    {
        id: "h1",
        tag: "health",
        title: "Practicing Self-Respect: 9 Effective Strategies",
        description: "You selected #HEALTH, you might be interested in this article!",
        link: "https://www.liveyourtruestory.com/practicing-self-respect-9-effective-strategies-confidence/",
        image: "https://eastside-online.org/wp-content/uploads/2019/11/depositphotos_103164650-stock-illustration-respect-concept-heart-900x675.jpg"
    },
    {
        id: "h2",
        tag: "health",
        title: "Maintaining a Healthy Lifestyle",
        description: "You selected #HEALTH, you might be interested in this article!",
        link: "https://www.foundationforpn.org/living-well/lifestyle/",
        image: "http://www.healthylivingandu.com/wp-content/uploads/2019/01/Healthy_Living.png"
    },
    {
        id: "h3",
        tag: "health",
        title: "How to Manage Your Mental Health",
        description: "You selected #HEALTH, you might be interested in this article!",
        link: "https://www.glassdoor.com/blog/how-to-manage-your-mental-health-as-a-student-with-a-stressful-job/",
        image: "https://www.glassdoor.com/blog/app/uploads/sites/2/iStock-626647986-1024x450.jpg"
    },
    {
        id: "h4",
        tag: "health",
        title: "How to Eat Healthy",
        description: "You selected #HEALTH, you might be interested in this article!",
        link: "https://www.hhs.gov/fitness/eat-healthy/how-to-eat-healthy/index.html",
        image: "https://www.hhs.gov/sites/default/files/assorted-vegetables.jpg"
    }

];

export default ARTICLES;