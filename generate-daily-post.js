// Daily Word of the Day Post Generator
// This script fetches a random word and generates an Instagram post

const fs = require('fs');
const https = require('https');

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
            background: #1a1a1a;
            font-family: 'Georgia', serif;
            padding: 20px;
        }

        .instagram-post {
            width: 1080px;
            height: 1350px;
            background: #0a0a0a;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .wood-texture {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image:
                repeating-linear-gradient(0deg,
                    rgba(255, 255, 255, 0.01) 0px,
                    transparent 1px,
                    transparent 2px,
                    rgba(255, 255, 255, 0.01) 3px),
                repeating-linear-gradient(90deg,
                    rgba(255, 255, 255, 0.01) 0px,
                    transparent 1px,
                    transparent 2px,
                    rgba(255, 255, 255, 0.01) 3px),
                radial-gradient(2px 2px at 20px 30px, white, transparent),
                radial-gradient(2px 2px at 60px 70px, white, transparent),
                radial-gradient(1px 1px at 50px 50px, white, transparent),
                radial-gradient(1px 1px at 130px 80px, white, transparent),
                radial-gradient(2px 2px at 90px 10px, white, transparent),
                radial-gradient(1px 1px at 10px 90px, white, transparent),
                radial-gradient(1px 1px at 150px 40px, white, transparent),
                radial-gradient(2px 2px at 180px 120px, white, transparent),
                radial-gradient(1px 1px at 200px 20px, white, transparent),
                radial-gradient(1px 1px at 220px 90px, white, transparent),
                radial-gradient(2px 2px at 30px 150px, white, transparent),
                radial-gradient(1px 1px at 100px 140px, white, transparent),
                radial-gradient(1px 1px at 170px 160px, white, transparent),
                radial-gradient(2px 2px at 240px 60px, white, transparent),
                radial-gradient(1px 1px at 260px 130px, white, transparent);
            background-size: 100% 100%, 100% 100%, 300px 200px;
            background-repeat: no-repeat, no-repeat, repeat;
            opacity: 0.35;
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
        <div class="wood-texture"></div>
        <div class="fireplace-glow"></div>

        <div class="content">
            <div class="date">${date}</div>

            <div class="header">
                <img src="https://raw.githubusercontent.com/hondoclips/word-of-the-day/main/wizard.png" alt="Wizard" class="wizard-image">
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
