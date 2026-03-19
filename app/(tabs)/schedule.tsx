import FinalGame from "@/components/finalGame";
import FutureGame from "@/components/futureGame";
import LiveGame from "@/components/liveGame";
import { fetchSchedule } from "@/services/api";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, PanResponder, Text, View } from "react-native";



const Schedule = () => {
    const [dayIndex, setDayIndex] = useState(0);
    const [gameWeek, setGameWeek] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isFetching = useRef(false);

    useEffect(() => {
        fetchSchedule()
            .then(data => {
                setGameWeek(data.gameWeek);
                const today = new Date().toISOString().split('T')[0];
                const todayIndex = data.gameWeek.findIndex((d: any) => d.date === today);
                if (todayIndex !== -1) setDayIndex(todayIndex);
            })
            .catch(() => setError('Failed to load schedule'))
            .finally(() => setLoading(false));
    }, []);

    const fetchNextWeek = async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        try {
            const lastDate = gameWeekRef.current[gameWeekRef.current.length - 1].date;
            const next = new Date(lastDate);
            next.setDate(next.getDate() + 1);
            const nextStr = next.toISOString().split('T')[0];
            const data = await fetchSchedule(nextStr);
            const existingDates = new Set(gameWeekRef.current.map((d: any) => d.date));
            const newDays = data.gameWeek.filter((d: any) => !existingDates.has(d.date));
            if (newDays.length > 0) setGameWeek(prev => [...prev, ...newDays]);
        } finally {
            isFetching.current = false;
        }
    };

    const fetchPrevWeek = async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        try {
            const firstDate = gameWeekRef.current[0].date;
            const prev = new Date(firstDate);
            prev.setDate(prev.getDate() - 1);
            const prevStr = prev.toISOString().split('T')[0];
            const data = await fetchSchedule(prevStr);
            const existingDates = new Set(gameWeekRef.current.map((d: any) => d.date));
            const newDays = data.gameWeek.filter((d: any) => !existingDates.has(d.date));
            if (newDays.length > 0) {
                setGameWeek(prev => [...newDays, ...prev]);
                setDayIndex(i => i + newDays.length - 1); // shift to maintain current day, minus 1 to navigate back
            }
        } finally {
            isFetching.current = false;
        }
    };

    const gameWeekRef = useRef(gameWeek);
    useEffect(() => { gameWeekRef.current = gameWeek; }, [gameWeek]);

    const fetchNextWeekRef = useRef(fetchNextWeek);
    const fetchPrevWeekRef = useRef(fetchPrevWeek);
    useEffect(() => { fetchNextWeekRef.current = fetchNextWeek; }, [gameWeek]);
    useEffect(() => { fetchPrevWeekRef.current = fetchPrevWeek; }, [gameWeek]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 10;
            },
            onPanResponderRelease: (_, gestureState) => {
                const maxIndex = gameWeekRef.current.length - 1;
                if (gestureState.dx < -75) {
                    setDayIndex(prev => {
                        if (prev >= maxIndex) {
                            fetchNextWeekRef.current(); // at end → load next week, stay put
                            return prev;
                        }
                        return prev + 1;
                    });
                } else if (gestureState.dx > 75) {
                    setDayIndex(prev => {
                        if (prev <= 0) {
                            fetchPrevWeekRef.current(); // at start → load prev week, stay put
                            return prev;
                        }
                        return prev - 1;
                    });
                }
            },
        })
    ).current;

    if (loading) return <View style={{ flex: 1, backgroundColor: '#030712' }}><ActivityIndicator size="large" color="#ffffff" /></View>
    if (error) return <View style={{ flex: 1, backgroundColor: '#030712' }}><Text className="text-white">{error}</Text></View>;

    const currentDay = gameWeek[dayIndex];
    const [year, month, day] = (currentDay?.date ?? '').split('-').map(Number);
    const gameDate = new Date(year, month - 1, day).toLocaleDateString([], {
        month: 'long',
        day: 'numeric'
    });

    return(
        <View className="bg-background" style={{ flex: 1 }} {...panResponder.panHandlers}>
            <Text className="text-center pt-20 text-3xl text-white">{gameDate}</Text>
            <FlatList
                contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 16, paddingBottom: 65 }}
                className="flex-1"
                data={gameWeek[dayIndex]?.games.map((game: any) => ({ ...game, date: gameWeek[dayIndex].date })) ?? []}
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
        </View>
    )
}

export default Schedule;
