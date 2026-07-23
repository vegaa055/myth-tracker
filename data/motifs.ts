import type { Motif } from "@/lib/types";

/**
 * Motif catalogue with approximate global attestation counts, modelled on
 * Yuri Berezkin's analytical catalogue of world mythology (~1000 traditions).
 * Counts are order-of-magnitude estimates used for rarity weighting: a motif
 * found in 400 traditions ("hunter pursues women") is weak evidence of a
 * connection between two stories; one found in a few dozen ("the seventh
 * star that vanished") is strong evidence.
 */
export const TOTAL_TRADITIONS = 1000;

export const motifs: Motif[] = [
  // ---- Star lore / Seven Sisters ------------------------------------------
  {
    id: "pleiades-as-women",
    name: "Pleiades as a group of women",
    description:
      "The Pleiades cluster is personified as a group of girls or sisters. Common worldwide — Berezkin's database holds 340+ Pleiades motifs.",
    attestations: 150,
  },
  {
    id: "pleiades-counted-seven",
    name: "Pleiades counted as seven",
    description:
      "The cluster is called seven although only six stars are visible to most eyes.",
    attestations: 40,
  },
  {
    id: "lost-pleiad",
    name: "The lost Pleiad",
    description:
      "A story explains why the seventh star is missing: she hid, fell, faded from shame, or died.",
    attestations: 30,
  },
  {
    id: "orion-as-hunter",
    name: "Orion as a man or hunter",
    description:
      "The Orion constellation is personified as a male hunter or group of men. Common — 220+ Orion motifs worldwide, and the constellation visibly 'follows' the Pleiades across the sky.",
    attestations: 140,
  },
  {
    id: "celestial-pursuit",
    name: "Celestial pursuit",
    description:
      "One constellation is said to chase another across the night sky, the chase repeating nightly or seasonally. Earth's rotation makes Orion visibly follow the Pleiades — cultures can read this off the sky independently.",
    attestations: 90,
  },
  {
    id: "women-become-stars",
    name: "Women transformed into stars",
    description:
      "Women (often fleeing) are transformed into stars or raised into the sky for protection.",
    attestations: 120,
  },
  {
    id: "hunter-pursues-women",
    name: "Hunter pursues woman/women",
    description:
      "A man or men pursue an unwilling woman or group of women. Extremely widespread; weak evidence of connection on its own.",
    attestations: 400,
  },
  {
    id: "sisters-and-water",
    name: "Star-sisters linked to water or ice",
    description:
      "The star-women are associated with water in some form: ice bodies, frost falling to earth, rain at their rising.",
    attestations: 45,
  },
  {
    id: "stars-govern-ritual",
    name: "Star rising governs ritual",
    description:
      "The heliacal rising or setting of the cluster triggers a ritual or marks a ceremonial season.",
    attestations: 50,
  },
  {
    id: "ascent-on-tree-or-rock",
    name: "Ascent to sky on growing tree/rock",
    description:
      "Fugitives escape a pursuer when a tree, rock, or hill grows upward and lifts them into the sky.",
    attestations: 35,
  },

  // ---- Cosmic Hunt ---------------------------------------------------------
  {
    id: "cosmic-hunt",
    name: "Cosmic hunt",
    description:
      "A hunted animal escapes into the sky and becomes a constellation; the hunt is frozen in the stars.",
    attestations: 140,
  },
  {
    id: "dipper-as-animal",
    name: "Big Dipper as animal",
    description:
      "Ursa Major's bowl is the hunted animal (bear, elk) rather than a wagon or ladle.",
    attestations: 90,
  },
  {
    id: "alcor-companion",
    name: "Alcor as small companion",
    description:
      "The faint star Alcor beside Mizar is a specific small object in the story: a dog, a cooking pot, a cub.",
    attestations: 35,
  },
  {
    id: "blood-autumn-leaves",
    name: "Animal's blood reddens autumn leaves",
    description:
      "Blood from the wounded sky-animal drips to earth each autumn, colouring the foliage.",
    attestations: 12,
  },
  {
    id: "eternal-seasonal-hunt",
    name: "Hunt resets with the seasons",
    description:
      "The celestial hunt is eternal, resetting or completing with the yearly cycle.",
    attestations: 60,
  },
  {
    id: "bear-quarry",
    name: "Bear as the hunted animal",
    description: "The quarry of the sky-hunt is a bear.",
    attestations: 45,
  },
  {
    id: "ungulate-quarry",
    name: "Elk/deer as the hunted animal",
    description: "The quarry of the sky-hunt is an elk, moose, or deer.",
    attestations: 30,
  },

  // ---- Flood ---------------------------------------------------------------
  {
    id: "world-flood",
    name: "World-destroying flood",
    description:
      "A great flood destroys humanity or the world. One of the most widespread motifs on Earth; on its own it proves nothing.",
    attestations: 350,
  },
  {
    id: "flood-divine-wrath",
    name: "Flood as divine punishment",
    description: "The flood is sent deliberately by a god or gods angered by humanity.",
    attestations: 130,
  },
  {
    id: "flood-hero-warned",
    name: "Flood hero forewarned",
    description:
      "One person is secretly warned of the coming flood by a god, spirit, or animal.",
    attestations: 90,
  },
  {
    id: "survival-vessel",
    name: "Survival vessel",
    description: "The hero survives in a built or found vessel: ark, boat, gourd, chest, raft.",
    attestations: 110,
  },
  {
    id: "animals-preserved",
    name: "Animals preserved aboard",
    description: "Animals are taken aboard the vessel to survive the flood.",
    attestations: 60,
  },
  {
    id: "bird-scout",
    name: "Birds sent to find land",
    description:
      "The hero releases birds from the vessel to test whether the waters have receded. Rare and arbitrary — strong evidence of connection.",
    attestations: 25,
  },
  {
    id: "landing-on-mountain",
    name: "Vessel grounds on a mountain",
    description: "The vessel comes to rest on a specific mountain as waters recede.",
    attestations: 55,
  },
  {
    id: "post-flood-sacrifice",
    name: "Sacrifice after the flood",
    description: "The survivor's first act on dry land is a sacrifice that pleases the gods.",
    attestations: 20,
  },
  {
    id: "repopulation-miracle",
    name: "Miraculous repopulation",
    description:
      "Humanity is restored by unusual means: stones become people, a divine mandate, survivors' transformed offspring.",
    attestations: 100,
  },
  {
    id: "flood-tamed-by-labor",
    name: "Flood tamed by engineering",
    description:
      "The flood is not escaped but controlled — dredged, channelled, dammed — by a persevering hero. Characteristic of the Chinese tradition.",
    attestations: 15,
  },
  {
    id: "survivor-immortalized",
    name: "Flood survivor granted immortality",
    description:
      "The gods reward the survivor with eternal life, settling him apart from humankind.",
    attestations: 12,
  },
  {
    id: "post-flood-covenant",
    name: "Divine covenant never to flood again",
    description:
      "The deity binds itself by promise (often with a visible sign, e.g. the rainbow) never to send the flood again.",
    attestations: 15,
  },
  {
    id: "helpful-fish",
    name: "Helpful fish guides the hero",
    description: "A fish (often a god in disguise) warns the hero and tows or guides his vessel.",
    attestations: 18,
  },

  // ---- Storm god vs serpent ------------------------------------------------
  {
    id: "storm-god-vs-serpent",
    name: "Storm god battles great serpent",
    description:
      "A weather/sky deity fights a giant serpent or dragon embodying chaos or drought.",
    attestations: 60,
  },
  {
    id: "serpent-withholds-waters",
    name: "Serpent withholds the waters",
    description:
      "The dragon hoards rain, rivers, or cattle-as-clouds; killing it releases the waters.",
    attestations: 40,
  },
  {
    id: "weather-weapon",
    name: "Thunder-weapon",
    description: "The hero god wields a thunderbolt, hammer, or storm-mace.",
    attestations: 70,
  },
  {
    id: "multi-headed-serpent",
    name: "Multi-headed serpent",
    description: "The serpent has multiple heads (often seven, eight, or nine).",
    attestations: 55,
  },
  {
    id: "monster-intoxicated",
    name: "Monster tricked with drink",
    description: "The monster is weakened by being fed alcohol or enchanted food before the fight.",
    attestations: 25,
  },
  {
    id: "treasure-in-body",
    name: "Treasure found in the monster's body",
    description: "A sword, jewel, or sacred object is discovered inside the slain monster.",
    attestations: 15,
  },
  {
    id: "world-from-corpse",
    name: "World fashioned from a corpse",
    description: "The cosmos or part of it is built from the slain being's body.",
    attestations: 45,
  },
  {
    id: "maiden-sacrifice-dragon",
    name: "Maiden offered to the monster",
    description: "A maiden is offered to appease the serpent and is rescued by the hero.",
    attestations: 80,
  },
  {
    id: "initial-defeat-of-god",
    name: "Storm god first defeated",
    description:
      "The hero god initially loses — is dismembered, swallowed, or has sinews stolen — before a helper enables the rematch.",
    attestations: 20,
  },

  // ---- Orpheus type --------------------------------------------------------
  {
    id: "descent-to-underworld",
    name: "Living person visits the land of the dead",
    description:
      "A living hero travels to the underworld. Extremely widespread on its own.",
    attestations: 200,
  },
  {
    id: "retrieve-dead-loved-one",
    name: "Attempt to retrieve a dead loved one",
    description: "The hero goes below specifically to bring a dead spouse or kin back to life.",
    attestations: 70,
  },
  {
    id: "dont-look-taboo",
    name: "Don't-look-back taboo",
    description:
      "The return is granted on a condition of not looking at (or not touching) the dead until fully back among the living.",
    attestations: 50,
  },
  {
    id: "taboo-broken-loss",
    name: "Taboo broken, dead lost forever",
    description: "The condition is violated at the last moment and the dead one is lost again.",
    attestations: 55,
  },
  {
    id: "music-charms-death",
    name: "Music charms the powers of death",
    description: "The hero's music or song softens the rulers or guardians of the dead.",
    attestations: 12,
  },
  {
    id: "food-of-dead-binds",
    name: "Eating the food of the dead binds you",
    description: "Consuming anything in the underworld makes return impossible or partial.",
    attestations: 40,
  },
  {
    id: "origin-of-death-explained",
    name: "Episode explains why death is permanent",
    description:
      "The failed retrieval is cited as the reason humans cannot return from death.",
    attestations: 65,
  },

  // ---- Fire theft ----------------------------------------------------------
  {
    id: "fire-theft",
    name: "Fire stolen from its keeper",
    description:
      "Fire is originally withheld by a god, monster, or distant people and must be stolen. Very widespread.",
    attestations: 250,
  },
  {
    id: "trickster-culture-hero",
    name: "Trickster culture-hero",
    description:
      "The thief is a trickster figure who benefits humanity. Near-universal; weak evidence alone.",
    attestations: 300,
  },
  {
    id: "animal-fire-relay",
    name: "Animal relay carries fire",
    description:
      "Fire is passed between animal helpers in a relay; the animals are marked (scorched red, blackened) by carrying it.",
    attestations: 90,
  },
  {
    id: "fire-hidden-in-wood",
    name: "Fire hidden inside wood",
    description:
      "The stolen fire is stored inside trees or sticks, explaining why friction on wood yields fire.",
    attestations: 60,
  },
  {
    id: "fire-bringer-punished",
    name: "Fire-bringer punished",
    description: "The thief suffers a lasting punishment for the theft (chained, burned, maimed).",
    attestations: 25,
  },
  {
    id: "fire-in-fingernails",
    name: "Fire kept in the keeper's body",
    description:
      "The original keeper stores fire in their own body — fingernails, mouth, or belly.",
    attestations: 15,
  },
];

export const motifIndex: Map<string, Motif> = new Map(
  motifs.map((m) => [m.id, m])
);
