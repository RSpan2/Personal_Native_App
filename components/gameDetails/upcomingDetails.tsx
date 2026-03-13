import { Link, Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgUri } from 'react-native-svg';

const GameDetails = ({ data }: { data: any }) => {
    const [year, month, day] = (data?.gameDate ?? '').split('-').map(Number);

    const gameDate = new Date(year, month - 1, day).toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
    });
    const gameTime = new Date(data?.startTimeUTC).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    return (
        <ScrollView
          className="flex-1 bg-background"
          contentContainerStyle={{ paddingTop: 10 }}>
            <Stack.Screen options={{
                title: `${data?.awayTeam.abbrev} @ ${data?.homeTeam.abbrev}`,
                headerBackTitle: "Schedule",
                headerStyle: { backgroundColor: '#111827' },
                headerTintColor: '#ffffff',
            }} />
            <Text className="text-red-500 text-3xl font-bold text-center">UPCOMING</Text>
            <View className="flex-1 flex-row" style={{ marginTop: -20 }}>
                {/* Away Team */}
                <View className="items-center flex-1">
                    <SvgUri
                        width={200}
                        height={200}
                        uri={data?.awayTeam.logo}
                    />
                </View>
                {/* Home Team */}
                <View className="items-center flex-1">
                    <SvgUri
                        width={200}
                        height={200}
                        uri={data?.homeTeam.logo}
                    />
                </View>
            </View>
            <View className="items-center pt-5" style={{ marginTop: -20 }}>
                <Text className="text-white text-5xl font-bold mt-1">Details</Text>
                <Text className="text-white text-3xl font-bold mt-1">{gameDate}</Text>
                <Text className="text-white text-3xl font-bold mt-1">{gameTime}</Text>
                <Text className="text-white text-3xl font-bold mt-1">{data?.venue.default}</Text>
                <Text className="text-white text-3xl font-bold mt-1">{data?.venueLocation.default}</Text>
                <Text className="text-white text-3xl font-bold mt-1">TV: {data?.tvBroadcasts.map((b: any) => b.network).join(' · ')}</Text>
                <Link href={data?.ticketsLink}>
                <   Text className="text-blue-400 text-3xl font-bold mt-1">Buy Tickets</Text>
                </Link>
            </View>
            
        </ScrollView>
    )
}

export default GameDetails;
