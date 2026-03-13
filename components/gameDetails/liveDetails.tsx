import React from "react";
import { View, Text } from "react-native";

const LiveDetails = ({ data }: { data: any }) => {
    return (
        <View className="flex-1 bg-background items-center justify-center">
            <Text className="text-white text-xl">Live</Text>
        </View>
    );
};

export default LiveDetails;
