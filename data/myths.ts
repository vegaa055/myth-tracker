import type { Myth, Variant } from "@/lib/types";

/**
 * Myth families and their regional variants.
 *
 * Coordinates mark the heartland of the culture that tells the variant, not
 * a precise "location of the story". Attestation dates are earliest *known*
 * fixations (written or reliably dated oral tradition) — oral roots are in
 * every case older.
 */

export const myths: Myth[] = [
  {
    id: "seven-sisters",
    name: "The Seven Sisters",
    aka: ["Pleiades myths", "The Lost Pleiad", "Kungkarangkalpa / Dreaming Sisters"],
    description:
      "Around the world the Pleiades star cluster is a group of girls — usually seven, though only six stars are easily visible — pursued by a male figure identified with Orion, and a story explains why the seventh star is missing. The global spread of the 'seven though six are visible' paradox is the puzzle: it may preserve a memory of the star Pleione when it was visibly separate from Atlas, 70,000–100,000 years ago.",
    origin: {
      known: false,
      note: "Contested. The 'lost Pleiad' motif (seven stars counted, six visible) is so widespread — Europe, Africa, Asia, Australia, the Americas — that some researchers date it before the out-of-Africa dispersals (~70–100 kya), when Pleione was likely distinguishable from Atlas. The hunter-chases-sisters narrative, however, may be repeated coincidence: the stars are salient everywhere, Orion visually 'follows' the Pleiades across the sky, and hunter-pursues-women is one of the most common motifs on Earth. Verdict: the seven-to-six star-count motif is plausibly ancient; the full story's single origin is unproven.",
      estimatedAge: "Star-count motif possibly 70,000–100,000 years; narratives as told are much younger",
    },
    referenceVariantId: "ss-greek",
  },
  {
    id: "cosmic-hunt",
    name: "The Cosmic Hunt",
    aka: ["The Sky Bear", "The Celestial Elk"],
    description:
      "A great animal — bear or elk — is pursued by hunters and escapes into the sky, where the chase is frozen as the stars of the Big Dipper. Phylogenetic work (Julien d'Huy, following Berezkin's data) traces a coherent family of these stories across northern Eurasia and into the Americas along the Beringian route, making it one of the best-evidenced ancient myths in the world.",
    origin: {
      known: true,
      lat: 55,
      lng: 90,
      region: "Northern Eurasia (Siberian taiga corridor)",
      note: "Reconstructed by areal statistics and phylogenetics: the motif is continuous across northern Eurasia and the Americas but absent from Africa, Australia, and most of Oceania — the fingerprint of a story carried through Beringia before the land bridge flooded (~15,000+ years ago). Proto-form likely featured a single ungulate driven into the sky.",
      estimatedAge: "≥ 15,000–20,000 years (pre-Beringian crossing)",
    },
    referenceVariantId: "ch-evenki",
  },
  {
    id: "great-flood",
    name: "The Great Flood",
    aka: ["Deluge myths", "Noah / Utnapishtim / Manu"],
    description:
      "A flood destroys the world; one household, forewarned, survives. Flood stories exist nearly everywhere — which is precisely why most of them are NOT evidence of a shared origin. The tight Near Eastern cluster (Mesopotamian → Hebrew → Greek) shares rare, arbitrary details like releasing birds as scouts and shows true descent; the Chinese and many other 'flood myths' are different stories that merely share the observation that rivers flood.",
    origin: {
      known: true,
      lat: 31.0,
      lng: 46.1,
      region: "Lower Mesopotamia",
      note: "For the ark-type deluge narrative specifically: earliest fixation in Sumerian (Eridu Genesis, c. 1600 BCE copies of older material) and Akkadian (Atra-hasis, c. 1800 BCE). The Genesis and Deucalion accounts demonstrably descend from or are shaped by this Mesopotamian tradition. Flood *stories in general* have no single origin — riverine catastrophe is a universal human experience.",
      estimatedAge: "Ark-type narrative ≥ 4,000 years; flood motifs generally are unbounded",
    },
    referenceVariantId: "gf-mesopotamian",
  },
  {
    id: "storm-serpent",
    name: "The Storm God and the Serpent",
    aka: ["Chaoskampf", "Dragon-slaying myth"],
    description:
      "A storm or sky god battles a monstrous serpent that embodies chaos, drought, or the hoarded waters. Comparative Indo-European work (Watkins' 'How to Kill a Dragon') reconstructs even the formula — *the hero slew the serpent* — shared from India to Iceland, with Near Eastern versions interwoven by contact.",
    origin: {
      known: true,
      lat: 48,
      lng: 45,
      region: "Pontic–Caspian steppe (Proto-Indo-European homeland)",
      note: "The Indo-European branch (Indra–Vritra, Zeus–Typhon, Thor–Jörmungandr, Perun–Veles) descends from a reconstructable Proto-Indo-European myth, c. 4000–3000 BCE, spread by steppe migrations. Mesopotamian (Marduk–Tiamat) and Anatolian (Illuyanka) versions are related by areal contact rather than direct descent; the Japanese Orochi story is the hard test case — connection or convergence is genuinely debated.",
      estimatedAge: "≥ 5,000–6,000 years for the Indo-European core",
    },
    referenceVariantId: "sg-vedic",
  },
  {
    id: "orpheus-type",
    name: "The Failed Retrieval from the Dead",
    aka: ["Orpheus myths", "Don't look back"],
    description:
      "A bereaved hero follows a dead loved one into the world of the dead and is allowed to lead them home — on a condition, almost always 'do not look back'. The condition is broken; the dead are lost; often the story explains why death is now permanent. Its densest, most structured presence is in Greece, Japan, and dozens of independent-seeming North American traditions.",
    origin: {
      known: false,
      note: "Unknown. The full syntagm (descent → conditional release → broken taboo → permanent loss) recurs in Greece, Japan, Polynesia, and across North America. Some researchers propose a Eurasian origin carried into the Americas; others argue the psychology of grief plus the universal 'conditions attached to gifts of the gods' logic makes independent invention plausible. The North American versions were recorded post-contact, which complicates transmission arguments in both directions.",
      estimatedAge: "Unknown; if monogenetic, plausibly Upper Palaeolithic",
    },
    referenceVariantId: "or-greek",
  },
  {
    id: "fire-theft",
    name: "The Theft of Fire",
    aka: ["Prometheus type", "Fire-bringer myths"],
    description:
      "Fire belongs to someone else — a god, an old woman, the animals at the world's end — and a hero or trickster steals it for humanity, often paying a price. Fire theft is told on every inhabited continent; the interesting signal is not the theft itself (near-universal) but rare shared details like fire hidden in wood, animal relays scorched by carrying it, and keepers who store fire in their own bodies.",
    origin: {
      known: false,
      note: "Unknown, and possibly polygenetic. Controlled fire predates Homo sapiens; every culture needed an account of where it came from, and 'we took it from someone unwilling' is a natural narrative solution. Regional families are real (a Pacific Northwest Raven cycle; a Polynesian Māui cycle) but a single world origin is not demonstrable. This family is included partly as a scoring control: high superficial similarity, low deep similarity outside genuine regional clusters.",
      estimatedAge: "Unknown; regional cycles are demonstrably old, global unity unproven",
    },
    referenceVariantId: "ft-greek",
  },
];

export const variants: Variant[] = [
  // ===========================================================================
  // SEVEN SISTERS
  // ===========================================================================
  {
    id: "ss-greek",
    mythId: "seven-sisters",
    title: "The Pleiades and Orion",
    cultureId: "ancient-greek",
    region: "Greece (Boeotia)",
    lat: 38.35,
    lng: 23.25,
    attestation: "c. 700 BCE (Hesiod, Works and Days); oral roots older",
    summary:
      "Orion pursues the seven daughters of Atlas and Pleione for seven years until Zeus turns them into doves, then stars. The seventh, Merope, dims from shame at loving a mortal.",
    fullText:
      "As Pleione walked the Boeotian countryside with her seven daughters — Maia, Electra, Taygete, Alcyone, Celaeno, Sterope and Merope — the giant hunter Orion, son of Poseidon, saw them and burned with desire. He pursued them for seven years, for their father Atlas could not defend them: he stood at the world's western rim holding up the sky, his hands quite literally full. In their desperation the sisters called on Zeus, who transformed them first into doves, and then, to make their safety eternal, into stars set in the shoulder of the Bull. But the rescue was double-edged: when Orion died, he too was raised into the sky — placed just behind them, so that the hunt continues every night, the Hunter rising forever in pursuit of the Sisters as they flee below the western horizon.\n\nOnly six of the sisters shine plainly. The Greeks said the seventh, Merope, alone of the sisters married a mortal man — Sisyphus of Corinth — and faded from the sky out of shame.",
    variations: [
      "Some tellings make Electra the faded star, dimming in grief at the fall of Troy, founded by her son Dardanus.",
      "Aratus (3rd c. BCE) already notes the paradox: 'seven are they in the songs of men, though six alone are visible to the eyes.'",
      "In some accounts Orion pursues Pleione herself rather than the daughters.",
    ],
    motifs: [
      { motifId: "pleiades-as-women", role: "core" },
      { motifId: "pleiades-counted-seven", role: "core" },
      { motifId: "lost-pleiad", role: "core" },
      { motifId: "orion-as-hunter", role: "core" },
      { motifId: "celestial-pursuit", role: "supporting" },
      { motifId: "women-become-stars", role: "core" },
      { motifId: "hunter-pursues-women", role: "supporting" },
    ],
  },
  {
    id: "ss-aboriginal",
    mythId: "seven-sisters",
    title: "The Makara / Kungkarangkalpa — Seven Sisters Dreaming",
    cultureId: "aboriginal-australian",
    region: "Central & Western Desert, Australia",
    lat: -25.35,
    lng: 131.03,
    attestation: "Oral tradition; culture continuous ~50,000 years, documented from 19th c.",
    summary:
      "Seven sisters with bodies of ice are pursued across the land and into the sky by an unwelcome male pursuer; their rising brings frost and opens initiation season. One or two sisters are lost along the way, so fewer shine.",
    fullText:
      "In the Dreaming, the seven sisters — called Makara by the Adnyamathanha, Mayi-mayi by peoples of the Darling, Kungkarangkalpa in the Western Desert songline — travelled the land, radiant, with long hair and bodies of glittering ice. They were followed everywhere: in the southeast by the Berai-berai, young men who left gifts of honey; in the Western Desert by Wati Nyiru, a persistent and unwelcome pursuer whose desire drove the sisters from waterhole to waterhole across the country, their flight literally mapped onto the landscape as a songline crossing thousands of kilometres. To escape at last, the sisters rose into the sky and became the cluster of cold bright stars we see today; their pursuer rose after them and follows still — the stars of Orion, forever behind, never catching.\n\nOne sister was taken — in the Darling River telling, the fire-ancestor Wurrunnah seized two, whose ice melted and quenched his fire — and this is why fewer sisters shine brightly now. When the sisters rise in the winter dawn they shake ice from their bodies, and frost covers the ground: the sign that initiation ceremonies may begin. Children scrape the frost and rub it on their bodies so the boys become strong hunters and the girls grow beautiful; but a child touched by sunlight while frosted will be weak forever.",
    variations: [
      "The Kulin peoples of Victoria tell of the Karatgurk sisters, whose firesticks the crow stole — linking the cluster to fire rather than ice.",
      "In the Western Desert songline the pursuer Wati Nyiru is himself the stars of Orion, and specific waterholes, caves and rock formations across three deserts are episodes of the chase.",
      "Some tellings have one sister hiding from shame, or too young, or abducted — accounting for a sixth or fifth visible star.",
    ],
    motifs: [
      { motifId: "pleiades-as-women", role: "core" },
      { motifId: "pleiades-counted-seven", role: "core" },
      { motifId: "lost-pleiad", role: "core" },
      { motifId: "orion-as-hunter", role: "core" },
      { motifId: "celestial-pursuit", role: "core" },
      { motifId: "women-become-stars", role: "core" },
      { motifId: "hunter-pursues-women", role: "supporting" },
      { motifId: "sisters-and-water", role: "core" },
      { motifId: "stars-govern-ritual", role: "core" },
    ],
  },
  {
    id: "ss-onondaga",
    mythId: "seven-sisters",
    title: "Oot-kwa-tah — The Dancing Children",
    cultureId: "onondaga",
    region: "Onondaga country, New York",
    lat: 43.05,
    lng: -76.15,
    attestation: "Oral tradition; recorded 19th c.",
    summary:
      "Seven children who dance away from their camp grow light and rise into the sky despite their parents' calls; one looks back and falls as a meteor, leaving six bright dancers.",
    fullText:
      "A band settled by a lake for the autumn, and while the elders worked, seven children met each day in a quiet clearing to dance. An old man in shining white appeared among them and warned them to stop, but the dancing had grown sweet to them and they would not. One day, dancing hungry — their parents had refused them food to bring them home — the children began to rise slowly into the air, growing lighter with every turn of the dance. Their parents ran with food and called after them, but only one child looked down; he fell, streaking to earth as a falling star. The others rose on, and rose still, and became Oot-kwa-tah, the cluster of dancing stars that returns each autumn — six bright, and the seventh dim or fallen, singing as they went until they sang themselves out of hearing.",
    variations: [
      "In a related Onondaga telling the children rose because they sang as they climbed and forgot to stop singing, losing their strength to return.",
      "Neighbouring Seneca and Cherokee tellings share the dancing-children frame with different counts of who fell and who remained.",
    ],
    motifs: [
      { motifId: "pleiades-counted-seven", role: "core" },
      { motifId: "lost-pleiad", role: "core" },
      { motifId: "women-become-stars", role: "supporting" },
      { motifId: "stars-govern-ritual", role: "peripheral" },
    ],
  },
  {
    id: "ss-hindu",
    mythId: "seven-sisters",
    title: "The Krittikas, Mothers of the War God",
    cultureId: "vedic-indian",
    region: "Ganges plain, India",
    lat: 25.32,
    lng: 83.0,
    attestation: "c. 1200–1000 BCE (Vedic texts name the Krittikas first among lunar mansions)",
    summary:
      "Six of the seven wives of the Seven Sages are accused over the fire god's desire and leave the sky to become the Krittikas (Pleiades), nursing the infant war god; the seventh, faithful Arundhati, remains beside her husband.",
    fullText:
      "The Seven Sages of the northern sky — the stars of the Big Dipper — had seven wives. Agni, god of fire, emerged from the sacrificial flame and desired them; in the oldest tellings the goddess Svaha took the form of six of the wives one by one to lie with him, but she could not counterfeit Arundhati, whose devotion to her husband was perfect. When the deception was discovered, the six wives were nonetheless suspected and put aside by the sages. They departed the northern sky and became the Krittikas, the sharp-bladed stars of the Pleiades; only Arundhati remained with the Sages, and she is the small star Alcor, beside Mizar, shown to brides on their wedding night as the emblem of fidelity. The seed of fire that Svaha had gathered became the six-faced war god Skanda (Karttikeya), whom the six Krittikas suckled — one mouth for each mother — so that the cluster is forever both the accused wives and the nursing mothers of war.",
    variations: [
      "In the Mahabharata telling, Skanda is born of Agni and Svaha directly and the Krittikas become his foster-mothers afterwards.",
      "The seventh-star arithmetic is inverted relative to Greece: seven wives, six who fell to the cluster, one who stayed — but the '7 minus 1' structure and its star-count explanation are identical in shape.",
    ],
    motifs: [
      { motifId: "pleiades-as-women", role: "core" },
      { motifId: "pleiades-counted-seven", role: "core" },
      { motifId: "lost-pleiad", role: "core" },
      { motifId: "alcor-companion", role: "supporting" },
      { motifId: "women-become-stars", role: "supporting" },
      { motifId: "stars-govern-ritual", role: "supporting" },
    ],
  },
  {
    id: "ss-kiowa",
    mythId: "seven-sisters",
    title: "The Star Girls of Devils Tower",
    cultureId: "kiowa",
    region: "Black Hills country, Wyoming",
    lat: 44.59,
    lng: -104.72,
    attestation: "Oral tradition; recorded 19th–20th c.",
    summary:
      "Seven girls fleeing a great bear leap onto a low rock that grows into Devils Tower; the bear scores the tower's sides with its claws, and the girls rise into the sky as the Pleiades.",
    fullText:
      "Seven sisters were playing away from camp when their brother was transformed into a bear, and the bear turned on them. The girls fled to the stump of a great tree, which spoke to them: 'Climb upon me.' As they climbed, the stump began to rise into the air, and the bear came leaping against it, scoring the bark on every side with claws as long as knives — the furrows that ring Devils Tower to this day. The rock bore the seven girls up beyond the bear's reach, and up still, until they were pushed into the sky, where they remain: the seven stars of the cluster that rises over the tower in winter. The bear circles the base of the tower still, in the shape of the scarred stone.",
    variations: [
      "Lakota and Cheyenne tellings of Mato Tipila (Bear Lodge) share the growing-rock rescue with different numbers of children and different fates for the bear.",
      "In some Kiowa tellings the girls become the Big Dipper rather than the Pleiades — the two star groups swap roles across Plains traditions.",
    ],
    motifs: [
      { motifId: "pleiades-as-women", role: "core" },
      { motifId: "women-become-stars", role: "core" },
      { motifId: "ascent-on-tree-or-rock", role: "core" },
      { motifId: "hunter-pursues-women", role: "supporting" },
      { motifId: "bear-quarry", role: "peripheral" },
    ],
  },
  {
    id: "ss-cherokee",
    mythId: "seven-sisters",
    title: "Ani'tsutsa — The Seven Boys",
    cultureId: "cherokee",
    region: "Southern Appalachians",
    lat: 35.48,
    lng: -83.32,
    attestation: "Oral tradition; recorded by Mooney, 1900",
    summary:
      "Seven boys who danced instead of working rose into the sky; six became the Pleiades, while the seventh was pulled back to earth and became the first pine tree.",
    fullText:
      "Seven boys spent their days rolling the gatayusti wheel and dancing instead of tending the corn. Their mothers, exasperated, boiled the boys' game-stones in the pot instead of dinner. The boys danced their anger in a circle, praying the spirits to take them where they would not trouble their mothers again — and as they danced their feet left the ground. The mothers ran; one seized her son by the heel and dragged him down, but he struck the earth so hard the ground swallowed him. The other six rose until they reached the sky, where they dance still: Ani'tsutsa, the Six-who-were-Seven. The mother of the buried boy wept over the spot each morning until a green shoot rose from her tears and grew into the pine — the seventh brother, still reaching for the sky, evergreen because he is still trying to follow.",
    variations: [
      "Some tellings connect the fallen seventh boy's pine to the origin of all pines, whose resinous wood burns bright 'because it holds star-nature.'",
    ],
    motifs: [
      { motifId: "pleiades-counted-seven", role: "core" },
      { motifId: "lost-pleiad", role: "core" },
      { motifId: "women-become-stars", role: "supporting" },
      { motifId: "ascent-on-tree-or-rock", role: "peripheral" },
    ],
  },
  {
    id: "ss-japanese",
    mythId: "seven-sisters",
    title: "Subaru — The Gathered Stars",
    cultureId: "japanese",
    region: "Japan",
    lat: 35.01,
    lng: 135.77,
    attestation: "Named in Japanese texts from the 8th c. CE (Kojiki era word-lists)",
    summary:
      "In Japan the cluster is Subaru, 'united' or 'gathered together' — a name and an aesthetic, not a chase story. Included as a control: shallow overlap with the sisters-pursued family despite the same stars.",
    fullText:
      "The Japanese name for the Pleiades, Subaru, means 'gathered into one' — a knot of stars strung like beads, admired for a thousand years in poetry as a jewelled cluster of the winter sky. Sei Shōnagon's Pillow Book (c. 1000 CE) lists Subaru first among the stars worth seeing. But there is no canonical chase, no hunter, no lost sister: the classical Japanese material treats the cluster as an image of unity and elegance rather than the frozen scene of a pursuit. Later folk tradition in some regions counts the stars as six or seven sibling stars, and scattered local tales attach various children or jewels to them, but nothing resembling the pursued-women narrative is native to the tradition.\n\nThis variant matters to the tracker precisely because it is a near-null result: a literate star-loving culture, perfectly aware of the same six-or-seven star knot, that never generated the sisters-fleeing-a-hunter story. Salient stars do not automatically produce the myth — which sharpens the question wherever the full story does appear.",
    variations: [
      "Regional folk names include Mutsuraboshi, 'six stars' — Japan counted six where Greece insisted on seven.",
      "Some Edo-period almanacs associate Subaru's rising with agricultural timing, a practical parallel to ritual-calendar uses elsewhere.",
    ],
    motifs: [
      { motifId: "pleiades-counted-seven", role: "peripheral" },
      { motifId: "stars-govern-ritual", role: "peripheral" },
    ],
  },

  // ===========================================================================
  // COSMIC HUNT
  // ===========================================================================
  {
    id: "ch-evenki",
    mythId: "cosmic-hunt",
    title: "Mangi and the Cosmic Elk",
    cultureId: "evenki",
    region: "Siberian taiga",
    lat: 60.0,
    lng: 105.0,
    attestation: "Oral tradition; recorded from 17th–19th c.; considered near-ancestral form",
    summary:
      "The cosmic elk Kheglen steals the sun on her antlers; the hunter Mangi pursues her across the sky forever. The Big Dipper is the elk, the hunt renews daily and yearly.",
    fullText:
      "At the world's beginning the great cosmic elk Kheglen came down from the upper world at dusk, caught the sun on her antlers, and carried it away into the sky-taiga, plunging the earth into darkness. The hero-hunter Mangi — half man, half bear in the oldest tellings — took up his bow and pursued her on skis across the snowfields of the night sky. He gains on her through the night; toward dawn he strikes, and the sun is torn free to rise again. But the elk is reborn, the theft renews, and the chase never truly ends: the four stars of the Dipper's bowl are Kheglen, the three stars of the handle are Mangi's ski-track (or Mangi and his companions), and the yearly turning of the Dipper around the pole is the great circuit of the hunt. The Milky Way is the trail of Mangi's skis.",
    variations: [
      "In some Evenki and neighbouring Tungusic tellings the elk has a calf, which escapes to renew the theft each year — the seasonal reset made explicit.",
      "Related Siberian traditions (Ket, Khanty) make the Dipper the elk itself and give the hunter three helpers, one dragging a cooking pot — the pot is the small star Alcor.",
    ],
    motifs: [
      { motifId: "cosmic-hunt", role: "core" },
      { motifId: "dipper-as-animal", role: "core" },
      { motifId: "ungulate-quarry", role: "supporting" },
      { motifId: "eternal-seasonal-hunt", role: "core" },
      { motifId: "alcor-companion", role: "supporting" },
    ],
  },
  {
    id: "ch-sami",
    mythId: "cosmic-hunt",
    title: "Sarvvis, the Sky Elk",
    cultureId: "sami",
    region: "Sápmi (northern Fennoscandia)",
    lat: 68.35,
    lng: 23.37,
    attestation: "Oral tradition; recorded from 17th c. (missionary accounts)",
    summary:
      "The whole northern sky is a single elk-hunt: Sarvvis the elk flees while hunters pursue; the Dipper is the hunter's bow. Should the arrow ever strike, the sky will fall.",
    fullText:
      "The Sámi sky is one vast frozen hunt. The elk Sarvvis (the constellation around Cassiopeia and Perseus) flees eternally from the hunters: Favdna, who aims with his bow — the bow is the Big Dipper itself — and his companions, the skiers Gallabartnit, sons of the old Ski-runner. Favdna sights along his arrow every night, and every night he holds his shot: for behind the elk stands Boahjenaste, the North Star, the pillar-nail that holds up the sky, and if his arrow flies wide and strikes the star, the heavens will tear loose from their nail and fall, and the world will end in fire. So the hunt hangs forever at the instant before the kill — the tension of the drawn bow is the tension that keeps the sky standing.",
    variations: [
      "Some tellings name the pursuers as three separate hunter-figures scattered through Orion and Gemini, each with skis and dogs.",
      "The apocalyptic clause — the shot that must never land — is a distinctly Sámi elaboration not found in the Siberian core.",
    ],
    motifs: [
      { motifId: "cosmic-hunt", role: "core" },
      { motifId: "dipper-as-animal", role: "supporting" },
      { motifId: "ungulate-quarry", role: "supporting" },
      { motifId: "eternal-seasonal-hunt", role: "core" },
    ],
  },
  {
    id: "ch-iroquois",
    mythId: "cosmic-hunt",
    title: "The Celestial Bear Hunt",
    cultureId: "onondaga",
    region: "Northeastern Woodlands",
    lat: 43.0,
    lng: -75.5,
    attestation: "Oral tradition; recorded 19th c.; pre-contact by content and distribution",
    summary:
      "Three hunters (and a small dog, or a pot-carrier) pursue the sky bear through the year; each autumn they wound her and her blood reddens the maples, then she rises whole again in spring.",
    fullText:
      "The four stars of the Dipper's bowl are the great bear; the three stars of the handle are the hunters who chase her — the robin, the chickadee, and the moosebird in the Mi'kmaq telling; three brothers in the Haudenosaunee telling, the second carrying a pot to cook her in, and beside him, if your eyes are sharp, you can see the pot itself: the little star Alcor. All spring and summer the hunters chase the bear around the northern sky. In autumn they finally overtake and wound her: her blood falls to the earth and reddens the leaves of the maples, and her fat, rendered in the pot, is the first snow. The bear's skeleton lies on its back through the winter — the Dipper low on the horizon — while her spirit enters a den beneath the stars, and in spring she emerges reborn, and the hunt begins again, world without end.",
    variations: [
      "The Mi'kmaq telling adds seven bird-hunters, of whom four lose the trail as the year turns — explaining stars that dip below the horizon.",
      "Some Haudenosaunee tellings replace the pot-carrier with a dog: Alcor is then the dog's eye glinting beside the middle hunter.",
    ],
    motifs: [
      { motifId: "cosmic-hunt", role: "core" },
      { motifId: "dipper-as-animal", role: "core" },
      { motifId: "bear-quarry", role: "supporting" },
      { motifId: "eternal-seasonal-hunt", role: "core" },
      { motifId: "alcor-companion", role: "core" },
      { motifId: "blood-autumn-leaves", role: "core" },
    ],
  },
  {
    id: "ch-chukchi",
    mythId: "cosmic-hunt",
    title: "The Reindeer of the Bering Sky",
    cultureId: "chukchi",
    region: "Chukotka",
    lat: 66.0,
    lng: -173.0,
    attestation: "Oral tradition; recorded from 18th c.",
    summary:
      "A wild reindeer flees across the night sky from a hunter on a sledge; stars mark the chase. The Beringian stepping-stone between the Siberian elk and the American bear.",
    fullText:
      "In the traditions of Chukotka and the Bering Strait, a great wild reindeer runs the circuit of the northern sky, pursued by a hunter — sometimes on skis, sometimes driving a dog-sledge whose team strings out behind him as a line of stars. The chase turns with the seasons: when the reindeer runs high, the herds on earth are restless; when the hunter closes in autumn, the slaughtering season begins below. Neighbouring Koryak and Yupik traditions on both sides of the strait tell the same pattern with local game — reindeer giving way to caribou on the American side — and it is precisely this chain of small, continuous local substitutions, unbroken from the taiga to the tundra to Alaska, that convinced researchers the hunt walked across Beringia with the hunters themselves.",
    variations: [
      "Some Chukchi star-lore casts Orion as the hunter with a crooked back, shooting an arrow (Orion's belt and sword) at a fleeing group.",
      "Yupik tellings on the Alaskan side shift the quarry to caribou and the pursuer to a grandmother's grandson — the plot skeleton constant beneath the swapped cast.",
    ],
    motifs: [
      { motifId: "cosmic-hunt", role: "core" },
      { motifId: "ungulate-quarry", role: "supporting" },
      { motifId: "eternal-seasonal-hunt", role: "supporting" },
    ],
  },
  {
    id: "ch-greek",
    mythId: "cosmic-hunt",
    title: "Callisto, the Great Bear",
    cultureId: "ancient-greek",
    region: "Arcadia, Greece",
    lat: 37.5,
    lng: 22.3,
    attestation: "c. 8th c. BCE allusions; full form in Hesiodic fragments and Ovid",
    summary:
      "Callisto, transformed into a bear, is nearly killed by her own son the hunter; Zeus sets both in the sky as the Great Bear and the Bear-Keeper, and the Bear may never bathe in the sea.",
    fullText:
      "Callisto, companion of Artemis, was loved by Zeus and transformed into a bear — by jealous Hera, or by Artemis in anger, or by Zeus himself to hide her. For years she roamed Arcadia as a beast with a woman's mind. Her son Arcas grew into a hunter, and one day, meeting the great she-bear that came toward him with terrible recognition in its eyes, he raised his spear to kill her. Zeus stopped the spear-cast at the last instant and swept mother and son into the sky: she as the Great Bear, he as Arctophylax, the Bear-Keeper, who follows her around the pole forever. Hera, denied her revenge, exacted one condition from the sea gods: the Bear alone of all constellations may never bathe in Ocean — and indeed the Great Bear never sets below the horizon, circling the pole eternally, pursued and unresting.",
    variations: [
      "In some tellings Arcas becomes Boötes rather than Ursa Minor; the pursuer-star varies but the eternal circling does not.",
      "Greek tradition itself connected the never-setting Bear to the myth's condition — an aetiological detail matched to real circumpolar astronomy.",
    ],
    motifs: [
      { motifId: "cosmic-hunt", role: "core" },
      { motifId: "dipper-as-animal", role: "core" },
      { motifId: "bear-quarry", role: "supporting" },
      { motifId: "eternal-seasonal-hunt", role: "supporting" },
      { motifId: "hunter-pursues-women", role: "peripheral" },
    ],
  },

  // ===========================================================================
  // GREAT FLOOD
  // ===========================================================================
  {
    id: "gf-mesopotamian",
    mythId: "great-flood",
    title: "Utnapishtim and the Deluge",
    cultureId: "mesopotamian",
    region: "Lower Mesopotamia (Shuruppak)",
    lat: 31.78,
    lng: 45.51,
    attestation: "c. 1800 BCE (Atra-hasis); Gilgamesh XI c. 1200 BCE; Sumerian antecedents",
    summary:
      "The gods vote to drown noisy humanity; Ea secretly warns Utnapishtim, who builds a sealed vessel, loads his family and animals, rides out the storm, releases birds, lands on a mountain, and sacrifices.",
    fullText:
      "The great gods, their sleep ruined by the clamour of teeming humanity, resolved in council to send the Flood. But Ea, cleverest of gods, could not bear the waste; bound by oath not to warn any man, he whispered instead to a reed wall — behind which sat Utnapishtim of Shuruppak. 'Tear down your house, build a boat. Abandon wealth, save life. Take aboard the seed of every living thing.' Utnapishtim built the vessel in seven days, caulked it with pitch, and loaded his family, his craftsmen, his silver, and beasts of the field both wild and tame. The storm came with the dawn — so terrible that the gods themselves fled upward and cowered like dogs against the wall of heaven, and Ishtar cried out like a woman in labour at what they had done. Six days and seven nights the tempest ground the world; on the seventh, silence. The boat grounded on Mount Nimush. Utnapishtim released a dove — it returned. A swallow — it returned. A raven — it saw the waters receding, ate, circled, and did not return. Then he opened the hatch, poured a libation on the mountaintop, and burned sweet cane, cedar and myrtle; and the gods, starved of offerings since the world drowned, gathered like flies around the sacrifice. Enlil, first furious that any had survived, was reconciled by Ea's reproach — punish the sinner for his sin, not the world entire — and blessed Utnapishtim and his wife with the life of gods, settling them at the mouth of the rivers.",
    variations: [
      "The older Atra-hasis version gives the fuller frame: overpopulation and noise as the cause, plague and famine as failed first remedies, the flood as final solution.",
      "The Sumerian Eridu Genesis names the hero Ziusudra, a pious king; the Hellenistic priest Berossus transmits the same tale with the hero Xisouthros.",
      "The boat's shape varies: a cube of seven decks in Gilgamesh, a giant round coracle in the Ark Tablet.",
    ],
    motifs: [
      { motifId: "world-flood", role: "core" },
      { motifId: "flood-divine-wrath", role: "core" },
      { motifId: "flood-hero-warned", role: "core" },
      { motifId: "survival-vessel", role: "core" },
      { motifId: "animals-preserved", role: "core" },
      { motifId: "bird-scout", role: "core" },
      { motifId: "landing-on-mountain", role: "core" },
      { motifId: "post-flood-sacrifice", role: "core" },
      { motifId: "survivor-immortalized", role: "core" },
    ],
  },
  {
    id: "gf-hebrew",
    mythId: "great-flood",
    title: "Noah and the Ark",
    cultureId: "hebrew",
    region: "Southern Levant",
    lat: 31.78,
    lng: 35.23,
    attestation: "Genesis 6–9; composed mid-1st millennium BCE from older sources",
    summary:
      "God, grieved by human wickedness, floods the earth but saves righteous Noah in an ark with his family and paired animals; birds are released, the ark lands on Ararat, Noah sacrifices, and God sets the rainbow as covenant.",
    fullText:
      "When the earth filled with violence, God repented of having made humankind and resolved to blot it out with a flood — all but Noah, who was righteous in his generation. Noah was commanded to build an ark of gopher wood, three decks sealed with pitch, and to bring aboard his wife, his three sons and their wives, and the animals — two of every kind, seven pairs of the clean. The fountains of the great deep burst and the windows of heaven opened; forty days of rain drowned the highest mountains, and everything that breathed on dry land died. When the waters had prevailed a hundred and fifty days, God remembered Noah; the ark came to rest on the mountains of Ararat. Noah sent out a raven, which went to and fro; then a dove, which found no rest and returned; then the dove again, which came back at evening with a fresh olive leaf in her beak; then the dove a third time, which did not return. Noah came out on dry ground and built an altar, and offered of every clean beast and bird; and the Lord smelled the pleasing odour and vowed never again to curse the ground for man's sake, setting the rainbow in the clouds as the sign of the covenant.",
    variations: [
      "Genesis interweaves two written sources (J and P) with differing animal counts (one pair vs seven pairs of clean beasts) and flood durations — visible seams of transmission.",
      "The raven-then-doves sequence inverts Gilgamesh's dove-swallow-raven order; the skeleton (birds as scouts, in threes) is identical.",
    ],
    motifs: [
      { motifId: "world-flood", role: "core" },
      { motifId: "flood-divine-wrath", role: "core" },
      { motifId: "flood-hero-warned", role: "core" },
      { motifId: "survival-vessel", role: "core" },
      { motifId: "animals-preserved", role: "core" },
      { motifId: "bird-scout", role: "core" },
      { motifId: "landing-on-mountain", role: "core" },
      { motifId: "post-flood-sacrifice", role: "core" },
      { motifId: "post-flood-covenant", role: "core" },
    ],
  },
  {
    id: "gf-greek",
    mythId: "great-flood",
    title: "Deucalion and Pyrrha",
    cultureId: "ancient-greek",
    region: "Thessaly, Greece",
    lat: 38.48,
    lng: 22.5,
    attestation: "Alluded to from 6th c. BCE; fullest in Apollodorus and Ovid",
    summary:
      "Zeus floods the earth to end the Bronze Age race; Prometheus warns his son Deucalion, who survives in a chest with Pyrrha, lands on Parnassus, sacrifices to Zeus, and repopulates the world by throwing stones that become people.",
    fullText:
      "When Zeus resolved to destroy the men of the Bronze Age — some say for their impiety, some for the atrocity of Lycaon, who served human flesh at the god's table — Prometheus warned his son Deucalion. Deucalion built a chest, provisioned it, and embarked with his wife Pyrrha, daughter of Epimetheus and Pandora. Nine days and nine nights the flood carried them, until the chest grounded on Parnassus. When the rains ceased Deucalion came out and sacrificed to Zeus God-of-Escape; and Zeus, pleased, sent Hermes to grant him whatever he chose. Deucalion chose people. Told to throw the bones of their mother over their shoulders, the pious pair understood: the mother is Earth, her bones are stones. The stones Deucalion threw became men; those Pyrrha threw became women — which is why, Pindar says, people are laos, from laas, the stone. From their son Hellen descend all the Hellenes.",
    variations: [
      "Lucian preserves a version at Hierapolis in Syria where the earth split and swallowed the waters into a chasm beneath the temple — an explicitly Near-Eastern-facing telling with animals aboard in pairs.",
      "Ovid centres the moral frame (Lycaon's crime) and has the pair consult an oracle rather than receive Hermes.",
    ],
    motifs: [
      { motifId: "world-flood", role: "core" },
      { motifId: "flood-divine-wrath", role: "core" },
      { motifId: "flood-hero-warned", role: "core" },
      { motifId: "survival-vessel", role: "core" },
      { motifId: "landing-on-mountain", role: "core" },
      { motifId: "post-flood-sacrifice", role: "supporting" },
      { motifId: "repopulation-miracle", role: "core" },
    ],
  },
  {
    id: "gf-hindu",
    mythId: "great-flood",
    title: "Manu and the Fish",
    cultureId: "vedic-indian",
    region: "Northern India",
    lat: 29.95,
    lng: 78.16,
    attestation: "Shatapatha Brahmana, c. 800–600 BCE; retold in the Mahabharata and Puranas",
    summary:
      "A tiny fish begs Manu's protection, grows enormous, and warns him of the coming flood; it tows Manu's ship by a horn to a northern mountain, after which Manu regenerates humanity through sacrifice.",
    fullText:
      "As Manu washed his hands at morning, a tiny fish swam into his palms and begged: 'Rear me, and I will save you.' Manu kept it in a jar; it outgrew the jar, then the pond, then the Ganges, until only the ocean would hold it — for it was no ordinary fish (the later tellings say it was Vishnu himself). The fish told Manu: 'In such-and-such a year the flood will come and carry away all creatures. Build a ship; and when the waters rise, think of me.' The flood came as foretold and swept the world. Manu, alone of living men, embarked; the great horned fish swam to him, and Manu made the ship's rope fast to its horn. So it towed him over the drowned world to the Mountain of the North, where Manu tied the ship to a tree and descended with the subsiding waters. All creatures had perished. Manu, desiring offspring, poured clarified butter and curds into the waters as sacrifice; within a year a woman rose from the offering — Ida — and through her Manu begot the race of Manu, which is humankind.",
    variations: [
      "The Matsya Purana names the fish as Vishnu's first avatar and adds the seven sages and the seeds of all things carried aboard.",
      "The Mahabharata telling has Manu bring seven sages and seeds; the Brahmana telling is starkly minimal — one man, one fish, one woman from butter.",
    ],
    motifs: [
      { motifId: "world-flood", role: "core" },
      { motifId: "flood-hero-warned", role: "core" },
      { motifId: "survival-vessel", role: "core" },
      { motifId: "helpful-fish", role: "core" },
      { motifId: "landing-on-mountain", role: "core" },
      { motifId: "post-flood-sacrifice", role: "core" },
      { motifId: "repopulation-miracle", role: "core" },
    ],
  },
  {
    id: "gf-chinese",
    mythId: "great-flood",
    title: "Gun, Yu, and the Taming of the Waters",
    cultureId: "han-chinese",
    region: "Yellow River valley",
    lat: 34.62,
    lng: 110.0,
    attestation: "References from c. 1000 BCE (Shijing); developed in Shangshu and Han texts",
    summary:
      "A generation-spanning flood is fought, not fled: Gun steals the self-growing soil and fails; his son Yu dredges channels for thirteen years, masters the waters, and founds the first dynasty. A flood story of an entirely different species.",
    fullText:
      "In the time of Yao, the waters rose until they embraced the mountains and lapped at heaven, and the people had no dry place. Gun was charged with the work. He stole from heaven the xirang, the self-renewing soil that grows to dam any breach, and for nine years he built dikes — and for nine years they failed, for walls alone cannot hold a world of water. For his theft and failure Gun was executed at Feather Mountain; but his body did not rot, and from it (split open with a sword, some say) sprang his son Yu. Yu changed the method: not walls but channels. For thirteen years he surveyed the nine provinces, dredged the beds, cut the passes — men say he wore the hair from his shins and the nails from his fingers, that he passed his own gate three times hearing his infant son cry within and would not enter, for the work was not done. A dragon dragged its tail to trace his channels; a dark turtle hauled the mud. When the rivers at last ran seaward in their courses, the land was portioned for planting, and Yu — Yu the Great now — received the mandate and founded the Xia. The flood was never punishment, and no one escaped it: it was work, and a man mastered it.",
    variations: [
      "Some early fragments have Gun transformed into a yellow bear or turtle after death — a totemic thread the later moral tellings drop.",
      "A separate southern Chinese tradition (the gourd-brother-sister flood of the Miao and Yao peoples) IS an escape-type flood myth — the vessel a gourd — and is deliberately not conflated with the Gun-Yu tradition here.",
    ],
    motifs: [
      { motifId: "world-flood", role: "core" },
      { motifId: "flood-tamed-by-labor", role: "core" },
      { motifId: "repopulation-miracle", role: "peripheral" },
    ],
  },
  {
    id: "gf-aztec",
    mythId: "great-flood",
    title: "Tata and Nene in the Hollow Log",
    cultureId: "aztec",
    region: "Valley of Mexico",
    lat: 19.43,
    lng: -99.13,
    attestation: "Codex Chimalpopoca / Leyenda de los Soles, 16th c. (pre-contact tradition)",
    summary:
      "At the end of the Fourth Sun the world drowns and people become fish; the couple Tata and Nene ride out the flood in a hollowed cypress, but disobey the god by cooking a fish and are turned into dogs.",
    fullText:
      "The Fourth Sun, the Sun of Water, ended in a flood that stood the sky's waters upon the earth for fifty-two years, and the people of that age were changed into fish. Before the waters came, Titlacahuan-Tezcatlipoca summoned the man Tata and his wife Nene: 'Hollow out a great cypress, and enter it when the waters rise. Eat only a single ear of maize each.' They obeyed, floating sealed in the log while the world drowned, nibbling their ration kernel by kernel. When the waters fell and the log grounded, they saw a fish — and hunger and appetite overcame command. They drilled fire with sticks and roasted it. The smoke rose and dirtied the sky; the star-gods Citlallinicue and Citlallatonac cried out, 'Who smokes heaven?' — and Titlacahuan descended in fury. 'Is this how I am repaid?' He struck off their heads and set them on their hindquarters, making them the first dogs. So the Fifth Sun opened without them, and dogs to this day look at people with eyes that remember being human.",
    variations: [
      "Other Mexica cosmogonies say all people of the Fourth Sun became fish and the new humanity was made from bones stolen from the underworld by Quetzalcoatl — the flood couple appears only in some codices.",
      "The fifty-two-year flood matches the calendar round — cosmology synchronised to the ritual calendar.",
    ],
    motifs: [
      { motifId: "world-flood", role: "core" },
      { motifId: "flood-hero-warned", role: "core" },
      { motifId: "survival-vessel", role: "core" },
      { motifId: "flood-divine-wrath", role: "supporting" },
    ],
  },

  // ===========================================================================
  // STORM GOD VS SERPENT
  // ===========================================================================
  {
    id: "sg-vedic",
    mythId: "storm-serpent",
    title: "Indra Slays Vritra",
    cultureId: "vedic-indian",
    region: "Punjab / northwest India",
    lat: 30.9,
    lng: 75.85,
    attestation: "Rigveda, c. 1500–1200 BCE — the oldest fixed Indo-European telling",
    summary:
      "The serpent Vritra coils around the mountains and withholds the world's waters; Indra, fortified by soma, shatters him with the thunderbolt and releases the rivers like penned cattle.",
    fullText:
      "Vritra — 'the Obstacle' — serpent son of Danu, lay coiled upon the mountains, and within his ninety-nine coils he had penned the waters of the world as a herdsman pens cattle. Drought sat upon the land. Indra, young champion of the gods, drank deep of soma until strength swelled in him like a storm-front, took up the vajra — the thunderbolt forged by Tvashtar — and went to battle riding the storm. The fight was terrible: Vritra broke Indra's jaws, but Indra struck him along the back with the bolt, splitting the serpent as an axe splits a tree. The imprisoned waters burst free and ran lowing to the sea like released cows to their calves. The Rigveda drums the deed in a formula older than the Veda itself: ahann ahim — 'he slew the serpent' — the same two ancient roots that echo wherever Indo-European speakers carried the storm god's war.",
    variations: [
      "In later Puranic tellings Vritra is a brahmin whose killing stains Indra with sin — the archaic nature-myth moralised.",
      "Some hymns give Indra a helper, Vishnu, who strides to make room for the bolt — the divine-helper slot filled differently across the family.",
    ],
    motifs: [
      { motifId: "storm-god-vs-serpent", role: "core" },
      { motifId: "serpent-withholds-waters", role: "core" },
      { motifId: "weather-weapon", role: "core" },
      { motifId: "monster-intoxicated", role: "peripheral" },
    ],
  },
  {
    id: "sg-hittite",
    mythId: "storm-serpent",
    title: "The Storm God and Illuyanka",
    cultureId: "hittite",
    region: "Central Anatolia",
    lat: 40.02,
    lng: 34.62,
    attestation: "Hittite tablets, c. 1500 BCE; recited at the Purulli spring festival",
    summary:
      "The serpent Illuyanka first defeats the storm god, stealing his heart and eyes; through a mortal helper and a feast where the serpent drinks itself helpless, the god is restored and kills it.",
    fullText:
      "At Kiskilussa the serpent Illuyanka defeated the Storm God — beat him outright, and in one telling took his heart and his eyes. The wounded god sought mortal help. In the older version, the goddess Inara prepared a great feast with vats of every drink, and enlisted the mortal Hupasiya (his price: her bed). The serpent and his brood came up from their hole, drank the vats dry, and swollen with drink could not squeeze back into the earth; Hupasiya bound them with rope, and the Storm God came with the gods and slew Illuyanka. In the younger version, the god's own son by a mortal woman married the serpent's daughter, and as bride-price asked for his father's stolen heart and eyes; restored, the Storm God went to the sea and battled the serpent again — and when his son stood with the serpent's household, the god killed them both at his son's own demand. This tale was told each spring at the Purulli festival, when the rains return: the serpent's defeat is the year's renewal.",
    variations: [
      "The two canonical versions (Hupasiya's rope; the son's bride-price) were copied on the same tablets — the scribes preserved the variance deliberately.",
      "The heart-and-eyes theft closely parallels Typhon's theft of Zeus's sinews in the Greek telling across the Taurus mountains.",
    ],
    motifs: [
      { motifId: "storm-god-vs-serpent", role: "core" },
      { motifId: "initial-defeat-of-god", role: "core" },
      { motifId: "monster-intoxicated", role: "core" },
      { motifId: "weather-weapon", role: "supporting" },
      { motifId: "serpent-withholds-waters", role: "peripheral" },
    ],
  },
  {
    id: "sg-mesopotamian",
    mythId: "storm-serpent",
    title: "Marduk and Tiamat",
    cultureId: "mesopotamian",
    region: "Babylon",
    lat: 32.54,
    lng: 44.42,
    attestation: "Enuma Elish, c. 1100 BCE (older Ninurta antecedents)",
    summary:
      "The sea-mother Tiamat, roused to war, is met by the storm-armed Marduk, who nets her, drives the winds into her mouth, splits her corpse, and builds heaven and earth from her body.",
    fullText:
      "When the young gods' clamour woke the primordial sea, Tiamat, mother of all, was turned to war; she spawned eleven monsters, raised Qingu as her champion, and fixed the Tablet of Destinies to his breast. The frightened gods offered kingship to young Marduk of Babylon if he would face her. Marduk armed himself with bow and mace, lightning before him, the seven winds at his back, and rode the storm-chariot to meet the sea. He spread his net; when Tiamat opened her mouth to swallow him he drove the Evil Wind down her throat so she could not close it, and shot his arrow through her distended belly, splitting her heart. He crushed the skull with the mace; then, considering the corpse, he split her 'like a fish for drying': one half he arched as the sky, setting bars and watchmen that her waters not escape; from the other he made the earth — her eyes became the Tigris and Euphrates, her tail the Milky Way's bond. From the blood of Qingu, executed for treason, humankind was mixed, to carry the labour of the gods. And the gods built Babylon, and Marduk's fifty names were proclaimed.",
    variations: [
      "The plot inherits from older Ninurta-versus-Anzu and Ninurta-versus-Azag combats — Babylon promoted its city god into an existing template.",
      "Berossus transmits a Hellenistic Greek digest in which Bel splits Omorka (Tiamat) to make heaven and earth.",
    ],
    motifs: [
      { motifId: "storm-god-vs-serpent", role: "core" },
      { motifId: "weather-weapon", role: "core" },
      { motifId: "world-from-corpse", role: "core" },
      { motifId: "serpent-withholds-waters", role: "peripheral" },
    ],
  },
  {
    id: "sg-greek",
    mythId: "storm-serpent",
    title: "Zeus and Typhon",
    cultureId: "ancient-greek",
    region: "Cilicia / Mt. Kasios (told in Greece)",
    lat: 36.57,
    lng: 35.42,
    attestation: "Hesiod, Theogony, c. 700 BCE; fuller in Apollodorus",
    summary:
      "The hundred-headed serpent-giant Typhon storms heaven; he first defeats Zeus and cuts out his sinews, but Zeus is restored by helpers and buries Typhon under Etna with the thunderbolt.",
    fullText:
      "When the gods had beaten the Titans, Earth bore one last child by Tartarus: Typhon, vast beyond telling, a hundred serpent heads at his shoulders speaking with every voice of beast and god, fire in his eyes, his stride spanning mountains. He came against heaven, and the gods fled to Egypt in animal shapes — all but Zeus. In the first battle, fought hand to hand at Mount Kasios in Syria, Typhon wrapped Zeus in his coils, wrested away the sickle, and cut the sinews from the god's hands and feet, hiding them in a bearskin in the Corycian cave under guard of the she-dragon Delphyne. Heaven hung defeated — until Hermes and Aigipan stole the sinews back and refitted them. Zeus returned on the chariot of winged horses, thunderbolts raining; he drove Typhon across the world sea to Sicily and crushed him under Mount Etna, whose eruptions are the monster's fire-breath to this day, and whose tremors are Typhon turning under the roots of the mountain.",
    variations: [
      "Hesiod's older telling omits the defeat: Zeus wins at once and Typhon is hurled into Tartarus, father of all destructive winds.",
      "The sinew-theft episode, set on the Syrian mountain of the Hittite storm god, is widely read as a borrowing of the Illuyanka pattern into Greek.",
    ],
    motifs: [
      { motifId: "storm-god-vs-serpent", role: "core" },
      { motifId: "weather-weapon", role: "core" },
      { motifId: "initial-defeat-of-god", role: "core" },
      { motifId: "multi-headed-serpent", role: "supporting" },
    ],
  },
  {
    id: "sg-norse",
    mythId: "storm-serpent",
    title: "Thor and the Midgard Serpent",
    cultureId: "norse",
    region: "Scandinavia",
    lat: 61.0,
    lng: 9.0,
    attestation: "Eddic poems, 9th–13th c. CE; Proto-Germanic and PIE roots",
    summary:
      "Thor fishes the world-serpent from the sea with an ox-head and is robbed of the kill; at Ragnarök they meet again, Thor kills the serpent with the hammer and dies of its venom nine steps later.",
    fullText:
      "Jörmungandr, the Midgard Serpent, lies in the outer sea coiled around the world with its tail in its mouth; when it stirs, the seas rise. Thor met it first in the fishing-boat of the giant Hymir: baiting a whale-line with an ox's head, he hooked the serpent itself and hauled its venom-dripping head gunwale-high, hammer raised — and the terrified giant cut the line, and the serpent sank back. (In Utgard, too, Thor had unknowingly wrestled it in the shape of a grey cat, and lifted it one paw's height, which frightened even the giants.) The third meeting is the last: at Ragnarök the serpent comes ashore spewing poison over sky and sea, and Thor, thunder-armed, meets it before the gods' last battle-line. He crushes its skull with Mjölnir — and walks nine steps from the dead thing before its venom takes him, and he falls. The storm god and the world-serpent end together; the sea takes back the drowned earth, and a new world rises green from the waters afterward.",
    variations: [
      "The Hymir fishing episode is carved on standing stones (Altuna, Hørdum) centuries before the Eddas — iconographic attestation preceding text.",
      "Whether Thor's foot pushing through the boat's bottom belongs to the myth or Snorri's humour is debated.",
    ],
    motifs: [
      { motifId: "storm-god-vs-serpent", role: "core" },
      { motifId: "weather-weapon", role: "core" },
      { motifId: "serpent-withholds-waters", role: "peripheral" },
      { motifId: "initial-defeat-of-god", role: "peripheral" },
    ],
  },
  {
    id: "sg-slavic",
    mythId: "storm-serpent",
    title: "Perun and Veles",
    cultureId: "slavic",
    region: "Eastern Europe (Kyiv as reference point)",
    lat: 50.45,
    lng: 30.52,
    attestation: "Reconstructed; deity pair attested in 10th c. chronicles and treaty oaths",
    summary:
      "The thunder god Perun pursues the serpentine cattle-thief Veles down the world-tree; every lightning strike is a blow in the chase, and the rains break when the stolen herds (clouds) are freed.",
    fullText:
      "At the crown of the world-oak sits Perun, lord of thunder, the eagle among his branches; among its roots coils Veles, lord of cattle, waters and the dead, the serpent at the bottom of the world. Veles steals — cattle, waters, in some tellings Perun's wife or children — and flees down through the world, hiding behind trees, under stones, inside houses, inside men, taking beast-shapes as he runs. Perun hunts him with lightning: every thunderbolt is a blow at the hiding-place of the serpent (which is why folk custom holds it dangerous to shelter under lone trees in a storm — the serpent may be hiding there). At last Veles is caught and slain, or beaten back into the waters below the roots; the stolen cattle — which are the rain-clouds — burst free, and the storm breaks in rain, and the world is watered. And because Veles is never dead for long, the theft, the hunt and the rain recur with every storm, year upon year.",
    variations: [
      "Reconstructed by Ivanov and Toporov from Baltic and Slavic folklore (the Lithuanian Perkūnas–velnias tales are the closest cousins), treaty-oath formulas, and Christianised echoes (Elijah the Thunderer pursuing devils).",
      "In Christianised folk tellings St Elijah's fiery chariot makes the thunder as he hunts the devil — the pagan pair surviving under new names.",
    ],
    motifs: [
      { motifId: "storm-god-vs-serpent", role: "core" },
      { motifId: "serpent-withholds-waters", role: "core" },
      { motifId: "weather-weapon", role: "core" },
      { motifId: "eternal-seasonal-hunt", role: "peripheral" },
    ],
  },
  {
    id: "sg-japanese",
    mythId: "storm-serpent",
    title: "Susanoo and the Eight-Headed Orochi",
    cultureId: "japanese",
    region: "Izumo, Japan",
    lat: 35.37,
    lng: 132.75,
    attestation: "Kojiki, 712 CE; Nihon Shoki, 720 CE",
    summary:
      "The storm god Susanoo intoxicates the eight-headed serpent Orochi with eight vats of brewed sake, kills it in its stupor, rescues the maiden, and finds the sacred sword in its tail.",
    fullText:
      "Cast down from heaven, the storm god Susanoo came to the river Hi in Izumo and found an old couple weeping over their last daughter, Kushinada-hime: seven daughters in seven years had been devoured by the Yamata-no-Orochi — the eight-forked serpent, eight heads and eight tails, moss and cypress growing on its back, its body spanning eight valleys and eight hills, its belly forever bloody. Susanoo asked for the girl's hand, and turned her into a comb which he set in his hair. He had the couple brew sake refined eight times, and build a fence with eight gates, and at each gate a platform, and on each platform a vat of the eightfold liquor. The Orochi came, dipped one head into each of the eight vats, drank, and sank into a drunken sleep. Then Susanoo drew his ten-span sword and hewed the serpent to pieces, until the river Hi ran red. But cutting into the middle tail, his blade chipped — and within the tail he found a great sword: Ame-no-Murakumo, later called Kusanagi, the Grass-Cutter, which he presented to his sister the sun goddess, and which became one of the three regalia of the emperors of Japan.",
    variations: [
      "The Nihon Shoki gives variant counts and names, and in one version the sword is found in the serpent's belly rather than tail.",
      "Whether Orochi belongs to the Indo-European storm-serpent family (via steppe-to-East-Asia transmission) or is an independent river-taming allegory (the serpent as the flooding, 'eight-forked' river Hi, with iron-sand in its tail for the sword) is a live scholarly argument — the tracker's scoring lets you weigh it yourself.",
    ],
    motifs: [
      { motifId: "storm-god-vs-serpent", role: "core" },
      { motifId: "multi-headed-serpent", role: "core" },
      { motifId: "monster-intoxicated", role: "core" },
      { motifId: "maiden-sacrifice-dragon", role: "core" },
      { motifId: "treasure-in-body", role: "core" },
    ],
  },

  // ===========================================================================
  // ORPHEUS TYPE
  // ===========================================================================
  {
    id: "or-greek",
    mythId: "orpheus-type",
    title: "Orpheus and Eurydice",
    cultureId: "ancient-greek",
    region: "Thrace",
    lat: 41.14,
    lng: 24.89,
    attestation: "Alluded from 6th c. BCE; canonical form in Virgil and Ovid",
    summary:
      "The musician Orpheus charms the underworld into releasing his dead wife on condition he not look back before reaching daylight; at the threshold he looks, and loses her forever.",
    fullText:
      "Eurydice, new bride of the Thracian singer Orpheus, stepped on a viper as she fled a pursuer through the grass, and died of the bite. Orpheus went down after her — through the gate at Taenarum, across the grey marshes — armed with nothing but the lyre. And he sang: to the ferryman, who carried him; to Cerberus, whose three heads sank to sleep; to the wheel of Ixion, which stopped; to the vulture at the liver of Tityos, which lifted its head; and at last to the throned dead themselves, Hades and Persephone. The dead wept — the first tears ever shed in that country, some say. Persephone called Eurydice, who came still limping from the wound, and the lords of the dead set one condition: that Orpheus walk ahead, and not turn to look at her until both stood again in the light of the sun. Up they went, he straining his ears for her footfall behind him — footfall of a shade makes no sound — and at the very rim of the world, where the first grey light touched him but not yet her, love and terror won. He turned. She was there; and she was gone, falling away like smoke, with only 'farewell' reaching him. He rushed back down, but the ferryman would not cross a living man twice. Orpheus wandered singing until the Maenads tore him apart; his head floated down the Hebrus, still singing, and his shade went below at last, where he and Eurydice walk together, and he may look at her as much as he pleases.",
    variations: [
      "Plato's Symposium sneers that the gods showed Orpheus only a phantom of his wife because he lacked the courage to die for her — evidence the 'failure' plot was debated in antiquity.",
      "An early tradition may have had a successful retrieval (Euripides' Alcestis alludes to it) — the tragic 'look back' may itself be an innovation that spread.",
    ],
    motifs: [
      { motifId: "descent-to-underworld", role: "core" },
      { motifId: "retrieve-dead-loved-one", role: "core" },
      { motifId: "dont-look-taboo", role: "core" },
      { motifId: "taboo-broken-loss", role: "core" },
      { motifId: "music-charms-death", role: "core" },
    ],
  },
  {
    id: "or-japanese",
    mythId: "orpheus-type",
    title: "Izanagi in the Land of the Dead",
    cultureId: "japanese",
    region: "Yomi (told at Izumo, Japan)",
    lat: 35.4,
    lng: 133.05,
    attestation: "Kojiki, 712 CE",
    summary:
      "Izanagi descends to Yomi to bring back his dead wife Izanami; she asks him not to look at her, he lights a fire and sees her corpse, and his broken promise seals the door between life and death.",
    fullText:
      "When Izanami died birthing the fire god, her husband Izanagi followed her down to Yomi, the land of gloom. She met him at the hall's shadowed door. 'You are too late,' she said. 'I have eaten at the hearth of Yomi. But I will ask its lords for leave to return — only do not look upon me while you wait.' The wait grew long. Izanagi broke a tooth from the comb in his hair, lit it as a torch, and entered — and saw her: rotting, maggot-ridden, the eight thunder gods seated in her flesh. He fled. Izanami, shamed and furious, sent the hags of Yomi after him, then the thunders, then came herself. At the pass of Yomotsu Hirasaka he hauled a boulder across the way, and husband and wife stood divorced with the stone between them. 'Beloved,' she called through it, 'if you do this, I will strangle a thousand of your people every day.' And he answered: 'Beloved, then I will build a thousand and five hundred birthing-huts a day.' So death entered the world, and so birth outpaces it; and Izanagi washed the pollution of Yomi from his body in the river, and of his washed eyes were born the sun and the moon.",
    variations: [
      "The Nihon Shoki softens some details and multiplies variants side by side, as its editors habitually did.",
      "The food-of-the-dead clause ('I have eaten of Yomi's hearth') exactly parallels Persephone's pomegranate — same binding logic, opposite hemisphere of Eurasia.",
    ],
    motifs: [
      { motifId: "descent-to-underworld", role: "core" },
      { motifId: "retrieve-dead-loved-one", role: "core" },
      { motifId: "dont-look-taboo", role: "core" },
      { motifId: "taboo-broken-loss", role: "core" },
      { motifId: "food-of-dead-binds", role: "core" },
      { motifId: "origin-of-death-explained", role: "core" },
    ],
  },
  {
    id: "or-klamath",
    mythId: "orpheus-type",
    title: "The Chief Who Followed His Wife",
    cultureId: "klamath-modoc",
    region: "Klamath Basin, Oregon",
    lat: 42.22,
    lng: -121.78,
    attestation: "Oral tradition; recorded 19th–20th c. (one of ~80 North American Orpheus traditions)",
    summary:
      "A grieving husband follows his wife's spirit to the land of the dead; the powers agree to release her if he does not touch or look at her on the road home. He fails at the last night, and death becomes final for all people.",
    fullText:
      "A young chief's wife died, and he could not let her go: he lay on her grave until her spirit rose and set out on the ghosts' road west, and he followed. The road was dark and the dead moved on it like wind; where they crossed rushing water on a swaying pole, he nearly fell, for the living are heavy. In the land of the dead the spirits danced all night and slept all day, and his wife danced among them, young and whole. The old chief of that country pitied him — no living one had come so far — and made the bargain: 'Take her home. Walk ahead; she will follow. But do not touch her, do not turn to see her, until you have slept the fifth night in your own country.' Four nights he kept the law, hearing her steps grow firmer behind him, hearing her breath return, hearing her become alive. On the fifth night, camped almost within sight of the village fires, she spoke his name in her own living voice — and he turned and took her in his arms. In the morning he woke holding rotted bones. The old chief of the dead said: 'Because you could not wait one night, no one shall ever come back again.' And that is why, of all who have died since, not one has returned.",
    variations: [
      "In neighbouring tellings (Nez Perce, Yana, Nisenan) the taboo is variously against touching, looking, speaking, or sleeping; the near-success and last-moment failure are constant.",
      "Coyote replaces the husband in several California versions, and his failure dooms humanity with characteristic trickster carelessness.",
    ],
    motifs: [
      { motifId: "descent-to-underworld", role: "core" },
      { motifId: "retrieve-dead-loved-one", role: "core" },
      { motifId: "dont-look-taboo", role: "core" },
      { motifId: "taboo-broken-loss", role: "core" },
      { motifId: "origin-of-death-explained", role: "core" },
    ],
  },
  {
    id: "or-maori",
    mythId: "orpheus-type",
    title: "Hutu and Pare",
    cultureId: "maori",
    region: "Aotearoa New Zealand",
    lat: -38.14,
    lng: 176.25,
    attestation: "Oral tradition; recorded 19th c.",
    summary:
      "After the noblewoman Pare dies for love of him, Hutu descends to the underworld, wins her spirit back through a game, and carries her up a bent-tree catapult to rejoin her body — a rare success.",
    fullText:
      "Pare, a woman of the highest rank, offered her love to the visiting champion Hutu, who refused her — he had a wife and children — and in her shame she died by her own hand. Her people held Hutu's life forfeit, but he asked for time and went down to the world below, guided by the goddess of the dark. In the underworld he found the spirits listless and Pare unwilling to be seen. So Hutu taught the dead games: he made darts fly and, when that failed to draw her, bent a tall tree to the ground with ropes as a swing — and at that wonder, all the dead gathered, and Pare came out at last and asked to swing with him. She clasped his shoulders; the tree was released; and it sprang so high that its top touched the roof of the underworld, and Hutu caught the roots of the plants of the upper world and hauled them both out through the hole. Her spirit flew to where her body lay in state and re-entered it, and Pare lived. She was given to Hutu — the accounts reconcile his marriage variously — and her people counted the debt of blood repaid with life.",
    variations: [
      "Some tellings emphasise that Hutu's cleverness (not force or music) wins the dead over — games in place of the lyre.",
      "New Zealand and wider Polynesia also carry failed retrievals (Māui's attempt to reverse death through Hine-nui-te-pō ends all hope of immortality) — success and failure versions coexist in the same region.",
    ],
    motifs: [
      { motifId: "descent-to-underworld", role: "core" },
      { motifId: "retrieve-dead-loved-one", role: "core" },
      { motifId: "music-charms-death", role: "peripheral" },
      { motifId: "ascent-on-tree-or-rock", role: "supporting" },
    ],
  },

  // ===========================================================================
  // FIRE THEFT
  // ===========================================================================
  {
    id: "ft-greek",
    mythId: "fire-theft",
    title: "Prometheus the Fire-Bringer",
    cultureId: "ancient-greek",
    region: "Caucasus (place of punishment; told throughout Greece)",
    lat: 43.35,
    lng: 42.44,
    attestation: "Hesiod, Theogony and Works and Days, c. 700 BCE",
    summary:
      "The Titan Prometheus steals fire from the gods in a fennel stalk and gives it to humanity; Zeus chains him to a mountain where an eagle eats his ever-regrowing liver.",
    fullText:
      "When gods and mortals settled accounts at Mekone, Prometheus the fore-thinker tricked Zeus over the sacrificial portions — bones dressed in shining fat for the gods, the good meat hidden in the ox's stomach for men — and Zeus in his anger withheld fire from humankind: let them eat their meat raw in the cold dark. Prometheus stole it back. He went up secretly and carried the far-seen flame away hidden in the pith of a giant fennel stalk, where it smoulders slow, and brought it down to men; and the sight of fires blooming among mortals again stung Zeus to the heart. The punishments were two. For men, the gods fashioned Pandora, the beautiful evil, from whose jar troubles filled the world. For the thief, an axle of adamant on the Caucasus: chained there, a long-winged eagle came each day and ate his liver, and each night the liver grew whole again for the morning — until, generations later, Heracles shot the eagle and set the Titan free, with Zeus's leave, for the glory of his son.",
    variations: [
      "In Aeschylus' Prometheus Bound the theft becomes a act of civilisational love — fire as the seed of all arts — and Prometheus knows a secret that will one day unseat Zeus.",
      "Attic cult ran torch-races for Prometheus from his altar; the fennel-stalk fire-carrier was real Greek practice for transporting embers.",
    ],
    motifs: [
      { motifId: "fire-theft", role: "core" },
      { motifId: "trickster-culture-hero", role: "supporting" },
      { motifId: "fire-bringer-punished", role: "core" },
      { motifId: "fire-hidden-in-wood", role: "supporting" },
    ],
  },
  {
    id: "ft-maori",
    mythId: "fire-theft",
    title: "Māui and the Fire Goddess",
    cultureId: "maori",
    region: "Aotearoa New Zealand",
    lat: -38.66,
    lng: 178.02,
    attestation: "Oral tradition; pan-Polynesian cycle; recorded 19th c.",
    summary:
      "Māui extinguishes the world's fires to learn where fire comes from, then tricks his ancestress Mahuika out of her burning fingernails one by one; the last she hurls after him, and fire takes refuge in the trees.",
    fullText:
      "Māui, youngest and most insolent of his brothers, put out every cooking fire in the village at night simply to find out what would happen — and what happened was that someone had to go to Mahuika, the ancestress of fire, in her burning cave at the world's edge. Māui went himself. Mahuika greeted her descendant kindly, and when he asked for fire she pulled out one of her fingernails, in which fire lives, and gave it to him. Out of sight, Māui doused it in a stream and came back: the fire had gone out, might he have another? Nail by nail he drained her — eight fingers, then a thumbnail dropped hissing into the water — until Mahuika understood the game. In her fury she tore out her last nail and dashed it to the ground, and the world caught fire; Māui fled before the burning, calling on his ancestors, and rain fell in floods that nearly drowned fire out of the world entirely. Mahuika's last sparks flew for refuge into the kaikōmako and other trees, where fire hides to this day — which is why, when the people rub the wood of those trees together, fire comes out to them, and no one need visit the burning cave again.",
    variations: [
      "In Hawai'i the fire-keepers are mud-hens ('alae) whose scorched red foreheads mark the theft; across Polynesia the keeper is often Māui's grandmother or the earthquake god Mafui'e.",
      "Some tellings say Māui took the form of a hawk while fleeing, and its singed feathers are red-brown still — the animal marked by carrying fire.",
    ],
    motifs: [
      { motifId: "fire-theft", role: "core" },
      { motifId: "trickster-culture-hero", role: "core" },
      { motifId: "fire-in-fingernails", role: "core" },
      { motifId: "fire-hidden-in-wood", role: "core" },
      { motifId: "animal-fire-relay", role: "peripheral" },
    ],
  },
  {
    id: "ft-cherokee",
    mythId: "fire-theft",
    title: "The Water Spider Brings Fire",
    cultureId: "cherokee",
    region: "Southern Appalachians",
    lat: 35.56,
    lng: -83.5,
    attestation: "Oral tradition; recorded by Mooney, 1900",
    summary:
      "Lightning sets a hollow sycamore alight on an island; raven, owls and snakes each fail to bring fire back and are scorched black or red-eyed; the little water spider crosses in a woven bowl and carries home one coal.",
    fullText:
      "In the beginning there was no fire and the world was cold, until the Thunders sent lightning into the bottom of a hollow sycamore on an island. The animals could see the smoke across the water, and council was held: who would fetch it? Raven went first, proud and strong; while he perched considering, the heat scorched all his feathers black, and he came back afraid. The little screech owl looked down into the hollow and a hot blast near burned out his eyes, red to this day. Hooting owl and horned owl got ash in their eyes, and the white rings there remain. The black racer snake swam over, darted into the burning stump, scorched black; the great blacksnake climbed and fell in, scorched black. Every animal marked, and still no fire. Then the water spider — the little one that runs on top of the water — said she would go. 'But how will you carry it?' 'I shall manage that,' she said, and spun thread from her body and wove it into a tusti bowl, and fastened the bowl on her back. She ran across the water, put one burning coal into her bowl, and brought it home; and ever since, the world has had fire, and the water spider keeps her bowl.",
    variations: [
      "Southeastern neighbours tell relay versions in which several animals hand the coal onward, each singed in turn — the relay-and-marking structure at full strength.",
      "In the Lenape story of Rainbow Crow it is snow, not cold alone, that drives the theft, and the crow's rainbow feathers are burned black — the same marking logic on a different bird.",
    ],
    motifs: [
      { motifId: "fire-theft", role: "core" },
      { motifId: "animal-fire-relay", role: "core" },
      { motifId: "trickster-culture-hero", role: "supporting" },
    ],
  },
  {
    id: "ft-haida",
    mythId: "fire-theft",
    title: "Raven Steals the Light and Fire",
    cultureId: "haida-tlingit",
    region: "Haida Gwaii / Northwest Coast",
    lat: 53.25,
    lng: -132.07,
    attestation: "Oral tradition; recorded 18th–19th c.; motifs on poles and regalia far older",
    summary:
      "Raven, shape-shifting into a hemlock needle, is born as the grandchild of the old chief who hoards the sun, moon and fire in boxes, cries until given the boxes, and escapes through the smokehole — scorched black forever.",
    fullText:
      "In the beginning the world was dark, for an old chief at the head of the Nass kept the light — and in many tellings the fire too — shut in a nest of carved boxes in his house. Raven, who was white as gull-down in those days and could not bear a closed box anywhere in the world, turned himself into a hemlock needle and floated on the spring where the chief's daughter drank. She swallowed him, and bore him: a black-eyed boy who was Raven, crying in the old man's house. And what the grandchild cried for, doting age could not refuse. Box within box within box the treasures came out — until the boy had the ball of light itself in his hands, and became Raven, and was through the smokehole and gone. The smokehole's rim was hung with soot; Raven's white feathers were scorched black in the squeeze, and black they remain. He flung the light into the sky — sun, and moon, and the stars from the last box's fragments — and where he dropped fire, or where the people snatched brands from his beak's burden, the world's hearths were lit. The frog people and the fish people paid him nothing for it; that is another story, and Raven remembers.",
    variations: [
      "Tlingit, Haida and Tsimshian tellings differ on whether light and fire are one theft or two; in several, Raven's stolen firebrand burns his beak short and the sparks that fell into rocks and wood explain flint and fire-drills.",
      "In some tellings petrel or seagull owns fresh water too, and Raven's thefts multiply — the box-hoarder and the crying-grandchild trick are the stable core.",
    ],
    motifs: [
      { motifId: "fire-theft", role: "core" },
      { motifId: "trickster-culture-hero", role: "core" },
      { motifId: "animal-fire-relay", role: "supporting" },
      { motifId: "fire-hidden-in-wood", role: "supporting" },
    ],
  },
  {
    id: "ft-vedic",
    mythId: "fire-theft",
    title: "Mātariśvan Brings Agni",
    cultureId: "vedic-indian",
    region: "Northwest India",
    lat: 28.61,
    lng: 77.2,
    attestation: "Rigveda, c. 1500–1200 BCE",
    summary:
      "Fire (Agni) hides from the gods and men in the waters and in the plants; Mātariśvan fetches him from concealment and gives him to the Bhrigus, and fire dwells since then in wood, struck out by friction.",
    fullText:
      "Agni is a god who runs away. Born of the waters, kindled in the sky as lightning and the sun, he wearied of the office of carrying men's offerings and hid — in the waters, in the hollows of plants and trees, dispersed and secret. The world went cold between gods and men: no fire, no sacrifice, no bridge. It was Mātariśvan — a name of obscure depth, messenger or double of the wind, in some hymns a name of Agni's own hidden self — who found him afar and brought him from concealment to the clan of the Bhrigus, the ancient fire-priests, who established him in the homes of men. And because Agni had hidden in the plants, he dwells in wood still: the fire-drill's two sticks are called his parents, and when the priest churns them at dawn, Agni is born again from the wood in which he once took refuge — the theft, or the retrieval, re-enacted at every altar in every village at every sunrise.",
    variations: [
      "The Rigveda already carries multiple versions side by side: Agni hides once or thrice; Mātariśvan is fetcher, or messenger, or Agni himself — the hymns argue with each other.",
      "Comparativists set Mātariśvan beside Prometheus (fire fetched from concealment for sacrifice-kindling humanity) as a possible common Indo-European inheritance; the match is looser than the storm-serpent case and is scored accordingly here.",
    ],
    motifs: [
      { motifId: "fire-theft", role: "supporting" },
      { motifId: "fire-hidden-in-wood", role: "core" },
      { motifId: "trickster-culture-hero", role: "peripheral" },
    ],
  },
];

export const mythIndexById: Map<string, Myth> = new Map(
  myths.map((m) => [m.id, m])
);
export const variantIndexById: Map<string, Variant> = new Map(
  variants.map((v) => [v.id, v])
);
