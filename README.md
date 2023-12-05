# eSports Challonge Bracket Viewer Tool

The eSports Bracket Viewer is a web application that allows users to save and
view Challonge.com tournament data without having to keep track of all the
external links. This helps to save time and cut down efforts spent keeping track
of your favorite tournaments or developing a power ranking system depending on
the use case. This may be most useful for esports community organizations to
leverage in their tournament result tracking efforts. However, general users may
find this useful for keeping up with their own performances and may want to keep
this on their radar for future updates.

## Table of Contents

- [eSports Challonge Bracket Viewer Tool](#esports-challonge-bracket-viewer-tool)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Planned Updates](#planned-updates)
    - [Prerequisites](#prerequisites)
    - [Cloning/Web Access](#cloningweb-access)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Disclaimer](#disclaimer)

## Features

- View top participants in eSports tournaments.
- Save/delete bracket information to/from the database.
- User auth for a personalized dashboard experience.

## Planned Updates

- Front-end work
- Start.GG Integration
- Optional API Route toggles for further info per tournament
- Challonge Community Tournament support (currently, any
  xxxx.challonge.com/123456 link will not work as they are designated as
  community tournaments, thus the API ID is stored and accessed differently)

### Prerequisites

Ensure you have the following installed on your machine:

- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Cloning/Web Access

Simply run
`git clone https://github.com/spit-ball/challonge-bracket-viewer-snyder.git`

Be sure you're in the project directory in your terminal after cloning.

Run `npm i` or `npm install`

Create your local environment by creating a `.env.local` file in the root
directory with this information:

`CHALLONGE_API_KEY=your_API_key`

`IRON_PASS=your_iron_session_pass`

Finally, use the included script to run the dev server: `npm run dev`

## Usage

After launching the Dev server, simply click sign up, create your account, and
then visit the search page, which will direct you on how to use the web app.

The search page takes in the challenge link to the tournament that you are
wanting to gather data from.Keep in mind that the laundry link must be a
standard link and not one of the community organized tournament links.You will
know if it's a community organized tournament link, if it has a prefix to the
challonge.com URL, i.e. "company.challonge.com".

Once you paste in the link in the search bar, click send and it will retrieve
the tournament ID and all relevant information from the Challonge API. The data
will be displayed in a box below the search bar.Keep in mind that it may take a
few seconds for the information to populate, depending on how the api is feeling
that day.

## API Endpoints

Current API Endpoints include /api/saveData, /api/getSavedData,
/api/challongeParticipants, and /api/challongeTournyInfo. Further endpoints may
be included in the future as part of planned updates. If you have any requested
features, let me know!

## Disclaimer

It's important to note that Chalange is moving from the standard V1 API to a V2
with more features, different endpoints, and much more flexible functionality in
the future. As I'm writing this documentation, the app still works. However, if
they decide to issue the API update between now and when you're seeing this,
there may be some discrepancies in the endpoints as I'm expecting those to
change as well.

I also had to remove the previous repo due to several odd conflicts I couldn't
make sense of. I was working from my MBP when I was not home and my Desktop
machine at home, and somehow I ended up not being able to pull down the changes
without tons of conflicts. Rather than lose my work thus far, I copied what I
had on the machine with the latest data and reuploaded to this repo.
