// Searchbar should accept a URL and then search for the tournament using just the slug. Example: https://challonge.com/61hihibv should be 61hihibv in the code, and then passed to the API call.

import React, { useState } from 'react';
import styles from './Searchbar.module.css';

export default function Searchbar({ onTopParticipants, onTournamentNameChange, onTournamentURLChange }) {
    const [tournamentCode, setTournamentCode] = useState('');
    const [tournamentName, setTournamentName] = useState('');
    const [tournamentURL, setTournamentURL] = useState('');

    const handleInputChange = (event) => {
        const inputUrl = event.target.value;
        const match = inputUrl.match(/challonge\.com\/([^/]+)/);

        if (match) {
            setTournamentCode(match[1]);
        } else {
            setTournamentCode('');
        }
    };

    // Making enter key also count as button click for my searchbar

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };

    const handleButtonClick = async () => {
        if (!tournamentCode) {
            alert("Please enter a valid tournament URL");
            return;
        };

        try {
            const tournamentResponse = await fetch(`/api/challongeTournyInfo?tournamentCode=${tournamentCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (tournamentResponse.ok) {
                const tournamentData = await tournamentResponse.json();
                console.log('Challonge API Tournament Response Status:', tournamentResponse.status);
                console.log('Challonge API Tournament Response Data:', tournamentData);
                console.log('Challonge Tournament Name:', tournamentData.tournament.name);

                setTournamentName(tournamentData.tournament.name);
                onTournamentNameChange(tournamentData.tournament.name);

                console.log('Challonge Tournament URL:', tournamentData.tournament.full_challonge_url)


                setTournamentURL(tournamentData.tournament.full_challonge_url);
                onTournamentURLChange(tournamentData.tournament.full_challonge_url);

                const participantsResponse = await fetch(`/api/challongeParticipants?tournamentCode=${tournamentCode}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (participantsResponse.ok) {
                    const participantsData = await participantsResponse.json();
                    console.log('Challonge API Participants Response Status:', participantsResponse.status);
                    console.log('Challonge API Participants Response Data:', participantsData);

                    // Filter and map the top 7 participants -- could change "seed" to "final_rank" if we want to use that instead and be more clear...

                    // TODO: ALSO NOTE: Challonge API returns MULTIPLE participants with the same seed if they are tied, so we need to filter out the duplicates...though I cannot get that working as of yet.
                    const topParticipants = participantsData.filter(participant => participant.participant.final_rank >= 1 && participant.participant.final_rank <= 3).map(participant => ({
                        seed: participant.participant.final_rank,
                        name: participant.participant.name,
                    }))
                        .sort((a, b) => a.seed - b.seed);

                    console.log('Top Participants:', topParticipants);

                    onTopParticipants(topParticipants);
                } else {
                    const errorData = await participantsResponse.text();
                    console.error('Challonge API Participants Error:', errorData);
                }
            } else {
                const errorData = await tournamentResponse.text();
                console.error('Challonge API Tournament Error:', errorData);
            }
        } catch (error) {
            console.error('Error fetching tournament/participant data:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <input className={styles.input} type="text" placeholder="Paste Your Tournament URL Here!" onChange={handleInputChange} onKeyDown={handleEnterKey} />
                <button className={styles.button} type="button" onClick={handleButtonClick}>Send</button>
            </div>
        </div>
    );
}

