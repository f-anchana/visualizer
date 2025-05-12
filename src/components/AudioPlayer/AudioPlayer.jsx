import { useEffect, useState } from "react";
import s from "./AudioPlayer.module.scss";
import audioController from "../../utils/AudioController";

const AudioPlayer = ({ track, tracks, setSelectedTrack }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!track) return;

        // Si l'audio source est différente, on lance la lecture de la nouvelle piste
        if (audioController.audio.src !== track.src) {
            audioController.play(track.src);
            setIsPlaying(true);
        }

        // Lorsque le track change, on redémarre la lecture
        if (audioController.audio.src === track.src && !isPlaying) {
            audioController.play(track.src);
            setIsPlaying(true);
        }

    }, [track, isPlaying]);

    const togglePlay = () => {
        if (isPlaying) {
            audioController.audio.pause();
        } else {
            audioController.play(track.src);
        }
        setIsPlaying(!isPlaying);
    };

    const handlePreviousTrack = () => {
        const currentIndex = tracks.findIndex(t => t.src === track.src);
        const previousTrack = tracks[currentIndex - 1] || tracks[tracks.length - 1];  // Boucle sur la dernière chanson
        setSelectedTrack(previousTrack);
    };

    const handleNextTrack = () => {
        const currentIndex = tracks.findIndex(t => t.src === track.src);
        const nextTrack = tracks[currentIndex + 1] || tracks[0];  // Boucle sur la première chanson
        setSelectedTrack(nextTrack);
    };

    if (!track) return null;

    return (
        <div className={s.player}>
            <div className={s.info}>
                <img src={track.cover} alt={track.title} className={s.cover} />
                <div className={s.details}>
                    <span className={s.trackName}>{track.title}</span>
                </div>
            </div>

            <div className={s.controls}>
                <button onClick={handlePreviousTrack}>Précédent</button>
                <button onClick={togglePlay}>
                    {isPlaying ? "Pause" : "Rejouer"}
                </button>
                <button onClick={handleNextTrack}>Suivant</button>
            </div>
        </div>
    );
};

export default AudioPlayer;
