import TrackPlayer, {Capability, RepeatMode } from "react-native-track-player";

export default async function setupPlayer() {
    
    const Tracks = [
        {
            id:1,
            url: require("./../../assets/blank.mp3"),
            title: "Get Price",
            artist: "Finance Band"
        }
    ]

    try{
        await TrackPlayer.setupPlayer()
    } catch {
        await TrackPlayer.add(Tracks)
        await TrackPlayer.play()
    }
    await TrackPlayer.add(Tracks)
    await TrackPlayer.updateOptions({
        alwaysPauseOnInterruption: true,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToPrevious,
            Capability.SkipToNext,
        ],
        compactCapabilities: [
            Capability.Play,
            Capability.Pause
        ]
    })
    await TrackPlayer.setRepeatMode(RepeatMode.Track)
    await TrackPlayer.play()
}