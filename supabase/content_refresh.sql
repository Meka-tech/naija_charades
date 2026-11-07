-- Naija Charades content refresh (generated 2026-11-07)
-- Safe to run more than once: updates by id, deletes by exact (category_id, content), inserts with ON CONFLICT DO NOTHING.
BEGIN;

-- 1. Category metadata: fixed descriptions + new 3D icons (Microsoft Fluent Emoji, MIT, pinned commit via jsDelivr)
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Clapper%20board/3D/clapper_board_3d.png', description = 'From old-school Nollywood to today''s box-office hits, act out your favourite actors and actresses.', "isNew" = false WHERE id = '11623874-aa36-4933-9f06-4ade428b6d5d';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Lion/3D/lion_3d.png', description = 'How many animals can you name from A to Z? Describe or act out these animals and see who knows them best, without saying the name.', "isNew" = false WHERE id = '28ae343c-79b1-4a03-ba60-98a34726a6ac';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Star-struck/3D/star-struck_3d.png', description = 'Use the popular phrases or moves these celebrities are known for, and try not to say their names.', "isNew" = false WHERE id = '3cc824df-5335-410d-8228-c676f1fb0c85';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Speaking%20head/3D/speaking_head_3d.png', description = 'How good are you at accents and impressions? Let''s find out.', "isNew" = false WHERE id = '449f358d-1cda-4909-ac9c-32d0b607ffe8';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Musical%20notes/3D/musical_notes_3d.png', description = 'Sing or hum the song, but don''t say the song title.', "isNew" = false WHERE id = '44c8efa7-a588-4bde-b6a3-bebcebe99349';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Crossed%20swords/3D/crossed_swords_3d.png', description = 'Good vs. bad. Act out your favourite heroes and villains.', "isNew" = false WHERE id = '4648ddf5-80a1-462b-b34e-1de512961a06';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Shopping%20bags/3D/shopping_bags_3d.png', description = 'Do you know all the popular brands? Describe or act them out without saying the name.', "isNew" = false WHERE id = '789151d7-bbd4-480f-ade8-f4becb736db7';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Briefcase/3D/briefcase_3d.png', description = 'What do you want to be when you grow up? A baller? Act out these occupations and see how many you can get in a round.', "isNew" = false WHERE id = '8def4ec6-9130-4a43-ba9b-eb3e05d50d16';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Video%20game/3D/video_game_3d.png', description = 'From the games we played as children to the video games we still can''t put down, can your team guess them all?', "isNew" = false WHERE id = '9cf61b3f-29a7-4d5b-a72e-a31401647d4c';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Ninja/Default/3D/ninja_3d_default.png', description = 'So you think you''re a weeb? Prove it! Act out these anime and manga titles and characters without saying their names.', "isNew" = false WHERE id = 'a53eeb67-758c-4829-bb71-e2dd0e204dd0';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Soccer%20ball/3D/soccer_ball_3d.png', description = 'What fan club do you belong to? Describe these sports, teams and stars, and let''s see if you''re a true fan.', "isNew" = false WHERE id = 'adeb164b-9969-4328-a738-0ec3efa45922';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Popcorn/3D/popcorn_3d.png', description = 'Act out the plot or a popular scene without giving away the title of the movie or series.', "isNew" = false WHERE id = 'b297d326-060a-4c51-aa1e-7cc29f591d5b';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Rabbit%20face/3D/rabbit_face_3d.png', description = 'From Cartoon Network to Boomerang, can you act out your favourite cartoons without saying their names?', "isNew" = false WHERE id = 'b844286e-f965-405d-8a28-a41d54483ab0';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Performing%20arts/3D/performing_arts_3d.png', description = 'Act out the word using only body movements. No talking and no humming!', "isNew" = false WHERE id = 'd5b9831f-690b-4f21-a106-504108909ad3';
UPDATE categories SET icon = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Pot%20of%20food/3D/pot_of_food_3d.png', description = 'Hmm, yummy! Everyone loves food. Describe these meals without saying their names.', "isNew" = false WHERE id = 'e3f1e006-aefc-48ce-bbee-31666bc66c53';

-- 2. New categories
INSERT INTO categories (id, title, icon, favourite, color, description, "isNew", created_at, updated_at) VALUES ('6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Naija Slang', 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/Speech%20balloon/3D/speech_balloon_3d.png', false, '#1FA463', 'Wahala dey! Act out or explain these Naija slangs and sayings without saying the words.', true, now(), now())
  ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, icon = EXCLUDED.icon, color = EXCLUDED.color, description = EXCLUDED.description, "isNew" = true;
INSERT INTO categories (id, title, icon, favourite, color, description, "isNew", created_at, updated_at) VALUES ('6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Naija Places', 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@1ffb34c752ecf5d402f04cfb4b392c77f57c54bc/assets/World%20map/3D/world_map_3d.png', false, '#E07A2F', 'Take a trip around Naija! Describe these cities, landmarks and hotspots without saying their names.', true, now(), now())
  ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, icon = EXCLUDED.icon, color = EXCLUDED.color, description = EXCLUDED.description, "isNew" = true;

-- 3. Remove duplicate, misspelt, outdated or not-family-friendly cards
-- Movies/Series: 34 removed
DELETE FROM cards WHERE category_id = 'b297d326-060a-4c51-aa1e-7cc29f591d5b' AND content IN (
  'Spider-man Across the spider-verse',
  'Stanger Things',
  'Stranger things',
  'Squid game',
  'Blood sisters',
  'The originals',
  'Merry men',
  'Far from home',
  'Guardians of the galaxy',
  'Big Bang theory',
  'HIMYM',
  'Beauty and Beast',
  'Back to the futur',
  'Back to the future',
  'Avatar- The way of the water',
  'Avatar The Way of Water',
  'All of us Are Dead The Walking Dead',
  '365 Days',
  'Euphoria',
  'Saltburn',
  'Poor Things',
  'Sonic',
  'Shazam !',
  'Man of steel',
  'Rush hour',
  'Madam koi koi',
  'Teen wolf',
  'Spider-Man No way Home',
  'Shang Chi and the legend of the ten rings',
  'Legend of the seeker',
  'The mask',
  'Spider-man',
  'Black Panther Wakanda Forever',
  'Rattle Snake'
);
-- Food: 15 removed
DELETE FROM cards WHERE category_id = 'e3f1e006-aefc-48ce-bbee-31666bc66c53' AND content IN (
  'Garri & Groudnut',
  'Ofada rice',
  'Ofada',
  'lemons',
  'Amala and Ewedu',
  'Amala and ewedu',
  'Puff puff',
  'Boli and groundnut',
  'Boli (Roasted Plantain)',
  'Bread (Agege)',
  'Beans & Dodo',
  'Ogbono',
  'Egusi',
  'Egusi soup',
  'Jollof rice'
);
-- Music: 57 removed
DELETE FROM cards WHERE category_id = '44c8efa7-a588-4bde-b6a3-bebcebe99349' AND content IN (
  'Shallipopi',
  'Seyi Vibez',
  'Omah Lay',
  'Victony',
  'Burna Boy',
  'Tems',
  'Rema',
  'Kizz Daniel',
  'Ayra Starr',
  'Asake',
  'If- Davido',
  'Dorobucci- Mavins',
  'Mood- wizkid ft Buju',
  'Shoki - Lil Keshi',
  'Shoki - Lil kesh',
  'African Queen - 2face',
  'Call of duty - Zinoleesky',
  'Certified Loner - Mayokun',
  'Calm down - Rema',
  'One dance - Drake',
  'One Dance- Drake',
  'Fall- Davido',
  'Lonely at the top - Asake',
  'Ojueleba - Wizkid',
  'Bad to me - Wizkid',
  'Flavour - Ada Ada',
  'Caro- LAX & Wizkid',
  'Toosie Slide- Darke',
  'Without me - Hasley',
  'Bandana - Fireboy',
  'Finesse - Drake',
  'Amaka - 2face',
  'Godzilla- Eminem',
  'Venom- Eminem',
  'Gods Plan- Drake',
  'In my feelings- Drake',
  'Hotline Bling -Drake',
  'Look at me now- Chris Brown',
  'Loyal- Chris Brown',
  'Blow my mind- Davido ft Chris brown',
  'Loyalty- Ajebo Hustlers',
  'Damn- Omah Lay',
  'Aye- Davido',
  'Skelewu- Davido',
  'Case -Teni',
  'Ginger me -Rema',
  'Kweku the Traveller- Black Sheriff',
  'The real slim shady- Eminem',
  'Mad over you - Runtown',
  'Again - Wande coal',
  'No role modelz - J.Cole',
  'Xtra cool - Young john',
  'Normally - Young john',
  'Finesse - Bnxn',
  '23 - Burna boy',
  'Danger- P-square',
  'Baba nla - wizkid'
);
-- Brands: 10 removed
DELETE FROM cards WHERE category_id = '789151d7-bbd4-480f-ade8-f4becb736db7' AND content IN (
  'Coca-cola',
  'X Box',
  'Airel',
  '9Mobile',
  'GLO',
  'Play Station',
  'GT Bank',
  'UBA Leo',
  'Dolce & Gabanna',
  'Aliexpress'
);
-- Popular Personalities: 12 removed
DELETE FROM cards WHERE category_id = '3cc824df-5335-410d-8228-c676f1fb0c85' AND content IN (
  'Kanyo O Kanyo',
  'Barrack Obama',
  'Dwanye Johnson',
  'Tinubu',
  'Basket Mouth',
  'Ramsey Noah',
  'RMD',
  'Steve harvey',
  'Sabnius',
  '2baba',
  'Fireboy',
  'Taaoma'
);
-- Act it Out: 25 removed
DELETE FROM cards WHERE category_id = 'd5b9831f-690b-4f21-a106-504108909ad3' AND content IN (
  'Begging lecturer',
  'Doing yoga',
  'Cheating in exam',
  'Driving in Traffic',
  'Pounding yam',
  'Giving Injection',
  'Taking Injection',
  'Hacking a Computer',
  'Hacking',
  'winning an award',
  'hailing keke',
  'Killing Mosquito',
  'Playing Video games',
  'Washing plates',
  'Sweeping the floor',
  'Showering',
  'Having a bath',
  'Drumming',
  'Charging phone and texting',
  'Smoking',
  'Drunk',
  'Stalking Someone',
  'Conducting Surgey',
  'Proposing to a girl',
  'Chopping Breakfast (Heartbreak)'
);
-- Sports: 10 removed
DELETE FROM cards WHERE category_id = 'adeb164b-9969-4328-a738-0ec3efa45922' AND content IN (
  'Ac Millian',
  'Paris Saint German',
  'Inter millan',
  'Bourne Mouth',
  'Javalin',
  'First to School',
  'Sports',
  'Kick Boxing',
  'Pole vault',
  'Lawn Tennis'
);
-- Heroes & Villains: 10 removed
DELETE FROM cards WHERE category_id = '4648ddf5-80a1-462b-b34e-1de512961a06' AND content IN (
  'Omni -man',
  'The Hulk',
  'Green Golbin',
  'Posion Ivy',
  'Joker',
  'Cat Woman',
  'Death stroke',
  'Scarlett Witch',
  'Aqua Man',
  'The Witcher'
);
-- Accents & Impressions: 24 removed
DELETE FROM cards WHERE category_id = '449f358d-1cda-4909-ac9c-32d0b607ffe8' AND content IN (
  'Kanaya O Kanaya',
  'Winne the Pooh',
  'Sponge Bob',
  'Santa claus',
  'Klaus Michaelson',
  'Peter Griffen',
  'Lagos abgero',
  'Hausa shoemaker',
  'scottish',
  'Ghanaian accent',
  'British accent',
  'South African accent',
  'American accent',
  'Donald trump',
  'Ontisha main-market seller',
  'Goofy(Mickey Mouse)',
  'Dark Vader',
  'Kelvin Hart',
  'Barrack Obama',
  'anime character',
  'Nigerian pastor',
  'Pastor',
  'Nigerian politician',
  'Politician'
);
-- Animals: 4 removed
DELETE FROM cards WHERE category_id = '28ae343c-79b1-4a03-ba60-98a34726a6ac' AND content IN (
  'Chiimpanze',
  'Babbon',
  'Rhinocerous',
  'Raccon'
);
-- Games: 15 removed
DELETE FROM cards WHERE category_id = '9cf61b3f-29a7-4d5b-a72e-a31401647d4c' AND content IN (
  'Mr. Macaroni',
  'Mine Craft',
  'Fornite',
  'Pubg',
  'GTA',
  'GTA Online',
  'Clash Clans',
  'Red Dead redemption',
  'League of legends',
  'Elden rings',
  'Fortnite Creative',
  'Assassin’s Creed',
  'Jet pack Joy ride',
  'Angry Bird',
  'Apex Mobile'
);
-- Anime & Manga: 27 removed
DELETE FROM cards WHERE category_id = 'a53eeb67-758c-4829-bb71-e2dd0e204dd0' AND content IN (
  'One punch man',
  'Kabaneri of the iron fortress',
  'Attack on Titans',
  'Seven Deadly Sins',
  'Tokoyo ghoul',
  'My Hero ACADEMIA',
  'Jojo Bizzarre',
  'Black clover',
  'One piece',
  'Hunter X Hunter',
  'Fullmetal alchemist',
  'Gojo',
  'Avater: The Last Airbender',
  'Avatar The Last Airbender',
  'Legend of Korra',
  'Meliodias',
  'Ichigo Kurusaki',
  'Rorona Zoro',
  'Death Note: Desu nôto',
  'High School DXD',
  'Bastard',
  'Rainbow: Nishakubou no shichinin',
  'Sayonara zetsubô sensei',
  'Akage no An',
  'Taiyô no ko Esuteban',
  'Purinsesu Chuchu',
  'Monkey D Luffy'
);
-- Occupation: 14 removed
DELETE FROM cards WHERE category_id = '8def4ec6-9130-4a43-ba9b-eb3e05d50d16' AND content IN (
  'Ashewo',
  'Brick layer',
  'Software developer',
  'Content creator',
  'Tech bro',
  'House help',
  'Make up artist',
  'Brand Inflencer',
  'TrucK driver',
  'Conductor',
  'Coach',
  'Football coach',
  'Waste packer',
  'House boy'
);
-- Nollywood: 6 removed
DELETE FROM cards WHERE category_id = '11623874-aa36-4933-9f06-4ade428b6d5d' AND content IN (
  'Odunlade adekola',
  'Kanayo O Kanayo',
  'Joke Sliva',
  'Adesuwa Etomi',
  'Omotala Jalade',
  'Mama Gee'
);
-- Cartoons: 21 removed
DELETE FROM cards WHERE category_id = 'b844286e-f965-405d-8a28-a41d54483ab0' AND content IN (
  'Bod Burgers',
  'Love',
  'Death Robots',
  'Love Death and Robots',
  'Big Mouth',
  'Inside job',
  'Scooby Doo',
  'Powerpuff Girls',
  'Batman The Animated Series',
  'Adventure time',
  'Sponge Bob',
  'SpongeBob',
  'Voltron Legendary Defender',
  'Legend of Korra',
  'Avatar The Last Airbender',
  'Avatar Aang',
  'X-men',
  '3Below Tales of Arcadia',
  'Dexters Laboratory',
  'Dawn of the croods',
  'The Avengers: Earths Mightiest Heroes'
);

-- 4. Add new and corrected cards
-- Movies/Series: 34 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Back to the Future', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Avatar: The Way of Water', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'All of Us Are Dead', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'The Walking Dead', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Shazam!', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Man of Steel', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Rush Hour', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Madam Koi Koi', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Teen Wolf', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Spider-Man: No Way Home', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Shang-Chi', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Legend of the Seeker', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'The Mask', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Spider-Man', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Black Panther: Wakanda Forever', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Rattlesnake', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Behind the Scenes', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Everybody Loves Jenifa', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Oversabi Aunty', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Gingerrr', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Call of My Life', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'The Return of Arinzo', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Ajosepo', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'The Party', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Baby Farm', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'KPop Demon Hunters', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'A Minecraft Movie', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Lilo & Stitch', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Avatar: Fire and Ash', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'F1', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'Jurassic World Rebirth', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'War Machine', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'The Rip', now(), now()),
  (gen_random_uuid(), 'b297d326-060a-4c51-aa1e-7cc29f591d5b', 'His & Hers', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Food: 22 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Boli and Groundnut', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Nkwobi', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Isi Ewu', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Tuwo Shinkafa', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Miyan Kuka', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Kilishi', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Masa', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Edikang Ikong', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Gizdodo', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Plantain Chips', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Kunu', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Fura da Nono', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Asaro', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Ewa Agoyin', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Small Chops', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Meat Pie', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Gala', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Ofe Akwu', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Bitter Leaf Soup', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Tiger Nut Drink', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Nigerian Salad', now(), now()),
  (gen_random_uuid(), 'e3f1e006-aefc-48ce-bbee-31666bc66c53', 'Party Jollof', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Music: 42 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Shoki - Lil Kesh', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'One Dance - Drake', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Toosie Slide - Drake', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Without Me - Halsey', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Godzilla - Eminem', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Venom - Eminem', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'God''s Plan - Drake', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'In My Feelings - Drake', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Hotline Bling - Drake', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Look at Me Now - Chris Brown', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Loyal - Chris Brown', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Blow My Mind - Davido ft Chris Brown', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Loyalty - Ajebo Hustlers', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Damn - Omah Lay', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Aye - Davido', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Skelewu - Davido', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Case - Teni', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Ginger Me - Rema', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Kweku the Traveller - Black Sherif', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'The Real Slim Shady - Eminem', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Mad Over You - Runtown', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Again - Wande Coal', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'No Role Modelz - J. Cole', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Xtra Cool - Young Jonn', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Normally - Young Jonn', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Finesse - Pheelz ft Bnxn', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', '23 - Burna Boy', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Danger - P-Square', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Joy Is Coming - Fido', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'With You - Davido ft Omah Lay', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Kese - Wizkid', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Funds - Davido ft Odumodublvck & Chike', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Fun - Rema', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Body (Danz) - CKay ft Mavo', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Jogodo - Asake & Wizkid', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Gratitude - Asake', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Worship - Asake & DJ Snake', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Back Outside - Bnxn & Sarz', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Mofe - Mavo', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Raindance - Dave & Tems', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Paparazzi - Shoday ft Fola', now(), now()),
  (gen_random_uuid(), '44c8efa7-a588-4bde-b6a3-bebcebe99349', 'Energy - Tiwa Savage & Wande Coal', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Brands: 15 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Dolce & Gabbana', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'AliExpress', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Chowdeck', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Glovo', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Gino', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Starlink', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'ChatGPT', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Golden Penny', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Hollandia', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Maltina', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Bournvita', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Cowbell', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Close Up', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Pepsodent', now(), now()),
  (gen_random_uuid(), '789151d7-bbd4-480f-ade8-f4becb736db7', 'Gala Sausage Roll', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Popular Personalities: 11 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Kanayo O. Kanayo', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Barack Obama', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Steve Harvey', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Taaooma', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Mama Deola', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Shank Comics', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Brain Jotter', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Sir Balo', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Zicsaloma', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Imisi (BBNaija)', now(), now()),
  (gen_random_uuid(), '3cc824df-5335-410d-8228-c676f1fb0c85', 'Iyabo Ojo', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Act it Out: 18 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Conducting surgery', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'When NEPA takes the light', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Starting a generator', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Fanning a charcoal stove', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Doing a TikTok dance challenge', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Going live on Instagram', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Waiting for a bank alert', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Spraying money at an owambe', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Haggling with a tailor', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Boarding a BRT bus', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Crossing a flooded road', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Watching football at a viewing centre', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Sending a voice note', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Cooking jollof in a giant pot', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Unboxing a parcel', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Playing Ludo', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Sleeping in church', now(), now()),
  (gen_random_uuid(), 'd5b9831f-690b-4f21-a106-504108909ad3', 'Checking in at the airport', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Sports: 18 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'AC Milan', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Paris Saint-Germain', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Inter Milan', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Bournemouth', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Javelin', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Super Falcons', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'WAFCON', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Chiamaka Nnadozie', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Rasheedat Ajibade', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Ademola Lookman', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Lamine Yamal', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Ousmane Dembélé', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Jalen Brunson', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'New York Knicks', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Tobi Amusan', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Padel', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'Pickleball', now(), now()),
  (gen_random_uuid(), 'adeb164b-9969-4328-a738-0ec3efa45922', 'FIFA Club World Cup', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Heroes & Villains: 15 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Deathstroke', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Iyanu', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Killmonger', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Shuri', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Storm', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Bane', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'The Riddler', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'The Penguin', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Two-Face', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Moon Knight', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Ms. Marvel', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Starlight', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Peacemaker', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Spider-Gwen', now(), now()),
  (gen_random_uuid(), '4648ddf5-80a1-462b-b34e-1de512961a06', 'Red Skull', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Accents & Impressions: 19 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Winnie the Pooh', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Donald Trump', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Onitsha Market Trader', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Barack Obama', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Anime Character', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Nigerian Pastor', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Nigerian Politician', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Mama Deola', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Owambe MC', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Football Commentator', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Radio Presenter', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Nollywood Native Doctor', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Warri Accent', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Calabar Accent', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Customer Care Agent', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Davido', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Burna Boy', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'Wizkid', now(), now()),
  (gen_random_uuid(), '449f358d-1cda-4909-ac9c-32d0b607ffe8', 'IShowSpeed', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Animals: 18 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Raccoon', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Grasscutter', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Pangolin', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Bush Baby', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Cockroach', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Ant', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Owl', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Vulture', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Sloth', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Axolotl', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Capybara', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Manatee', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Seahorse', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Starfish', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Woodpecker', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Scorpion', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Grasshopper', now(), now()),
  (gen_random_uuid(), '28ae343c-79b1-4a03-ba60-98a34726a6ac', 'Millipede', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Games: 8 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '9cf61b3f-29a7-4d5b-a72e-a31401647d4c', 'Jetpack Joyride', now(), now()),
  (gen_random_uuid(), '9cf61b3f-29a7-4d5b-a72e-a31401647d4c', 'Angry Birds', now(), now()),
  (gen_random_uuid(), '9cf61b3f-29a7-4d5b-a72e-a31401647d4c', 'Tug of War', now(), now()),
  (gen_random_uuid(), '9cf61b3f-29a7-4d5b-a72e-a31401647d4c', 'Police and Thief', now(), now()),
  (gen_random_uuid(), '9cf61b3f-29a7-4d5b-a72e-a31401647d4c', 'Mummy and Daddy', now(), now()),
  (gen_random_uuid(), '9cf61b3f-29a7-4d5b-a72e-a31401647d4c', 'Rock Paper Scissors', now(), now()),
  (gen_random_uuid(), '9cf61b3f-29a7-4d5b-a72e-a31401647d4c', 'Statue', now(), now()),
  (gen_random_uuid(), '9cf61b3f-29a7-4d5b-a72e-a31401647d4c', 'Truth or Dare', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Anime & Manga: 23 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Meliodas', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Ichigo Kurosaki', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Roronoa Zoro', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Frieren', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Kaiju No. 8', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Sakamoto Days', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Demon Slayer: Infinity Castle', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Takopi''s Original Sin', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'The Apothecary Diaries', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Sung Jinwoo', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Reze', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Nezuko', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Denji', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Yuji Itadori', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Deku', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'All Might', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Light Yagami', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Ryuk', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Mikasa', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Killua', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Saitama', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Vegeta', now(), now()),
  (gen_random_uuid(), 'a53eeb67-758c-4829-bb71-e2dd0e204dd0', 'Frieza', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Occupation: 14 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Truck Driver', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Football Coach', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Waste Collector', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'POS Agent', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Vulcaniser', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Gateman', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Mai Shai (Tea Seller)', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Suya Seller', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Recharge Card Seller', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Danfo Driver', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Wedding MC', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'AI Engineer', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'Drone Pilot', now(), now()),
  (gen_random_uuid(), '8def4ec6-9130-4a43-ba9b-eb3e05d50d16', 'UX Designer', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Nollywood: 14 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Iyabo Ojo', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Jenifa', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Nkem Owoh', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Patience Ozokwor', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Stan Nze', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Chidi Mokeme', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Shaffy Bello', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Jide Kosoko', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Saidi Balogun', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Ruth Kadiri', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Eniola Ajao', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Chioma Akpotha', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Liz Benson', now(), now()),
  (gen_random_uuid(), '11623874-aa36-4933-9f06-4ade428b6d5d', 'Mo Bimpe', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Cartoons: 14 added
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Bob''s Burgers', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Dexter''s Laboratory', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Dawn of the Croods', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'The Avengers: Earth''s Mightiest Heroes', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Iyanu', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'KPop Demon Hunters', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Zootopia 2', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Ne Zha 2', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Bluey', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Peppa Pig', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Miraculous Ladybug', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'PAW Patrol', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Ed, Edd n Eddy', now(), now()),
  (gen_random_uuid(), 'b844286e-f965-405d-8a28-a41d54483ab0', 'Phineas and Ferb', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Naija Slang (new): 50 cards
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Japa', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Sapa', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Wahala', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'No Wahala', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Abeg', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Na Wa O', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'E Choke', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Soft Life', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Detty December', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Owambe', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Aso Ebi', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Shakara', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Ajebutter', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Ajepako', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Odogwu', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Omo!', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'God When?', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Sharp Sharp', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Chop Life', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Shine Your Eye', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Gbas Gbos', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Who Dey Breet?', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'I''m on my way', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Hold Body', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Take Am Easy', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Over Sabi', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Gbege', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Yawa Gas', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Jara', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Area Boy', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Agberos', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Breakfast', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Gist', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Ginger', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Vawulence', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Snatch Your Babe', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Bad Belle', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Long Throat', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'K-Leg', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Flex', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Wetin Dey Happen?', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Chai!', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Oya', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Na God O', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Body No Be Firewood', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Nepa Don Take Light', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Calm Down', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Dey Play', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'Pepper Dem', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a01', 'No Be Small Thing', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;
-- Naija Places (new): 50 cards
INSERT INTO cards (id, category_id, content, created_at, updated_at) VALUES
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Lagos', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Abuja', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Kano', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Port Harcourt', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Ibadan', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Enugu', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Calabar', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Benin City', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Jos', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Owerri', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Aba', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Onitsha', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Warri', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Kaduna', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Abeokuta', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Third Mainland Bridge', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Lekki Toll Gate', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Eko Atlantic', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Balogun Market', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Computer Village', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Aso Rock', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Zuma Rock', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Olumo Rock', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Yankari Game Reserve', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Obudu Mountain Resort', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Osun-Osogbo Sacred Grove', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'National Theatre', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Tafawa Balewa Square', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Badagry', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Idanre Hills', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Erin Ijesha Waterfall', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Ikogosi Warm Springs', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Agbokim Waterfalls', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Calabar Carnival', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Kano Durbar', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Lekki Conservation Centre', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Nike Art Gallery', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Kuramo Beach', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Elegushi Beach', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Murtala Muhammed Airport', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Ojuelegba', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Oshodi', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Ikeja City Mall', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Unilag', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Covenant University', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Dangote Refinery', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Ogbunike Caves', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Kajuru Castle', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Mambilla Plateau', now(), now()),
  (gen_random_uuid(), '6a0f3c52-8d1e-4b7a-9c35-2f1e7d4b9a02', 'Gurara Falls', now(), now())
ON CONFLICT (category_id, content) DO NOTHING;

COMMIT;
