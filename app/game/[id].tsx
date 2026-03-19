import FinalDetails from "@/components/gameDetails/finalDetails";
import LiveDetails from "@/components/gameDetails/liveDetails";
import UpcomingDetails from "@/components/gameDetails/upcomingDetails";
import { fetchGame, fetchTeamStats } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";


const GameDetails = () => {
    const { id } = useLocalSearchParams();
    const { data, loading, error, refetch } = useFetch(() => fetchGame(id as string));
    useEffect(() => {
      const isLive = data?.clock?.running === true;

      if (!isLive) return;

      const interval = setInterval(refetch, 30000); // every 30 seconds
      return () => clearInterval(interval);          // cleanup on unmount
    }, [data]);

const { data: awayStats, refetch: fetchAway } = useFetch(
    () => fetchTeamStats(data?.awayTeam.abbrev), false  // don't auto-fetch
);
const { data: homeStats, refetch: fetchHome } = useFetch(
    () => fetchTeamStats(data?.homeTeam.abbrev), false
);

useEffect(() => {
    if (data?.awayTeam.abbrev && data?.homeTeam.abbrev) {
        fetchAway();
        fetchHome();
    }
}, [data]);  // fires once game data loads

    if (loading && !data) return <View><ActivityIndicator size="large" color="#ffffff" /></View>
    if (error) return <View><Text className="">{error}</Text></View>
    const gameState = data?.gameState;
    const isFinal = gameState === 'FINAL' || gameState === 'OFF';
    const isUpcoming = gameState === 'FUT';
    const isLive = gameState === 'LIVE' || gameState === 'CRIT';

    if (isFinal) return <FinalDetails data={data} />
    if (isUpcoming) return <UpcomingDetails data={data} awayStats={awayStats} homeStats={homeStats} />
    if (isLive) return <LiveDetails data={data} />
}

export default GameDetails;
