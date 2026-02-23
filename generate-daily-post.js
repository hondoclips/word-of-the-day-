// Daily Word of the Day Post Generator
// This script fetches a random word and generates an Instagram post

const fs = require('fs');
const https = require('https');
const path = require('path');

// Load wizard image as base64 for reliable embedding
function getWizardImageSrc() {
    const imgPath = path.join(__dirname, 'wizard.png');
    if (fs.existsSync(imgPath)) {
        const data = fs.readFileSync(imgPath).toString('base64');
        return `data:image/png;base64,${data}`;
    }
    return '/wizard.png'; // fallback
}

// List of words with definitions (you can expand this or use an API)
const words = [
    {
        word: "Serendipity",
        pronunciation: "ser · en · dip · ih · tee",
        partOfSpeech: "noun",
        definition: "The occurrence and development of events by chance in a happy or beneficial way.",
        example: "A fortunate stroke of serendipity brought the two old friends together after 20 years."
    },
    {
        word: "Ephemeral",
        pronunciation: "eh · fem · er · al",
        partOfSpeech: "adjective",
        definition: "Lasting for a very short time; fleeting.",
        example: "The ephemeral beauty of cherry blossoms makes them all the more precious."
    },
    {
        word: "Resilience",
        pronunciation: "rih · zil · yence",
        partOfSpeech: "noun",
        definition: "The capacity to recover quickly from difficulties; toughness.",
        example: "Her resilience in the face of adversity inspired everyone around her."
    },
    {
        word: "Eloquent",
        pronunciation: "el · oh · kwent",
        partOfSpeech: "adjective",
        definition: "Fluent or persuasive in speaking or writing.",
        example: "The speaker gave an eloquent speech that moved the entire audience."
    },
    {
        word: "Luminous",
        pronunciation: "loo · min · us",
        partOfSpeech: "adjective",
        definition: "Full of or shedding light; bright or shining.",
        example: "The luminous stars lit up the night sky like diamonds."
    },
    {
        word: "Benevolent",
        pronunciation: "beh · nev · oh · lent",
        partOfSpeech: "adjective",
        definition: "Well meaning and kindly; generous and charitable.",
        example: "The benevolent donor contributed millions to help children in need."
    },
    {
        word: "Nostalgia",
        pronunciation: "nos · tal · juh",
        partOfSpeech: "noun",
        definition: "A sentimental longing for the past, typically for a period with happy personal associations.",
        example: "Looking through old photo albums filled her with nostalgia for her childhood."
    }
];

// Get current date
function getFormattedDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const now = new Date();
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();

    return `${dayName}, ${monthName} ${day}`;
}

// Get word of the day (rotates based on day of year)
function getWordOfDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const index = dayOfYear % words.length;
    return words[index];
}

// Generate HTML for today's post
function generateHTML() {
    const wordData = getWordOfDay();
    const date = getFormattedDate();
    const wizardSrc = getWizardImageSrc();

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WOTD - ${wordData.word}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #000000;
            font-family: 'Georgia', serif;
            padding: 20px;
        }

        .instagram-post {
            width: 1080px;
            height: 1350px;
            background: #000000;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }

        /* Stars layer */
        .wood-texture {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .star {
            position: absolute;
            color: #ffe87c;
            line-height: 1;
            pointer-events: none;
        }

        .fireplace-glow {
            display: none;
        }

        .content {
            position: relative;
            z-index: 10;
            padding: 100px 80px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .date {
            position: absolute;
            top: 40px;
            right: 40px;
            color: rgba(255, 255, 255, 0.3);
            font-size: 14px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .header {
            text-align: center;
            margin-bottom: 60px;
        }

        .wizard-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 30px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            object-fit: cover;
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.15), 0 0 100px rgba(255, 255, 255, 0.08);
        }

        .logo {
            color: rgba(255, 255, 255, 0.9);
            font-size: 28px;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .word {
            color: rgba(255, 255, 255, 0.95);
            font-size: 90px;
            font-weight: 600;
            margin-bottom: 20px;
            line-height: 1;
        }

        .pronunciation {
            color: rgba(255, 255, 255, 0.6);
            font-size: 20px;
            font-style: italic;
            margin-bottom: 40px;
        }

        .part-of-speech {
            display: inline-block;
            background: transparent;
            color: rgba(255, 255, 255, 0.7);
            padding: 10px 30px;
            border-radius: 25px;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 40px;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .definition {
            color: rgba(255, 255, 255, 0.8);
            font-size: 26px;
            line-height: 1.6;
            background: transparent;
            border-left: 3px solid rgba(255, 255, 255, 0.3);
            padding: 30px 35px;
            border-radius: 10px;
            max-width: 850px;
            margin: 0 auto 40px;
        }

        .divider {
            width: 100px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            margin: 0 auto 40px;
        }

        .example {
            background: transparent;
            border-left: 3px solid rgba(255, 255, 255, 0.3);
            padding: 30px 35px;
            border-radius: 10px;
            max-width: 850px;
            margin: 0 auto;
        }

        .example-label {
            color: rgba(255, 255, 255, 0.6);
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 12px;
        }

        .example-text {
            color: rgba(255, 255, 255, 0.7);
            font-size: 24px;
            font-style: italic;
            line-height: 1.5;
        }

        .footer {
            text-align: center;
            margin-top: 50px;
        }

        .cta {
            color: rgba(255, 255, 255, 0.7);
            font-size: 20px;
            font-weight: 500;
            letter-spacing: 1px;
        }

        .corner-accent {
            display: none;
        }
    </style>
</head>
<body>
    <div class="instagram-post">
        <div class="wood-texture">
            <span class="star" style="left:2%;top:5%;font-size:18px;">✦</span>
            <span class="star" style="left:10%;top:12%;font-size:24px;">✦</span>
            <span class="star" style="left:19%;top:3%;font-size:16px;">✦</span>
            <span class="star" style="left:28%;top:18%;font-size:22px;">✦</span>
            <span class="star" style="left:38%;top:8%;font-size:18px;">✦</span>
            <span class="star" style="left:48%;top:2%;font-size:26px;">✦</span>
            <span class="star" style="left:57%;top:14%;font-size:16px;">✦</span>
            <span class="star" style="left:67%;top:6%;font-size:20px;">✦</span>
            <span class="star" style="left:76%;top:20%;font-size:18px;">✦</span>
            <span class="star" style="left:86%;top:10%;font-size:24px;">✦</span>
            <span class="star" style="left:95%;top:4%;font-size:16px;">✦</span>
            <span class="star" style="left:5%;top:25%;font-size:20px;">✦</span>
            <span class="star" style="left:14%;top:32%;font-size:16px;">✦</span>
            <span class="star" style="left:24%;top:28%;font-size:26px;">✦</span>
            <span class="star" style="left:34%;top:36%;font-size:18px;">✦</span>
            <span class="star" style="left:44%;top:22%;font-size:22px;">✦</span>
            <span class="star" style="left:54%;top:30%;font-size:16px;">✦</span>
            <span class="star" style="left:63%;top:38%;font-size:24px;">✦</span>
            <span class="star" style="left:73%;top:26%;font-size:18px;">✦</span>
            <span class="star" style="left:82%;top:34%;font-size:20px;">✦</span>
            <span class="star" style="left:92%;top:28%;font-size:16px;">✦</span>
            <span class="star" style="left:8%;top:48%;font-size:24px;">✦</span>
            <span class="star" style="left:18%;top:54%;font-size:16px;">✦</span>
            <span class="star" style="left:29%;top:46%;font-size:20px;">✦</span>
            <span class="star" style="left:39%;top:52%;font-size:18px;">✦</span>
            <span class="star" style="left:50%;top:44%;font-size:26px;">✦</span>
            <span class="star" style="left:60%;top:56%;font-size:16px;">✦</span>
            <span class="star" style="left:70%;top:50%;font-size:22px;">✦</span>
            <span class="star" style="left:80%;top:42%;font-size:18px;">✦</span>
            <span class="star" style="left:91%;top:58%;font-size:24px;">✦</span>
            <span class="star" style="left:3%;top:68%;font-size:16px;">✦</span>
            <span class="star" style="left:13%;top:62%;font-size:20px;">✦</span>
            <span class="star" style="left:23%;top:74%;font-size:18px;">✦</span>
            <span class="star" style="left:33%;top:66%;font-size:26px;">✦</span>
            <span class="star" style="left:43%;top:78%;font-size:16px;">✦</span>
            <span class="star" style="left:53%;top:70%;font-size:22px;">✦</span>
            <span class="star" style="left:62%;top:64%;font-size:18px;">✦</span>
            <span class="star" style="left:72%;top:76%;font-size:24px;">✦</span>
            <span class="star" style="left:82%;top:68%;font-size:16px;">✦</span>
            <span class="star" style="left:93%;top:72%;font-size:20px;">✦</span>
            <span class="star" style="left:7%;top:86%;font-size:18px;">✦</span>
            <span class="star" style="left:17%;top:92%;font-size:26px;">✦</span>
            <span class="star" style="left:27%;top:84%;font-size:16px;">✦</span>
            <span class="star" style="left:37%;top:96%;font-size:22px;">✦</span>
            <span class="star" style="left:47%;top:88%;font-size:18px;">✦</span>
            <span class="star" style="left:58%;top:94%;font-size:24px;">✦</span>
            <span class="star" style="left:68%;top:82%;font-size:16px;">✦</span>
            <span class="star" style="left:78%;top:90%;font-size:20px;">✦</span>
            <span class="star" style="left:88%;top:86%;font-size:18px;">✦</span>
            <span class="star" style="left:97%;top:96%;font-size:26px;">✦</span>
        </div>
        <div class="fireplace-glow"></div>

        <div class="content">
            <div class="date">${date}</div>

            <div class="header">
                <img src="${wizardSrc}" alt="Wizard" class="wizard-image">
                <div class="logo">Word of the Day</div>
            </div>

            <div class="main-content">
                <div class="word">${wordData.word}</div>

                <div class="pronunciation">${wordData.pronunciation}</div>

                <div class="part-of-speech">${wordData.partOfSpeech}</div>

                <div class="definition">
                    ${wordData.definition}
                </div>

                <div class="divider"></div>

                <div class="example">
                    <div class="example-label">Example</div>
                    <div class="example-text">
                        "${wordData.example}"
                    </div>
                </div>
            </div>

            <div class="footer">
                <div class="cta">Learn a new word every day ✨</div>
            </div>
        </div>
    </div>
</body>
</html>`;

    return html;
}

// Save HTML file
function saveHTMLFile() {
    const html = generateHTML();
    const filename = 'daily-post.html';

    fs.writeFileSync(filename, html);
    console.log(`✅ Generated: ${filename}`);
    console.log(`📅 Date: ${getFormattedDate()}`);
    console.log(`📝 Word: ${getWordOfDay().word}`);

    return filename;
}

// Run the generator
if (require.main === module) {
    saveHTMLFile();
}

module.exports = { generateHTML, getWordOfDay, saveHTMLFile };
