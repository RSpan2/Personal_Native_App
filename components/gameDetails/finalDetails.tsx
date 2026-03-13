import { Stack } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SvgUri } from 'react-native-svg';

const GameDetails = ({ data }: { data: any }) => {
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
            <Text className="text-red-500 text-3xl font-bold text-center">FINAL</Text>
            <View className="flex-1 flex-row" style={{ marginTop: -20 }}>
                {/* Away Team */}
                <View className="items-center flex-1">
                    <SvgUri
                        width={200}
                        height={200}
                        uri={data?.awayTeam.logo}
                    />
                    <Text className="text-white text-8xl font-bold mt-1">{data?.awayTeam.score}</Text>
                    <Text className="text-white text-3xl font-bold mt-1">SOG: {data?.awayTeam.sog}</Text>
                    <Text className="text-white text-3xl font-bold mt-1">Hits: {data?.awayTeam.hits}</Text>
                    <Text className="text-white text-3xl font-bold mt-1">Pim: {data?.awayTeam.hits}</Text>
                    
                </View>
                {/* Home Team */}
                <View className="items-center flex-1">
                    <SvgUri
                        width={200}
                        height={200}
                        uri={data?.homeTeam.logo}
                    />
                    <Text className="text-white text-8xl font-bold mt-1">{data?.homeTeam.score}</Text>
                    <Text className="text-white text-3xl font-bold mt-1">SOG: {data?.homeTeam.sog}</Text>
                    <Text className="text-white text-3xl font-bold mt-1">Hits: {data?.homeTeam.hits}</Text>
                    <Text className="text-white text-3xl font-bold mt-1">Pim: {data?.homeTeam.hits}</Text>
                </View>
            </View>
            {/* Goal Scorers */}
            <View className="items-center pt-5">
                <Text className="text-white text-5xl font-bold mt-1">Goal Scorers</Text>
            </View>
            {(() => {
                const winnerIsAway = (data?.awayTeam.score ?? 0) > (data?.homeTeam.score ?? 0);
                const losingScore = Math.min(data?.awayTeam.score ?? 0, data?.homeTeam.score ?? 0);
                const gwgThreshold = losingScore + 1;

                return data?.summary?.scoring?.map((period: any, i: number) => {
                    const periodLabel = period.periodDescriptor.periodType === 'REG'
                        ? ['1st', '2nd', '3rd'][period.periodDescriptor.number - 1]
                        : period.periodDescriptor.periodType === 'OT' ? 'OT' : 'Shootout';

                    return (
                        <View key={i} className="mt-5 px-4">
                            <Text className="text-white text-3xl font-bold mb-2 text-center">{periodLabel} Period</Text>
                            {period.goals.length === 0 ? (
                                <Text className="text-gray-400 text-center">No scoring</Text>
                            ) : (
                                period.goals.map((goal: any, j: number) => {
                                    const isAway = goal.teamAbbrev.default === data?.awayTeam.abbrev;
                                    const winnerScore = winnerIsAway ? goal.awayScore : goal.homeScore;
                                    const isGWG = winnerScore === gwgThreshold;
                                    const photo = (
                                        <Image
                                            source={{ uri: goal.headshot }}
                                            style={{ width: 64, height: 64, borderRadius: 32 }}
                                        />
                                    );
                                    const info = (
                                        <View className="flex-1">
                                            <View className="flex-row items-center flex-wrap">
                                                <Text className="text-white font-bold text-xs">{goal.name.default}</Text>
                                                <Text className="text-gray-400 text-xs ml-2">{goal.timeInPeriod}</Text>
                                            </View>
                                            <View className="flex-row items-center">
                                                {goal.strength !== 'ev' && (
                                                    <Text className="text-yellow-400 text-xs mr-2 uppercase">{goal.strength}</Text>
                                                )}
                                                {isGWG && (
                                                    <Text className="text-green-400 text-xs">GWG</Text>
                                                )}
                                            </View>
                                            {goal.assists.length > 0 && (
                                                <Text className="text-gray-400 text-xs">
                                                    {goal.assists.map((a: any) => a.name.default).join(', ')}
                                                </Text>
                                            )}
                                        </View>
                                    );
                                    const goalContent = isAway ? (
                                        <View className="flex-row items-center">
                                            {photo}
                                            <View style={{ width: 8 }} />
                                            {info}
                                        </View>
                                    ) : (
                                        <View className="flex-row items-center">
                                            {info}
                                            <View style={{ width: 8 }} />
                                            {photo}
                                        </View>
                                    );
                                    return (
                                        <View key={j} className="flex-row mb-4">
                                            <View className="flex-1 items-center">
                                                {isAway ? goalContent : null}
                                            </View>
                                            <View className="flex-1 items-center">
                                                {!isAway ? goalContent : null}
                                            </View>
                                        </View>
                                    );
                                })
                            )}
                        </View>
                    );
                });
            })()}
        </ScrollView>
    )
}

export default GameDetails;
