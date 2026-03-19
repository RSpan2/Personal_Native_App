import React from "react";
import { Image, Text, View } from "react-native";

type Skater = {
    headshot: string;
    firstName: { default: string };
    lastName: { default: string };
};

const PlayerStatRow = ({ player, stat, label, reverse }: {
    player: Skater | undefined;
    stat: number | undefined;
    label: string;
    reverse?: boolean;
}) => {
    const photo = <Image source={{ uri: player?.headshot }} style={{ width: 64, height: 64, borderRadius: 32 }} />;
    const text = (
        <Text className="text-white text-sm font-bold flex-1">
            {player?.firstName.default} {player?.lastName.default} - {stat}{label}
        </Text>
    );
    return (
        <View className="flex-row items-center mb-2 px-2">
            {reverse ? <>{text}<View style={{ width: 8 }} />{photo}</> : <>{photo}<View style={{ width: 8 }} />{text}</>}
        </View>
    );
};

export default PlayerStatRow;
