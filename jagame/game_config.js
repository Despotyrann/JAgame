
const buecherPool = [
    "Emma",
    "Lady Susan",
    "Love and Freindship [sic]",
    "Mansfield Park",
    "Northanger Abbey",
    "Persuasion",
    "Pride and Prejudice",
    "Sense and Sensibility"
];

// Add as many quotes into the arrays as you want. The engine will pick one randomly!
const bewertungsPool = {
    10: { title: "Delightful", quotes: ["I am the happiest creature in the world. Perhaps other people have said so before, but not one with such justice.",
        "But when a young lady is to be a heroine, the perverseness of forty surrounding families cannot prevent her. Something must and will happen to throw a hero in her way.",
        "You have qualities which I had not before supposed to exist in such a degree in any human creature. You have some touches of the angel in you."] },
    9:  { title: "Excellent", quotes: ["Where people are really attached, poverty itself is wealth.",
        "Yes, vanity is a weakness indeed. But pride - where there is a real superiority of mind, pride will be always under good regulation.",
        "Where shall we see a better daughter, or a kinder sister, or a truer friend?",
        "We can all begin freely—a slight preference is natural enough; but there are very few of us who have heart enough to be really in love without encouragement.",
        "This is an evening of wonders, indeed!",
        "I do regard her as one who is too modest for the world in general to be aware of half her accomplishments, and too highly accomplished for modesty to be natural of any other woman."] },
    8:  { title: "Accomplished ", quotes: ["It is such a happiness when good people get together -- and they always do.",
        "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.",
        "It was a delightful visit;-perfect, in being much too short.",
        "I do not wish to avoid the walk. The distance is nothing when one has a motive.",
        "You deserve a longer letter than this; but it is my unhappy fate seldom to treat people so well as they deserve.",
        "A person may be proud without being vain. Pride relates more to our opinion of ourselves, vanity to what we would have others think of us."] },
    7:  { title: "Charming", quotes: ["My characters shall have, after a little trouble, all that they desire.",
        "That is what I like; that is what a young man ought to be. Whatever be his pursuits, his eagerness in them should know no moderation, and leave him no sense of fatigue.",
        "To sit in the shade on a fine day, and look upon verdure is the most perfect refreshment.",
        "Sense will always have attractions for me.",
        "And books! ...she would buy them all over and over again; she would buy up every copy, I believe, to prevent their falling into unworthy hands; and she would have every book that tells her how to admire an old twisted tree."] },
    6:  { title: "Respectable", quotes: ["A lucky guess is never merely luck. There is always some talent in it.",
        "Success supposes endeavour.",
        "My idea of good company, Mr Elliot, is the company of clever, well-informed people, who have a great deal of conversation; that is what I call good company.",
        "You must really begin to harden yourself to the idea of being worth looking at.",
        "Everything nourishes what is strong already.",
        "My fingers do not move over this instrument in the masterly manner which I see so many women's do. They have not the same force or rapidity, and do not produce the same expression. But then I have always supposed it to be my own fault -- because I would not take the trouble of practicing. It is not that I do not believe my fingers as capable as any other woman's of superior execution."] },
    5:  { title: "Proper", quotes: ["A fondness for reading, properly directed, must be an education in itself.",
        "Every moment has its pleasures and its hope.",
        "Sometimes one is guided by what they say of themselves, and very frequently by what other people say of them, without giving oneself time to deliberate and judge.",
        "If any one faculty of our nature may be called more wonderful than the rest, I do think it is memory. There seems something more speakingly incomprehensible in the powers, the failures, the inequalities of memory, than in any other of our intelligences.",
        "What is right to be done cannot be done too soon.",
        "A family of ten children will be always called a fine family, where there are heads and arms and legs enough for the number.",
        "If things are going untowardly one month, they are sure to mend the next."] },
    4:  { title: "Tolerable", quotes: ["Men were put into the world to teach women the law of compromise.",
        "The power of doing any thing with quickness is always much prized by the possessor, and often without any attention to the imperfection of the performance.",
        "A woman is not to marry a man merely because she is asked, or because he is attached to her, and can write a tolerable letter.",
        "Time will generally lessen the interest of every attachment not within the daily circle.",
        "Happiness in marriage is entirely a matter of chance.",
        "She is tolerable; but not handsome enough to tempt me; I am in no humour at present to give consequence to young ladies who are slighted by other men.",
        "Emma has been meaning to read more ever since she was twelve years old. I have seen a great many lists of her drawingup at various times of books that she meant to read regularly through—and very good lists they were—very well chosen, and very neatly arranged—sometimes alphabetically, and sometimes by some other rule."] },
    3:  { title: "Disappointing", quotes: ["That will do extremely well, child. You have delighted us long enough. Let the other young ladies have time to exhibit.", 
        "Let us have the luxury of silence.",
        "I think I may boast myself to be, with all possible vanity, the most unlearned and uninformed female who ever dared to be an authoress.",
        "Do not be in a hurry, the right man will come at last.",
        "I cannot comprehend the neglect of a family library in such days as these.", 
        "Wickedness is always wickedness, but folly is not always folly.",
        "We are so vain that we even care for the opinion of those we don't care for.",
        "A man always imagines a woman to be ready for anybody who asks her.",
        "You expect me to account for opinions which you choose to call mine, but which I have never acknowledged.",
        "You shall not, for the sake of one individual, change the meaning of principle and integrity, nor endeavour to persuade yourself or me, that selfishness is prudence, and insensibility of danger security for happiness.",
        "I think it ought not to be set down as certain, that a man must be acceptable to every woman he may happen to like himself."] },
    2:  { title: "Pitiable", quotes: ["From all that I can collect by your manner of talking, you must be two of the silliest girls in the country. I have suspected it some time, but I am now convinced.",
        "I dearly love a laugh... I hope I never ridicule what is wise or good. Follies and nonsense, whims and inconsistencies do divert me, I own, and I laugh at them whenever I can.",
        "The less said the better.",
        "Such squeamish youths as cannot bear to be connected with a little absurdity are not worth a regret.",
        "Facts or opinions which are to pass through the hands of so many, to be misconceived by folly in one, and ignorance in another, can hardly have much truth left.",
        "My ideas flow so rapidly that I have not time to express them──by which means my letters sometimes convey no ideas at all to my correspondents.",
        "Now I must give one smirk and then we may be rational again.",
        "It is very difficult for the prosperous to be humble."] },
    1:  { title: "Mortifying", quotes: ["Have a little compassion on my nerves. You tear them to pieces.",
        "The more I see of the world, the more am I dissatisfied with it; and everyday confirms my belief of the inconsistencies of all human characters, and of the little dependence that can be placed on the appearance of merit or sense.", 
        "...the more I know of the world, the more I am convinced that I shall never see a man whom I can really love.",
        "But to appear happy when I am so miserable — Oh! who can require it?",
        "Nobody can tell what I suffer! But it is always so. Those who do not complain are never pitied.",
        "And now I may dismiss my heroine to the sleepless couch, which is the true heroine's portion - to a pillow strewed with thorns and wet with tears. And lucky may she think herself, if she get another good night's rest in the course of the next three months.",
        "Facts are such horrid things!"] },
    0:  { title: "Offensive", quotes: ["We do not suffer by accident.", 
        "Vanity working on a weak head produces every sort of mischief.",
        "I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book!",
        "Surprises are foolish things. The pleasure is not enhanced, and the inconvenience is often considerable.",
        "I cannot forget the follies and vices of others so soon as I ought, nor their offences against myself...My good opinion once lost is lost forever.",
        "How clever you are, to know something of which you are ignorant.",
        "The wisest and the best of men, nay, the wisest and best of their actions, may be rendered ridiculous by a person whose first object in life is a joke."] }
};

const quizPaletten = [
    /* --- 1. LIGHT THEMES (Hell hinten -> Dunkel vorne) --- */
    {
        name: "Light Purple",
        bg_base: "#f5efe6",      // Ganz unten (Am hellsten)
        bg_layer1: "#d3b9ed",    // Layer 1 (foreground)
        bg_layer2: "#dfccf2",    // Layer 2
        bg_layer3: "#eadef7",    // Layer 3 (background)
        card_bg: "#fcfbfa",      
        text_main: "#4a148c",    
        text_sub: "#755694",     
        button_3_bg: "#ead8f4",
        button_2_bg: "#d2aee8",
        button_1_bg: "#bb86d9",
        quote_box_bg: "#faf4ff"  
    },
    {
        name: "Light Pink",
        bg_base: "#fcf8f2",      // Ganz unten (Am hellsten)
        bg_layer1: "#f5b2be",    // Layer 1 (foreground)
        bg_layer2: "#f9cbd3",    // Layer 2
        bg_layer3: "#fbe3e7",    // Layer 3 (background)
        card_bg: "#fffdfc",      
        text_main: "#881b2d",    
        text_sub: "#a25865",     
        button_3_bg: "#ffdce2",
        button_2_bg: "#f5aebb",
        button_1_bg: "#e98296",   
        quote_box_bg: "#fff5f6"
    },
    {
        name: "Light Green",
        bg_base: "#f2f5f3",      // Ganz unten (Am hellsten)
        bg_layer1: "#b5cbba",    // Layer 1 (foreground)
        bg_layer2: "#ccdcd0",    // Layer 2
        bg_layer3: "#e2ede6",    // Layer 3 (background)
        card_bg: "#fafdfb",      
        text_main: "#1e3d2f",    
        text_sub: "#49685a",     
        button_3_bg: "#dceee1",
        button_2_bg: "#bdd9c6",
        button_1_bg: "#9fc5ad",   
        quote_box_bg: "#f3f8f5"
    },
    {
        name: "Light Yellow",
        bg_base: "#fffdf0",
        bg_layer1: "#f3df91",
        bg_layer2: "#f8ebba",
        bg_layer3: "#fff8dc",
        card_bg: "#fffef5",
        text_main: "#5c4800",
        text_sub: "#806d24",
        button_3_bg: "#fff8dc",
        button_2_bg: "#f8e9a8",
        button_1_bg: "#eed477",
        quote_box_bg: "#fffbe8"
    },
    {
        name: "Light Orange",
        bg_base: "#fff3e5",
        bg_layer1: "#f5a866",
        bg_layer2: "#ffc994",
        bg_layer3: "#ffe1bf",
        card_bg: "#fffaf4",
        text_main: "#713b16",
        text_sub: "#98643b",
        button_3_bg: "#ffe5c7",
        button_2_bg: "#ffc48d",
        button_1_bg: "#ed9855",
        quote_box_bg: "#fff0dc"
    },
    {
        name: "Light Red",
        bg_base: "#fff0ef",
        bg_layer1: "#c94c56",
        bg_layer2: "#e8737b",
        bg_layer3: "#f6aaa7",
        card_bg: "#fff8f7",
        text_main: "#681b22",
        text_sub: "#985057",
        button_3_bg: "#ffc9c7",
        button_2_bg: "#df7078",
        button_1_bg: "#bd4650",
        quote_box_bg: "#ffebea"
    },

    /* --- 2. MEDIUM THEMES (Umgekehrt inklusive Base: Dunkel ganz unten -> Hell ganz vorne) --- */
    {
        name: "Medium Purple",
        bg_base: "#d3b9ed",      // Ganz unten (dunkelste Ebene, umgekehrt zur Light Palette)
        bg_layer1: "#f5efe6",    // Layer 1 (hellste Ebene)
        bg_layer2: "#eadef7",    // Layer 2
        bg_layer3: "#dfccf2",    // Layer 3
        card_bg: "#f3e8fa",      
        text_main: "#320b5e",    
        text_sub: "#5c3d82",     
        button_3_bg: "#ead8f5",
        button_2_bg: "#cfabe5",
        button_1_bg: "#b27bd2",
        quote_box_bg: "#f6eeff"  
    },
    {
        name: "Medium Pink",
        bg_base: "#f5b2be",      // Ganz unten (dunkelste Ebene, umgekehrt zur Light Palette)
        bg_layer1: "#fcf8f2",    // Layer 1 (hellste Ebene)
        bg_layer2: "#fbe3e7",    // Layer 2
        bg_layer3: "#f9cbd3",    // Layer 3
        card_bg: "#fff0f3",      
        text_main: "#6b1120",    
        text_sub: "#8e3d4c",     
        button_3_bg: "#ffdce3",
        button_2_bg: "#f3abbc",
        button_1_bg: "#df7f98",    
        quote_box_bg: "#fff2f4"
    },
    {
        name: "Medium Green",
        bg_base: "#b5cbba",      // Ganz unten (dunkelste Ebene, umgekehrt zur Light Palette)
        bg_layer1: "#f2f5f3",    // Layer 1 (hellste Ebene)
        bg_layer2: "#e2ede6",    // Layer 2
        bg_layer3: "#ccdcd0",    // Layer 3
        card_bg: "#e9f4ed",      
        text_main: "#12261d",    
        text_sub: "#344e41",     
        button_3_bg: "#d7eadf",
        button_2_bg: "#b8d4c1",
        button_1_bg: "#91bda0",    
        quote_box_bg: "#eef5f1"
    },
    {
        name: "Medium Yellow",
        bg_base: "#f3df91",
        bg_layer1: "#fffdf0",
        bg_layer2: "#fff8dc",
        bg_layer3: "#f8ebba",
        card_bg: "#fffbe7",
        text_main: "#4c3b00",
        text_sub: "#75621b",
        button_3_bg: "#fff5c6",
        button_2_bg: "#f8e6ac",
        button_1_bg: "#e9cd78",
        quote_box_bg: "#fff6cf"
    },
    {
        name: "Medium Orange",
        bg_base: "#f5a866",
        bg_layer1: "#fff3e5",
        bg_layer2: "#ffe1bf",
        bg_layer3: "#ffc994",
        card_bg: "#fff5eb",
        text_main: "#562d12",
        text_sub: "#8d5a32",
        button_3_bg: "#ffe6c8",
        button_2_bg: "#ffba7c",
        button_1_bg: "#ec9a58",
        quote_box_bg: "#fff1e0"
    },
    {
        name: "Medium Red",
        bg_base: "#c94c56",
        bg_layer1: "#fff0ef",
        bg_layer2: "#f6aaa7",
        bg_layer3: "#e8737b",
        card_bg: "#fff2f1",
        text_main: "#4d171d",
        text_sub: "#7a3a40",
        button_3_bg: "#ffd6d5",
        button_2_bg: "#e2797f",
        button_1_bg: "#c74f5a",
        quote_box_bg: "#fff0ef"
    },

    /* --- 3. DARK THEMES (Schnitt nochmals deutlich abgedunkelt gegen Blenden) --- */
    {
        name: "Dark Blue",
        bg_base: "#0a0f18",      
        bg_layer1: "#2d4868",
        bg_layer2: "#1a2b40",
        bg_layer3: "#0d1622",
        card_bg: "#182231",      
        text_main: "#f1f5f9",    
        text_sub: "#94a3b8",     
        button_3_bg: "#172130",
        button_2_bg: "#22334a",
        button_1_bg: "#2f4867",
        quote_box_bg: "#243246"  
    },
    {
        name: "Dark Purple",
        bg_base: "#0d0711",      
        bg_layer1: "#402252",
        bg_layer2: "#24112f",
        bg_layer3: "#12091a",
        card_bg: "#1d1024",      
        text_main: "#f3e8ff",    
        text_sub: "#c084fc",     
        button_3_bg: "#1a0e22",
        button_2_bg: "#2b1537",
        button_1_bg: "#412052",
        quote_box_bg: "#2a1733"
    },
    {
        name: "Dark Green",      
        bg_base: "#07100a",      
        bg_layer1: "#285039",
        bg_layer2: "#14281c",
        bg_layer3: "#09150e",
        card_bg: "#102016",      
        text_main: "#e2ede6",    
        text_sub: "#8ba897",     
        button_3_bg: "#0e1a13",
        button_2_bg: "#17281e",
        button_1_bg: "#21402e",
        quote_box_bg: "#1b3325"  
    }
];
