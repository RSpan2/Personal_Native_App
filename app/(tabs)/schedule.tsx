import FinalGame from "@/components/finalGame";
import FutureGame from "@/components/futureGame";
import LiveGame from "@/components/liveGame";
import { fetchSchedule } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";



const Schedule = () => {
    const { data, loading, error, refetch } = useFetch(fetchSchedule);
    useEffect(() => {
    const hasLiveGames = data?.gameWeek
        .flatMap((day: any) => day.games)
        .some((game: any) => game.gameState === 'LIVE' || game.gameState === 'CRIT');

    if (!hasLiveGames) return;

    const interval = setInterval(refetch, 30000); // every 30 seconds
    return () => clearInterval(interval);          // cleanup on unmount
}, [data]);
    if (loading && !data) return <View><ActivityIndicator size="large" color="#ffffff" /></View>
    if (error) return <View><Text className="text-white">{error}</Text></View>;
    return(
        <FlatList
            contentContainerStyle={{ paddingTop: 48, paddingHorizontal: 16 }}
            className="flex-1 bg-background"
            data={data?.gameWeek.flatMap((day: any) =>  day.games.map((game: any) => ({ ...game, date: day.date }))) ?? []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                if(item.gameState === 'LIVE' || item.gameState === 'CRIT'){
                    return <LiveGame
                        id={item.id}
                        awayTeam={item.awayTeam}
                        homeTeam={item.homeTeam}
                        periodDescriptor={item.periodDescriptor}
                    />
                }else if (item.gameState === 'FUT') {
                    return <FutureGame
                        id={item.id}
                        awayTeam={item.awayTeam}
                        homeTeam={item.homeTeam}
                        startTimeUTC={item.startTimeUTC}
                        date={item.date}
                    />
                }else if (item.gameState === 'FINAL' || item.gameState === 'OFF') {
                    return <FinalGame
                        id={item.id}
                        awayTeam={item.awayTeam}
                        homeTeam={item.homeTeam}
                        date={item.date}

                    />
                } return null;
            }}
        />
    )
}

export default Schedule;