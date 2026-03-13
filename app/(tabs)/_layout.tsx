import { Tabs } from "expo-router";
import React from "react";

const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options = {{title: "Home", headerShown: false,}}
            />
            <Tabs.Screen
                name="schedule"
                options = {{title: "Schedule", headerShown: false}}
            />
            <Tabs.Screen
                name="standings"
                options = {{title: "Standings", headerShown: false}}
            />
            
        </Tabs>
    )

}

export default _Layout;