import { fetchGame } from "@/services/api";
import useFetch from "@/services/useFetch";
import FinalDetails from "@/components/gameDetails/finalDetails";
import UpcomingDetails from "@/components/gameDetails/upcomingDetails";
import LiveDetails from "@/components/gameDetails/liveDetails";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";


const GameDetails = () => {
    const { id } = useLocalSearchParams();
    const { data, loading, error, refetch } = useFetch(() => fetchGame(id as string));
    useEffect(() => {
      const isLive = data?.clock?.running === true;

      if (isLive) return;

      const interval = setInterval(refetch, 30000); // every 30 seconds
      return () => clearInterval(interval);          // cleanup on unmount
    }, [data]);

    if (loading && !data) return <View><ActivityIndicator size="large" color="#ffffff" /></View>
    if (error) return <View><Text className="">{error}</Text></View>
    const gameState = data?.gameState;
    const isFinal = gameState === 'FINAL' || gameState === 'OFF';
    const isUpcoming = gameState === 'FUT';
    const isLive = gameState === 'LIVE' || gameState === 'CRIT';

    if (isFinal) return <FinalDetails data={data} />
    if (isUpcoming) return <UpcomingDetails data={data} />
    if (isLive) return <LiveDetails data={data} />
}

export default GameDetails;
