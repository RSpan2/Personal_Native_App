import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgUri } from 'react-native-svg';

const LiveGame = ({ id, awayTeam, homeTeam, periodDescriptor}: {
    id: number;
    awayTeam: { abbrev: string; commonName: { default: string }; logo: string; score: number };
    homeTeam: { abbrev: string; commonName: { default: string }; logo: string; score: number };
    periodDescriptor:{number: number; periodType: string}
}) => {
const periodLabel = periodDescriptor.periodType === 'REG'
    ? ['1st', '2nd', '3rd'][periodDescriptor.number - 1]
    : periodDescriptor.periodType; // shows "OT" or "SO" as-is


    return (
        <Link href={`/game/${id}` as any} asChild>
            <TouchableOpacity className='w-full'>
                <View className="bg-white rounded-2xl mb-3 w-full p-6">
                    <Text className="text-red-500 text-xs font-bold mb-3 text-center">LIVE</Text>
                    <View className="flex-row items-center justify-center">
                    <Text className="text-black font-bold text-6xl mx-4 ">{awayTeam.score}</Text>

                    {/* Away Team */}
                    <View className="items-center">
                        <SvgUri
                            width={75}
                            height={75}
                            uri={awayTeam.logo}
                        />
                        <Text className="text-black text-s font-bold mt-1">{awayTeam.commonName.default}</Text>
                    </View>

                    <View className="items-center mx-2">
                        <Text className="text-black font-bold text-lg">{periodLabel}</Text>
                    </View>


                    {/* Home Team */}
                    <View className="items-center">
                        <SvgUri
                            width={75}
                            height={75}
                            uri={homeTeam.logo}
                        />
                        <Text className="text-black text-s font-bold mt-1">{homeTeam.commonName.default}</Text>
                    </View>

                    <Text className="text-black font-bold text-6xl mx-4">{homeTeam.score}</Text>

                </View>
                </View>
            </TouchableOpacity>
        </Link>

    )
}

export default LiveGame;
