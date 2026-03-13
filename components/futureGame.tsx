import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgUri } from 'react-native-svg';

const FutureGame = ({ id, awayTeam, homeTeam, startTimeUTC, date }: {
    id: number;
    awayTeam: { abbrev: string; commonName: { default: string }; logo: string };
    homeTeam: { abbrev: string; commonName: { default: string }; logo: string };
    startTimeUTC: string;
    date: string
}) => {
    const gameTime = new Date(startTimeUTC).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const [year, month, day] = date.split('-').map(Number);
    const gameDate = new Date(year, month - 1, day).toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
    });

    return (
        <Link href={`/game/${id}` as any} asChild>
            <TouchableOpacity className='w-full'>
                <View className="bg-white rounded-2xl mb-3 w-full p-6">
                    <Text className="text-red-500 text-xs font-bold mb-3 text-center">UPCOMING</Text>
                    <View className="flex-row items-center justify-center">
                    {/* Away Team */}
                    <View className="items-center">
                        <SvgUri
                            width={75}
                            height={75}
                            uri={awayTeam.logo}
                        />
                        <Text className="text-black text-s font-bold mt-1">{awayTeam.commonName.default}</Text>
                    </View>

                    <View className="items-center">
                        <Text className="text-black font-bold text-lg">vs</Text>
                        <Text className="text-gray-400 text-xs mt-1">{gameTime}</Text>
                        <Text className="text-gray-400 text-xs mt-1">{gameDate}</Text>
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

                    </View>
                </View>
            </TouchableOpacity>
        </Link>

    )
}

export default FutureGame;
