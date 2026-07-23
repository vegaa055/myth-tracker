# Myth Tracker

An atlas of humanity's oldest stories. Myth Tracker maps the world's great
myth families — the Seven Sisters, the Cosmic Hunt, the Great Flood, the
storm-god-versus-serpent combat, the failed retrieval from the dead, the
theft of fire — as geolocated regional tellings connected by a **similarity
engine designed to separate real transmission from coincidence**.

Built with **Next.js 15 + TypeScript + React 19**, maps by **Leaflet /
react-leaflet**, backed by a **Neo4j** graph database (with an automatic
bundled-data fallback when the database is offline).

## Features

- **Myth Index** (`/`) — the six myth families, each with variant count,
  proposed origin (or "unknown/contested"), and estimated age.
- **Myth dossier** (`/myth/[id]`) — a map with the proposed origin, every
  regional telling, and connection arcs colour-coded by verdict; a scored
  connections table (shared motifs rarest-first, missing core elements); the
  full accepted telling and known variations of every variant; background on
  the cultures that tell them.
- **Explore Map** (`/explore`) — every story as a clickable point on the
  world map. Selecting a point opens the full telling, its variations, its
  family's origin assessment, its motifs, and its scored connections
  (including cross-family links) drawn live on the map.
- **Methodology** (`/methodology`) — the full scoring rationale.

## The similarity engine (the "coincidence filter")

Following the motif-decomposition tradition of comparative mythology
(Berezkin's analytical catalogue, the Thompson Motif Index, d'Huy's
phylogenetics, and the reasoning in Crecganford's Seven Sisters analysis):

1. Every telling is decomposed into **motifs**, each tagged core /
   supporting / peripheral.
2. Shared motifs are weighted by **global rarity** (IDF-style): sharing
   "hunter pursues women" (~400/1000 traditions) is weak evidence; sharing
   "birds released to scout for land" (~25/1000) is strong.
3. Unshared motifs count against the score, damped ×0.55 (a story's own
   late elaborations are weak counter-evidence).
4. A **core-retention penalty** demotes pairs where one story's essential
   elements are wholesale absent from the other — the signature of
   coincidental resemblance.
5. Scores map to verdict tiers: **likely common origin** (≥62%),
   **possible connection** (38–62%), **superficial resemblance** (22–38%),
   **likely coincidence** (<22%).

Benchmark behaviour (run `npx tsx scripts/check-scores.ts`):

| Pair | Score | Expected |
| --- | --- | --- |
| Mesopotamian ↔ Hebrew flood | 77% | documented descent ✓ |
| Vedic ↔ Slavic storm-serpent | 88% | Proto-Indo-European reconstruction ✓ |
| Evenki ↔ Iroquois cosmic hunt | 63% | Beringian transmission ✓ |
| Mesopotamian ↔ Chinese (Gun-Yu) flood | 5% | different species of story ✓ |
| Greek ↔ Japanese (Subaru) Pleiades | 14% | same stars, no shared story ✓ |

Geography and chronology are deliberately **excluded** from the score — the
similarity number measures textual kinship only, while the maps and origin
notes carry transmission plausibility. See `/methodology` for why.

## Getting started

```bash
npm install

# 1. Start Neo4j (Docker)
docker run -d --name myth-neo4j -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/mythtracker neo4j:5

# 2. Configure (already set up if .env.local exists)
cp .env.example .env.local

# 3. Load the dataset into the graph
npm run seed

# 4. Run
npm run dev        # http://localhost:3000
```

Without Neo4j the app still runs — it serves the bundled dataset and the
header badge shows `data: bundled (Neo4j offline)` instead of
`data: Neo4j graph`.

Neo4j Browser at <http://localhost:7474> (user `neo4j`, password
`mythtracker`) lets you explore the graph directly, e.g.:

```cypher
// The whole similarity network above 60%
MATCH p=(:Variant)-[s:SIMILAR_TO]->(:Variant) WHERE s.score >= 0.6 RETURN p;

// Which motifs tie Australia to Greece?
MATCH (a:Variant {id:'ss-greek'})-[ra:CONTAINS_MOTIF]->(m:Motif)<-[rb:CONTAINS_MOTIF]-(b:Variant {id:'ss-aboriginal'})
RETURN m.name, m.attestations, ra.role, rb.role ORDER BY m.attestations;
```

## Graph model

```
(:Myth)<-[:VARIANT_OF]-(:Variant)-[:TOLD_BY]->(:Culture)
(:Variant)-[:CONTAINS_MOTIF {role}]->(:Motif)
(:Myth)-[:REFERENCE_VARIANT]->(:Variant)
(:Variant)-[:SIMILAR_TO {score, verdict, sharedMotifs, corePenalty}]->(:Variant)
```

## Project layout

```
app/                 pages (index, myth/[id], explore, methodology)
components/          Leaflet maps (client) + dynamic loaders
lib/                 types, similarity engine, Neo4j driver, data repo
data/                motif catalogue, cultures, myths & variants
scripts/seed.ts      loads the dataset + precomputed SIMILAR_TO edges
scripts/check-scores.ts   benchmark pairs sanity check
```

## Deployment

Two moving parts: the Next.js app and Neo4j. AWS has **no managed Neo4j
service**, so the database is either a container you run yourself or
**Neo4j AuraDB** (Neo4j's managed cloud — it runs in AWS regions and its
free tier holds ~200k nodes; this dataset is ~100 nodes).

The app renders per-request (`dynamic = "force-dynamic"`), builds with
`output: "standalone"` for small Docker images, and needs three env vars:
`NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`. If the database is ever
unreachable it serves the bundled dataset instead of erroring.

### Option A — Vercel + AuraDB Free ($0/mo, simplest)

**1. Create the database.** At <https://console.neo4j.io>, create a free
instance. It downloads a credentials `.txt` file — keep it; the password is
shown **once**.

**2. Seed it.** Don't fight shell quoting — put the credentials in a file:

```bash
cp .env.aura.example .env.aura
```

Open `.env.aura` and paste the contents of Aura's downloaded credentials
file over it. The `AURA_*` lines are ignored, and `NEO4J_USERNAME` is
accepted as well as `NEO4J_USER`. Then, from the project folder:

```bash
npm run seed:aura
```

`.env.aura` is gitignored, so credentials never reach the repo.

The seeder prints every setting and **where each came from** before
connecting, e.g.:

```
Connection settings
  env file       .env.aura
  NEO4J_URI      neo4j+s://abc12345.databases.neo4j.io   [.env.aura]
  NEO4J_USER     neo4j   [.env.aura]
  NEO4J_PASSWORD ******************** (43 chars)   [.env.aura]
```

All three should read `[.env.aura]`. If the URI and password come from
different sources you get an explicit warning — that mismatch (Aura URI,
local password) is the usual cause of
`The client is unauthorized due to authentication failure`.

**3. Deploy.** Push to GitHub, import the repo at
<https://vercel.com/new>, and add three environment variables under
Settings → Environment Variables:

| Name | Value |
| --- | --- |
| `NEO4J_URI` | `neo4j+s://xxxxxxxx.databases.neo4j.io` |
| `NEO4J_USER` | `neo4j` |
| `NEO4J_PASSWORD` | the Aura password |

Vercel builds and deploys on every push. If the vars are wrong the site
still comes up — it serves the bundled dataset and the header badge reads
`data: bundled (Neo4j offline)`, which is your signal to check them.

**Shell note (Windows).** `$env:VAR="..."` is **PowerShell** syntax. In
**cmd.exe** it fails with `The filename, directory name, or volume label
syntax is incorrect` because of the `://` in the URI. VS Code's terminal
may be either — check the dropdown, or just use `.env.aura` as above and
avoid the issue entirely.

**Aura free tier.** Instances pause automatically after a period of
inactivity and must be resumed from the console before they accept
connections. A paused database is not an error in the app — the site falls
back to bundled data until it wakes.

### Option B — AWS single VM + Docker Compose (~$12–24/mo, all-AWS)

The repo ships a production `Dockerfile` and `docker-compose.yml` (app +
Neo4j with a persistent volume, memory-capped for a 2 GB box).

1. Launch an **Amazon Lightsail** instance (2 GB / $12 or 4 GB / $24,
   Ubuntu 24.04) — or an equivalent EC2 `t4g.small`. Open ports 80/443;
   keep 7474/7687 closed to the internet.
2. Install Docker (`curl -fsSL https://get.docker.com | sh`), clone the
   repo, then:
   ```bash
   NEO4J_PASSWORD=<strong-password> docker compose up -d --build
   NEO4J_URI=bolt://localhost:7687 NEO4J_PASSWORD=<strong-password> npm run seed
   ```
3. Put a reverse proxy with TLS in front of port 3000 — e.g.
   [Caddy](https://caddyserver.com) (two-line config, automatic HTTPS) —
   and point your domain's DNS at the instance's static IP.

### Option C — AWS Amplify Hosting or App Runner + AuraDB

If you want AWS to manage the app tier: **Amplify Hosting** deploys
Next.js SSR straight from the GitHub repo (set the `NEO4J_*` env vars in
the console), or push the Docker image to ECR and run it on **App
Runner**. Pair either with AuraDB Free for the database. ECS
Fargate + ALB also works but the load balancer alone (~$16/mo) costs more
than option B's whole VM.

### Seeding note

Seeding is a one-shot load — run it from any machine that can reach the
database whenever `data/*.ts` changes:

| Command | Reads | Target |
| --- | --- | --- |
| `npm run seed` | `.env.local` | local Docker Neo4j |
| `npm run seed:aura` | `.env.aura` | Neo4j AuraDB |
| `npx tsx scripts/seed.ts --env-file=<path>` | your file | anything |

Shell environment variables override the file (the report shows which
won). Aura connections use `neo4j+s://` for TLS — the driver handles it,
no code changes needed.

## Extending the dataset

Add variants/motifs in `data/*.ts` (each variant needs coordinates, an
attestation note, the accepted telling, variations, and role-tagged motifs),
then `npm run seed`. Attestation counts are order-of-magnitude estimates;
refining them against Berezkin's published catalogue is the single highest-
value data improvement.

## Sources & method lineage

Yuri Berezkin's analytical catalogue of world mythology; Julien d'Huy's
phylogenetic reconstructions (Cosmic Hunt); Aarne–Thompson–Uther and the
Thompson Motif Index; Michael Witzel's *Origins of the World's Mythologies*;
Crecganford's public analyses of the Seven Sisters / oldest-story question
(see `oldest-myths.txt` transcript in the repo root).
