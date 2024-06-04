import {
    behance,
    codepen,
    discord,
    dribbble,
    instagram,
    linkedin,
    medium,
    pinterest,
    reddit,
    stackOverflow,
    threads,
    tiktok,
    twitterX,
    youtube
} from "../assets";

type Social = {
    name: string;
    image: string;
    urlPattern: string;
    url?: string;
};

export const socials: Social[] = [
    {
        name: "Behance",
        image: behance,
        urlPattern: "https://www.behance.net/"
    },
    {
        name: "Codepen",
        image: codepen,
        urlPattern: "https://codepen.io/"
    },
    {
        name: "Discord",
        image: discord,
        urlPattern: "https://discord.com/users/"
    },
    {
        name: "Dribbble",
        image: dribbble,
        urlPattern: "https://dribbble.com/"
    },
    {
        name: "Instagram",
        image: instagram,
        urlPattern: "https://www.instagram.com/"
    },
    {
        name: "LinkedIn",
        image: linkedin,
        urlPattern: "https://www.linkedin.com/in/"
    },
    {
        name: "Medium",
        image: medium,
        urlPattern: "https://medium.com/@"
    },
    {
        name: "Pinterest",
        image: pinterest,
        urlPattern: "https://www.pinterest.com/"
    },
    {
        name: "Reddit",
        image: reddit,
        urlPattern: "https://www.reddit.com/user/"
    },
    {
        name: "Stackoverflow",
        image: stackOverflow,
        urlPattern: "https://stackoverflow.com/users/"
    },
    {
        name: "Threads",
        image: threads,
        urlPattern: "https://www.threads.net/@"
    },
    {
        name: "TikTok",
        image: tiktok,
        urlPattern: "https://www.tiktok.com/@"
    },
    {
        name: "X",
        image: twitterX,
        urlPattern: "https://twitter.com/"
    },
    {
        name: "YouTube",
        image: youtube,
        urlPattern: "https://www.youtube.com/"
    }
];

export function setSocialUrl(username: string, platformName: string): void {
    const social = socials.find(s => s.name.toLowerCase() === platformName.toLowerCase());
    if (social) {
        social.url = social.urlPattern + username;
    } else {
        console.error(`Platform ${platformName} not found`);
    }
}



export const TechStack = [
    {
        Title: "Languages",
        Options: [
            {
                title: "JavaScript",
                logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
            },
            {
                title: "Python",
                logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
            },
            {
                title: "Java",
                logo: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
            },
            {
                title: "C#",
                logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png"
            },
            {
                title: "Ruby",
                logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg"
            },
            {
                title: "PHP",
                logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
            },
            {
                title: "Swift",
                logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg"
            },
            {
                title: "Go",
                logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg"
            },
            {
                title: "TypeScript",
                logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
            },
            {
                title: "Kotlin",
                logo: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png"
            },
            {
                title: "Rust",
                logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg"
            },
            {
                title: "Scala",
                logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Scala-full-color.svg"
            },
            {
                title: "Perl",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Perl_language_logo.svg/1024px-Perl_language_logo.svg.png"
            },
            {
                title: "R",
                logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/R_logo.svg"
            },
            {
                title: "Shell",
                logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Gnu-bash-logo.svg"
            },
            {
                title: "C++",
                logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
            },
            {
                title: "C",
                logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"
            },
            {
                title: "Objective-C",
                logo: "https://seeklogo.com/images/O/objective-c-logo-81746870EF-seeklogo.com.png"
            },
            {
                title: "MATLAB",
                logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png"
            },
            {
                title: "Groovy",
                logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Groovy-logo.svg"
            }
        ]
    },
    {
        Title: "Frontend",
        Options: [
            { title: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
            { title: "Angular", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" },
            { title: "Vue.js", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
            { title: "Ember.js", logo: "https://seeklogo.com/images/E/ember-logo-2565265802-seeklogo.com.png" },
            { title: "Backbone.js", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/backbone-js-icon.png" },
            { title: "Svelte", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg" },
            { title: "Next.js", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
            { title: "Gatsby", logo: "https://cdn.worldvectorlogo.com/logos/gatsby.svg" },
            { title: "Nuxt.js", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg" },
            { title: "Meteor", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/meteor-js-icon.png" },
            { title: "Polymer", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Polymer_Project_logo.png" },
            { title: "Pug", logo: "https://cdn.worldvectorlogo.com/logos/pug.svg" }
        ]
    },
    {
        Title: "Backend",
        Options: [
            { title: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
            { title: "Django", logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg" },
            { title: "Ruby on Rails", logo: "https://upload.wikimedia.org/wikipedia/commons/6/62/Ruby_On_Rails_Logo.svg" },
            { title: "Laravel", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" },
            { title: "Spring Boot", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg" },
            { title: "Express.js", logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" },
            { title: "ASP.NET", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Microsoft_.NET_logo.png" },
            { title: "Flask", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" },
            { title: "Phoenix", logo: "https://upload.wikimedia.org/wikipedia/en/3/3c/Phoenix-logo.png" },
            { title: "FastAPI", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/FastAPI_logo.svg" }
        ],
    },
    {
        Title: "Database",
        Options: [
            { title: "MySQL", logo: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" },
            { title: "PostgreSQL", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
            { title: "MongoDB", logo: "https://upload.wikimedia.org/wikipedia/en/4/45/MongoDB-Logo.svg" },
            { title: "Cassandra", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Cassandra_logo.svg" },
            { title: "Redis", logo: "https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg" },
            { title: "SQLite", logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/SQLite370.svg" },
            { title: "MariaDB", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/MariaDB_logo.svg" },
            { title: "Oracle Database", logo: "https://upload.wikimedia.org/wikipedia/en/6/68/Oracle_logo.svg" },
            { title: "DB2", logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/IBM_DB2_logo.svg" },
            { title: "Microsoft SQL Server", logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Microsoft_SQL_Server_Logo.svg" }
        ],
    },
    {
        Title: "Mobile",
        Options: [
            { title: "React Native", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
            { title: "Flutter", logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" },
            { title: "Xamarin", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Xamarin-logo.svg" },
            { title: "PhoneGap", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Phonegap-logo.svg" },
            { title: "Apache Cordova", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Apache_Cordova_Logo.svg" },
            { title: "Ionic", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Ionic_Logo.svg" },
            { title: "NativeScript", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/NativeScript_logo.png" },
            { title: "Appcelerator Titanium", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Appcelerator-logo.png" },
            { title: "Sencha Touch", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Sencha_Logo.svg" },
            { title: "Onsen UI", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Onsen_UI_logo.svg" }
        ],
    },
    {
        Title: "CSS Frameworks",
        Options: [
            { title: "Bootstrap", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg" },
            { title: "Tailwind CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
            { title: "Materialize", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/MaterializeCSS_logo.svg" },
            { title: "Bulma", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Bulma.png" },
            { title: "Foundation", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Foundation_logo.svg" },
            { title: "Semantic UI", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Semantic_Logo.png" },
            { title: "UIKit", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/UIkit_logo.svg" },
            { title: "Pure", logo: "https://upload.wikimedia.org/wikipedia/commons/6/62/Pure_CSS_Logo.svg" },
            { title: "Skeleton", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Skeleton_logo.svg" },
            { title: "Milligram", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Milligram_Logo.svg" },
            { title: "NextUI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/NextUI_Logo.svg" },
            { title: "Chakra UI", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Chakra_UI_Logo.svg" },
            { title: "Ant Design", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Ant_Design_Logo.svg" },
            { title: "Material-UI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Material_UI_Logo.svg" },
            { title: "Shadcn", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Shadcn_Logo.svg" },
            { title: "Aceternity UI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Aceternity_UI_Logo.svg" }
        ],
    },
    {
        Title: "DevOps",
        Options: [
            { title: "Docker", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_logo.svg" },
            { title: "Kubernetes", logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" },
            { title: "Jenkins", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Jenkins_logo.svg" },
            { title: "Ansible", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Ansible_logo.svg" },
            { title: "Terraform", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Terraform_Logo.svg" },
            { title: "GitLab CI/CD", logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/GitLab_Logo.svg" },
            { title: "Travis CI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/TravisCI_logo.svg" },
            { title: "CircleCI", logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/CircleCI_logo.svg" },
            { title: "AWS CodePipeline", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
            { title: "Azure DevOps", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Azure_DevOps_Logo.svg" }
        ],
    },
    {
        Title: "Design",
        Options: [
            { title: "Adobe XD", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg" },
            { title: "Sketch", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg" },
            { title: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
            { title: "InVision", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/InVision_Logo.svg" },
            { title: "Balsamiq", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Balsamiq_Logo.svg" },
            { title: "Marvel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Marvel_Logo.svg" },
            { title: "Zeplin", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Zeplin_Logo.svg" },
            { title: "Affinity Designer", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Affinity_Designer_Logo.svg" },
            { title: "Canva", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Canva_Logo.svg" },
            { title: "Gravit Designer", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gravit_Designer_Logo.svg" }
        ],
    },
    {
        Title: "AI/ML",
        Options: [
            { title: "TensorFlow", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
            { title: "PyTorch", logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo.svg" },
            { title: "Keras", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" },
            { title: "Caffe", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Caffe_logo.svg" },
            { title: "Scikit-learn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
            { title: "Pandas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Pandas_logo.svg" },
            { title: "NumPy", logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo.svg" },
            { title: "SciPy", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/SCIPY_Logo.svg" },
            { title: "Matplotlib", logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" },
            { title: "Seaborn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Seaborn_logo.svg" }
        ],
    },
    {
        Title: "Testing",
        Options: [
            { title: "Jest", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Jest_Logo.svg" },
            { title: "Mocha", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Mocha_Logo.svg" },
            { title: "Jasmine", logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Jasmine_logo.svg" },
            { title: "Karma", logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Karma_Logo.svg" },
            { title: "Protractor", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Protractor_Logo.svg" },
            { title: "Cypress", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Cypress_Logo.svg" },
            { title: "Enzyme", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Enzyme_Logo.svg" },
            { title: "Chai", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Chai_Logo.svg" },
            { title: "Selenium", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.svg" },
            { title: "Puppeteer", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Puppeteer_logo.svg" }
        ],
    },
    {
        Title: "Hosting",
        Options: [
            { title: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
            { title: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Cloud_logo.svg" },
            { title: "Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
            { title: "Heroku", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Heroku_logo.svg" },
            { title: "Netlify", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Netlify_logo.svg" },
            { title: "Vercel", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vercel_logo.svg" },
            { title: "DigitalOcean", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg" },
            { title: "Linode", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Linode_logo.svg" },
            { title: "Firebase (Hosting)", logo: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" },
            { title: "GitHub Pages", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/GitHub_Pages_logo.svg" },
            { title: "Render", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Render_Logo.svg" }
        ],
    },
    {
        Title: "Backend as a Service",
        Options: [
            { title: "Firebase (BaaS)", logo: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" },
            { title: "AWS Amplify", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/AWS_Amplify_Logo.svg" }, // Not Found
            { title: "Google Cloud Functions", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Cloud_logo.svg" },
            { title: "Azure Functions", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
            { title: "IBM Cloud Functions", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_Cloud_Logo.svg" },
            { title: "Algolia", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Algolia_logo.svg" },
            { title: "Auth0", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Auth0_logo.svg" },
            { title: "Parse", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Parse_Logo.svg" },
            { title: "Back4App", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Back4App_Logo.svg" },
            { title: "Kinvey", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Kinvey_Logo.svg" }
        ],
    },
    {
        Title: "Data Visualization",
        Options: [
            { title: "D3.js", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/D3.js_Logo.svg" },
            { title: "Chart.js", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Chart.js_Logo.svg" },
            { title: "Highcharts", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Highcharts_Logo.svg" },
            { title: "Google Charts", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Charts_Logo.svg" },
            { title: "Leaflet", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Leaflet_logo.svg" },
            { title: "Three.js", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Logo.svg" },
            { title: "Plotly", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Plotly_Logo.svg" },
            { title: "amCharts", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/AmCharts_Logo.svg" },
            { title: "Recharts", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Recharts_Logo.svg" },
            { title: "Victory", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Victory_Logo.svg" }
        ],
    },
    {
        Title: "Game Engines",
        Options: [
            { title: "Unity", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg" },
            { title: "Unreal Engine", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Unreal_Engine_Logo.svg" },
            { title: "Godot", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_logo.svg" },
            { title: "CryEngine", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/CryEngine_Logo.svg" },
            { title: "Lumberyard", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Lumberyard_Logo.svg" },
            { title: "Construct", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Construct_Logo.svg" },
            { title: "GameMaker Studio", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/GameMaker_Studio_Logo.svg" },
            { title: "Phaser", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Phaser_Logo.svg" },
            { title: "Panda3D", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Panda3D_Logo.svg" },
            { title: "LibGDX", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/LibGDX_Logo.svg" }
        ],
    },
    {
        Title: "Others",
        Options: [
            { title: "Git", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" },
            { title: "Jira", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Jira_Logo.svg" },
            { title: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Logo.svg" },
            { title: "VS Code", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_Logo.svg" },
            { title: "Postman", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Postman_Logo.svg" },
            { title: "Sublime Text", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sublime_Text_Logo.svg" },
            { title: "Atom", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Atom_Logo.svg" },
            { title: "IntelliJ IDEA", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/IntelliJ_IDEA_Logo.svg" },
            { title: "PyCharm", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/PyCharm_Logo.svg" },
            { title: "Eclipse", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Eclipse_Logo.svg" },
            { title: "Arduino", logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg" },
            { title: "Raspberry Pi", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Raspberry_Pi_Logo.svg" },
            { title: "Linux", logo: "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" }
        ],
    },
];
