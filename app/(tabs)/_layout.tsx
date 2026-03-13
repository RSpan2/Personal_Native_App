import { Tabs } from "expo-router";
import React from "react";

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true, // hide default text labels (we render our own in TabIcon)
                tabBarItemStyle: {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            },
        // Floating pill-shaped tab bar — positioned absolute so screen content
        // goes underneath it (screens need paddingBottom to avoid overlap).
        tabBarStyle: {
          backgroundColor: "#111827",
          
          height: 65,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#111827",
        },
      }}>
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